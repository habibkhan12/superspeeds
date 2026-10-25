# Superspeeds — Premium RC Cars

A premium ecommerce storefront for **Superspeeds**, featuring officially licensed
RC Porsche 911 GT3 RS cars. Built with **Next.js 16 (App Router), React 19 and
Tailwind CSS v4**.

## Features

- **Home page** — hero, spec marquee, categories, featured grid, editorial band,
  reviews and newsletter footer.
- **Product pages** — `/product/gt3rs-racing-green`, `.../gt3rs-racing-yellow`,
  `.../gt3rs-riviera-blue`, `.../gt3rs-jet-black` (color variants switch the
  gallery; scale picker 1:12–1:36).
- **Shop** — `/shop` with color filters and price sorting.
- **Cart** — `/cart` with quantity steppers, remove and free-shipping threshold
  ($30); persisted in `localStorage`.
- **Checkout** — `/checkout` demo flow with order confirmation (no payment
  processing).

## Getting started

```bash
npm install
npm run dev       # http://localhost:3000
```

## Notes

- Product photos are placeholder images in `public/images/` — swap them for
  real photography at the same paths.
- Cart state lives client-side (`src/components/CartContext.tsx`).
