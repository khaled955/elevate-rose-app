# 🌹 Elevate Rose App

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-Utility--First-38BDF8)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-Components-000000)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-v5-FF4154)
![next-intl](https://img.shields.io/badge/next--intl-i18n%20%7C%20RTL-8B5CF6)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)
![License](https://img.shields.io/badge/License-MIT-green)

A full-stack flower shop platform with a customer-facing storefront and a complete admin dashboard — built with **Next.js 14**, **TypeScript**, and **shadcn/ui**, with full **Arabic/English (RTL/LTR)** support.

---

## 🔗 Live Links

- 🌐 **Live Demo:** https://elevate-rose-app-two.vercel.app/en
- 👨‍💻 **Portfolio:** https://khaledmansour.vercel.app
- 💻 **GitHub Repository:** https://github.com/khaled955/elevate-rose-app

---

## 📌 Features

- 🌸 **Storefront** — Browse flowers by category or occasion, add to cart, and place orders
- 💳 **Dual Payment** — Cash on delivery or online payment at checkout
- 🗺️ **Map Integration** — Delivery address selection with react-leaflet
- 🔐 **Authentication** — Secure login & registration via NextAuth.js
- 🧑‍💼 **Admin Dashboard** — Full CRUD for products, categories, and occasions
- 📊 **Data Visualization** — Revenue and order status charts with Recharts
- 🌍 **i18n & RTL** — Full Arabic/English support via next-intl with RTL layout
- 🎨 **Maroon Design System** — Custom Tailwind color tokens (maroon/zinc)
- 📱 **Fully Responsive** — Mobile-first layout across all pages
- ⚡ **Optimistic UI** — TanStack Query with mutations, toasts, and cache invalidation
- 🧱 **Clean Architecture** — Server actions, route handlers, and reusable components

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript (strict) |
| **Styling** | Tailwind CSS + custom design tokens |
| **UI Components** | shadcn/ui + Radix UI |
| **Data Fetching** | TanStack Query v5 |
| **Forms & Validation** | React Hook Form + Zod |
| **Auth** | NextAuth.js v4 |
| **i18n** | next-intl (EN/AR, RTL support) |
| **Charts** | Recharts |
| **Maps** | react-leaflet |
| **Notifications** | Sonner |
| **Carousel** | Embla Carousel |
| **Deployment** | Vercel |

---

## 📂 Project Structure

```bash
├── app/
│   ├── [locale]/
│   │   ├── (auth)/               # Login, register, forget-password
│   │   ├── (dashboard)/          # Admin dashboard pages
│   │   │   └── dashboard/
│   │   │       ├── categories/
│   │   │       ├── occasions/
│   │   │       ├── products/
│   │   │       └── profile/
│   │   └── (main)/               # Customer-facing storefront
│   │       ├── (protected)/
│   │       │   └── checkout-flow/
│   │       └── ...               # Home, shop, product detail
│   └── api/                      # Route handlers
├── components/                   # Reusable UI components
│   ├── dashboard/
│   ├── shared/
│   └── ui/                       # shadcn/ui primitives
├── hooks/                        # Custom React hooks
├── lib/                          # Utilities & helpers
├── actions/                      # Server actions
├── services/                     # API service layer
├── types/                        # Global TypeScript types
├── messages/                     # i18n translation files (en/ar)
├── public/                       # Static assets
└── README.md
```

---

## 🌐 Internationalization

The app supports **English** and **Arabic** with full RTL layout switching. Language is controlled via the `[locale]` route segment using `next-intl`.

- `/en/...` → English (LTR)
- `/ar/...` → Arabic (RTL)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm 10+

### Installation

```bash
# Clone the repository
git clone https://github.com/khaled955/elevate-rose-app.git
cd elevate-rose-app

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local
```

### Environment Variables

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret
NEXT_PUBLIC_API_URL=https://your-backend-api.com
```

### Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000/en](http://localhost:3000/en) in your browser.

---

## 📸 Screenshots

> Dashboard, storefront, and checkout screenshots coming soon.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">Built with ❤️ by <a href="https://khaledmansour.vercel.app">Khaled</a></p>
