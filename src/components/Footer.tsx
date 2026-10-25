import Link from "next/link";
import { ArrowIcon } from "./icons";

const COLS: { title: string; links: string[] }[] = [
  { title: "Shop", links: ["RC cars", "Trucks", "Kits", "Parts", "Battery packs"] },
  { title: "Support", links: ["Shipping", "Returns", "Warranty", "Manuals", "Contact us"] },
  { title: "Company", links: ["About", "Careers", "Press", "Affiliates"] },
];

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-300 mt-20">
      <div className="px-6 sm:px-10 py-14 grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1.3fr]">
        <div>
          <p className="font-script text-white text-3xl leading-none">Superspeeds</p>
          <p className="text-sm text-neutral-500 mt-4 max-w-[240px] leading-relaxed">
            Premium radio-controlled sports cars, built to full-scale standards.
          </p>
          <form className="mt-6 flex items-center gap-2 max-w-[280px]" action="#">
            <input
              type="email"
              placeholder="Email for launch drops"
              className="flex-1 h-11 rounded-xl bg-neutral-900 border border-neutral-800 px-4 text-sm outline-none placeholder:text-neutral-600 focus:border-neutral-600"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="size-11 rounded-xl bg-brand hover:bg-brand-dark transition-colors flex items-center justify-center text-white"
            >
              <ArrowIcon />
            </button>
          </form>
        </div>

        {COLS.map((col) => (
          <div key={col.title}>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
              {col.title}
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {col.links.map((l) => (
                <li key={l}>
                  <Link href="#" className="hover:text-white transition-colors">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-neutral-900 px-6 sm:px-10 py-5 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-600">
        <p>© 2026 Superspeeds. All rights reserved.</p>
        <p className="flex gap-5">
          <Link href="#" className="hover:text-neutral-300">Privacy</Link>
          <Link href="#" className="hover:text-neutral-300">Terms</Link>
          <Link href="#" className="hover:text-neutral-300">Porsche Trademark Notice</Link>
        </p>
      </div>
    </footer>
  );
}
