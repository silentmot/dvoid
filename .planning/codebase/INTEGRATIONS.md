# External Integrations

**Analysis Date:** 2026-02-10

## APIs & External Services

**Analytics:**
- Plausible (optional) - Privacy-focused analytics
  - Domain: `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` env var
  - Client-side tracking

**Content Delivery:**
- Static file hosting - Content files served from `content/` directory
  - Markdown/MDX files processed at build time

## Data Storage

**Databases:**
- File system only - Content stored as MDX files in `content/`
  - No external database detected

**File Storage:**
- Local filesystem - Content and assets stored locally
  - Images served through Next.js image optimization

**Caching:**
- Next.js built-in caching - Image optimization and static generation
  - No external caching service detected

## Authentication & Identity

**Auth Provider:**
- None detected - Static site without user authentication
  - Implementation: Not required for portfolio site

## Monitoring & Observability

**Error Tracking:**
- Not configured - No error tracking service detected

**Logs:**
- Console logging only - No external logging service

## CI/CD & Deployment

**Hosting:**
- Vercel (recommended) - Next.js optimized deployment
  - Static export supported

**CI Pipeline:**
- Not configured - No external CI detected
  - Manual deployments or GitHub Actions possible

## Environment Configuration

**Required env vars:**
- `NEXT_PUBLIC_SITE_URL` - Canonical URL for the site
- Optional: `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` - Analytics domain

**Secrets location:**
- Not detected - No sensitive API keys required

## Webhooks & Callbacks

**Incoming:**
- None detected - Static content site

**Outgoing:**
- None detected - No external API calls

## Content Management

**Source:**
- MDX files in `content/` directory
- Structured with frontmatter using gray-matter
- Static generation at build time

**Delivery:**
- Next.js routes for content pages
- Dynamic routing for case studies and projects

## Performance Optimization

**Image Optimization:**
- Next.js built-in image optimization
- Remote pattern: HTTPS images allowed

**Code Splitting:**
- Next.js automatic code splitting
- React 19 concurrent features

## Static Generation Features

**Pages:**
- `app/(routes)/` - Static routes for content
- Dynamic routes: `[slug]` for case studies
- Static generation with revalidation support

**Navigation:**
- Client-side routing with React 19
- No external navigation service

---

*Integration audit: 2026-02-10*