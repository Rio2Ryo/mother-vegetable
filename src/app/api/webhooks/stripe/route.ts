import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { DIRECT_COMMISSION_RATE, REFERRAL_COMMISSION_RATE } from "@/lib/affiliate";
import prisma from "@/lib/prisma";
import {
  sendOrderConfirmationEmail,
  sendSaleNotificationEmail,
  sendInstructorWelcomeEmail,
  sendReferralSuccessEmail,
  sendSubscriptionRenewalEmail,
} from "@/lib/email";
import { countryToLocale } from "@/lib/email-i18n";
import type Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    // If webhook secret is set, verify signature; otherwise parse directly (dev mode)
    if (process.env.STRIPE_WEBHOOK_SECRET) {
      event = getStripe().webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } else {
      event = JSON.parse(body) as Stripe.Event;
    }
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        if (session.mode === "payment") {
          await handlePaymentCompleted(session);
        } else if (session.mode === "subscription") {
          await handleSubscriptionCreated(session);
        }
        break;
      }

      case "invoice.paid": {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaid(invoice);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (err) {
    console.error(`Error handling ${event.type}:`, err);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
}

// ---------------------------------------------------------------------------
// Payment completed (product purchase)
// ---------------------------------------------------------------------------
async function handlePaymentCompleted(session: Stripe.Checkout.Session) {
  const metadata = session.metadata || {};
  const shipping = metadata.shipping ? JSON.parse(metadata.shipping) : {};
  const items = metadata.items ? JSON.parse(metadata.items) : [];
  const referralCode = metadata.referralCode || null;
  const locale = metadata.locale || countryToLocale(shipping.country) || "en";
  const amountTotal = (session.amount_total || 0) / 100; // convert cents to dollars

  // Create order in DB
  let order;
  try {
    // Try to find user by email or create a guest record
    let userId: string;
    const customerEmail = session.customer_email || shipping.email || "";

    const existingUser = await prisma.user.findUnique({
      where: { email: customerEmail },
    });

    if (existingUser) {
      userId = existingUser.id;
    } else {
      const newUser = await prisma.user.create({
        data: {
          email: customerEmail,
          name: `${shipping.firstName || ""} ${shipping.lastName || ""}`.trim(),
        },
      });
      userId = newUser.id;
    }

    order = await prisma.order.create({
      data: {
        userId,
        status: "confirmed",
        total: amountTotal,
        currency: "USD",
        shippingAddress: JSON.stringify(shipping),
        items: JSON.stringify(items),
        referralCode,
        stripeSessionId: session.id,
      },
    });
  } catch (err) {
    console.error("Failed to create order in DB:", err);
    // Continue with commission processing even if DB fails
  }

  // Process commissions
  if (referralCode) {
    try {
      const instructor = await prisma.instructor.findUnique({
        where: { referralCode },
      });

      if (instructor) {
        // Direct commission (25%)
        const directAmount = amountTotal * DIRECT_COMMISSION_RATE;
        await prisma.commission.create({
          data: {
            orderId: order?.id,
            instructorId: instructor.id,
            type: "direct",
            orderTotal: amountTotal,
            commissionRate: DIRECT_COMMISSION_RATE,
            commissionAmount: directAmount,
          },
        });

        // Notify instructor of sale
        await sendSaleNotificationEmail({
          email: instructor.email,
          fullName: instructor.fullName,
          orderId: order?.id || session.id,
          orderTotal: amountTotal,
          commissionAmount: directAmount,
          commissionType: "direct",
        }, locale);

        // Parent instructor referral commission (10%)
        if (instructor.parentInstructorId) {
          const parent = await prisma.instructor.findUnique({
            where: { id: instructor.parentInstructorId },
          });
          if (parent) {
            const referralAmount = amountTotal * REFERRAL_COMMISSION_RATE;
            await prisma.commission.create({
              data: {
                orderId: order?.id,
                instructorId: parent.id,
                type: "referral",
                orderTotal: amountTotal,
                commissionRate: REFERRAL_COMMISSION_RATE,
                commissionAmount: referralAmount,
              },
            });

            await sendSaleNotificationEmail({
              email: parent.email,
              fullName: parent.fullName,
              orderId: order?.id || session.id,
              orderTotal: amountTotal,
              commissionAmount: referralAmount,
              commissionType: "referral",
            }, locale);
          }
        }
      }
    } catch (err) {
      console.error("Failed to process commissions:", err);
    }
  }

  // Send order confirmation email
  const customerEmail = session.customer_email || shipping.email;
  if (customerEmail) {
    await sendOrderConfirmationEmail({
      customerEmail,
      customerName: `${shipping.firstName || ""} ${shipping.lastName || ""}`.trim() || "Customer",
      orderId: order?.id || session.id,
      total: amountTotal,
      currency: "USD",
      items: items.map((i: { name: string; quantity: number; price: number }) => ({
        name: i.name,
        quantity: i.quantity,
        price: i.price,
      })),
    }, locale);
  }
}

// ---------------------------------------------------------------------------
// Subscription created (instructor registration)
// ---------------------------------------------------------------------------
async function handleSubscriptionCreated(session: Stripe.Checkout.Session) {
  const metadata = session.metadata || {};
  const instructorId = metadata.instructorId;
  const locale = metadata.locale || "en";

  if (!instructorId) return;

  try {
    const instructor = await prisma.instructor.update({
      where: { id: instructorId },
      data: {
        subscriptionStatus: "active",
        stripeSubscriptionId: session.subscription as string,
      },
    });

    // Process referral reward ($50) for parent instructor
    if (instructor.parentInstructorId) {
      const parent = await prisma.instructor.findUnique({
        where: { id: instructor.parentInstructorId },
      });

      if (parent) {
        await prisma.commission.create({
          data: {
            instructorId: parent.id,
            type: "instructor_referral",
            orderTotal: 250, // subscription price
            commissionRate: 0,
            commissionAmount: 50, // flat $50 reward
          },
        });

        await sendReferralSuccessEmail({
          email: parent.email,
          fullName: parent.fullName,
          referredName: instructor.fullName,
          reward: 50,
        }, parent.locale);
      }
    }

    // Send instructor welcome email
    await sendInstructorWelcomeEmail({
      email: instructor.email,
      fullName: instructor.fullName,
      referralCode: instructor.referralCode,
    }, locale);
  } catch (err) {
    console.error("Failed to process instructor subscription:", err);
  }
}

// ---------------------------------------------------------------------------
// Invoice paid (subscription renewal)
// ---------------------------------------------------------------------------
async function handleInvoicePaid(invoice: Stripe.Invoice) {
  // Skip the first invoice (handled by checkout.session.completed)
  if (invoice.billing_reason === "subscription_create") return;

  // Extract subscription ID from parent details (Stripe API v2026+)
  const subDetails = invoice.parent?.subscription_details;
  const subscriptionId =
    typeof subDetails?.subscription === "string"
      ? subDetails.subscription
      : subDetails?.subscription?.id;

  if (!subscriptionId) return;

  try {
    const instructor = await prisma.instructor.findFirst({
      where: { stripeSubscriptionId: subscriptionId },
    });

    if (!instructor) return;

    // Update subscription status
    await prisma.instructor.update({
      where: { id: instructor.id },
      data: { subscriptionStatus: "active" },
    });

    // Process referral reward ($50) for parent on renewal
    if (instructor.parentInstructorId) {
      const parent = await prisma.instructor.findUnique({
        where: { id: instructor.parentInstructorId },
      });

      if (parent) {
        await prisma.commission.create({
          data: {
            instructorId: parent.id,
            type: "instructor_referral",
            orderTotal: 250,
            commissionRate: 0,
            commissionAmount: 50,
          },
        });

        await sendReferralSuccessEmail({
          email: parent.email,
          fullName: parent.fullName,
          referredName: instructor.fullName,
          reward: 50,
        }, parent.locale);
      }
    }

    // Send renewal notification
    // Calculate next billing date from invoice period end
    const periodEnd = invoice.period_end;
    const nextBillingDate = periodEnd
      ? new Date(periodEnd * 1000).toLocaleDateString()
      : "N/A";

    await sendSubscriptionRenewalEmail({
      email: instructor.email,
      fullName: instructor.fullName,
      nextBillingDate,
    }, instructor.locale);
  } catch (err) {
    console.error("Failed to process invoice.paid:", err);
  }
}

// ---------------------------------------------------------------------------
// Subscription deleted (cancellation)
// ---------------------------------------------------------------------------
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  try {
    const instructor = await prisma.instructor.findFirst({
      where: { stripeSubscriptionId: subscription.id },
    });

    if (!instructor) return;

    await prisma.instructor.update({
      where: { id: instructor.id },
      data: { subscriptionStatus: "canceled" },
    });
  } catch (err) {
    console.error("Failed to process subscription deletion:", err);
  }
}
