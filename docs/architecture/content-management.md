# Content Management Guide

This guide covers the MDX content system for case studies and projects.

## Content Structure

```
content/
├── case-studies/
│   ├── swms-platform.mdx
│   └── ecoops-dashboard.mdx
└── projects/
    └── [project-slug].mdx
```

## Case Study Frontmatter

Case studies support the following frontmatter fields:

```yaml
---
title: "Project Title"
description: "Brief description for SEO and social sharing"
date: "2024-01-15"
tags:
  - IoT
  - Industrial
  - Waste Management
featured: true
image: /images/project-image.jpg
client: "Client Name"
role: "System Architect"
duration: "6 months"
stack:
  - .NET Core
  - Temporal.io
  - PostgreSQL
  - Azure Functions
  - Azure Blob Storage
---
```

### Recommended Fields

The parser provides fallbacks for all frontmatter fields. These fields are recommended for complete case study presentation; omitting them produces parser-set defaults.

| Field | Type | Default (parser fallback) | Description |
|-------|------|--------------------------|-------------|
| `title` | string | slug | Project title (used in hero, SEO) |
| `description` | string | `""` | Brief description for SEO/social sharing |
| `date` | string | current ISO timestamp | Publication date (ISO format: YYYY-MM-DD) |
| `tags` | string[] | `[]` | Tags for categorization |

### Optional Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `featured` | boolean | `false` | Highlight as featured case study |
| `image` | string | — | Hero image path (relative to `public/`) |
| `client` | string | — | Client name |
| `role` | string | — | Your role in the project |
| `duration` | string | — | Project duration (e.g., "6 months") |
| `stack` | string[] | `[]` | Technology stack used |

### Computed Fields

`readingTime` is calculated by the parser from MDX body content. It is not a frontmatter field and must not be set in frontmatter.

## MDX Features

### Components

MDX content supports all standard React components imported in `next.config.ts`:

```mdx
import { Badge } from "@/components/ui/badge";

## Technologies Used

<Badge>.NET Core</Badge>
<Badge>Temporal.io</Badge>
```

### Syntax Highlighting

Code blocks automatically get syntax highlighting:

````mdx
```typescript
interface DeviceData {
  id: string;
  timestamp: Date;
  weight: number;
  binLevel: number;
}
```
````

### Images

Reference images using standard Markdown or MDX:

```mdx
![Alt text](/images/diagram.png)

// Or with custom component
<Image
  src="/images/diagram.png"
  alt="System Architecture"
  width={800}
  height={400}
/>
```

## Adding New Content

### 1. Create MDX File

Create a new file in the appropriate directory:

```bash
# For case studies
touch content/case-studies/new-project.mdx

# For projects
touch content/projects/new-project.mdx
```

### 2. Add Frontmatter

```yaml
---
title: "New Project"
description: "Description of the new project"
date: "2024-03-01"
tags:
  - Technology
  - Category
featured: false
stack:
  - React
  - TypeScript
  - Next.js
---
```

### 3. Write Content

```mdx
# Project Overview

Brief introduction to the project...

## Problem Statement

Describe the problem...

## Solution

Describe the solution...

## Technical Implementation

Details about the implementation...

## Results

Outcomes and metrics...
```

### 4. Content is Auto-Discovered

The content system automatically:

- Parses frontmatter for metadata
- Calculates reading time
- Sorts by date (newest first)
- Generates dynamic routes

## Content API

### getCaseStudies()

Returns all case studies sorted by date:

```typescript
import { getCaseStudies } from "@/lib/mdx";

const caseStudies = getCaseStudies();
// Returns: CaseStudyMeta[]
```

### getCaseStudy(slug)

Returns a single case study with full content:

```typescript
import { getCaseStudy } from "@/lib/mdx";

const study = getCaseStudy("swms-platform");
if (study) {
  console.log(study.meta.title);
  console.log(study.content); // Raw MDX content
}
```

### getProjects()

Returns all projects sorted by date:

```typescript
import { getProjects } from "@/lib/mdx";

const projects = getProjects();
// Returns: ProjectMeta[]
```

### getFeaturedCaseStudy()

Returns the first featured case study:

```typescript
import { getFeaturedCaseStudy } from "@/lib/mdx";

const featured = getFeaturedCaseStudy();
```

### getFeaturedProjects()

Returns all featured projects:

```typescript
import { getFeaturedProjects } from "@/lib/mdx";

const featured = getFeaturedProjects();
```

## Reading Time Calculation

Reading time is automatically calculated using the `reading-time` library:

```typescript
import readingTime from "reading-time";

const stats = readingTime(mdxContent);
console.log(stats.text); // "8 min read"
```

## Best Practices

### Writing Content

1. **Start with a hook** - First paragraph should grab attention
2. **Use headers** - Break up content with `##` headers
3. **Include visuals** - Add diagrams and screenshots
4. **Show metrics** - Include quantifiable results
5. **Be specific** - Use exact technologies and versions

### Frontmatter Guidelines

1. **Keep descriptions concise** - 150-160 characters for SEO
2. **Use consistent tags** - Same format for similar technologies
3. **Format dates as ISO** - YYYY-MM-DD format
4. **Be realistic with duration** - Include full project lifecycle

### Image Guidelines

1. **Optimize images** - Use WebP format when possible
2. **Use descriptive filenames** - `swms-dashboard-hero.jpg` not `image1.jpg`
3. **Include alt text** - Required for accessibility
4. **Size appropriately** - Hero images: 1920x1080, Thumbnails: 800x600
