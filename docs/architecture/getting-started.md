# Getting Started

This guide will help you set up your development environment and start working on the D-VOID portfolio project.

## Prerequisites

Before you begin, ensure you have the following installed:

| Tool | Version | Purpose |
|------|---------|---------|
| Bun | 1.0+ | Package manager and runtime |
| Node.js | 18+ | JavaScript runtime (Bun requires this) |

> **Note**: This project uses Bun as the primary runtime and package manager. While Node.js 18+ is technically required, Bun is the preferred choice for development.

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/silentmot/dvoid.git
cd dvoid
```

### 2. Install dependencies

```bash
bun install
```

### 3. Start development server

```bash
bun dev
```

The development server will start at [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Script | Description |
|-------|-------------|
| `bun dev` | Start development server with Turbopack |
| `bun run build` | Build for production |
| `bun run start` | Start production server |
| `bun run lint` | Run Biome linting and formatting |
| `bun run check` | Run TypeScript type checking |
| `bun run commit` | Create git commit (interactive) |
| `bun run commit:ai` | Create git commit (AI-assisted) |

## Project Structure

After installation, your project structure will look like this:

```
dvoid/
├── app/                      # Next.js App Router
│   ├── (routes)/             # Route group
│   ├── globals.css           # Global styles and CSS tokens
│   ├── layout.tsx            # Root layout (fonts, metadata, navigation)
│   ├── page.tsx              # Home page
│   ├── robots.ts             # robots.txt generation
│   └── sitemap.ts            # Dynamic sitemap generation
├── components/               # React components
│   ├── hero/                 # Hero system (client wrapper, loader, fallback)
│   ├── layout/               # Navigation, footer, smooth scroll provider
│   ├── sections/             # Page sections (SwmsOverview, EcoopsOverview)
│   ├── ecoops/               # EcoOps-specific components
│   ├── demo/                 # Demo components (DottedGridDemo)
│   └── ui/                   # UI primitives (button, card, badge, etc.)
├── lib/                      # Utilities
│   ├── mdx/                  # MDX content helpers
│   └── utils.ts              # cn() class utility
├── content/                  # MDX content files
│   └── case-studies/         # Case study .mdx files
├── public/                   # Static assets
│   └── assets/
└── docs/                     # Documentation
    └── architecture/
```

## Development Workflow

### Adding new pages

1. Create a folder under `app/` for your page
2. Create `page.tsx` file
3. Add thepage` to the navigation component (if needed)

### Adding new components

1. Create component file in `components/`
2. Export from barrel file (`index.ts`) if applicable
3. Import and use in your pages

### Working with MDX content

1. Create `.mdx` file in `content/case-studies/`
2. Add required frontmatter (title, description, date, tags)
3. Content is automatically parsed and available via `getCaseStudies()` or `getCaseStudy(slug)`

## Configuration

### TypeScript

Path aliases are configured in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": "./*",
      "@components/*": "./components/*",
      "@lib/*": "./lib/*"
    }
  }
}
```

### Tailwind CSS

The project uses Tailwind CSS v4.x with a custom theme configuration in `globals.css`.

### MDX

MDX configuration is `next.config.ts` with `remarkPlugins` and `rehypePlugins` options.

## Troubleshooting

### Common issues

1. **Port already in use**: Check if port 3000 is available
2. **Module not found**: Run `bun install` again
3. **Build errors**: Check for build output or run `bun run build`

4. **Type errors**: Run `bun run check`

### Resetting development server

Press `Ctrl+C` in the terminal and then restart with:

```bash
bun dev
```

## Next Steps

Now that you development environment is set up:

1. Explore the architecture in [System Architecture](./system-architecture.md)
2. Learn about components in [Component Reference](./component-reference.md)
3. Understand MDX content in [Content Management Guide](./content-management.md)
4. Deploy with the [Deployment Guide](./deployment.md)
