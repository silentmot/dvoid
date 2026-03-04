# Component Reference

**Agent Role**: DocOps
**Mode**: Factual
**Sources**: Verified against source files in `components/`, `lib/`, and `app/`.

---

## Hero

### `RealityCompilerHeroClient`

**File**: `components/hero/reality-compiler-hero.client.tsx`

Client wrapper that dynamically imports `RealityCompilerHero` with SSR disabled. Manages a loading state tied to a session-level flag (`hasLoadedOnce`) so the loader only runs on the first visit per session. Renders `CorrelationLoader` via `AnimatePresence` while the hero is loading, then fades it out once ready.

**Minimum loader display time**: 4200 ms.

**Props** (forwarded to `RealityCompilerHero`):

| Prop | Type | Default |
|------|------|---------|
| `title` | `string` | `"DvoiD"` |
| `subtitle` | `string` | `"Technical Operations Specialist"` |
| `tagline` | `string` | `"Compiling industrial systems into operational reality"` |
| `scrollIndicator` | `boolean` | `true` |

**Dependencies**: `framer-motion` (`AnimatePresence`, `motion`), `next/dynamic`, `CorrelationLoader`.

---

### `RealityCompilerHero`

**File**: `components/hero/reality-compiler-hero.tsx`

Renders `DottedGridDemo` with `hideControls` and `showScrollIndicator` set from props. Loaded lazily by `RealityCompilerHeroClient`.

**Props**:

| Prop | Type | Default |
|------|------|---------|
| `title` | `string` | `"DvoiD"` |
| `subtitle` | `string` | `"Technical Operations Specialist"` |
| `tagline` | `string` | `"Compiling industrial systems into operational reality"` |
| `scrollIndicator` | `boolean` | `true` |

**Dependencies**: `components/demo/dotted-grid-surface` (`DottedGridDemo`).

---

### `CorrelationLoader`

**File**: `components/hero/correlation-loader.tsx`

Loading animation that renders animated `SignalNode` elements scattered across the viewport, then correlates them toward a center target using `framer-motion`. Nodes transition through three phases: `scattered → correlating → correlated`. `ConnectionLine` SVG elements appear between correlated nodes.

**No props** (self-contained).

**Dependencies**: `framer-motion`.

---

### `StaticFallback`

**File**: `components/hero/static-fallback.tsx`

CSS-only background for devices that prefer reduced motion. Renders a radial gradient backdrop, an angular grid overlay (40 px grid), a diagonal cross-hatch pattern (80 px grid), and four diamond-shaped node indicators with a CSS `angular-glow` keyframe animation. The animation is suppressed by `@media (prefers-reduced-motion: reduce)`.

> **Note**: This component is defined but not imported anywhere in the current codebase.

**Props**:

| Prop | Type | Default |
|------|------|---------|
| `className` | `string` | `""` |

---

## Sections

### `PinnedSection`

**File**: `components/sections/pinned-section.tsx`

Wraps content in a `<section>` with `min-h-[200vh]` and pins the inner `<div>` to the viewport top using GSAP `ScrollTrigger`. Skips the scroll trigger when `prefers-reduced-motion` is set.

**Props**:

| Prop | Type | Required |
|------|------|----------|
| `id` | `string` | yes |
| `children` | `ReactNode` | yes |
| `className` | `string` | no |

**Dependencies**: `gsap`, `gsap/ScrollTrigger`.

---

### `SwmsOverview`

**File**: `components/sections/swms-overview.tsx`

Home-page section for the SWMS platform. Renders four capability cards (`CAPABILITIES` constant) with GSAP `fromTo` scroll-triggered fade-in animations. Includes a link to the SWMS case study and displays `TECH_STACK` tags.

**No props** (data is defined as module-level constants).

**Dependencies**: `gsap`, `gsap/ScrollTrigger`, `next/link`.

---

### `EcoopsOverview`

**File**: `components/sections/ecoops-overview.tsx`

Home-page section for the EcoOps dashboard. Renders six `DASHBOARD_MODULES` cards with GSAP scroll-triggered animations, a `next/image` hero image, eight feature tags from `FEATURES`, and a link to the EcoOps case study. Uses `components/ecoops/ecoops-logo` and `components/ecoops/module-architecture-diagram` on the case study detail page.

**No props** (data is defined as module-level constants).

**Dependencies**: `gsap`, `gsap/ScrollTrigger`, `next/image`, `next/link`.

---

## Layout

### `Navigation`

**File**: `components/layout/navigation.tsx`

Fixed-position header. Transitions from a transparent background to a blurred glass panel (`bg-background/80 backdrop-blur-md`) once the user scrolls past 50 px. Renders `NAV_ITEMS` for desktop and a mobile dropdown menu toggled by a hamburger button. Active route is highlighted using `usePathname`.

**No props**.

**Dependencies**: `motion/react` (`AnimatePresence`, `motion`), `next/link`, `next/navigation`.

---

### `Footer`

**File**: `components/layout/footer.tsx`

Renders social links (GitHub, LinkedIn, email) via a `SOCIAL_LINKS` constant as SVG icon links.

**No props**.

**Dependencies**: `next/link`.

---

### `SmoothScrollProvider`

**File**: `components/layout/smooth-scroll-provider.tsx`

Initializes Lenis smooth scroll on mount. Skips initialization when `prefers-reduced-motion` is set. Runs the Lenis RAF loop via `requestAnimationFrame`.

**Configuration**: `duration: 1.2`, `smoothWheel: true`, `touchMultiplier: 2`.

**Props**:

| Prop | Type | Required |
|------|------|----------|
| `children` | `ReactNode` | yes |

**Dependencies**: `lenis`.

---

## Content System

### `lib/mdx`

**File**: `lib/mdx/index.ts`

**Dependencies**: `fs`, `gray-matter`, `path`, `reading-time`.

#### Exported interfaces

```typescript
export interface CaseStudyMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  featured: boolean;
  image?: string;
  readingTime: string;
  client?: string;
  role?: string;
  duration?: string;
  stack?: string[];
}

export interface ProjectMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  featured: boolean;
  image?: string;
  url?: string;
  github?: string;
  stack?: string[];
}
```

#### Exported functions

| Function | Returns | Description |
|----------|---------|-------------|
| `getCaseStudies()` | `CaseStudyMeta[]` | Reads all `content/case-studies/*.mdx` files, parses frontmatter, calculates reading time, and returns sorted by date descending. |
| `getCaseStudy(slug)` | `{ meta: CaseStudyMeta; content: string } \| null` | Returns frontmatter and raw MDX body for a single slug, or `null` if the file does not exist. |
| `getProjects()` | `ProjectMeta[]` | Reads all `content/projects/*.mdx` files with the same parsing pipeline. |
| `getFeaturedProjects()` | `ProjectMeta[]` | Delegates to `getProjects()` and filters for `featured === true`. |

**Content directory**: `content/` (resolved from `process.cwd()`).

#### Frontmatter schema (case studies)

```yaml
title: string
description: string
date: string          # ISO date
tags: string[]
featured: boolean
image: string         # optional
client: string        # optional
role: string          # optional
duration: string      # optional
stack: string[]       # optional
```
