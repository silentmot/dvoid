# Deployment Guide

This guide covers deploying the D-VOID portfolio to production.

## Deployment Platform

This project is optimized for deployment on **Vercel** with automatic configuration detection.

## Prerequisites

- Vercel account
- GitHub repository connected to Vercel
- Project built and tested locally

## Deployment Methods

### Automatic Deployment (Recommended)

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect Next.js and configure:
   - Build Command: `bun run build`
   - Output Directory: `.next`
   - Install Command: `bun install`

### Manual Deployment

```bash
# Build the project
bun run build

# Deploy to Vercel
vercel --prod
```

## Configuration

### vercel.json

> **Note**: No `vercel.json` exists in this repository. Vercel detects Next.js automatically from the project structure. The example below shows how one could be added for custom region or header overrides.

Create a `vercel.json` file for custom configuration:

```json
{
  "framework": "nextjs",
  "buildCommand": "bun run build",
  "installCommand": "bun install",
  "regions": ["iad1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": {
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        "X-XSS-Protection": "0",
        "Referrer-Policy": "strict-origin-when-cross-origin",
        "Permissions-Policy": "camera=(), microphone=(), geolocation=()"
      }
    }
  ]
}
```

### next.config.ts Headers

The project includes security headers in `next.config.ts`:

```typescript
const securityHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-XSS-Protection",
    value: "0",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
];
```

## Content Security Policy (CSP)

### Development CSP

```typescript
const cspDirectives = [
  "default-src 'self'",
  "base-uri 'none'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline'",
  "script-src-attr 'none'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self' https:",
  "upgrade-insecure-requests",
].join("; ");
```

### Production CSP

In production, enable CSP reporting by setting:

```bash
CSP_REPORT_ONLY=true
CSP_REPORT_ENDPOINT=https://your-endpoint.com
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `CSP_REPORT_ONLY` | No | Enable CSP report-only mode |
| `CSP_REPORT_ENDPOINT` | No | CSP violation reporting endpoint |

## Build Optimization

### Bundle Analysis

Analyze your bundle size:

```bash
ANALYZE=true bun run build
```

### Performance Considerations

1. **3D Hero Component**
   - Dynamically imported with `next/dynamic`
   - SSR disabled for client-only rendering
   - Minimum loading time of 4.2 seconds for smooth UX

2. **Image Optimization**
   - Use Next.js `Image` component for automatic optimization
   - Configure in `next.config.ts`:

   ```typescript
   images: {
     remotePatterns: [],
   }
   ```

3. **Code Splitting**
   - Hero component is dynamically imported
   - GSAP is loaded only when needed for ScrollTrigger animations

## CI/CD Integration

> **Note**: No `.github/workflows/` directory exists in this repository. The workflow below is a reference for future CI/CD setup.

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun run lint
      - run: bun run check

  deploy:
    needs: lint
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

## Monitoring

### Vercel Analytics

Enable Vercel Analytics:

```bash
vercel analytics enable
```

### Performance Monitoring

Monitor Core Web Vitals:

- LCP (Largest Contentful Paint)
- FID (First Input Delay)
- CLS (Cumulative Layout Shift)

## Troubleshooting

### Common Issues

1. **Build fails with memory error**

   ```bash
   NODE_OPTIONS=--max-old-space-size=4096 bun run build
   ```

2. **3D Hero not loading**
   - Check browser WebGL support
   - Verify `prefers-reduced-motion` media query
   - Ensure device is not mobile/touch (fallback should show)

3. **CSP violations**
   - Check browser console for blocked resources
   - Update CSP directives in `proxy.ts`
   - Add new domains to `connect-src` or `img-src` as needed

## Rollback

To rollback a deployment:

```bash
vercel rollback
```

Or via Vercel Dashboard:

1. Go to project > Deployments
2. Find previous successful deployment
3. Click "..." menu > "Promote to Production"
