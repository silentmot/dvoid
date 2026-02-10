# D-VOID Portfolio Website

## What This Is

A developer portfolio website showcasing technical operations expertise in industrial IoT systems, with focus on Smart Waste Management System (SWMS) and EcoOps Operational Dashboard. The site features an Apple-minimal aesthetic with dark theme, soft glass surfaces, teal accent palette, and a signature "Reality Compiler" hero section where the user's cursor acts as a flashlight transforming wireframe geometry into rendered surfaces.

## Core Value

The hero's 3D flashlight metaphor must work flawlessly—this is the primary differentiator that communicates "turning abstract code into tangible operational systems."

## Requirements

### Validated

<!-- Infrastructure already in place from initial setup -->

- [x] Next.js 16 App Router with TypeScript configured
- [x] Tailwind CSS 4 styling system initialized
- [x] Motion (framer-motion) and GSAP animation libraries installed
- [x] React Three Fiber and Three.js for 3D rendering
- [x] MDX content management configured
- [x] Basic project structure with components/ and app/ directories

### Active

<!-- Current scope: Full implementation per handoff spec -->

- [ ] **Design tokens**: CSS variables for color palette, typography, spacing, borders, shadows
- [ ] **Reality Compiler Hero**: Interactive 3D scene with cursor-as-flashlight shader effect
- [ ] **Hero fallback**: CSS-only fallback for mobile/reduced-motion/SSR
- [ ] **Navigation**: Fixed glass-header with scroll-aware visibility
- [ ] **Home page sections**: Featured project, tech stack, timeline, stats
- [ ] **About page**: Bio, philosophy, current focus
- [ ] **Projects system**: Listing page and dynamic project detail pages from MDX
- [ ] **Case studies system**: Listing page and detailed case study pages with SWMS and EcoOps
- [ ] **Pinned story sections**: GSAP ScrollTrigger sections for SWMS Platform and EcoOps Dashboard
- [ ] **Uses page**: Tools, software, hardware setup
- [ ] **Contact page**: Formspree integration
- [ ] **Performance optimization**: Code splitting, image optimization, 3D performance targets
- [ ] **Accessibility**: WCAG 2.1 AA compliance, keyboard navigation, reduced motion support
- [ ] **Deployment**: Vercel configuration with SEO and security headers

### Out of Scope

<!-- Explicit boundaries per handoff spec Appendix B -->

- **Blog** — Add when ready to write regularly (no current content pipeline)
- **Newsletter** — Add with blog (no email capture needed yet)
- **i18n (AR/EN)** — Significant effort, defer to post-launch
- **Dark/light toggle** — Dark-only per design spec (consider later if demand)
- **Search** — Add when project count exceeds 10
- **Auth/admin** — Unnecessary for static portfolio site

## Context

**Background**: This portfolio serves multiple audiences—potential employers/clients in industrial automation, technical decision-makers in waste management, and fellow backend developers seeking collaboration.

**Technical Environment**: Next.js 16 with App Router, Bun runtime, TypeScript strict mode, Tailwind CSS 4. The codebase already has the stack configured (React 19, Motion, GSAP, R3F, MDX). Design philosophy emphasizes restrained motion—no heavy glow/bloom, no autoplay audio, no cursor followers.

**Existing Work**: The handoff specification (d-void-portfolio-handoff.md) contains comprehensive implementation details including component specifications, design tokens, content requirements, and a 7-phase implementation checklist.

**Key Differentiator**: The "Reality Compiler" hero section uses custom GLSL shaders to create an interactive experience where the cursor reveals polished rendered geometry from wireframe state—metaphorically representing the transformation of code into operational systems.

## Constraints

- **Design Aesthetic**: Apple-minimal with dark theme only—teal accent palette, soft glass surfaces, restrained motion
- **Performance Budgets**: LCP < 2.5s, JS bundle < 400KB (hero), < 200KB (other pages), 3D frame rate > 30fps
- **Accessibility**: WCAG 2.1 AA compliance with full keyboard navigation and reduced motion support
- **TypeScript**: Strict mode enabled, no `any` types permitted
- **3D Fallbacks**: Must work without JS (SSR), on mobile (< 768px), and with `prefers-reduced-motion`
- **Deployment**: Vercel hosting with custom domain (d-void.com)

## Key Decisions

| Decision | Rationale | Outcome |
| ---------- | --------- | -------- |
| Dark-only theme | Consistent with premium aesthetic, reduces implementation complexity | — Pending |
| MDX for content | Easy content editing, component embedding, version control | — Pending |
| Static generation | Fast loading, simple deployment, no server costs | — Pending |
| GSAP for pinned sections | Proven scroll-driven animation, smooth pinning behavior | — Pending |

---
>*Last updated: 2026-02-10 after initialization*
