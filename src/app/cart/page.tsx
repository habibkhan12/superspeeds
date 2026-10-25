"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FLAT } from "@/lib/products";
import { TruckIcon } from "@/components/icons";

export default function CartPage() {
  const { items, updateQty, remove, count } = useCart();

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
  const total = subtotal + shipping;

  if (count === 0) {
    return (
      <div className="px-5 sm:px-10 py-24 text-center">
        <h1 className="text-4xl font-semibold tracking-[-0.03em]">Your cart is empty</h1>
        <p className="mt-3 text-neutral-600 text-[15px]">
          The grid is waiting. Pick a car and put it on your desk.
        </p>
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
      <h1 className="text-4xl sm:text-5xl font-semibold tracking-[-0.03em]">Cart</h1>
      <p className="mt-2 text-sm text-neutral-500">
        {count} {count === 1 ? "item" : "items"} in your cart
      </p>

      <div className="mt-10 grid lg:grid-cols-[1fr_360px] gap-12">
        <ul className="divide-y divide-neutral-100">
          {items.map((item) => (
            <li key={`${item.slug}-${item.scale}`} className="flex gap-5 py-5">
              <Link
                href={`/product/${item.slug}`}
                className="relative shrink-0 size-24 sm:size-28 bg-cream rounded-xl overflow-hidden"
              >
                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="112px" />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[15px] font-semibold">{item.name}</p>
                    <p className="mt-0.5 text-xs text-neutral-500">
                      {item.color} · {item.scale} scale
                    </p>
                  </div>
                  <button
                    onClick={() => remove(item.slug, item.scale)}
                    className="text-xs text-neutral-400 hover:text-brand transition-colors"
                  >
                    Remove
                  </button>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center border border-neutral-200 rounded-lg overflow-hidden">
                    <button
                      aria-label="Decrease quantity"
                      onClick={() => updateQty(item.slug, item.scale, item.qty - 1 === 0 ? 1 : item.qty - 1)}
                      className="w-9 h-9 hover:bg-neutral-100 transition-colors"
                    >
                      −
                    </button>
                    <span className="w-10 text-center text-sm font-medium">{item.qty}</span>
                    <button
                      aria-label="Increase quantity"
                      onClick={() => updateQty(item.slug, item.scale, item.qty + 1)}
                      className="w-9 h-9 hover:bg-neutral-100 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <p className="font-semibold">${(item.price * item.qty).toFixed(2)}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-max rounded-2xl bg-neutral-50 border border-neutral-100 p-7">
          <h2 className="text-lg font-semibold">Order summary</h2>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-neutral-500">Subtotal</dt>
              <dd className="font-medium">${subtotal.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-neutral-500">Delivery</dt>
              <dd className="font-medium">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</dd>
            </div>
            <div className="border-t border-neutral-200 pt-3 flex justify-between text-base">
              <dt className="font-semibold">Total</dt>
              <dd className="font-semibold">${total.toFixed(2)}</dd>
            </div>
          </dl>
          {shipping > 0 && (
            <p className="mt-4 flex items-center gap-2 text-[13px] text-neutral-600">
              <TruckIcon className="size-4" />${(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)} away from free delivery
            </p>
          )}
          <Link
            href="/checkout"
            className="mt-6 flex h-13 items-center justify-center rounded-xl bg-neutral-900 text-white text-sm font-semibold hover:bg-neutral-700 transition-colors"
          >
            Checkout
          </Link>
          <Link
            href="/shop"
            className="mt-3 flex h-13 items-center justify-center rounded-xl border border-neutral-200 text-sm font-semibold hover:border-neutral-400 transition-colors"
          >
            Keep shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
