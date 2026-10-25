import type { Metadata } from "next";
import { Geist, Geist_Mono, Yellowtail } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const yellowtail = Yellowtail({
  variable: "--font-yellowtail",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Superspeeds — Premium RC Cars",
  description:
    "Officially licensed RC Porsche 911 GT3 RS and more. Premium radio-controlled cars in every scale, from 1:36 to 1:12.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${yellowtail.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <main className="flex-1 w-full max-w-[1240px] mx-auto px-3 sm:px-5 pb-5">
            <div className="bg-white rounded-[28px] overflow-hidden min-h-full flex flex-col">
              <Header />
              <div className="flex-1">{children}</div>
              <Footer />
            </div>
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
