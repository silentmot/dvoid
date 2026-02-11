# DvoiD

**Technical Operations Specialist** -- [d-void.com](https://d-void.com)

Portfolio website showcasing technical operations expertise with productized case studies. Primary focus on industrial IoT systems, specifically the Smart Waste Management System (SWMS) and EcoOps Operational Dashboard.

---

## Tech Stack

| Layer | Technology | Purpose |
| --- | --- | --- |
| Framework | [Next.js 16](https://nextjs.org) (App Router) | Routing, SSR/SSG, MDX support |
| Runtime | [Bun](https://bun.sh) | Package management, script execution |
| Language | [TypeScript](https://www.typescriptlang.org) (strict mode) | Type safety across the codebase |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) | Utility-first styling |
| Components | [shadcn/ui](https://ui.shadcn.com) (base-mira style) | Accessible UI primitives |
| 3D | [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) + [drei](https://github.com/pmndrs/drei) | Interactive hero section |
| Animation | [Motion (Framer Motion)](https://motion.dev) / [GSAP](https://gsap.com) | Component & scroll-driven animations |
| Scroll | [Lenis](https://github.com/darkroomengineering/lenis) | Smooth scrolling |
| Content | [MDX](https://mdxjs.com) with gray-matter frontmatter | Projects and case studies |
| Icons | [Hugeicons](https://hugeicons.com) | Icon library |
| Linting | [Biome](https://biomejs.dev) | Linting and formatting (single tool) |

## Project Structure

```
dvoid/
├── app/
│   ├── (routes)/              # Route group
│   │   ├── about/             # About page
│   │   ├── case-studies/      # Case studies listing + [slug] detail
│   │   ├── contact/           # Contact page
│   │   ├── projects/          # Projects listing
│   │   └── uses/              # Tools and setup
│   ├── layout.tsx             # Root layout (fonts, metadata, providers)
│   ├── page.tsx               # Home (hero, SWMS overview, EcoOps overview, skills, CTA)
│   └── globals.css            # Global styles and CSS variables
├── components/
│   ├── hero/                  # Reality Compiler 3D hero section
│   ├── layout/                # Navigation, footer, smooth scroll provider
│   ├── sections/              # Pinned story sections (SWMS, EcoOps)
│   └── ui/                    # shadcn/ui primitives
├── content/
│   └── case-studies/          # MDX case study files (SWMS, EcoOps)
├── lib/
│   ├── mdx/                   # MDX content loading utilities
│   └── utils.ts               # cn() class name utility
├── public/                    # Static assets
├── biome.json                 # Biome linting and formatting config
├── next.config.ts             # Next.js + MDX configuration
├── postcss.config.mjs         # PostCSS with Tailwind plugin
└── tsconfig.json              # TypeScript configuration
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) (latest)
- [Node.js](https://nodejs.org) >= 18

### Install Dependencies

```bash
bun install
```

### Run the Dev Server

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site. The dev server uses [Turbopack](https://turbo.build/pack) for fast refresh.

## Scripts

| Command | Description |
| --- | --- |
| `bun run dev` | Start the dev server with Turbopack |
| `bun run build` | Production build with Turbopack |
| `bun run start` | Start the production server |
| `bun run lint` | Run Biome linter and formatter (`biome check --write`) |
| `bun run check` | TypeScript type checking (`tsgo --noEmit`) |
| `bun run commit` | Interactive commit with committier |
| `bun run commit:ai` | AI-assisted commit with committier |

## Key Features

### Reality Compiler Hero

Interactive 3D scene (React Three Fiber) where the cursor acts as a flashlight, revealing rendered geometry from a wireframe state. Includes a static CSS-only fallback for mobile, reduced-motion preferences, and SSR.

Source: `components/hero/reality-compiler-hero.client.tsx`, `components/hero/reality-compiler-hero.tsx`

### Pinned Story Sections

Apple-style scroll-triggered story panels powered by GSAP ScrollTrigger. Two sections showcase the SWMS Platform workflow stages and the EcoOps Dashboard features.

Source: `components/sections/swms-overview.tsx`, `components/sections/ecoops-overview.tsx`, `components/sections/pinned-section.tsx`

### MDX Content System

Case studies and projects are authored as MDX files with frontmatter metadata (title, description, date, tags, stack, etc.). The content loader in `lib/mdx/index.ts` parses frontmatter with `gray-matter` and computes reading time.

Source: `content/case-studies/*.mdx`, `lib/mdx/index.ts`

## Design System

- **Theme**: Dark-only, Apple-minimal aesthetic
- **Accent palette**: Teal spectrum (`#14b8a6` primary)
- **Glass surfaces**: `backdrop-filter: blur(12px)` with subtle borders
- **Fonts**: [Geist](https://vercel.com/font) (sans) and Geist Mono, loaded via `next/font`
- **Typography**: Sans for headings/body, Mono for labels/code

Full design token definitions are in `app/globals.css` and documented in `d-void-portfolio-handoff.md`.

## Content

### Case Studies

| Title | Description |
| --- | --- |
| SWMS Platform | Smart Waste Management System -- 4-stage workflow orchestration for C&D recycling facilities |
| EcoOps Dashboard | Operational command center providing real-time visibility into recycling facility operations |

Case study MDX files live in `content/case-studies/` with frontmatter fields: `title`, `description`, `date`, `tags`, `featured`, `client`, `role`, `duration`, `stack`.

## Deployment

Deployed on [Vercel](https://vercel.com).

| Setting | Value |
| --- | --- |
| Framework | Next.js |
| Build Command | `bun run build` |
| Install Command | `bun install` |
| Output Directory | `.next` |

### Environment Variables

| Variable | Purpose | Required |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL | Yes |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Analytics domain | No |
| `FORMSPREE_ENDPOINT` | Contact form processing | Yes |

## Accessibility

- WCAG 2.1 AA target compliance
- `prefers-reduced-motion` respected: 3D hero replaced with static CSS fallback, scroll animations disabled
- Keyboard-navigable with visible focus indicators
- Semantic HTML with ARIA labels where needed

## License

Private repository. All rights reserved.
