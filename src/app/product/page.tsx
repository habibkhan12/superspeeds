import { redirect } from "next/navigation";

export const instant = false;

export default function ProductIndexPage() {
  redirect("/product/gt3rs-racing-green");
}
