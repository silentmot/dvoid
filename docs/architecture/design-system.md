# Design System

This document covers the design system tokens and conventions for the D-VOID portfolio.

## Color System

The project uses OKLCH color space for consistent color representation across devices.

### Theme

The site is **dark-only** with no light mode toggle.

### Color Tokens

```css
/* Background */
--background: oklch(0.13 0.028 261.692);    /* Deep dark */
--card: oklch(0.16 0.03 262);               /* Slightly lighter */
--muted: oklch(0.2 0.025 260);               /* Subtle elevation */

/* Foreground */
--foreground: oklch(0.985 0.002 247.839);   /* Near white */
--muted-foreground: oklch(0.65 0.02 260);    /* Dimmed text */

/* Primary (Teal) */
--primary: oklch(0.7 0.12 183);              /* Main accent */
--primary-foreground: oklch(0.15 0.03 183);  /* Text on primary */

/* Destructive */
--destructive: oklch(0.6 0.2 25);            /* Error states */
```

### Usage in Tailwind

```tsx
<div className="bg-background text-foreground">
  <p className="text-muted-foreground">Dimmed text</p>
  <button className="bg-primary text-primary-foreground">
    Primary Button
  </button>
</div>
```

## Typography

### Font Families

```typescript
// Geist Sans - Primary typeface
const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

// Geist Mono - Code and labels
const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});
```

### Font Sizes

| Class | Size | Use Case |
|-------|------|----------|
| `text-xs` | 0.75rem | Labels, captions |
| `text-sm` | 0.875rem | Body small, meta |
| `text-base` | 1rem | Body text |
| `text-lg` | 1.125rem | Lead paragraphs |
| `text-xl` | 1.25rem | Section intros |
| `text-2xl` | 1.5rem | Subheadings |
| `text-3xl` | 1.875rem | Headings |
| `text-4xl` | 2.25rem | Large headings |
| `text-5xl` | 3rem | Hero headlines |
| `text-6xl` | 3.75rem | Display |

### Font Weights

| Class | Weight | Use Case |
|-------|--------|----------|
| `font-normal` | 400 | Body text |
| `font-medium` | 500 | Emphasis |
| `font-semibold` | 600 | Headings |
| `font-bold` | 700 | Strong emphasis |

## Spacing

The project uses Tailwind's default spacing scale:

| Class | Size | Use Case |
|-------|------|----------|
| `p-1` | 0.25rem | Tight padding |
| `p-2` | 0.5rem | Small padding |
| `p-4` | 1rem | Default padding |
| `p-6` | 1.5rem | Card padding |
| `p-8` | 2rem | Section padding |
| `p-16` | 4rem | Large sections |
| `gap-4` | 1rem | Default gap |
| `gap-6` | 1.5rem | Card grid gap |

## Border Radius

| Class | Size | Use Case |
|-------|------|----------|
| `rounded` | 0.25rem | Small elements |
| `rounded-md` | 0.375rem | Buttons, inputs |
| `rounded-lg` | 0.5rem | Cards |
| `rounded-xl` | 0.75rem | Large cards |
| `rounded-full` | 9999px | Pills, avatars |

## Shadows

```css
/* Card shadow */
.shadow-card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Elevated shadow */
.shadow-elevated {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}
```

## Glass Effects

```tsx
// Navigation glass effect
<header className="bg-background/80 backdrop-blur-md border-b border-border/50">
  {/* Content */}
</header>

// Card glass effect
<div className="bg-card/50 backdrop-blur-sm border border-border/30">
  {/* Content */}
</div>
```

## Animations

### Motion (Framer Motion)

```tsx
// Fade in
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
>

// Slide up
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>

// Stagger children
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }}
>
```

### GSAP ScrollTrigger

```tsx
// Scroll-triggered fade-in (pattern used in SwmsOverview / EcoopsOverview)
useEffect(() => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReducedMotion) return;

  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(
    elementRef.current,
    { opacity: 0, y: 60 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: elementRef.current,
        start: "top 85%",
      },
    }
  );
}, []);
```

### CSS Animations

```css
/* Pulse animation */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Angular glow (Black Ice theme) */
@keyframes angular-glow {
  0%, 100% { opacity: 0.1; transform: scale(1); }
  50% { opacity: 0.25; transform: scale(1.05); }
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .animate-pulse {
    animation: none !important;
  }
}
```

## Components

### Button Variants

```tsx
// Primary
<button className="bg-primary text-primary-foreground hover:bg-primary/90">
  Primary Action
</button>

// Outline
<button className="border border-border bg-background hover:bg-accent">
  Secondary Action
</button>

// Ghost
<button className="hover:bg-accent hover:text-accent-foreground">
  Tertiary Action
</button>

// Destructive
<button className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
  Delete
</button>
```

### Badge Variants

```tsx
// Default
<Badge>Technology</Badge>

// Secondary
<Badge variant="secondary">Framework</Badge>

// Outline
<Badge variant="outline">Tool</Badge>
```

### Card Pattern

```tsx
<div className="p-6 rounded-lg bg-card border border-border/50 hover:border-primary/30 transition-all">
  <h3 className="text-lg font-semibold text-foreground mb-2">
    Title
  </h3>
  <p className="text-sm text-muted-foreground">
    Description text
  </p>
</div>
```

## Layout

### Container

```tsx
<div className="mx-auto max-w-6xl px-6">
  {/* Content */}
</div>
```

### Grid

```tsx
// Two-column grid
<div className="grid md:grid-cols-2 gap-6">
  {/* Cards */}
</div>

// Three-column grid
<div className="grid md:grid-cols-3 gap-6">
  {/* Cards */}
</div>
```

### Section

```tsx
<section className="py-16 md:py-24">
  <div className="mx-auto max-w-6xl px-6">
    <h2 className="text-2xl font-semibold text-foreground mb-8">
      Section Title
    </h2>
    {/* Content */}
  </div>
</section>
```

## Accessibility

### Focus States

```css
/* Focus ring */
:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

/* Skip link */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--primary);
  color: var(--primary-foreground);
  padding: 8px 16px;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
```

### Reduced Motion

Always respect `prefers-reduced-motion`:

```tsx
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (prefersReducedMotion) {
  // Skip animation
  return <StaticFallback />;
}
```

### Color Contrast

- All text meets WCAG AA contrast ratios
- Interactive elements have visible focus states
- Color is not the only indicator of state
