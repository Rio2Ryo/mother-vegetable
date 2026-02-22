"use client";

import { useState, useEffect, useCallback, memo, type FormEvent, type ChangeEvent } from "react";
import { useCartStore } from "@/store/cart";
import { useAffiliateStore } from "@/store/affiliateStore";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { getStoredReferralCode, clearStoredReferralCode } from "@/lib/affiliate";

interface ShippingForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

const emptyForm: ShippingForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "",
};

const inputClass =
  "w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#25C760] focus:ring-1 focus:ring-[#25C760] transition-colors";

/* -----------------------------------------------------------------------
   Field component — declared outside the page component so it is not
   re-created on every render.  This prevents inputs from losing focus.
   ----------------------------------------------------------------------- */
const Field = memo(function Field({
  label,
  field,
  type = "text",
  required = true,
  colSpan,
  value,
  onChange,
}: {
  label: string;
  field: keyof ShippingForm;
  type?: string;
  required?: boolean;
  colSpan?: string;
  value: string;
  onChange: (field: keyof ShippingForm, value: string) => void;
}) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(field, e.target.value);
  };

  return (
    <div className={colSpan}>
      <label className="block text-sm text-gray-400 mb-1.5">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={handleChange}
        placeholder={label}
        className={inputClass}
      />
    </div>
  );
});

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const processOrder = useAffiliateStore((s) => s.processOrder);
  const getInstructorByReferralCode = useAffiliateStore((s) => s.getInstructorByReferralCode);
  const locale = useLocale();
  const [form, setForm] = useState<ShippingForm>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [referrerName, setReferrerName] = useState<string | null>(null);

  const total = totalPrice();

  // Retrieve referral code from storage on mount
  useEffect(() => {
    const code = getStoredReferralCode();
    if (code) {
      setReferralCode(code);
      const instructor = getInstructorByReferralCode(code);
      if (instructor) {
        setReferrerName(instructor.fullName);
      }
    }
  }, [getInstructorByReferralCode]);

  const update = useCallback((field: keyof ShippingForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    // Client-side validation
    const requiredFields: (keyof ShippingForm)[] = [
      "firstName",
      "lastName",
      "email",
      "address",
      "city",
      "country",
    ];
    for (const field of requiredFields) {
      if (!form[field].trim()) {
        setError(`Please fill in the ${field.replace(/([A-Z])/g, " $1").toLowerCase()} field.`);
        return;
      }
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);

    try {
      // Create Stripe Checkout Session
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            discountedPrice: item.discountedPrice,
            quantity: item.quantity,
            image: item.image,
          })),
          shipping: form,
          referralCode: referralCode || undefined,
          locale,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create checkout session.");
        setSubmitting(false);
        return;
      }

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        setError("Failed to get checkout URL.");
        setSubmitting(false);
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  // -----------------------------------------------------------------------
  // Success state
  // -----------------------------------------------------------------------
  if (orderId) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#25C760] mx-auto flex items-center justify-center">
            <svg
              className="w-8 h-8 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold">Thank you!</h1>
          <p className="text-gray-400">
            Your order has been placed successfully.
          </p>
          <p className="text-sm text-gray-500">
            Order ID:{" "}
            <span className="text-[#25C760] font-mono">{orderId}</span>
          </p>
          <Link
            href="/"
            className="inline-block mt-4 px-6 py-3 bg-[#25C760] text-black font-semibold rounded-lg hover:bg-[#1ea84e] transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // -----------------------------------------------------------------------
  // Empty cart
  // -----------------------------------------------------------------------
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <h1 className="text-3xl font-bold">Your cart is empty</h1>
          <p className="text-gray-400">
            Add some products before checking out.
          </p>
          <Link
            href="/"
            className="inline-block mt-4 px-6 py-3 bg-[#25C760] text-black font-semibold rounded-lg hover:bg-[#1ea84e] transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  // -----------------------------------------------------------------------
  // Checkout form
  // -----------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-bold mb-10">Checkout</h1>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="grid grid-cols-1 lg:grid-cols-5 gap-10"
        >
          {/* ---- Shipping Form ---- */}
          <div className="lg:col-span-3 space-y-6">
            <h2 className="text-xl font-semibold text-[#25C760]">
              Shipping Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="First Name" field="firstName" value={form.firstName} onChange={update} />
              <Field label="Last Name" field="lastName" value={form.lastName} onChange={update} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Email" field="email" type="email" value={form.email} onChange={update} />
              <Field label="Phone" field="phone" type="tel" value={form.phone} onChange={update} />
            </div>

            <Field label="Street Address" field="address" value={form.address} onChange={update} />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Field label="City" field="city" value={form.city} onChange={update} />
              <Field label="State / Province" field="state" value={form.state} onChange={update} />
              <Field label="ZIP / Postal Code" field="zip" value={form.zip} onChange={update} />
            </div>

            <Field label="Country" field="country" value={form.country} onChange={update} />
          </div>

          {/* ---- Order Summary ---- */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-6 sticky top-8">
              <h2 className="text-xl font-semibold text-[#25C760]">
                Order Summary
              </h2>

              {referrerName && (
                <div className="flex items-center gap-2 px-3 py-2 bg-[#25C760]/10 border border-[#25C760]/30 rounded-lg text-sm">
                  <svg className="w-4 h-4 text-[#25C760] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-gray-300">Referred by <span className="text-[#25C760] font-medium">{referrerName}</span></span>
                </div>
              )}

              <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 border-b border-gray-800 pb-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-lg object-cover bg-gray-800"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{item.name}</p>
                      <p className="text-sm text-gray-400">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold whitespace-nowrap">
                      $
                      {(
                        (item.discountedPrice ?? item.price) * item.quantity
                      ).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-700 pt-4 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-[#25C760]">${total.toFixed(2)}</span>
              </div>

              {error && (
                <p className="text-red-400 text-sm text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-[#25C760] text-black font-bold text-lg rounded-xl hover:bg-[#1ea84e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {submitting ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
