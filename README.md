# BlueStars Admissions Consulting

A modern, production-grade Next.js web application for **BlueStars Admissions Consulting**, faithfully converted from the original design specification.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/) (strict v3 configuration)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: Plus Jakarta Sans & Inter via `next/font/google`
- **Images**: Next.js Image Optimization (`next/image`)

## Project Structure

```
├── public/
│   ├── images/
│   ├── icons/
│   └── fonts/
├── src/
│   ├── app/
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── dashboard/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── error.tsx
│   │   ├── globals.css
│   │   ├── icon.svg
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Footer.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── sections/
│   │   │   ├── Contact.tsx
│   │   │   ├── CTA.tsx
│   │   │   ├── FAQ.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Process.tsx
│   │   │   ├── Resources.tsx
│   │   │   ├── Services.tsx
│   │   │   └── Testimonials.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Icons.tsx
│   │       └── Input.tsx
│   ├── hooks/
│   │   └── useExample.ts
│   ├── lib/
│   │   ├── constants.ts
│   │   └── utils.ts
│   ├── services/
│   │   └── api.ts
│   └── types/
│       └── index.ts
├── .env.local
├── .gitignore
├── AGENTS.md
├── CLAUDE.md
├── next.config.ts
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## Getting Started

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Production Build

```bash
npm run build
npm run start
```

## Features

- **Pixel-Accurate Fidelity**: Exact reproduction of typography, color palette, responsive breakpoints, masks, shadows, and content from the provided design.
- **Responsive Layout**: Designed mobile-first, adapting seamlessly across mobile, tablet, laptop, and ultra-wide desktop screens.
- **Server Components**: Maximal performance with Server Components as default, employing Client Components exclusively for interactive elements (navigation drawers, accordions, form handling).
- **SEO & Accessibility**: Complete OpenGraph metadata, semantic HTML structure, and keyboard-accessible accordion elements.

