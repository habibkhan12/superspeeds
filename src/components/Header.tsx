"use client";

import Link from "next/link";
import { useCart } from "./CartContext";
import { CartIcon, HeartIcon, SearchIcon } from "./icons";

const NAV = [
  { label: "Cars", href: "/shop" },
  { label: "Trucks", href: "/shop" },
  { label: "Racing", href: "/shop" },
  { label: "Kits", href: "/shop" },
  { label: "Parts", href: "/shop" },
  { label: "New", href: "/shop" },
  { label: "Sale", href: "/shop", red: true },
];

export default function Header() {
  const { count } = useCart();

  return (
    <header className="px-5 sm:px-10 pt-7">
      <div className="flex items-center justify-between gap-6">
        <Link href="/" className="font-script text-brand text-[34px] leading-none pr-2 shrink-0">
          Superspeeds
        </Link>

        <label className="hidden md:flex items-center gap-2 bg-neutral-100 rounded-full h-11 w-[300px] lg:w-[360px] px-4 focus-within:ring-2 focus-within:ring-neutral-200">
          <SearchIcon className="size-4 text-neutral-500" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-[13px] flex-1 placeholder:text-neutral-400"
          />
        </label>

        <div className="flex items-center gap-5 sm:gap-8 text-[11px] font-medium">
          <Link href="/cart" className="relative flex flex-col items-center gap-1 hover:opacity-70 transition-opacity">
            <span className="relative">
              <CartIcon className="size-[22px]" />
              <span
                className={`absolute -top-2 -right-2 min-w-4 h-4 rounded-full px-1 flex items-center justify-center text-[9px] font-semibold text-white transition-colors ${
                  count > 0 ? "bg-brand" : "bg-neutral-800"
                }`}
              >
                {count}
              </span>
            </span>
            <span>Cart</span>
          </Link>
          <button className="hidden sm:flex flex-col items-center gap-1 hover:opacity-70 transition-opacity">
            <HeartIcon className="size-[21px]" />
            <span>Favorites</span>
          </button>
          <button className="w-10 h-10 rounded-full bg-[radial-gradient(circle_at_30%_25%,#c88f6a,#7a4b32)] text-white flex items-center justify-center text-sm font-semibold hover:opacity-85 transition-opacity">
            H
          </button>
        </div>
      </div>

      <nav className="flex gap-6 sm:gap-8 pt-5 pb-4 overflow-x-auto text-sm">
        {NAV.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`whitespace-nowrap hover:text-brand transition-colors ${
              item.red ? "text-brand" : "text-neutral-800"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
