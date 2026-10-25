import Image from "next/image";
import Link from "next/link";
import { PRODUCTS, type Product, imageForColor } from "@/lib/products";
import QuickAdd from "@/components/QuickAdd";
import {
  ArrowIcon,
  BoltIcon,
  GaugeIcon,
  RemoteIcon,
  ReturnIcon,
  ShieldIcon,
  StarIcon,
  TruckIcon,
} from "@/components/icons";

const MARQUEE_ITEMS = [
  "OFFICIALLY LICENSED",
  "45 KM/H TOP SPEED",
  "2.4 GHZ RADIO SYSTEM",
  "40 MIN RUNTIME",
  "SCALES 1:12 → 1:36",
  "FREE DELIVERY OVER $30",
];

function Stars({ rating, size = "size-4" }: { rating: number; size?: string }) {
  return (
    <span className="flex gap-0.5 text-[#e8a33d]">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} className={size} active={i < rating} />
      ))}
    </span>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group">
      <Link
        href={`/product/${product.slug}`}
        className="relative block bg-cream rounded-2xl overflow-hidden aspect-[4/3.4]"
      >
        {product.tag && (
          <span
            className={`absolute top-4 left-4 z-10 text-[10px] font-semibold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full ${
              product.tag === "New" ? "bg-brand text-white" : "bg-neutral-900 text-white"
            }`}
          >
            {product.tag}
          </span>
        )}
        {product.oldPrice && (
          <span className="absolute top-4 right-4 z-10 text-[10px] font-semibold px-2.5 py-1 rounded-full bg-brand text-white">
            −12%
          </span>
        )}
        <Image
          src={imageForColor(product.colorKey)}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </Link>
      <div className="pt-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-neutral-500">{product.color}</p>
          <Stars rating={product.rating} size="size-3" />
        </div>
        <p className="mt-0.5 text-[15px] font-medium">
          <Link href={`/product/${product.slug}`} className="hover:text-brand transition-colors">
            {product.name}
          </Link>
        </p>
        <div className="mt-2 flex items-center justify-between">
          <p className="font-semibold flex items-baseline gap-2">
            ${product.price.toFixed(2)}
            {product.oldPrice && (
              <span className="text-xs text-neutral-400 line-through font-normal">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
          </p>
          <QuickAdd product={product} className="h-9 px-3.5" />
        </div>
      </div>
    </div>
  );
}

const CATEGORIES = [
  { name: "On-road GT & rally", icon: <GaugeIcon />, count: 32 },
  { name: "Drift machines", icon: <RemoteIcon />, count: 18 },
  { name: "Kits & builds", icon: <BoltIcon />, count: 24 },
  { name: "Spare parts", icon: <ShieldIcon />, count: 96 },
];

const PERKS = [
  { icon: <TruckIcon />, title: "Free delivery", copy: "On every order over $30." },
  { icon: <ShieldIcon />, title: "2-year warranty", copy: "On all cars and controllers." },
  { icon: <ReturnIcon />, title: "30-day returns", copy: "Not fast enough? Send it back." },
  { icon: <RemoteIcon />, title: "Licensed designs", copy: "Official scale replicas" },
];

