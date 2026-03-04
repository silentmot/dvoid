# Utility API Reference

**Agent Role**: DocOps
**Mode**: Factual
**Sources**: Verified against `lib/utils.ts` and `lib/mdx/index.ts`.

---

## lib/utils.ts

**File**: `lib/utils.ts`

**Dependencies**: `clsx`, `tailwind-merge`.

### `cn()`

Merges Tailwind CSS class names. Combines `clsx` for conditional class logic with `tailwind-merge` to resolve Tailwind conflicts.

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Usage**:

```typescript
import { cn } from "@/lib/utils";

// Basic merge
cn("px-4 py-2", "px-6")
// → "py-2 px-6"

// Conditional classes
cn("base-class", isActive && "active-class", className)
```

> `lib/utils.ts` exports only `cn`. No other utilities (`tv`, `clsx` wrapper, etc.) are defined in this file.

---

## lib/mdx/index.ts

**File**: `lib/mdx/index.ts`

**Dependencies**: `fs`, `gray-matter`, `path`, `reading-time`.

### Constants

```typescript
const CONTENT_DIR = path.join(process.cwd(), "content");
```

### Interfaces

#### CaseStudyMeta

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
```

#### ProjectMeta

```typescript
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

### Functions

#### `getCaseStudies(): CaseStudyMeta[]`

Returns all case studies in `content/case-studies/` sorted by date descending.

```typescript
export function getCaseStudies(): CaseStudyMeta[] {
  const files = getContentFiles("case-studies");
  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const filePath = path.join(CONTENT_DIR, "case-studies", file);
      const content = fs.readFileSync(filePath, "utf-8");
      const { data, content: mdxContent } = matter(content);
      const stats = readingTime(mdxContent);
      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? "",
        date: data.date ?? new Date().toISOString(),
        tags: data.tags ?? [],
        featured: data.featured ?? false,
        image: data.image,
        readingTime: stats.text,
        client: data.client,
        role: data.role,
        duration: data.duration,
        stack: data.stack ?? [],
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
```

#### `getCaseStudy(slug: string): { meta: CaseStudyMeta; content: string } | null`

Returns frontmatter and raw MDX body for a single slug. Returns `null` if the file does not exist.

#### `getProjects(): ProjectMeta[]`

Returns all projects in `content/projects/` sorted by date descending. Returns an empty array if the `content/projects/` directory does not exist.

#### `getFeaturedCaseStudy(): CaseStudyMeta | null`

Returns the first case study where `featured === true`. Falls back to the most recent case study if none are featured. Returns `null` if no files exist.

#### `getFeaturedProjects(): ProjectMeta[]`

Returns all projects where `featured === true`. Delegates to `getProjects()` internally.

---

## Environment Variables

No environment variables are required for local development.

| Variable | Required | Description |
|----------|----------|-------------|
| `CSP_REPORT_ONLY` | No | Set to `"true"` to switch the CSP header to report-only mode |
| `CSP_REPORT_ENDPOINT` | No | URL to receive CSP violation reports (requires `CSP_REPORT_ONLY=true`) |

### Constants

```typescript
const CONTENT_DIR = path.join(process.cwd(), "content");
```

### Interfaces

#### CaseStudyMeta

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
```

#### ProjectMeta

```typescript
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

### Functions

#### `getCaseStudies(): CaseStudyMeta[]`

Returns all case studies in `content/case-studies/` sorted by date descending.

```typescript
export function getCaseStudies(): CaseStudyMeta[] {
  const files = getContentFiles("case-studies");
  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const filePath = path.join(CONTENT_DIR, "case-studies", file);
      const content = fs.readFileSync(filePath, "utf-8");
      const { data, content: mdxContent } = matter(content);
      const stats = readingTime(mdxContent);
      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? "",
        date: data.date ?? new Date().toISOString(),
        tags: data.tags ?? [],
        featured: data.featured ?? false,
        image: data.image,
        readingTime: stats.text,
        client: data.client,
        role: data.role,
        duration: data.duration,
        stack: data.stack ?? [],
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
```

#### `getCaseStudy(slug: string): { meta: CaseStudyMeta; content: string } | null`

Returns frontmatter and raw MDX body for a single slug. Returns `null` if the file does not exist.

```typescript
export function getCaseStudy(slug: string): {
  meta: CaseStudyMeta;
  content: string;
} | null {
  const filePath = path.join(CONTENT_DIR, "case-studies", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const stats = readingTime(content);

  return {
    meta: {
      slug,
      title: data.title ?? slug,
      description: data.description ?? "",
      date: data.date ?? new Date().toISOString(),
      tags: data.tags ?? [],
      featured: data.featured ?? false,
      image: data.image,
      readingTime: stats.text,
      client: data.client,
      role: data.role,
      duration: data.duration,
      stack: data.stack ?? [],
    },
    content,
  };
}
```

#### `getProjects(): ProjectMeta[]`

Returns all projects in `content/projects/` sorted by date descending.

```typescript
export function getProjects(): ProjectMeta[] {
  const files = getContentFiles("projects");
  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const filePath = path.join(CONTENT_DIR, "projects", file);
      const content = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(content);
      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? "",
        date: data.date ?? new Date().toISOString(),
        tags: data.tags ?? [],
        featured: data.featured ?? false,
        image: data.image,
        url: data.url,
        github: data.github,
        stack: data.stack ?? [],
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
```

#### `getFeaturedCaseStudy(): CaseStudyMeta | null`

Returns the first featured case study, or the latest if none are featured. Returns `null` if no files exist.

```typescript
export function getFeaturedCaseStudy(): CaseStudyMeta | null {
  const studies = getCaseStudies();
  return studies.find((s) => s.featured) ?? studies[0] ?? null;
}
```

#### `getFeaturedProjects(): ProjectMeta[]`

Returns all projects where `featured === true`.

```typescript
export function getFeaturedProjects(): ProjectMeta[] {
  return getProjects().filter((p) => p.featured);
}
```

---

## Environment Variables

No environment variables are required for local development.

| Variable | Required | Description |
|----------|----------|-------------|
| `CSP_REPORT_ONLY` | No | Set to `"true"` to switch the CSP header to report-only mode |
| `CSP_REPORT_ENDPOINT` | No | URL to receive CSP violation reports (requires `CSP_REPORT_ONLY=true`) |
