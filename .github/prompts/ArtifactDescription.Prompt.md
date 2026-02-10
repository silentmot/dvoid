---
name: Universal Artifact Description Prompt
description: Source-Backed Document Generator for Any Type and reusable, mode-aware prompt template for generating functional descriptions of any software artifact (component, feature, module, service, API, workflow, schema, etc.).
agent: Ops
model: Claude Opus 4.5 (copilot)
---

## Preamble: Agent and Mode Selection

**Before proceeding,** declare your operating context:


- **Agent Type: **{AGENT_TYPE: DocOps | CoreOps | QA | UI/UX Artistic}
- **Mode:** {MODE: Factual | Procedural | Transformation | Creative}
- **Protocol:** GZANSP x AOC acknowledged


### Mode Definitions

| Mode | Purpose | Output Characteristics |
| ------ | --------- | ------------------------ |
| **Factual** | Document existing behavior from source code | Every statement cites exact source (file:line). No inference. |
| **Procedural** | Describe step-by-step workflows | Each step references source procedure. No improvisation. |
| **Transformation** | Convert specifications between formats | Explicit input/output schemas. No data enrichment. |
| **Creative** | Design specifications (UI/UX only, when explicitly requested) | Labeled as Creative. Constraints still sourced. |

### Mode Selection Rules

- **Documenting existing code**: Use `Factual`
- **Describing operational workflows**: Use `Procedural`
- **Converting specs to docs or vice versa**: Use `Transformation`
- **Designing unrealized features**: Use `Creative` (requires explicit request)

---

## Task Declaration


**Document:** {NAME} - Functional Description
**Artifact Type:** {TYPE: component | feature | module | service | api | workflow | schema | system | other}
**Mode:** {MODE}


**Task**: Generate a **complete natural-language** document describing **{NAME}** in **full functional detail**, adhering to the selected mode's constraints.

---

## Hard Rules (All Modes)

1. Write in **complete natural language** only
2. **No code snippets, pseudocode, or inline examples** unless Mode is `Transformation` with explicit schema requirements
3. Be specific and exhaustive: describe behaviors, flows, states, and edge cases
4. Act as if the reader is a developer and QA who will implement and test from this document
5. If information is missing: **HALT** and request clarification - **Never assume**
6. Every claim must be **traceable** to a source (file, line, spec section, or explicit user input)

### Mode-Specific Rules

**Factual Mode Additional Rules**:

- Cite exact source location for every statement
- Use format: `Source: {file}:{line} "{quoted fragment}"`
- No interpretive language ("probably", "likely", "should")

**Procedural Mode Additional Rules**:

- Number each step sequentially
- Reference source procedure for each step
- Include preconditions and postconditions

**Transformation Mode Additional Rules**:

- Define input schema explicitly
- Define output schema explicitly
- Document transformation rules

**Creative Mode Additional Rules** (UI/UX only):

- Label output as `[Creative Mode]`
- Source all constraints (design tokens, accessibility standards)
- Maintain type safety requirements

---

## Section Reference (Include sections relevant to artifact type)

### Section Applicability Matrix

| Section | Component | Feature | Module | Service | API | Workflow | Schema |
| --------- | ----------- | --------- | -------- | --------- | ----- | ---------- | -------- |
| 1. Purpose and Scope | Required | Required | Required | Required | Required | Required | Required |
| 2. User Goals and Use Cases | Required | Required | Required | Optional | Optional | Required | Optional |
| 3. Functional Overview | Required | Required | Required | Required | Required | Required | Required |
| 4. Data Model and Entities | If data | Required | Required | Required | Required | If data | Required |
| 5. Data Acquisition/Transformation | If data | If data | If data | If data | If data | If data | Required |
| 6. API/Backend Interaction | If backend | If backend | If backend | Required | Required | If backend | Optional |
| 7. UI/Presentation | Required | If UI | If UI | N/A | N/A | If UI | N/A |
| 8. Sorting/Filtering/Ranking | If lists | If lists | If lists | If lists | If lists | N/A | N/A |
| 9. CRUD Workflows | If CRUD | If CRUD | If CRUD | If CRUD | If CRUD | If CRUD | N/A |
| 10. Validation and Errors | Required | Required | Required | Required | Required | Required | Required |
| 11. State Machine/Lifecycle | Required | Required | Required | Required | Optional | Required | Optional |
| 12. Permissions and Security | Required | Required | Required | Required | Required | Required | Required |
| 13. Observability/Telemetry | Optional | Optional | Required | Required | Required | Optional | N/A |
| 14. Performance Expectations | Optional | Optional | Required | Required | Required | Optional | Optional |
| 15. Dependencies/Contracts | Required | Required | Required | Required | Required | Required | Required |
| 16. Edge Cases/Failures | Required | Required | Required | Required | Required | Required | Required |

---

## Section Definitions

