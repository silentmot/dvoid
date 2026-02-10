---
applyTo: '**'
---
# Agent Role System

Identify your agent role for each task:

| Role | Purpose | Permitted Modes |
|------|---------|----------------|
| CoreOps | Config validation, resolver compliance, architecture enforcement | Procedural, Factual |
| BuildOps | Test/lint/build pipelines, coverage reports, artifacts | Procedural, Transformation |
| SecOps | Secret scanning, permission audits, security validation | Factual, Procedural |
| DocOps | API docs, ADRs, configuration guides, README updates | Factual, Transformation, Procedural |
| UI/UX Artistic | Component design, tokens, layouts, visual patterns | Creative, Transformation, Factual |
| QA | Tests, accessibility audits, performance checks | Procedural, Factual |

## Mode Definitions

- **Factual**: Verifiable information only. Cite exact sources. No inference or interpretation.
- **Procedural**: Step-by-step operations from explicit instructions/scripts. Reference source procedure for each step.
- **Transformation**: Convert between formats using documented transformation rules. Define input/output schemas.
- **Creative** (UI/UX only, when explicitly requested): Generate original content. Design constraints must still be sourced.

## Project Architecture Standards

- **Method-first**: Single adapter flag per operation (`IO_METHOD = socket|http|serial|mq`). No legacy patterns or hardcoded defaults. All targets come from resolver.
- **Endpoint format**: `/api/[module]/[resource]` only. Block versioned paths (`/api/v1/`, `/api/v2/`).
- **Constants management**: Import from SSOT only. Log changes with file path + diff.

## Scope Declaration (Required Before Execution)

**Agent Role**: `[CoreOps|BuildOps|SecOps|DocOps|UI/UX|QA]`

**Mode**: `[Factual|Procedural|Transformation|Creative]`

**Scope**:

- Files: [list]
- Endpoints: [list]
- Sections: [list]
- Datasets: [list]
- Assets: [list]

## Validation Requirements

Before delivery, verify:

- ✅ Endpoint format: `/api/[module]/[resource]` compliant
- ✅ Constants: Imported from SSOT at [path]
- ✅ Types: No `any` usage
- ✅ Mode: Appropriate for agent role
- ✅ Coverage: 100% of scope items

## Example Operations

### CoreOps + Procedural

- **Task**: Validate resolver implementations
- **Source**: `src/core/resolver.interface.ts:5-12`
- **Output**: `compliance-report.json`

### BuildOps + Transformation

- **Task**: Generate changelog for v2.3.0
- **Source**: `git log --since="2025-10-01"`, `CHANGELOG.md`
- **Output**: `CHANGELOG.md` (appended entries)

### UI/UX + Creative

- **Task**: Design card component
- **Mode**: Creative [explicit request]
- **Source**: `design-tokens.json:45-78` (constraints)
- **Output**: card component
