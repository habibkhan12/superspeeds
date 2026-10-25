"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { COLOR_OPTIONS, imageForColor, type Product } from "@/lib/products";
import { useCart } from "./CartContext";
import { BagIcon, StarIcon } from "./icons";

type SortKey = "featured" | "price-asc" | "price-desc";

export default function ShopGrid({ products }: { products: Product[] }) {
  const { add } = useCart();
  const [activeColors, setActiveColors] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>("featured");
  const [justAdded, setJustAdded] = useState<string | null>(null);

  const visible = useMemo(() => {
    let list = products;
    if (activeColors.length > 0) list = list.filter((p) => activeColors.includes(p.colorKey));
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [products, activeColors, sort]);

  const toggleColor = (key: string) =>
    setActiveColors((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );

  return (
    <div className="grid lg:grid-cols-[220px_1fr] gap-10">
      {/* Filters */}
      <aside>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
          Filter
        </p>
        <div className="mt-4 space-y-3">
          {COLOR_OPTIONS.map((c) => (
            <label key={c.key} className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={activeColors.includes(c.key)}
                onChange={() => toggleColor(c.key)}
                className="peer sr-only"
              />
              <span
                className={`size-4.5 w-[18px] h-[18px] rounded-[5px] border flex items-center justify-center transition-colors ${
                  activeColors.includes(c.key)
                    ? "bg-neutral-900 border-neutral-900"
                    : "border-neutral-300 peer-hover:border-neutral-500"
                }`}
              >
                {activeColors.includes(c.key) && (
                  <svg viewBox="0 0 10 8" className="size-2.5 text-white fill-none stroke-current stroke-[1.6]" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m1 4.2 2.6 2.6L9 1.2" />
                  </svg>
                )}
              </span>
              <span className="text-sm text-neutral-700">{c.name}</span>
              <Image
                src={c.image}
                alt=""
                width={28}
                height={22}
                className="rounded-sm border border-neutral-200"
              />
            </label>
          ))}
        </div>

        <div className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">Sort</p>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="mt-3 h-10 w-full rounded-lg border border-neutral-200 px-3 text-sm bg-white outline-none focus:border-neutral-500"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </div>
      </aside>

      {/* Grid */}
      <div>
        <p className="text-sm text-neutral-500">
          {visible.length} {visible.length === 1 ? "model" : "models"}
        </p>
        <div className="mt-5 grid sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10">
          {visible.map((p) => (
            <div key={p.slug} className="group">
              <Link
                href={`/product/${p.slug}`}
                className="relative block bg-cream rounded-2xl overflow-hidden aspect-[4/3.2]"
              >
                {p.tag && (
                  <span
                    className={`absolute top-4 left-4 z-10 text-[10px] font-semibold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full ${
                      p.tag === "New" ? "bg-brand text-white" : "bg-neutral-900 text-white"
                    }`}
                  >
                    {p.tag}
                  </span>
                )}
                <Image
                  src={imageForColor(p.colorKey)}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </Link>
              <p className="mt-3 text-xs text-neutral-500">{p.color}</p>
              <Link
                href={`/product/${p.slug}`}
                className="mt-0.5 block text-[15px] font-medium hover:text-brand transition-colors"
              >
                {p.name}
              </Link>
              <span className="mt-1 flex gap-0.5 text-[#e8a33d]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className="size-3" active={i < p.rating} />
                ))}
              </span>
              <div className="mt-2 flex items-center justify-between">
                <p className="font-semibold flex items-baseline gap-2">
                  ${p.price.toFixed(2)}
                  {p.oldPrice && (
                    <span className="text-xs text-neutral-400 line-through font-normal">
                      ${p.oldPrice.toFixed(2)}
                    </span>
                  )}
                </p>
                <button
                  onClick={() => {
                    add({
                      slug: p.slug,
                      color: p.color,
                      colorKey: p.colorKey,
                      scale: "1:18",
                      name: p.name,
                      price: p.price,
                      image: imageForColor(p.colorKey),
                    });
                    setJustAdded(p.slug);
                    window.setTimeout(() => setJustAdded(null), 1200);
                  }}
                  className={`h-9 px-3.5 inline-flex items-center justify-center gap-1.5 rounded-xl text-xs font-semibold transition-colors ${
                    justAdded === p.slug
                      ? "bg-brand text-white"
                      : "bg-neutral-100 text-neutral-800 hover:bg-neutral-200"
                  }`}
                >
                  <BagIcon className="size-4" />
                  {justAdded === p.slug ? "Added" : "Add"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