### 1. Purpose and Scope

**What to document**:

- What **{NAME}** is and why it exists
- Problems it solves
- Explicit **in-scope** boundaries
- Explicit **out-of-scope** items (NON_GOALS)

**Mode guidance**:

- Factual: Cite requirements doc or code comments defining purpose
- Procedural: Reference specification that established scope
- Creative: State design goals with sourced constraints

### 2. User Goals and Primary Use Cases

**What to document**:

- Main user goals this artifact supports
- Core use cases in narrative form
- User types/roles involved: **{USER_TYPES}**

**Mode guidance**:

- Factual: Derive from existing test scenarios or user stories
- Procedural: List use cases as numbered workflows
- Creative: Propose use cases with explicit assumptions labeled

### 3. Functional Overview

**What to document**:

- Major capabilities of **{NAME}**
- Inputs: user actions, events, data, triggers
- Outputs: UI changes, stored records, API calls, derived data
- Key workflows and system interactions

**Mode guidance**:

- Factual: Map to actual function signatures and data flows
- Procedural: Describe as input -> process -> output sequences
- Transformation: Define I/O contracts explicitly

### 4. Data Model and Entities

**What to document**:

- Key entities, fields, and meanings (plain language)
- Required vs optional fields
- Data validity expectations (formats, ranges, constraints)
- Representation of missing/unknown data

**Mode guidance**:

- Factual: Reference schema files with exact field definitions
- Transformation: Provide source and target schema comparison

### 5. Data Acquisition / Extraction / Transformation

**What to document**:

- Data sources: **{DATA_SOURCES}**
- Extraction steps and rules (what, when, how)
- Transformation/normalization rules
- Conflict resolution (duplicates, mismatches, precedence)
- Failure handling for partial/uncertain results

**Mode guidance**:

- Factual: Cite data pipeline code
- Procedural: Step-by-step extraction procedure

### 6. API / Backend Interaction

**What to document**:

- Endpoint(s): **{API_ENDPOINTS}**
- Request intent and timing (triggers)
- State management: **{STATE_STRATEGY}**
- Query identity rules (keys, caching, invalidation, refetch)
- Pagination, filtering, sorting parameters
- Error handling (timeouts, 4xx/5xx, retries, fallbacks)
- Data freshness expectations
- Offline/degraded behavior

**Mode guidance**:

- Factual: Reference route handlers and API specs
- Procedural: Document request/response cycle steps

### 7. UI / Presentation and Interaction

**What to document**:

- Primary layout areas and content
- Data display (grouping, formatting, empty states)
- User actions (view, search, filter, sort, expand, navigate)
- Feedback (loading, progress, success, warnings)
- Accessibility (keyboard nav, focus, labels, readable errors)

**Mode guidance**:

- Factual: Reference component implementations
- Creative: Propose layouts with design token citations

### 8. Sorting / Filtering / Ranking Logic

**What to document**:

- Supported sort modes and precedence
- Filter behavior (multiple filters, inclusive/exclusive)
- Ranking rules (tie-breakers, stability)
- Special algorithms: **{SPECIAL_SORT_LOGIC}**
- Performance for large datasets

**Mode guidance**:

- Factual: Cite sorting/filtering implementations
- Procedural: Describe algorithm steps

### 9. Create / Update / Delete Workflows

**What to document**:

- Add flow: required data, validation, confirmation, persistence
- Edit flow: editable fields, constraints, concurrency
- Delete flow: soft vs hard delete, confirmation, undo
- Permission restrictions (who can do what)
- Audit expectations (history, timestamps, attribution)

**Mode guidance**:

- Procedural: Document as numbered steps with preconditions

### 10. Validation and Error Messaging

**What to document**:

- Validation rules for inputs and derived data
- Validation timing (on input, submit, save, sync)
- Error display rules (location, specificity)
- Recovery actions (retry, edit, reset, escalation)

**Mode guidance**:

- Factual: Reference validation schemas (Zod, etc.)

### 11. State Machine / Lifecycle

**What to document**:

- States: initial, loading, success, empty, error, partial
- Transition triggers
- UI/system behavior per state

**Mode guidance**:

- Factual: Derive from state management code
- Procedural: Document as state transition table

### 12. Permissions, Security, and Compliance

**What to document**:

- Auth requirements and access control
- Sensitive data handling (masking, logging)
- Input sanitization
- Compliance constraints: **{COMPLIANCE_CONTEXT}**

**Mode guidance**:

- Factual: Reference permission checks and security policies

### 13. Observability and Telemetry

**What to document**:

- Events and metrics to track
- Traceability (UI -> API -> persistence)
- Debug requirements without exposing sensitive data

### 14. Performance and Reliability Expectations

**What to document**:

- Responsiveness targets
- Large dataset handling
- Retry/backoff strategy
- Rate-limiting behavior

### 15. Dependencies and Integration Contracts

