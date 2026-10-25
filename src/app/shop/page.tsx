import type { Metadata } from "next";
import { PRODUCTS } from "@/lib/products";
import ShopGrid from "@/components/ShopGrid";

export const metadata: Metadata = {
  title: "Shop RC cars | Superspeeds",
  description:
    "Browse officially licensed Porsche 911 GT3 RS RC cars in every color and scale, from 1:36 to 1:12.",
};

export default function ShopPage() {
  return (
    <div className="px-5 sm:px-10 pb-20 pt-8">
      <header className="max-w-[560px]">
        <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">
          The garage
        </p>
        <h1 className="mt-2 text-4xl sm:text-5xl font-semibold tracking-[-0.03em]">
          Shop RC cars
        </h1>
        <p className="mt-4 text-[15px] text-neutral-600 leading-relaxed">
          Every Superspeeds car is an officially licensed, 2.4 GHz-controlled
          replica — built like the full-scale thing, scaled down to your desk.
        </p>
      </header>
      <div className="mt-10">
        <ShopGrid products={PRODUCTS} />
      </div>
    </div>
  );
}
