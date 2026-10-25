"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartContext";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FLAT } from "@/lib/products";

const FIELDS = [
  { label: "Full name", name: "name", type: "text", placeholder: "Habib Khan" },
  { label: "Email", name: "email", type: "email", placeholder: "you@example.com" },
  { label: "Address", name: "address", type: "text", placeholder: "1 Pit Lane" },
  { label: "City", name: "city", type: "text", placeholder: "Los Angeles" },
  { label: "ZIP code", name: "zip", type: "text", placeholder: "90001" },
];

export default function CheckoutPage() {
  const { items, count, clear } = useCart();
  const [order, setOrder] = useState<{
    id: string;
    lines: {
      slug: string;
      scale: string;
      name: string;
      color: string;
      qty: number;
      price: number;
      image: string;
    }[];
    total: number;
  } | null>(null);

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
  const total = subtotal + shipping;

  if (order) {
    return (
      <div className="px-5 sm:px-10 py-16 text-center">
        <span className="inline-flex size-16 rounded-full bg-brand text-white items-center justify-center text-2xl">
          ✓
        </span>
        <h1 className="mt-6 text-4xl font-semibold tracking-[-0.03em]">Order placed</h1>
        <p className="mt-3 text-neutral-600 text-[15px] max-w-[440px] mx-auto">
          Great taste. Order <span className="font-semibold text-neutral-900">{order.id}</span> is
          being prepared for the pit lane — a confirmation is on its way to your inbox.
        </p>

        <div className="mt-10 max-w-[520px] mx-auto rounded-2xl bg-neutral-50 border border-neutral-100 p-7 text-left">
          <h2 className="text-lg font-semibold">Your order</h2>
          <ul className="mt-5 space-y-4">
            {order.lines.map((i) => (
              <li key={`${i.slug}-${i.scale}`} className="flex items-center gap-3">
                <span className="relative size-12 shrink-0 bg-cream rounded-lg overflow-hidden">
                  <Image src={i.image} alt="" fill className="object-cover" sizes="48px" />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-[13px] font-medium truncate">{i.name}</span>
                  <span className="block text-[11px] text-neutral-500">
                    {i.color} · {i.scale} · ×{i.qty}
                  </span>
                </span>
                <span className="text-[13px] font-semibold">
                  ${(i.price * i.qty).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-5 border-t border-neutral-200 pt-4 flex justify-between text-base">
            <span className="font-semibold">Total</span>
            <span className="font-semibold">${order.total.toFixed(2)}</span>
          </div>
        </div>

        <p className="mt-6 text-xs text-neutral-500">
          Demo checkout — no payment was processed and no card details were requested.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-flex h-13 items-center rounded-2xl bg-neutral-900 px-8 text-sm font-semibold text-white hover:bg-neutral-700 transition-colors"
        >
          Back to the garage
        </Link>
      </div>
    );
  }

  if (count === 0) {
    return (
      <div className="px-5 sm:px-10 py-24 text-center">
        <h1 className="text-4xl font-semibold tracking-[-0.03em]">Nothing to check out</h1>
        <Link
          href="/shop"
          className="mt-8 inline-flex h-13 items-center rounded-2xl bg-neutral-900 px-8 text-sm font-semibold text-white hover:bg-neutral-700 transition-colors"
        >
          Shop RC cars
        </Link>
      </div>
    );
  }

  return (
    <div className="px-5 sm:px-10 pb-20 pt-8">
      <h1 className="text-4xl sm:text-5xl font-semibold tracking-[-0.03em]">Checkout</h1>
      <p className="mt-2 text-xs text-neutral-500">
        Demo checkout — no payment is processed and no card details are requested.
      </p>

      <div className="mt-10 grid lg:grid-cols-[1fr_360px] gap-12">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setOrder({
              id: `SP-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
              lines: items,
              total: subtotal + shipping,
            });
            clear();
          }}
          className="grid sm:grid-cols-2 gap-4 content-start"
        >
          {FIELDS.map((f) => (
            <label key={f.name} className={f.name === "address" ? "sm:col-span-2" : ""}>
              <span className="text-xs font-medium text-neutral-600">{f.label}</span>
              <input
                required
                type={f.type}
                name={f.name}
                placeholder={f.placeholder}
                className="mt-1.5 h-12 w-full rounded-xl border border-neutral-200 px-4 text-sm outline-none focus:border-neutral-500 bg-white"
              />
            </label>
          ))}
          <button
            type="submit"
            className="sm:col-span-2 mt-2 flex h-14 items-center justify-center rounded-xl bg-brand text-white text-sm font-semibold hover:bg-brand-dark transition-colors"
          >
            Place order — ${total.toFixed(2)}
          </button>
        </form>

        <aside className="h-max rounded-2xl bg-neutral-50 border border-neutral-100 p-7">
          <h2 className="text-lg font-semibold">Your order</h2>
          <ul className="mt-5 space-y-4">
            {items.map((i) => (
              <li key={`${i.slug}-${i.scale}`} className="flex items-center gap-3">
                <span className="relative size-12 shrink-0 bg-cream rounded-lg overflow-hidden">
                  <Image src={i.image} alt="" fill className="object-cover" sizes="48px" />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-[13px] font-medium truncate">{i.name}</span>
                  <span className="block text-[11px] text-neutral-500">
                    {i.color} · {i.scale} · ×{i.qty}
                  </span>
                </span>
                <span className="text-[13px] font-semibold">
                  ${(i.price * i.qty).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <dl className="mt-6 border-t border-neutral-200 pt-4 space-y-2.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-neutral-500">Subtotal</dt>
              <dd className="font-medium">${subtotal.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-neutral-500">Delivery</dt>
              <dd className="font-medium">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</dd>
            </div>
            <div className="flex justify-between text-base pt-1">
              <dt className="font-semibold">Total</dt>
              <dd className="font-semibold">${total.toFixed(2)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