**What to document**:

- Internal dependencies (modules, components)
- External services
- Configuration requirements (flags, env vars, routes)
- Contract stability expectations

**Mode guidance**:

- Factual: Reference import statements and config files

### 16. Edge Cases and Failure Scenarios

**What to document**:

- Missing/invalid data
- Duplicate/conflicting records
- Partial API failures
- Out-of-order responses
- User interruptions
- Concurrent edit conflicts

---

## Input Template

Copy and fill before invoking:


## Artifact Inputs

- **NAME**: {artifact name}
- **TYPE**: {component | feature | module | service | api | workflow | schema | system}
- **MODE**: {Factual | Procedural | Transformation | Creative}
- **DOMAIN**: {business domain or context}
- **USER_TYPES**: {roles/personas who interact}
- **DATA_SOURCES**: {where data originates}
- **API_ENDPOINTS**: {relevant endpoints, format: /api/[module]/[resource]}
- **STATE_STRATEGY**: {state management approach}
- **SPECIAL_SORT_LOGIC**: {ranking/ordering algorithms if any}
- **COMPLIANCE_CONTEXT**: {regulatory or policy constraints}
- **CONSTRAINTS**: {technical or business constraints}
- **NON_GOALS**: {explicitly out of scope}
- **SOURCE_FILES**: {files to reference for Factual mode}


---

## Output Format

The generated document must follow this structure:


# {NAME} - Functional Description

**Artifact Type**: {TYPE}
**Mode**: {MODE}
**Domain**: {DOMAIN}
**Generated**: {date}

## Sources Referenced

- [{file}:{line}] "{fragment}"


## Scope Coverage

| Item | Status |
| ------ | -------- |
| {section} | Documented / Not Applicable / Flagged: {reason} |

[Sections 1-16 as applicable per matrix]

## Assumption Check

Zero assumptions made - All statements sourced from: [list sources]

## Coverage

{X}/{Y} applicable sections documented (100% required)


---

## Quick-Start Variants

### Variant A: Factual Documentation (Existing Code)


**Agent Type:** DocOps
**Mode:** Factual

Document **{NAME}** ({TYPE}) by examining source code.
For each statement, cite: Source: {file}:{line} "{fragment}"
Include: purpose, data model, API interactions, state lifecycle, validation, edge cases.
HALT if source is ambiguous.

Inputs:
- NAME: {name}
- TYPE: {type}
- SOURCE_FILES: {files to examine}


### Variant B: Procedural Workflow Documentation


**Agent Type:** DocOps
**Mode:** Procedural

Document the **{NAME}** workflow step-by-step.
Number each step. Reference source procedure. Include preconditions/postconditions.
Cover: triggers, actions, validations, state transitions, error recovery.

Inputs:
- NAME: {workflow name}
- TYPE: workflow
- SOURCE_FILES: {implementation files}


### Variant C: Transformation (Spec to Doc)


**Agent Type:** DocOps
**Mode:** Transformation

Transform the specification for **{NAME}** into functional documentation.
Input Schema: {spec format}
Output Schema: Functional Description sections 1-16
No data enrichment. Document transformation rules applied.

Inputs:
- NAME: {name}
- TYPE: {type}
- INPUT_SPEC: {specification source}


### Variant D: Creative Design Spec (UI/UX Only)


**Agent Type:** UI/UX Artistic
**Mode:** Creative [explicitly requested]

Design a functional specification for **{NAME}** ({TYPE}).
Label output as [Creative Mode].
Source all constraints from design tokens and accessibility standards.
Include: layout, interactions, states, accessibility, responsive behavior.

Inputs:
- NAME: {name}
- TYPE: component
- DESIGN_TOKENS: {token source}
- ACCESSIBILITY: WCAG 2.1 AA


---

## Validation Checklist

Before delivery, verify:

- [ ] **Agent Type:** declared
- [ ] **Mode:** selected and validated for agent type
- [ ] All sources cited with file:line format
- [ ] Scope coverage table included
- [ ] Zero assumptions made (or HALT issued)
- [ ] Sections match applicability matrix
- [ ] No banned terminology used
- [ ] Output format followed

---

## Example Input (Reference Only)


## Artifact Inputs

- NAME: Site Selector
- TYPE: component
- MODE: Factual
- DOMAIN: Facility Management
- USER_TYPES: Admin, Manager, Operator
- DATA_SOURCES: Prisma (Site model)
- API_ENDPOINTS: /api/sites
- STATE_STRATEGY: Zustand store + React Query
- SPECIAL_SORT_LOGIC: None
- COMPLIANCE_CONTEXT: Multi-tenant isolation
- CONSTRAINTS: Must support ALL_SITES virtual aggregation
- NON_GOALS: Site CRUD (handled elsewhere)
- SOURCE_FILES: components/SiteSelector.tsx, lib/stores/site-store.ts
