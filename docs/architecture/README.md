# D-VOID Portfolio Documentation

Welcome to the D-VOID Portfolio documentation. This documentation is generated from the actual codebase implementation and serves as the single source of truth for the project.

> **Note**: Documentation in the `.planning` folder may be outdated. This `docs/` directory contains the authoritative documentation based on the implemented code.

## Documentation Index

### Architecture

| Document | Description |
|----------|-------------|
| [System Architecture](./system-architecture.md) | Mermaid diagrams, data flow, and system overview |
| [Component Reference](./component-reference.md) | All React components with props and usage |
| [Design System](./design-system.md) | Colors, typography, spacing, and styling conventions |

### Guides

| Document | Description |
|----------|-------------|
| [Getting Started](./getting-started.md) | Development environment setup and workflow |
| [Content Management](./content-management.md) | MDX content system for case studies and projects |
| [Deployment](./deployment.md) | Vercel deployment, CI/CD, and security headers |

### Reference

| Document | Description |
|----------|-------------|
| [Utility API](./utility-api.md) | Internal utility functions (`cn`, MDX helpers) |

## Project Overview

**D-VOID Portfolio** is a professional portfolio website showcasing technical operations expertise in industrial IoT systems.

### Technology Stack

| Category | Technologies |
|----------|-------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5.x (strict mode) |
| Styling | Tailwind CSS 4 |
| 3D Graphics | Three.js (direct WebGL), @react-three/fiber, @react-three/drei |
| Animation | GSAP, Motion (Framer Motion) |
| Content | MDX with gray-matter |
| Runtime | Bun |

### Key Features

1. **Reality Compiler Hero** - `DottedGridDemo` (Three.js + SVG grid) loaded dynamically with `CorrelationLoader` while loading
2. **Pinned Story Sections** - Apple-style scroll-triggered animations with GSAP
3. **MDX Content System** - Rich content with frontmatter metadata
4. **Progressive Enhancement** - 3D with accessibility fallbacks
5. **Security Headers** - CSP, HSTS, and security hardening

## Quick Start

```bash
# Clone the repository
git clone https://github.com/silentmot/dvoid.git
cd dvoid

# Install dependencies
bun install

# Start development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
dvoid/
├── app/                    # Next.js App Router
│   ├── (routes)/           # Route group
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # React components
│   ├── hero/               # 3D hero system
│   ├── layout/             # Navigation, footer
│   ├── sections/           # Page sections
│   └── ui/                 # UI primitives
├── lib/                    # Utilities
│   ├── mdx/                # Content utilities
│   └── utils.ts            # Helper functions
├── content/                # MDX content
│   └── case-studies/       # Case study files
├── public/                 # Static assets
└── docs/                   # Documentation
    └── architecture/        # Technical docs
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `bun dev` | Start development server with Turbopack |
| `bun run build` | Build for production |
| `bun run start` | Start production server |
| `bun run lint` | Run Biome linting |
| `bun run check` | Run TypeScript type checking |
| `bun run commit` | Create git commit (interactive) |

## Contributing

1. Create a feature branch
2. Make your changes following the existing patterns
3. Run `bun run lint && bun run check`
4. Submit a pull request

## License

This project is proprietary. All rights reserved.
