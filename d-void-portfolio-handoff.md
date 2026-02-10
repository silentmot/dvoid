# D-VOID Developer Portfolio - Technical Handoff

**Domain:** d-void.com  
**Owner:** DvoiD - Technical Operations Specialist  
**Date:** 2026-02-10  
**Status:** Specification Complete - Ready for Implementation

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Technology Stack](#2-technology-stack)
3. [Design System](#3-design-system)
4. [Site Architecture](#4-site-architecture)
5. [Component Specifications](#5-component-specifications)
6. [Content Requirements](#6-content-requirements)
7. [Performance Requirements](#7-performance-requirements)
8. [Accessibility Requirements](#8-accessibility-requirements)
9. [Deployment Configuration](#9-deployment-configuration)
10. [Implementation Checklist](#10-implementation-checklist)

---

## 1. Executive Summary

### Purpose

Portfolio website showcasing technical operations expertise with productized case studies. Primary focus on industrial IoT systems, specifically the Smart Waste Management System (SWMS) and EcoOps Operational Dashboard.

### Target Audience

- Potential employers/clients in industrial automation
- Technical decision-makers in waste management sector
- Fellow backend developers seeking collaboration

### Design Philosophy

Apple-minimal aesthetic with premium feel. Dark theme only. Soft glass surfaces. Teal accent palette. Motion is purposeful and restrained.

### Key Differentiator

"Reality Compiler" hero section - an interactive 3D experience where the user's cursor acts as a flashlight, transforming raw wireframe geometry into polished rendered surfaces. Metaphor: turning abstract code into tangible operational systems.

---

## 2. Technology Stack

### Core Framework

| Layer | Technology | Version | Rationale |
|-------|------------|---------|-----------|
| Framework | Next.js (App Router) | 15.x | Existing expertise, MDX support, ISR, R3F compatibility |
| Runtime | Bun | Latest | Performance, native TypeScript |
| Language | TypeScript | 5.x | Strict mode enabled |
| Styling | Tailwind CSS | 4.x | Utility-first, consistent with existing stack |
| Components | shadcn/ui | Latest | Accessible primitives, Tailwind integration |

### Animation Layer

| Purpose | Library | Notes |
|---------|---------|-------|
| Component animations | Motion (framer-motion) | Enter/exit, layout animations |
| Scroll effects | GSAP ScrollTrigger | Pinned sections, scroll-driven transforms |
| Smooth scroll | Lenis | Global scroll smoothing |
| 3D rendering | React Three Fiber + drei | Hero section only |

### Content Management

| Type | Approach |
|------|----------|
| Projects | MDX files with frontmatter |
| Case Studies | MDX files with component embedding |
| Static pages | TSX components |

### External Services

| Service | Purpose | Provider |
|---------|---------|----------|
| Analytics | Privacy-friendly tracking | Plausible or Umami |
| Forms | Contact form processing | Formspree |
| Deployment | Hosting + CI/CD | Vercel |

### Development Tools

| Tool | Purpose |
|------|---------|
| Biome | Linting + formatting (single tool, faster than ESLint+Prettier) |
| TypeScript | Strict mode, no implicit any |
| Vitest | Unit testing |
| Playwright | E2E testing |

---

## 3. Design System

### Color Palette

```css
:root {
  /* Background */
  --bg-primary: #000000;
  --bg-secondary: #0a0a0a;
  --bg-tertiary: #111111;
  --bg-elevated: #1a1a1a;
  
  /* Glass surfaces */
  --glass-bg: rgba(255, 255, 255, 0.03);
  --glass-border: rgba(255, 255, 255, 0.08);
  --glass-hover: rgba(255, 255, 255, 0.06);
  
  /* Teal accent spectrum */
  --accent-50: #f0fdfa;
  --accent-100: #ccfbf1;
  --accent-200: #99f6e4;
  --accent-300: #5eead4;
  --accent-400: #2dd4bf;
  --accent-500: #14b8a6;  /* Primary accent */
  --accent-600: #0d9488;
  --accent-700: #0f766e;
  --accent-800: #115e59;
  --accent-900: #134e4a;
  --accent-950: #0d4f4f;  /* Deep teal for gradients */
  
  /* Text */
  --text-primary: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --text-tertiary: rgba(255, 255, 255, 0.5);
  --text-muted: rgba(255, 255, 255, 0.3);
  
  /* Shader colors (3D hero) */
  --shader-wireframe: rgb(0, 217, 166);  /* Matrix green-teal */
  --shader-rendered-a: #0d4f4f;
  --shader-rendered-b: #14b8a6;
  --shader-ring: rgba(255, 255, 255, 0.9);
  
  /* Semantic */
  --success: #22c55e;
  --warning: #eab308;
  --error: #ef4444;
}
```

### Typography

```css
:root {
  /* Font families */
  --font-sans: 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'Geist Mono', 'JetBrains Mono', 'Fira Code', monospace;
  
  /* Font sizes (rem) */
  --text-xs: 0.75rem;     /* 12px */
  --text-sm: 0.875rem;    /* 14px */
  --text-base: 1rem;      /* 16px */
  --text-lg: 1.125rem;    /* 18px */
  --text-xl: 1.25rem;     /* 20px */
  --text-2xl: 1.5rem;     /* 24px */
  --text-3xl: 1.875rem;   /* 30px */
  --text-4xl: 2.25rem;    /* 36px */
  --text-5xl: 3rem;       /* 48px */
  --text-6xl: 3.75rem;    /* 60px */
  --text-7xl: 4.5rem;     /* 72px */
  --text-8xl: 6rem;       /* 96px */
  --text-9xl: 8rem;       /* 128px */
  
  /* Line heights */
  --leading-none: 1;
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  
  /* Letter spacing */
  --tracking-tighter: -0.05em;
  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
  --tracking-widest: 0.1em;
}
```

### Typography Usage

| Element | Font | Size | Weight | Tracking | Case |
|---------|------|------|--------|----------|------|
| Hero title | Sans | 8xl-9xl | 900 (Black) | tighter | Normal |
| Section headings | Sans | 4xl-5xl | 700 | tight | Normal |
| Subsection headings | Sans | 2xl-3xl | 600 | normal | Normal |
| Body text | Sans | base-lg | 400 | normal | Normal |
| Labels/captions | Mono | xs-sm | 400 | widest | Uppercase |
| Code/tech terms | Mono | sm-base | 400 | normal | Normal |
| Navigation | Sans | sm | 500 | wide | Normal |

### Spacing Scale

```
4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px, 128px, 192px
```

Standard Tailwind scale: `1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48`

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 4px | Small buttons, tags |
| `--radius-md` | 8px | Cards, inputs |
| `--radius-lg` | 12px | Modals, large cards |
| `--radius-xl` | 16px | Hero elements |
| `--radius-full` | 9999px | Pills, avatars |

### Glass Effect

```css
.glass-surface {
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
}

.glass-surface:hover {
  background: var(--glass-hover);
}
```

### Shadow System

```css
:root {
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.5);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.3);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.25);
  --shadow-glow: 0 0 30px rgba(20, 184, 166, 0.15);
}
```

---

## 4. Site Architecture

### Page Structure

```
/                     # Home (Hero + Featured + Tech Stack + Timeline)
/about                # About (Bio + Philosophy + Background)
/projects             # Projects listing (Grid/List view)
/projects/[slug]      # Individual project page
/case-studies         # Case studies listing
/case-studies/[slug]  # Individual case study (SWMS, EcoOps)
/uses                 # Tools, software, hardware setup
/contact              # Contact form
```

### File Structure

```
apps/web/
├── app/
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Home page
│   ├── about/
│   │   └── page.tsx
│   ├── projects/
│   │   ├── page.tsx            # Projects listing
│   │   └── [slug]/
│   │       └── page.tsx        # Dynamic project page
│   ├── case-studies/
│   │   ├── page.tsx            # Case studies listing
│   │   └── [slug]/
│   │       └── page.tsx        # Dynamic case study page
│   ├── uses/
│   │   └── page.tsx
│   └── contact/
│       └── page.tsx
├── src/
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── layout/
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── navigation.tsx
│   │   │   └── scroll-provider.tsx
│   │   ├── hero/
│   │   │   ├── reality-compiler-hero.tsx
│   │   │   └── static-fallback.tsx
│   │   ├── sections/
│   │   │   ├── featured-project.tsx
│   │   │   ├── tech-stack.tsx
│   │   │   ├── timeline.tsx
│   │   │   ├── pinned-story.tsx
│   │   │   └── stats.tsx
│   │   ├── projects/
│   │   │   ├── project-card.tsx
│   │   │   └── project-grid.tsx
│   │   └── case-study/
│   │       ├── case-study-header.tsx
│   │       ├── problem-section.tsx
│   │       ├── architecture-section.tsx
│   │       └── results-section.tsx
│   ├── lib/
│   │   ├── utils.ts
│   │   ├── cn.ts               # Class name utility
│   │   └── constants.ts
│   ├── hooks/
│   │   ├── use-media-query.ts
│   │   ├── use-reduced-motion.ts
│   │   └── use-scroll-position.ts
│   └── styles/
│       └── globals.css
├── content/
│   ├── projects/
│   │   ├── swms.mdx
│   │   ├── ecoops.mdx
│   │   └── ...
│   └── case-studies/
│       ├── swms-platform.mdx
│       └── ecoops-dashboard.mdx
└── public/
    ├── fonts/
    ├── images/
    │   ├── projects/
    │   └── case-studies/
    └── og/                     # OpenGraph images
```

### Routing Strategy

| Route | Rendering | Revalidation |
|-------|-----------|--------------|
| `/` | Static | On deploy |
| `/about` | Static | On deploy |
| `/projects` | Static | On deploy |
| `/projects/[slug]` | Static (generateStaticParams) | On deploy |
| `/case-studies` | Static | On deploy |
| `/case-studies/[slug]` | Static (generateStaticParams) | On deploy |
| `/uses` | Static | On deploy |
| `/contact` | Static | On deploy |

---

## 5. Component Specifications

### 5.1 Reality Compiler Hero

**File:** `src/components/hero/reality-compiler-hero.tsx`

#### Concept

Interactive 3D scene where the user's cursor acts as a "flashlight", revealing polished rendered geometry from a raw wireframe state. Metaphor for transforming code into operational systems.

#### Props Interface

```typescript
interface RealityCompilerHeroProps {
  title?: string;              // Default: "D-VOID"
  subtitle?: string;           // Default: "Technical Operations Specialist"
  tagline?: string;            // Default: "Compiling industrial systems..."
  scrollIndicator?: boolean;   // Default: true
}
```

#### Behavior Matrix

| Condition | 3D Canvas | Fallback | Animations |
|-----------|-----------|----------|------------|
| Desktop + Motion OK | Active | Hidden | Full |
| Desktop + Reduced Motion | Hidden | Visible | Disabled |
| Mobile (< 768px) | Hidden | Visible | Reduced |
| Touch device | Hidden | Visible | Reduced |
| SSR | Hidden | Visible | N/A |

#### Shader Uniforms

| Uniform | Type | Description |
|---------|------|-------------|
| `uTime` | float | Elapsed time for animation |
| `uMouse` | vec2 | Normalized mouse position (0-1) |
| `uResolution` | vec2 | Viewport dimensions |
| `uColorA` | vec3 | Deep teal (#0d4f4f) |
| `uColorB` | vec3 | Teal-400 (#14b8a6) |
| `uRevealRadius` | float | Flashlight radius (default: 0.25) |

#### Geometry Configuration

| Object | Geometry | Position | Rotation Speed |
|--------|----------|----------|----------------|
| Centerpiece | TorusKnot(1, 0.35, 100, 24) | [0, 0, 0] | 1.0x |
| Satellite 1 | Icosahedron(1.2, 1) | [-3.5, 2.5, -2] | 0.7x |
| Satellite 2 | Octahedron(1.0, 0) | [4, -1.5, -3] | 0.5x |
| Satellite 3 | Dodecahedron(0.9, 0) | [-2.5, -2.5, -1.5] | 0.4x |
| Satellite 4 | Icosahedron(1.2, 1) | [3, 2.5, -4] | 0.3x |

#### Static Fallback

CSS-only fallback with:
- Radial gradient simulating depth
- Grid overlay with teal lines at 40px spacing
- No JavaScript required

#### Dependencies

```json
{
  "three": "^0.170.0",
  "@react-three/fiber": "^8.17.0",
  "@react-three/drei": "^9.117.0"
}
```

---

### 5.2 Pinned Story Sections

**Purpose:** Apple-style scroll-triggered story panels for SWMS Platform and EcoOps Dashboard overviews.

**Count:** 2 sections

#### Section 1: SWMS Platform Overview

```typescript
interface SWMSStorySection {
  id: "swms-platform";
  headline: "Smart Waste Management System";
  subheadline: "4-Stage Workflow Orchestration";
  stages: [
    {
      number: 1;
      title: "Vehicle Entry";
      description: "Automated gate control, RFID identification, initial weighing";
      devices: ["ZKTeco barriers", "Mettler Toledo scales", "Hikvision LPR"];
    },
    {
      number: 2;
      title: "Material Classification";
      description: "Waste type identification, routing decision, operator assignment";
      devices: ["Classification terminals", "Material scanners"];
    },
    {
      number: 3;
      title: "Processing";
      description: "Sorting, crushing, recycling operations tracking";
      devices: ["PLC integrations", "Conveyor sensors"];
    },
    {
      number: 4;
      title: "Vehicle Exit";
      description: "Final weighing, ticket generation, payment processing";
      devices: ["Exit scales", "Receipt printers", "Payment terminals"];
    }
  ];
  stats: {
    yearsInDevelopment: 4;
    vendorsIntegrated: 3;
    facilitiesDeployed: number; // Fill with actual data
  };
}
```

#### Section 2: EcoOps Dashboard Overview

```typescript
interface EcoOpsStorySection {
  id: "ecoops-dashboard";
  headline: "EcoOps Operational Dashboard";
  subheadline: "Real-time Facility Intelligence";
  features: [
    {
      title: "Live Monitoring";
      description: "Real-time device status, throughput metrics, anomaly detection";
    },
    {
      title: "Workflow Visualization";
      description: "Vehicle journey tracking, stage completion rates, bottleneck identification";
    },
    {
      title: "Reporting Engine";
      description: "Daily/weekly/monthly reports, regulatory compliance, export capabilities";
    },
    {
      title: "Alert System";
      description: "Threshold-based notifications, escalation chains, maintenance scheduling";
    }
  ];
  techStack: ["Next.js", "Hono RPC", "Prisma", "PostgreSQL", "Redis"];
}
```

#### Animation Behavior

| Scroll Position | Visual State |
|-----------------|--------------|
| Before section | Hidden below viewport |
| Enter trigger (top of section) | Pin begins, fade in |
| 0-25% through | Stage 1 / Feature 1 visible |
| 25-50% through | Stage 2 / Feature 2 visible |
| 50-75% through | Stage 3 / Feature 3 visible |
| 75-100% through | Stage 4 / Feature 4 visible |
| Exit trigger | Unpin, scroll continues |

#### GSAP Configuration

```typescript
const pinnedSectionConfig = {
  trigger: ".pinned-section",
  start: "top top",
  end: "+=300%", // 3x viewport height of scroll distance
  pin: true,
  scrub: 1,
  anticipatePin: 1,
};
```

---

### 5.3 Navigation

**Behavior:**
- Fixed position, top of viewport
- Glass effect background
- Visible on scroll up, hidden on scroll down
- Mobile: hamburger menu with slide-in drawer

**Links:**

| Label | Route | Active Detection |
|-------|-------|------------------|
| Home | `/` | Exact match |
| About | `/about` | Starts with |
| Projects | `/projects` | Starts with |
| Case Studies | `/case-studies` | Starts with |
| Uses | `/uses` | Starts with |
| Contact | `/contact` | Starts with |

---

### 5.4 Project Card

```typescript
interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  href: string;
  featured?: boolean;
}
```

**Layout:**
- Aspect ratio: 16:9
- Glass surface on hover
- Tags rendered as pills with mono font
- Subtle scale transform on hover (1.02x)

---

### 5.5 Case Study Template

**Sections (in order):**

1. **Header**
   - Title
   - Subtitle/tagline
   - Duration badge
   - Role badge
   - Hero image

2. **Overview**
   - 2-3 paragraph summary
   - Key metrics sidebar

3. **Problem**
   - Context
   - Challenges list
   - Constraints

4. **Scope**
   - Requirements
   - Stakeholders
   - Timeline

5. **Architecture**
   - System diagram (static image or interactive)
   - Technology decisions
   - Integration points

6. **Implementation**
   - Key decisions
   - Code samples (syntax highlighted)
   - Screenshots

7. **Results**
   - Metrics
   - Before/after comparison
   - Lessons learned

8. **Footer**
   - Next/previous case study links
   - Related projects

---

## 6. Content Requirements

### 6.1 Homepage Sections

| Section | Content Needed | Priority |
|---------|----------------|----------|
| Hero | Title, subtitle, tagline | Required |
| Featured Project | SWMS summary, image, link | Required |
| Tech Stack | Icon + name for each technology | Required |
| Timeline | Key career milestones (selective) | Optional |
| Stats | Quantifiable achievements | Optional |

### 6.2 About Page

| Section | Content Needed |
|---------|----------------|
| Bio | 2-3 paragraphs about background and expertise |
| Philosophy | Development principles, DDD approach |
| Current focus | SWMS, EcoOps, industrial IoT |
| Photo | Professional headshot (optional) |

### 6.3 Projects (MDX Frontmatter)

```yaml
---
title: "Project Name"
description: "One-line description"
date: "2024-01-15"
tags: ["NestJS", "PostgreSQL", "Redis"]
image: "/images/projects/project-name.jpg"
featured: true
status: "production" | "development" | "archived"
links:
  live: "https://..."
  github: "https://..."
---
```

### 6.4 Case Studies (MDX Frontmatter)

```yaml
---
title: "SWMS Platform"
subtitle: "Smart Waste Management System"
description: "4-stage workflow orchestration for C&D waste recycling"
date: "2024-01-15"
duration: "4 years"
role: "Technical Operations Specialist"
client: "Internal"
industry: "Waste Management"
tags: ["NestJS", "Next.js", "PostgreSQL", "Prisma", "Redis", "ZKTeco", "Hikvision", "Mettler Toledo"]
image: "/images/case-studies/swms-hero.jpg"
metrics:
  - label: "Vendors Integrated"
    value: "3"
  - label: "Workflow Stages"
    value: "4"
  - label: "Years in Development"
    value: "4"
---
```

### 6.5 Uses Page Structure

| Category | Items Needed |
|----------|--------------|
| Editor & Terminal | VS Code, Windows Terminal, PowerShell |
| Development | Node.js, Bun, Docker, Git |
| Database | PostgreSQL, Redis, Prisma |
| Design | Figma (if applicable) |
| Hardware | Workstation specs (optional) |

---

## 7. Performance Requirements

### Budgets

| Metric | Budget | Measurement |
|--------|--------|-------------|
| First Contentful Paint | < 1.2s | Lighthouse |
| Largest Contentful Paint | < 2.5s | Lighthouse |
| Total Blocking Time | < 200ms | Lighthouse |
| Cumulative Layout Shift | < 0.1 | Lighthouse |
| JS Bundle (non-3D pages) | < 200KB gzipped | Build output |
| JS Bundle (hero page) | < 400KB gzipped | Build output |
| Hero 3D frame rate | > 30fps | Chrome DevTools |

### Optimization Strategies

| Strategy | Implementation |
|----------|----------------|
| Code splitting | Dynamic imports for 3D, per-route chunks |
| Image optimization | Next.js Image component, WebP/AVIF |
| Font optimization | `next/font` with subset, swap display |
| 3D performance | DPR cap at 1.5, reduced geometry, no post-processing |
| Caching | Static assets: 1 year, HTML: no-cache |

### 3D-Specific Optimizations

| Optimization | Value |
|--------------|-------|
| Device Pixel Ratio | `dpr={[1, 1.5]}` |
| Antialias | `true` |
| Power Preference | `"high-performance"` |
| Stars count | 3000 (not 5000) |
| TorusKnot segments | 100x24 (not 128x32) |
| Float animation intensity | 0.5-0.8 (reduced) |

---

## 8. Accessibility Requirements

### WCAG 2.1 AA Compliance

| Requirement | Implementation |
|-------------|----------------|
| Color contrast | 4.5:1 minimum for text |
| Focus indicators | Visible focus ring on all interactive elements |
| Keyboard navigation | Full site navigable via keyboard |
| Screen reader | Semantic HTML, ARIA labels where needed |
| Reduced motion | `prefers-reduced-motion` respected globally |
| Skip links | "Skip to content" link at top of page |

### Reduced Motion Behavior

| Component | Full Motion | Reduced Motion |
|-----------|-------------|----------------|
| Hero 3D | Active with animations | Static CSS fallback |
| Page transitions | Crossfade | Instant |
| Scroll animations | GSAP-driven | Instant state |
| Hover effects | Scale/opacity | Opacity only |
| Loading states | Pulse/spin | Static indicator |

### Focus Management

```css
:focus-visible {
  outline: 2px solid var(--accent-500);
  outline-offset: 2px;
}

/* Remove default focus for mouse users */
:focus:not(:focus-visible) {
  outline: none;
}
```

---

## 9. Deployment Configuration

### Vercel Settings

```json
{
  "framework": "nextjs",
  "buildCommand": "bun run build",
  "installCommand": "bun install",
  "outputDirectory": ".next"
}
```

### Environment Variables

| Variable | Purpose | Required |
|----------|---------|----------|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL | Yes |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Analytics domain | No |
| `FORMSPREE_ENDPOINT` | Contact form | Yes |

### Headers Configuration

```typescript
// next.config.ts
const headers = [
  {
    source: "/(.*)",
    headers: [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "X-XSS-Protection", value: "1; mode=block" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    ],
  },
  {
    source: "/fonts/(.*)",
    headers: [
      { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
    ],
  },
];
```

### SEO Configuration

| Page | Title Pattern | Description |
|------|---------------|-------------|
| Home | "D-VOID - Technical Operations Specialist" | Full tagline |
| About | "About - D-VOID" | Bio summary |
| Projects | "Projects - D-VOID" | Projects overview |
| Project | "{title} - D-VOID" | Project description |
| Case Study | "{title} - D-VOID" | Case study description |
| Uses | "Uses - D-VOID" | Tools and setup |
| Contact | "Contact - D-VOID" | Contact info |

### OpenGraph Defaults

```typescript
const defaultOG = {
  type: "website",
  locale: "en_US",
  siteName: "D-VOID",
  images: [
    {
      url: "https://d-void.com/og/default.jpg",
      width: 1200,
      height: 630,
      alt: "D-VOID - Technical Operations Specialist",
    },
  ],
};
```

---

## 10. Implementation Checklist

### Phase 1: Foundation

- [ ] Initialize Next.js 15 project with App Router
- [ ] Configure TypeScript strict mode
- [ ] Set up Tailwind CSS 4
- [ ] Install and configure shadcn/ui
- [ ] Set up Biome for linting/formatting
- [ ] Configure Bun as package manager
- [ ] Create design tokens (CSS variables)
- [ ] Implement base layout (header, footer)
- [ ] Set up Lenis smooth scroll

### Phase 2: Hero Section

- [ ] Install R3F dependencies
- [ ] Implement Reality Compiler Hero component
- [ ] Create custom GLSL shaders
- [ ] Implement static CSS fallback
- [ ] Add `prefers-reduced-motion` detection
- [ ] Add mobile detection and fallback
- [ ] Test on target devices

### Phase 3: Core Pages

- [ ] Build Home page structure
- [ ] Build About page
- [ ] Build Uses page
- [ ] Build Contact page with Formspree
- [ ] Implement navigation component
- [ ] Add page transitions (View Transitions API)

### Phase 4: Content System

- [ ] Set up MDX configuration
- [ ] Create project content type
- [ ] Create case study content type
- [ ] Build Projects listing page
- [ ] Build Project detail page
- [ ] Build Case Studies listing page
- [ ] Build Case Study detail page

### Phase 5: Pinned Sections

- [ ] Install GSAP and ScrollTrigger
- [ ] Build SWMS Platform pinned section
- [ ] Build EcoOps Dashboard pinned section
- [ ] Test scroll behavior across devices

### Phase 6: Polish

- [ ] Implement all hover states
- [ ] Add loading states
- [ ] Optimize images
- [ ] Run Lighthouse audit
- [ ] Fix accessibility issues
- [ ] Add analytics

### Phase 7: Launch

- [ ] Configure Vercel deployment
- [ ] Set up custom domain (d-void.com)
- [ ] Verify SSL
- [ ] Test all pages in production
- [ ] Submit to search engines

---

## Appendix A: Component Source Code

### Reality Compiler Hero

Full implementation available at: `D:\RealityCompilerHero.tsx`

Key technical details:
- Single-file React component with R3F
- Custom GLSL fragment shader for flashlight effect
- Procedural grid with scanlines and data flow particles
- Dual scanner rings at reveal edge
- Fresnel-based rim lighting on rendered state
- Proper TypeScript interfaces for all props and uniforms

---

## Appendix B: Constraints and Exclusions

### Hard "No" List

| Item | Reason |
|------|--------|
| Heavy glow/bloom | Appears cheap, hurts readability |
| Neon colors | Conflicts with premium teal palette |
| Autoplay audio | User experience violation |
| Infinite scroll | Accessibility issues |
| 3D particles on mobile | Performance killer |
| Cursor followers | Dated trend |
| Parallax on mobile | Motion sickness risk |
| Loading spinners > 2s | Perceived performance issue |
| `any` TypeScript type | Violates strict mode requirement |
| Versioned API paths | Per user preference (`/api/[module]/[resource]`) |

### Future Considerations (Not in Scope)

| Feature | Notes |
|---------|-------|
| Blog | Add when ready to write regularly |
| Newsletter | Add with blog |
| i18n (AR/EN) | Significant effort, post-launch |
| Dark/light toggle | Start dark-only, consider later |
| Search | Add when project count exceeds 10 |
| Auth/admin | Unnecessary for static portfolio |

---

## Appendix C: Reference Links

| Resource | URL |
|----------|-----|
| Next.js Docs | https://nextjs.org/docs |
| React Three Fiber | https://docs.pmnd.rs/react-three-fiber |
| drei (R3F helpers) | https://github.com/pmndrs/drei |
| GSAP ScrollTrigger | https://gsap.com/docs/v3/Plugins/ScrollTrigger |
| Lenis | https://github.com/darkroomengineering/lenis |
| shadcn/ui | https://ui.shadcn.com |
| Tailwind CSS 4 | https://tailwindcss.com/docs |
| Geist Font | https://vercel.com/font |
| Formspree | https://formspree.io |
| Plausible Analytics | https://plausible.io |

---

**Document Version:** 1.0  
**Last Updated:** 2026-02-10  
**Author:** Claude (Anthropic)  
**Prepared For:** DvoiD
