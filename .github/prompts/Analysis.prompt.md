---
agent: Ops
---
# Deep Analysis

> Agent must replace placeholders in `{braces}` before running with targeted values based on the requested task.

## Task Objective

Analyze the `{Feature/Module}` **only by reading code** to determine:

1. what it does?
2. how it fetches/transforms/displays data?
3. how its components/modules relate?
4. and what is mismatched, broken, or non-functional?

Then produce **actionable artifacts**:

* a **code-verified inventory** of all related resources
* a **discrepancy report** (what’s wrong + evidence)
* a **next-steps plan**
* a Markdown write-up saved to: `docs/Analysis/{FeatureModuleSlug}-{YYYYMMDD}.md`

## Scope

* Feature/Module name: `{Feature/Module}`
* Primary entrypoint(s): `{entry_files}`
* Related directories (if any): `{related_dirs}`
* Exclusions (if any): `{excluded_paths}`

## Hard Constraints

* **Code is the single source of truth.** Do not rely on comments, docs, READMEs, or assumptions.
* **No invented files, APIs, DB tables, routes, or types.** If something is unknown, mark it as `UNKNOWN`.
* **Evidence-first.** Every claim must reference a file path + line range.
* **Inventory before conclusions.** Build the resource map first.

## Analysis Procedure (Required)

### 0) Source Inventory (Mandatory First Step)

Create a structured inventory of all resources related to `{Feature/Module}`:

* Page/route entrypoints (e.g., `app/...`, `pages/...`)
* UI components used directly/indirectly
* Hooks (data fetching, URL sync, state)
* Services (transformation/aggregation)
* State management (stores)
* API routes/controllers
* Validation schemas
* Constants/config (chart configs, token maps, etc.)
* Types/interfaces
* Database tables/models (Prisma/EF/SQL/etc.)

**Output format:**

* `## Files Reviewed`

  * Group by type (Entrypoints, Components, Hooks, Services, Store, API, Constants, Types, DB)
  * Each line: `- path (short description)`

### 1. Functional Walkthrough (Code‑Verified)

For each primary entrypoint and each major component:

* Describe its purpose **as implemented**
* Identify what data it needs
* Identify where data comes from (hook/service/API/store)
* Identify how data is transformed (service functions) and displayed (charts/tables/cards)

**Output format per component:**

* `### {ComponentName}`

  * **Status:** `{Functional|Partially Functional|Broken|Unknown}`
  * **Data Sources:** `{hook/service/API}`
  * **Inputs/Props:** `{list}`
  * **Transformations:** `{function names}`
  * **Display Behavior:** `{what renders}`
  * **Evidence:** `path#Lx-Ly`

### 2. Data Values & Mapping

List all values fetched and how they map into UI:

* API response keys → transformation functions → component props/state
* For each mapping, note mismatches (missing keys, wrong names, wrong types)

**Output format:**

* Table: `API/Source` | `Response/Shape` | `Transform` | `UI Consumer` | `Notes`

### 3. Relationship Graph (Text-Based)

Create a simple dependency map:

* Entrypoint → Store/URL sync → Hooks → API → Service transforms → Components

**Output format:**

* ASCII or Mermaid (choose one) showing the data flow.

### 4. Discrepancy Detection

Identify and list all issues:

* broken imports / missing exports
* dead code / unused props / unused params
* non-functional UI (empty due to missing data wiring)
* inconsistent patterns (one component fetches directly vs prop-based)
* incorrect business logic (e.g., “previous period” not equal duration)
* simulated/mock data presented as real
* ignored loading/error states

**For each discrepancy include:**

* Severity: `{Critical|Major|Minor}`
* What’s wrong
* Where (file + line range)
* Impact
* Proposed fix (minimal)

### 5. Success Criteria Verification

Explicitly validate these criteria against code evidence:

* All referenced files exist and are imported correctly
* Data flow is traceable end-to-end for each displayed metric
* Empty/loading/error states are handled
* No critical runtime errors likely from undefined/null shapes

Mark each criterion as: `PASS | FAIL | UNKNOWN`.

## Required Artifacts

### A. On-Branch Outputs

1. Create/update the Markdown summary file:

   * Path: `docs/Analysis/{FeatureModuleSlug}-{YYYYMMDD}.md`
   * Must include:

     * `## Files Reviewed`
     * `## Data Flow Architecture`
     * `## Component Analysis`
     * `## Discrepancies Found`
     * `## Next Steps`

2. If issues are found, create a minimal fix plan:

   * `docs/Analysis/{FeatureModuleSlug}-fix-plan.md`
   * Include prioritized task list and acceptance criteria per task.

### B. Output Template for the Summary Markdown

Use exactly this structure in the generated file:

```md
# {Feature/Module} — Code‑Verified Functionality Analysis

**Analysis Date:** {YYYY-MM-DD}
**Analyzer:** GitHub Copilot
**Scope:** {short scope}

---

## Executive Summary
- **Status:** {Green/Yellow/Red}
- **Critical Issues:** {n}
- **Major Issues:** {n}
- **Minor Issues:** {n}

---

## Files Reviewed
### Entrypoints
- {path}

### Components
- {path}

### Hooks
- {path}

### Services
- {path}

### State / Stores
- {path}

### API Routes / Controllers
- {path}

### Constants / Types / Schemas
- {path}

### Database (if applicable)
- {path}

---

## Data Flow Architecture
{ASCII or Mermaid diagram}

---

## Component Analysis
### {ComponentName}
- **Status:** {Functional|Partially Functional|Broken|Unknown}
- **Data Source(s):** {hooks/services/APIs}
- **Input/Props:** {list}
- **Key Mappings:**
  - {source key} → {transform} → {prop/state}
- **Notes:** {behavior}
- **Evidence:** {path#Lx-Ly}

---

## Discrepancies Found
### {Issue Title}
- **Severity:** {Critical|Major|Minor}
- **What:** {description}
- **Where:** {path#Lx-Ly}
- **Impact:** {impact}
- **Proposed Fix:** {minimal actionable change}

---

## Success Criteria
| Criterion | Result | Evidence |
|---|---|---|
| End-to-end data traceable for each metric | {PASS/FAIL/UNKNOWN} | {path#Lx-Ly} |
| Empty/loading/error states handled | {PASS/FAIL/UNKNOWN} | {path#Lx-Ly} |
| No broken imports/routes | {PASS/FAIL/UNKNOWN} | {path#Lx-Ly} |

---

## Next Steps
1. {step}
2. {step}
3. {step}
```

## Deliverable Definition

When finished, provide:

* A link/reference to `docs/Analysis/{FeatureModuleSlug}-{YYYYMMDD}.md`
* A bullet list of prioritized fixes (if any)
* A short statement of what you would do next if time permitted

## Run Checklist (Before Marking Done)

* [ ] Inventory completed first
* [ ] Every claim has evidence (path + line range)
* [ ] Discrepancies include severity + proposed fix
* [ ] Summary Markdown written to `docs/Analysis/`
