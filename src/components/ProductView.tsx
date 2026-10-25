"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  COLOR_OPTIONS,
  SCALES,
  galleryFor,
  imageForColor,
  type Product,
} from "@/lib/products";
import { useCart } from "./CartContext";
import { BagIcon, HeartIcon, StarIcon, TruckIcon } from "./icons";

export default function ProductView({ product }: { product: Product }) {
  const { add } = useCart();
  const gallery = galleryFor(product);

  const [activeImage, setActiveImage] = useState(0);
  const [activeScale, setActiveScale] = useState("1:18");
  const [liked, setLiked] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // Selected color: starts at this product's own color (index 0 of gallery)
  const selectedColorKey =
    activeImage === 0 ? product.colorKey : (["green", "yellow", "blue", "black"] as const).find(
      (k) => imageForColor(k) === gallery[activeImage],
    ) ?? product.colorKey;
  const selectedColor = COLOR_OPTIONS.find((c) => c.key === selectedColorKey)!;
  const selectedProduct =
    selectedColorKey === product.colorKey ? product : { ...product, price: product.price };

  const thumbColorKeys = gallery.map(
    (img) => COLOR_OPTIONS.find((c) => c.image === img)?.key ?? "",
  );

  return (
    <div className="px-5 sm:px-10 pb-16 pt-2">
      {/* Breadcrumb */}
      <nav className="text-xs text-neutral-400 flex items-center gap-2 flex-wrap">
        <Link href="/shop" className="hover:text-neutral-600">
          Toys and hobbies
        </Link>
        <span className="text-neutral-300 text-[10px]">✦</span>
        <Link href="/shop" className="hover:text-neutral-600">
          RC cars
        </Link>
        <span className="text-neutral-300 text-[10px]">✦</span>
        <span className="text-neutral-500">Superspeeds</span>
      </nav>

      <div className="mt-5 grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16">
        {/* Gallery */}
        <div>
          <div className="bg-cream rounded-xl aspect-[1/0.96] relative overflow-hidden">
            <Image
              key={gallery[activeImage]}
              src={gallery[activeImage]}
              alt={`${product.name} in ${selectedColor.name}`}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>

          <div className="mt-3 grid grid-cols-5 gap-3">
            {gallery.map((t, i) => (
              <button
                key={i}
                aria-label={`View color ${thumbColorKeys[i]}`}
                onClick={() => setActiveImage(i)}
                className={`relative bg-white border rounded-lg aspect-[4/3.3] overflow-hidden transition-colors ${
                  activeImage === i
                    ? "border-neutral-900"
                    : "border-neutral-200 hover:border-neutral-400"
                }`}
              >
                <Image src={t} alt="" fill className="object-cover" sizes="120px" />
              </button>
            ))}
            <button
              aria-label="More images"
              onClick={() => setActiveImage((i) => (i + 1) % gallery.length)}
              className="border border-neutral-200 rounded-lg text-[11px] font-medium text-neutral-500 hover:border-neutral-400 transition-colors"
            >
              +2 more
            </button>
          </div>
        </div>

        {/* Details */}
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="size-9 rounded-full bg-neutral-900 flex items-center justify-center">
                <span className="font-script text-brand text-lg leading-none pt-0.5">S</span>
              </span>
              <span className="font-semibold text-[15px]">Superspeeds</span>
            </div>
            <span className="text-xs font-medium text-neutral-300">SP1325GRC—18</span>
          </div>

          <h1 className="mt-6 text-[28px] sm:text-[32px] leading-tight font-semibold tracking-[-0.02em]">
            {product.name} — {selectedColor.name}
          </h1>

          <div className="mt-3 flex items-center gap-2">
            <span className="flex gap-0.5 text-[#e8a33d]">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} className="size-4" active={i < product.rating} />
              ))}
            </span>
            <span className="text-[13px] text-neutral-400">{product.reviews} reviews</span>
          </div>

          <p className="mt-7 text-[44px] font-semibold tracking-[-0.02em]">
            ${selectedProduct.price.toFixed(2)}
          </p>

          {/* Color */}
          <div className="mt-9">
            <p className="flex items-center gap-2 text-sm font-semibold">
              Color <span className="text-neutral-300 text-xs">✦</span>
              <span className="text-neutral-400 font-normal">{selectedColor.name}</span>
            </p>
            <div className="mt-3 flex gap-2.5">
              {gallery.map((img, i) => (
                <button
                  key={i}
                  aria-label={COLOR_OPTIONS.find((c) => c.image === img)?.name}
                  onClick={() => setActiveImage(i)}
                  className={`relative size-12 rounded-lg border overflow-hidden transition-colors ${
                    activeImage === i
                      ? "border-neutral-900"
                      : "border-neutral-200 hover:border-neutral-400"
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" sizes="48px" />
                </button>
              ))}
            </div>
          </div>

          {/* Scale */}
          <div className="mt-7">
            <p className="flex items-center gap-2 text-sm font-semibold">
              Scale <span className="text-neutral-300 text-xs">✦</span>
              <span className="text-neutral-400 font-normal">{activeScale} scale</span>
            </p>
            <div className="mt-3 grid grid-cols-6 gap-2.5 max-w-[480px]">
              {SCALES.map((s) => (
                <button
                  key={s}
                  onClick={() => setActiveScale(s)}
                  className={`h-11 rounded-lg border text-[13px] font-medium transition-colors ${
                    activeScale === s
                      ? "bg-neutral-900 text-white border-neutral-900"
                      : "border-neutral-200 text-neutral-700 hover:border-neutral-400"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <Link
              href="#"
              className="inline-block mt-4 text-[13px] font-medium text-brand hover:text-brand-dark"
            >
              Scale guide
            </Link>
          </div>

          {/* CTA */}
          <div className="mt-9 flex items-center gap-3">
            <button
              onClick={() => {
                add({
                  slug: product.slug,
                  color: selectedColor.name,
                  colorKey: selectedColorKey,
                  scale: activeScale,
                  name: product.name,
                  price: selectedProduct.price,
                  image: imageForColor(selectedColorKey),
                });
                setJustAdded(true);
                window.setTimeout(() => setJustAdded(false), 1400);
              }}
              className="flex-1 h-[52px] rounded-xl bg-neutral-900 text-white font-semibold text-sm inline-flex items-center justify-center gap-2.5 hover:bg-neutral-700 active:scale-[0.99] transition-all"
            >
              <BagIcon className="size-5" />
              {justAdded ? "Added to cart" : "Add to cart"}
            </button>
            <button
              aria-label="Add to favorites"
              onClick={() => setLiked((v) => !v)}
              className={`size-[52px] shrink-0 rounded-xl border flex items-center justify-center transition-colors ${
                liked
                  ? "border-brand text-brand"
                  : "border-neutral-200 text-neutral-800 hover:border-neutral-400"
              }`}
            >
              <HeartIcon filled={liked} className="size-5" />
            </button>
          </div>

          {/* Delivery note */}
          <p className="mt-5 flex items-center gap-2 text-[13px] text-neutral-700">
            <TruckIcon className="size-4" />
            Free delivery on orders over $30.0
          </p>
        </div>
      </div>
    </div>
  );
}
