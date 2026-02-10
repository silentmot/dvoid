# Copilot coding notes for this repo

**Development Protocol — Source-Backed, Zero-Assumption Approach**

**Core Working Principles:**

1. **Always cite sources explicitly.** Every decision, value, or recommendation must reference its origin (file path, line number, specification section, or documentation URL). If information is missing, ask rather than make assumptions.

2. **Use concrete types only.** Never use generic types. Always use explicit, narrowest-possible types. For unknown data, employ an unknown type with type guards.

3. **Single source of truth.** Import constants only from centralized locations. Never duplicate values. Always reference the authoritative source.

4. **Method-first architecture.** Select adapters via flags (e.g., `IO_METHOD = socket|http|serial|mq`). Avoid hardcoded fallbacks or legacy patterns. All endpoints must follow the format `/api/[module]/[resource]`—do not use versioned paths like `/api/v1/`.

**Before Generating Any Output:**

1. Please stop and clarify if:

- Any requirement is unclear or ambiguous.
- There is missing or insufficient source information.
- You cannot locate the referenced files, endpoints, or specifications.
- Multiple interpretations of the request are possible.
- Dependencies or context are not defined.

2. Always distinguish between:

- "I don't understand what you're asking for" (if you need clarification on the request).
- "I'm missing information to complete this" (if you need specific data, files, or specifications).

3. When seeking clarification, please ask specifically:

- What information is missing? (be explicit about what you need)
- Which files, endpoints, or specifications should be referenced?
- What should the expected outcome look like?
- Are there any constraints or requirements that have not yet been specified?

**What I Need From You:**

- **Quote sources:** Clearly show where information comes from. Example: Source: `config.ts:45` "MAX_RETRIES = 3".
- **List scope upfront:** Enumerate all files, endpoints, or sections being addressed before proceeding.
- **100% coverage:** Account for every item in scope—mark each as reviewed, flagged, or irrelevant.
- **No assumptions:** If data is missing, stop and seek clarification.
- **Replace files in place:** Avoid suffixes like `_new`, `_fixed`, etc.

**Terminology to Avoid:**
Do not use the following terms in code, comments, or documentation: comprehensive, enhanced, advanced, corrected, fixed, implemented, future, final, improved, upgraded, perfected, complete, newer, refined, optimized, best, ideal, flawless, optimal, executive, new, old, updated, modified, or migrated.
No emojis.

**Response Format Preference:**

- **Sources Referenced:**
  - [file: line] "quoted fragment."

- **Scope:**
  - [item]: Status (reviewed/flagged/irrelevant)

**Output:**
[deliverable based on exact request]

**Coverage:** X/X items (100%)

**When Mistakes Occur:**
"Stop apologizing and don't waste time confirming my correctness (You're right)—I already know I am. Make the necessary changes & ask if something is not clear."

## What this repo is
- EcoOps is a Next.js 16 app (App Router) using Bun, Prisma, Postgres, Tailwind v4, and Clerk auth. See `CLAUDE.md`.

## How to run common workflows
- Dev server: `bun run dev` (Next dev with Turbopack) — `package.json` scripts.
- Build: `bun run build`; start: `bun run start` — `package.json`.
- Lint/format: `bun run lint` / `bun run format` (Biome) — `package.json`.
- Typecheck: `bunx tsgo --noEmit` — `CLAUDE.md`.
- Prisma: `bun run db:generate`, `bun run db:migrate`, `bun run db:studio`, `bun run db:reset` — `package.json`.

## App structure (where to look)
- Routes/UI live under `app/` (App Router). The root layout wires Clerk + theme: `app/layout.tsx`.
- Server Actions live in `app/actions/` (look for `'use server'`) — `CLAUDE.md`.
- API routes live in `app/api/**` — `README.md`.
- UI primitives are in `components/ui/`; domain UI tends to live in `components/**` and `app/dashboard/**` — `README.md`, `CLAUDE.md`.

## Data & domain rules
- Prisma schema is the source for DB types/enums: `prisma/schema.prisma`.
- Prefer importing enums/types from `@/lib/constants` (it re-exports Prisma enums) — `lib/constants.ts`.
- DB access uses the singleton Prisma client from `lib/db.ts` (requires `DATABASE_URL`; logs queries in dev) — `lib/db.ts`.

## Auth, RBAC, and routing
- Auth uses Clerk (`ClerkProvider` in `app/layout.tsx`) — `app/layout.tsx`, `README.md`.
- Roles/permissions are defined in Prisma enums (`UserRole`, `ModulePermission`) — `prisma/schema.prisma`.
- Route permission mapping is centralized in `ROUTE_PERMISSION_REQUIREMENTS` — `lib/constants.ts`.

## Repo conventions to follow
- Endpoint paths: use `/api/[module]/[resource]` (no version segment) — `CLAUDE.md`, `.github/instructions/GZANSP.instructions.md`.
- Types: avoid `any`; keep types explicit; use `unknown` + guards when needed — `.github/instructions/GZANSP.instructions.md`.
- Constants: do not duplicate system constants in feature modules; import from `lib/constants.ts` — `lib/constants.ts`, `.github/instructions/GZANSP.instructions.md`.
- Imports: note the Biome ignore in `app/layout.tsx` that preserves Clerk import order; avoid re-ordering that block.

## Path aliases
- Use TS path aliases from `tsconfig.json`: `@/`, `@lib/`, `@components/`, `@hooks/`, `@app/`, etc.

## When you need library docs
- Use Context7 tooling for library/API docs during code generation — `AGENTS.md`.
