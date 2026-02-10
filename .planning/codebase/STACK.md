# Technology Stack

**Analysis Date:** 2026-02-10

## Languages

**Primary:**
- TypeScript 5 - Main application code in `app/` and `components/`
- JavaScript 2017 - Target compiler option in `tsconfig.json`

**Secondary:**
- MDX 3.1 - Content files in `content/` directory

## Runtime

**Environment:**
- Node.js (via Next.js 16.1.6)
- React 19.2.4 (Client and Server)
- Bun 1.0+ (Package manager and runtime)

**Package Manager:**
- Bun 1.0+ - Primary package manager
- Lockfile: `bun.lock` (text version for git compatibility)

## Frameworks

**Core:**
- Next.js 16.1.6 - Full-stack React framework with App Router
- React 19.2.4 - UI library with new concurrent features

**UI/Animation:**
- Framer Motion 12.34.0 - Production-ready motion library
- GSAP 3.14.2 - Advanced animation library
- @react-three/fiber 9.5.0 - React renderer for Three.js
- Three.js 0.182.0 - 3D graphics library

**Content Management:**
- MDX 3.1 - Markdown with JSX components
- Gray-matter 4.0.3 - Frontmatter parsing

**Styling:**
- Tailwind CSS 4 - Utility-first CSS framework
- @base-ui/react 1.1.0 - Base UI components
- class-variance-authority 0.7.1 - Utility for creating variant-based CSS classes

**Development Tools:**
- Biome 0.3.3 - Linting and formatting (replaces ESLint + Prettier)
- TypeScript 5 - Static type checking
- PostCSS 4 - CSS processing

## Key Dependencies

**Critical:**
- React 19.2.4 - Core UI library
- Next.js 16.1.6 - Framework and server capabilities
- MDX 3.1 - Content authoring

**Infrastructure:**
- Tailwind CSS 4 - Styling system
- Framer Motion 12.34.0 - Animations
- Three.js 0.182.0 - 3D graphics

**Development:**
- Biome 0.3.3 - Code formatting and linting
- TypeScript 5 - Type safety
- PostCSS 4 - CSS post-processing

## Configuration

**Environment:**
- Requires Bun runtime
- Environment variables: `NEXT_PUBLIC_SITE_URL` for canonical URL
- Optional: `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` for analytics

**Build:**
- Config files: `next.config.ts`, `tsconfig.json`, `biome.json`, `postcss.config.mjs`
- MDX support with experimental mdxRs
- Image optimization with remote patterns

**Package Management:**
- Bun configured with hoisted linking for Next.js compatibility
- Text lockfile enabled for git safety

## Platform Requirements

**Development:**
- Bun 1.0+ runtime
- Node.js compatibility layer

**Production:**
- Node.js environment (Next.js requirements)
- Supports static export or server deployment

---

*Stack analysis: 2026-02-10*