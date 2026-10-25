"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  slug: string;
  color: string;
  colorKey: string;
  scale: string;
  name: string;
  price: number;
  image: string;
  qty: number;
};

type CartContextType = {
  items: CartItem[];
  count: number;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  updateQty: (slug: string, scale: string, qty: number) => void;
  remove: (slug: string, scale: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextType>({
  items: [],
  count: 0,
  add: () => {},
  updateQty: () => {},
  remove: () => {},
  clear: () => {},
});

const STORAGE_KEY = "superspeeds-cart-v1";
const keyOf = (i: Pick<CartItem, "slug" | "scale">) => `${i.slug}__${i.scale}`;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* corrupted storage — start empty */
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable */
    }
  }, [items]);

  const value: CartContextType = {
    items,
    count: items.reduce((n, i) => n + i.qty, 0),
    add: (item, qty = 1) =>
      setItems((prev) => {
        const k = keyOf(item);
        const existing = prev.find((p) => keyOf(p) === k);
        if (existing) {
          return prev.map((p) =>
            keyOf(p) === k ? { ...p, qty: Math.min(p.qty + qty, 99) } : p,
          );
        }
        return [...prev, { ...item, qty }];
      }),
    updateQty: (slug, scale, qty) =>
      setItems((prev) =>
        prev.map((p) =>
          p.slug === slug && p.scale === scale
            ? { ...p, qty: Math.max(1, Math.min(99, qty)) }
            : p,
        ),
      ),
    remove: (slug, scale) =>
      setItems((prev) => prev.filter((p) => !(p.slug === slug && p.scale === scale))),
    clear: () => setItems([]),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
