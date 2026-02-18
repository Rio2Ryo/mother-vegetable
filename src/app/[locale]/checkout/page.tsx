"use client";

import { useState, type FormEvent } from "react";
import { useCartStore } from "@/store/cart";

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

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const [form, setForm] = useState<ShippingForm>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  const total = totalPrice();

  function update(field: keyof ShippingForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shipping: form,
          items: items.map((item) => ({
            productId: item.productId,
            name: item.name,
            price: item.discountedPrice ?? item.price,
            quantity: item.quantity,
            image: item.image,
          })),
          currency: items[0]?.currency ?? "USD",
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to place order");
      }

      const data = await res.json();
      setOrderId(data.id);
      clearCart();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
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
          <a
            href="/"
            className="inline-block mt-4 px-6 py-3 bg-[#25C760] text-black font-semibold rounded-lg hover:bg-[#1ea84e] transition-colors"
          >
            Continue Shopping
          </a>
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
          <a
            href="/"
            className="inline-block mt-4 px-6 py-3 bg-[#25C760] text-black font-semibold rounded-lg hover:bg-[#1ea84e] transition-colors"
          >
            Browse Products
          </a>
        </div>
      </div>
    );
  }

  // -----------------------------------------------------------------------
  // Input helper
  // -----------------------------------------------------------------------
  const inputClass =
    "w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#25C760] focus:ring-1 focus:ring-[#25C760] transition-colors";

  function Field({
    label,
    field,
    type = "text",
    required = true,
    colSpan,
  }: {
    label: string;
    field: keyof ShippingForm;
    type?: string;
    required?: boolean;
    colSpan?: string;
  }) {
    return (
      <div className={colSpan}>
        <label className="block text-sm text-gray-400 mb-1.5">{label}</label>
        <input
          type={type}
          required={required}
          value={form[field]}
          onChange={(e) => update(field, e.target.value)}
          placeholder={label}
          className={inputClass}
        />
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
          className="grid grid-cols-1 lg:grid-cols-5 gap-10"
        >
          {/* ---- Shipping Form ---- */}
          <div className="lg:col-span-3 space-y-6">
            <h2 className="text-xl font-semibold text-[#25C760]">
              Shipping Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="First Name" field="firstName" />
              <Field label="Last Name" field="lastName" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Email" field="email" type="email" />
              <Field label="Phone" field="phone" type="tel" />
            </div>

            <Field label="Street Address" field="address" />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Field label="City" field="city" />
              <Field label="State / Province" field="state" />
              <Field label="ZIP / Postal Code" field="zip" />
            </div>

            <Field label="Country" field="country" />
          </div>

          {/* ---- Order Summary ---- */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-6 sticky top-8">
              <h2 className="text-xl font-semibold text-[#25C760]">
                Order Summary
              </h2>

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
