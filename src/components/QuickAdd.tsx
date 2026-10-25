"use client";

import { useState } from "react";
import { useCart } from "./CartContext";
import { BagIcon } from "./icons";
import { imageForColor, type Product } from "@/lib/products";

export default function QuickAdd({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      onClick={() => {
        add({
          slug: product.slug,
          color: product.color,
          colorKey: product.colorKey,
          scale: "1:18",
          name: product.name,
          price: product.price,
          image: imageForColor(product.colorKey),
        });
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1200);
      }}
      className={`inline-flex items-center justify-center gap-1.5 rounded-xl text-xs font-semibold transition-colors ${
        added ? "bg-brand text-white" : "bg-neutral-100 text-neutral-800 hover:bg-neutral-200"
      } ${className}`}
    >
      <BagIcon className="size-4" />
      {added ? "Added" : "Add"}
    </button>
  );
}