const REVIEWS = [
  {
    quote:
      "The weight and detail on the GT3 RS stopped me in my tracks. It genuinely feels like a collector's piece you can drive.",
    name: "Marcus T.",
    detail: "Verified buyer — 1:18 Racing Green",
    rating: 5,
  },
  {
    quote:
      "Proportional steering makes all the difference. It corners like the real thing — my 9-year-old has never put it down.",
    name: "Dana K.",
    detail: "Verified buyer — 1:14 Riviera Blue",
    rating: 4,
  },
  {
    quote:
      "Bought it as a desk gift and ended up racing it in the hallway. Build quality is far beyond every toy-store car we've had.",
    name: "Paolo R.",
    detail: "Verified buyer — 1:12 Jet Black",
    rating: 5,
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="px-5 sm:px-10 pt-6 sm:pt-10">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-8 items-center">
          <div className="py-6 lg:py-12">
            <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">
              New — Officially licensed RC
            </p>
            <h1 className="mt-4 text-[42px] sm:text-[56px] lg:text-[64px] leading-[1.02] font-semibold tracking-[-0.03em]">
              Drive the legend.
              <br />
              <span className="text-neutral-400">In miniature.</span>
            </h1>
            <p className="mt-6 max-w-[440px] text-[15px] leading-relaxed text-neutral-600">
              The Porsche 911 GT3 RS RC — a faithful, officially licensed replica with a
              pro-grade 2.4 GHz controller, proportional steering and speed worthy of the badge.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/product/gt3rs-racing-green"
                className="inline-flex h-13 items-center gap-2 rounded-2xl bg-neutral-900 px-7 text-sm font-semibold text-white hover:bg-neutral-700 transition-colors"
              >
                Shop the GT3 RS
                <ArrowIcon />
              </Link>
              <Link
                href="/shop"
                className="inline-flex h-13 items-center gap-2 rounded-2xl border border-neutral-200 px-6 text-sm font-semibold hover:border-neutral-400 transition-colors"
              >
                Explore RC cars
              </Link>
            </div>
            <dl className="mt-12 grid grid-cols-3 max-w-[420px] divide-x divide-neutral-200">
              {[
                ["45 km/h", "top speed"],
                ["40 min", "runtime"],
                ["1:36 — 1:12", "scales"],
              ].map(([v, k]) => (
                <div key={k} className="px-4 first:pl-0">
                  <dt className="text-xl sm:text-2xl font-semibold tracking-tight">{v}</dt>
                  <dd className="text-[11px] uppercase tracking-[0.14em] text-neutral-500 mt-1">
                    {k}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative bg-cream rounded-[28px] aspect-[4/3.6] overflow-hidden">
            <Image
              src="/images/gt3rs-green.png"
              alt="Porsche 911 GT3 RS RC with controller"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <span className="absolute bottom-5 left-5 bg-white/90 backdrop-blur rounded-full px-4 py-2 text-xs font-semibold shadow-sm">
              GT3 RS · Racing Green
            </span>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="mt-14 border-y border-neutral-100 py-4 overflow-hidden">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center shrink-0">
              {MARQUEE_ITEMS.map((item) => (
                <span
                  key={`${copy}-${item}`}
                  className="flex items-center text-sm font-semibold tracking-[0.08em] text-neutral-800 whitespace-nowrap"
                >
                  <span className="px-6">{item}</span>
                  <span className="text-brand">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="px-5 sm:px-10 mt-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <Link
              key={c.name}
              href="/shop"
              className="group rounded-2xl border border-neutral-200 p-6 hover:border-neutral-900 transition-colors"
            >
              <span className="text-brand">{c.icon}</span>
              <p className="mt-10 text-[15px] font-semibold">{c.name}</p>
              <p className="mt-1 text-xs text-neutral-500 flex items-center gap-1.5">
                {c.count} models
                <ArrowIcon className="size-3 transition-transform group-hover:translate-x-1" />
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="px-5 sm:px-10 mt-16">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">
              The garage
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-[-0.02em]">
              Featured this week
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-neutral-700 hover:text-brand transition-colors"
          >
            View all <ArrowIcon className="size-3.5" />
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-5">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* Editorial band */}
      <section className="px-5 sm:px-10 mt-20">
        <div className="bg-neutral-950 text-white rounded-[28px] px-6 sm:px-12 py-12 sm:py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">
              The GT3 RS experience
            </p>
            <h2 className="mt-3 text-3xl sm:text-[44px] font-semibold tracking-[-0.02em] leading-tight">
              Engineered like the car it copies.
            </h2>
            <ul className="mt-8 space-y-4 text-sm text-neutral-300">
              {[
                "2.4 GHz proportional radio system — zero lag, full throttle control",
                "Oil-damped suspension geometry tuned for drift and grip setups",
                "Swan-neck rear wing, ducktail and center-loc wheels, faithfully scaled",
                "7.4V Li-ion battery with 40 minutes of track time per charge",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/product/gt3rs-racing-green"
              className="mt-9 inline-flex h-12 items-center rounded-2xl bg-brand px-7 text-sm font-semibold hover:bg-brand-dark transition-colors"
            >
              Take it for a lap
            </Link>
          </div>
          <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-neutral-900">
            <Image
              src="/images/gt3rs-black.png"
              alt="GT3 RS RC detail"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="px-5 sm:px-10 mt-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PERKS.map((p) => (
            <div key={p.title}>
              <span className="text-brand">{p.icon}</span>
              <p className="mt-3 text-sm font-semibold">{p.title}</p>
              <p className="mt-1 text-[13px] text-neutral-500">{p.copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="px-5 sm:px-10 mt-20">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em]">
          Fast on arrival.
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <figure key={r.name} className="rounded-2xl bg-neutral-50 border border-neutral-100 p-7">
              <Stars rating={r.rating} />
              <blockquote className="mt-4 text-sm leading-relaxed text-neutral-700">
                “{r.quote}”
              </blockquote>
              <figcaption className="mt-5">
                <p className="text-sm font-semibold">{r.name}</p>
                <p className="text-xs text-neutral-500 mt-0.5">{r.detail}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
