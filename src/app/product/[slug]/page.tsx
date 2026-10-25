import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS, getProduct } from "@/lib/products";
import ProductView from "@/components/ProductView";

// All slugs are statically prerendered; block navigation so the correct
// product renders rather than an instant shell.
export const instant = false;

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Not found | Superspeeds" };
  return {
    title: `${product.name} — ${product.color} | Superspeeds`,
    description: `Officially licensed Porsche 911 GT3 RS radio-controlled car in ${product.color}. 2.4 GHz control, 45 km/h, free delivery on orders over $30.`,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  return <ProductView product={product} />;
}
