export type ColorKey = "green" | "yellow" | "blue" | "black";

export const COLOR_OPTIONS: { key: ColorKey; name: string; image: string }[] = [
  { key: "green", name: "Racing Green", image: "/images/gt3rs-green.png" },
  { key: "yellow", name: "Racing Yellow", image: "/images/gt3rs-yellow.png" },
  { key: "blue", name: "Riviera Blue", image: "/images/gt3rs-blue.png" },
  { key: "black", name: "Jet Black", image: "/images/gt3rs-black.png" },
];

export type Product = {
  slug: string;
  name: string;
  colorKey: ColorKey;
  color: string;
  price: number;
  oldPrice?: number;
  tag?: string;
  rating: number;
  reviews: number;
};

export const PRODUCTS: Product[] = [
  {
    slug: "gt3rs-racing-green",
    name: "Porsche 911 GT3 RS RC 1:18",
    colorKey: "green",
    color: "Racing Green",
    price: 139,
    tag: "Bestseller",
    rating: 4,
    reviews: 42,
  },
  {
    slug: "gt3rs-racing-yellow",
    name: "Porsche 911 GT3 RS RC 1:18",
    colorKey: "yellow",
    color: "Racing Yellow",
    price: 139,
    rating: 5,
    reviews: 28,
  },
  {
    slug: "gt3rs-riviera-blue",
    name: "Porsche 911 GT3 RS RC 1:18",
    colorKey: "blue",
    color: "Riviera Blue",
    price: 139,
    tag: "New",
    rating: 4,
    reviews: 17,
  },
  {
    slug: "gt3rs-jet-black",
    name: "Porsche 911 GT3 RS RC 1:18",
    colorKey: "black",
    color: "Jet Black",
    price: 149,
    oldPrice: 169,
    tag: "Sale",
    rating: 4,
    reviews: 35,
  },
];

export const SCALES = [
  "1:12",
  "1:14",
  "1:16",
  "1:18",
  "1:20",
  "1:24",
  "1:28",
  "1:32",
  "1:36",
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function imageForColor(key: ColorKey): string {
  return COLOR_OPTIONS.find((c) => c.key === key)!.image;
}

export function galleryFor(p: Product): string[] {
  const rest = COLOR_OPTIONS.filter((c) => c.key !== p.colorKey).map((c) => c.image);
  return [imageForColor(p.colorKey), ...rest];
}

export const FREE_SHIPPING_THRESHOLD = 30;
export const SHIPPING_FLAT = 4.9;
