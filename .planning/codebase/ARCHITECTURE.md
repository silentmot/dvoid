# Architecture

**Analysis Date:** 2026-02-10

## Pattern Overview

**Overall:** Next.js App Router with File-based Routing

**Key Characteristics:**
- React 19 with Next.js 16 App Router
- TypeScript for type safety
- Component-based architecture with barrel exports
- MDX for content management
- Tailwind CSS for styling
- Three.js/React Three Fiber for 3D graphics

## Layers

**Presentation Layer (app/):**
- Purpose: UI components and page layouts
- Location: `app/`
- Contains: Route definitions, layouts, pages
- Depends on: components/, lib/
- Used by: Next.js runtime

**Component Layer (components/):**
- Purpose: Reusable UI components and sections
- Location: `components/`
- Contains: Layout components, section components, hero components
- Depends on: lib/
- Used by: app/ for rendering UI

**Content Layer (content/):**
- Purpose: MDX content files for case studies
- Location: `content/`
- Contains: MDX files with metadata via gray-matter
- Used by: Dynamic import for content rendering

**Utility Layer (lib/):**
- Purpose: Shared utilities and helpers
- Location: `lib/`
- Contains: Utility functions, MDX configuration
- Used by: components/, app/

## Data Flow

**Page Rendering Flow:**

1. User requests a URL (e.g., /case-studies)
2. Next.js App Router matches the route to `app/(routes)/case-studies/page.tsx`
3. The page component imports and renders UI components
4. Components use TypeScript props for type safety
5. MDX content is dynamically loaded when needed
6. Components render with Tailwind CSS styling

**Content Loading:**

1. MDX files in `content/` contain frontmatter and content
2. `gray-matter` extracts metadata during build time
3. Components consume processed content as props
4. Dynamic imports optimize loading performance

**State Management:**
- React hooks for component state
- React Context for cross-component state (SmoothScrollProvider)
- Server components for default state
- Client components for interactive features

## Key Abstractions

**Navigation Component:**
- Purpose: Centralized navigation logic
- Examples: `components/layout/navigation.tsx`
- Pattern: FC interface with TypeScript, uses Next.js navigation hooks

**Layout Hierarchy:**
- RootLayout: Global layout with fonts, metadata, and main structure
- RoutesLayout: Grouping wrapper for route-specific layouts
- Component sections: Reusable UI sections with consistent styling

**Content Component:**
- Purpose: MDX content rendering abstraction
- Examples: `content/case-studies/*.mdx`
- Pattern: Dynamic imports with gray-matter processing

## Entry Points

**Application Root:**
- Location: `app/layout.tsx`
- Triggers: Initial page load
- Responsibilities: Global layout, fonts, metadata, providers

**Home Page:**
- Location: `app/page.tsx`
- Triggers: Default route (/)
- Responsibilities: Hero section, skill showcase, CTA

**Route Pages:**
- Location: `app/(routes)/*/page.tsx`
- Triggers: Route navigation
- Responsibilities: Page-specific content and layout

## Error Handling

**Strategy:** React error boundaries and Next.js error pages

**Patterns:**
- Client-side error handling with React error boundaries
- Server-side error handling via Next.js error.tsx files (not yet implemented)
- Type-safe error handling with TypeScript

## Cross-Cutting Concerns

**Logging:** Console logging for development, structured logging not implemented

**Validation:** TypeScript compile-time validation, runtime validation minimal

**Authentication:** Not implemented in this portfolio site

**Styling:** Tailwind CSS with CSS variables for theming, dark mode support

**Performance:**
- Dynamic imports for heavy components (Three.js)
- React Three Fiber for efficient 3D rendering
- Turbopack for fast development builds

---

*Architecture analysis: 2026-02-10*