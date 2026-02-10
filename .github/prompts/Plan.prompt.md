# Create Implementation Plan

## Primary Directive

Your goal is to create a new implementation plan file for `${input:PlanPurpose}`. Your output must be machine-readable, deterministic, and structured for autonomous execution by other AI systems or humans.

## Execution Context

This prompt is designed for AI-to-AI communication and automated processing. All instructions must be interpreted literally and executed systematically without human interpretation or clarification.

## Core Requirements

- Generate implementation plans that are fully executable by AI agents or humans
- Check the current implementated code to avoid duplication
- Use deterministic language with zero ambiguity
- Structure all content for automated parsing and execution
- Ensure complete self-containment with no external dependencies for understanding

## Plan Structure Requirements

Plans must consist of discrete, atomic phases containing executable tasks. Each phase must be independently processable by AI agents or humans without cross-phase dependencies unless explicitly declared.

## Phase Architecture

- Each phase must have measurable completion criteria
- Tasks within phases must be executable in parallel unless dependencies are specified
- Order phases/tasks sequentially based on dependencies
- All task descriptions must include specific file paths, function names, and exact implementation details
- No task should require human interpretation or decision-making

## AI-Optimized Implementation Standards

- Use explicit, unambiguous language with zero interpretation required
- Structure all content as machine-parseable formats (tables, lists, structured data)
- Include specific file paths, line numbers, and exact code references where applicable
- Define all variables, constants, and configuration values explicitly
- Provide complete context within each task description
- Use standardized prefixes for all identifiers (REQ-, TASK-, etc.)
- Include validation criteria that can be automatically verified uopon task completion
- Include the CHANGELOG.md update instructions at the end of each task.

## Output File Specifications

- Save implementation plan files in `docs/plans/` directory
- Use naming convention: `[purpose]-[component]-[version].md`
- Purpose prefixes: `Upgrade|Refactor|Feature|Data|Infrastructure|Process|Architecture|Design`
- Example: `Upgrade-System-Command-4.md`, `Feature-Auth-Module-1.md` (Train-Case)
- File must be valid Markdown with proper front matter structure

## Mandatory Template Structure

All implementation plans must strictly adhere to the following template. Each section is required and must be populated with specific, actionable content. AI agents must validate template compliance before execution.

## Template Validation Rules

- All front matter fields must be present and properly formatted
- All section headers must match exactly (case-sensitive)
- All identifier prefixes must follow the specified format
- Tables must include all required columns
- No placeholder text may remain in the final output

## Status

The status of the implementation plan must be clearly defined in the front matter and must reflect the current state of the plan. The status can be one of the following with their corresponding badge colors:

- `Completed`: ![Completed](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
- `In progress`: ![In progress](https://img.shields.io/badge/Status-In%20progress-yellow?style=flat-square)
- `Planned`: ![Planned](https://img.shields.io/badge/Status-Planned-blue?style=flat-square)
- `Deprecated`: ![Deprecated](https://img.shields.io/badge/Status-Deprecated-red?style=flat-square)
- `On Hold`: ![On Hold](https://img.shields.io/badge/Status-On%20Hold-orange?style=flat-square)

The status badge should be displayed in the Task introduction section using the appropriate shields.io URL.

---

- Goal: [Concise Title Describing the Package Implementation Plan's Goal]
- Version: [Optional: e.g., 1.0, Date]
- Date Created: [YYYY-MM-DD]
- Last Updated: [Optional: YYYY-MM-DD]
- Owner: [Optional: Team/Individual responsible for this spec]
- Status: 'Completed'|'In progress'|'Planned'|'Deprecated'|'On Hold'
- Tags: [Optional: List of relevant tags or categories, e.g., `feature`, `upgrade`, `chore`, `architecture`, `migration`, `bug` etc]

---
<!--markdownlint-disable MD025-->
# Introduction

![Static Badge](https://img.shields.io/badge/Implementation-Plan-P01?style=flat-square&logoColor=hsl(167%2C%2064%25%2C%2039%25)&logoSize=auto&labelColor=hsl(51%2C%20100%25%2C%2070%25)&color=hsl(221%2C%2057%25%2C%2012%25))

[A short concise introduction to the plan and the goal it is intended to achieve.]

## 1. Requirements & Constraints

[Explicitly list all requirements & constraints that affect the plan and constrain how it is implemented. Use bullet points or tables for clarity.]

- **REQ-001**: Requirement 1
- **SEC-001**: Security Requirement 1
- **[3 LETTERS]-001**: Other Requirement 1
- **CON-001**: Constraint 1
- **GUD-001**: Guideline 1
- **PAT-001**: Pattern to follow 1

### 2. Phases & Tasks

>Each phase must include 3-5 tasks based on the documented requirements and constraints. Tasks within phases should be executable in parallel unless dependencies are specified.

### 3. Implementation Phases

- GOAL-001: [Describe the goal of this phase, e.g., "Implement feature X", "Refactor module Y", etc.]

| Phase | Description | Status | Date |
|------|-------------|--------|------|
| {Phase-ID} | {Description} | {Status} | {Date} |
| {Phase-ID} | {Description} | {Status} | {Date} |
| {Phase-ID} | {Description} | {Status} | {Date} |

### 4. Phases Documents Structure

[A bullet point list of phase document structures that need to be created as part of the plan.]

- **PH-001**: Initial Phase plan `docs/plans/[purpose]-[component]-[version].md`
- **PH-002**: Second Phase plan `docs/plans/[purpose]-[component]-[version].md`
- **PH-003**: Third Phase plan `docs/plans/[purpose]-[component]-[version].md`
- Additional phases as needed

### 5. Dependencies

[List any dependencies that need to be addressed, such as libraries, frameworks, or other components that the plan relies on.]

- **DEP-001**: Dependency 1
- **DEP-002**: Dependency 2

### 5. Files

[Is defined in the task structure if required. based on the task type.]

### 6. Testing

[Is defined in the task structure if required. based on the task type.]

### 7. Related Specifications / Further Reading

[Link to related spec 1]
[Link to relevant external documentation]

---

## Phase Template

**Phase Title:** [Concise Title Describing the Phase]
**Phase ID:** [Unique Identifier]

### Goal {Phase-ID}

[Describe the goal of the phase.]

### Tasks {Phase-ID}

| Task ID | Description | Status | Date |
|---------|-------------|--------|------|
| {Task-ID} | {Description} | {Status} | {Date} |
| {Task-ID} | {Description} | {Status} | {Date} |

**Tasks Details:**

- See Task Template below for detailed task descriptions.

### Phase Validation Criteria  {Phase-ID} (Checklist end of Phase)

- [ ] [Validation Item 1]
- [ ] [Validation Item 2]
- [ ] [Validation Item 3]
- [ ] [Validation Item 4]
- [ ] [Validation Item 5]

---

## Task Template

**Task Title:** [Concise Title Describing the Task]
**Task ID:** [Unique Identifier]
**Size:** [Size Category]
**Priority:** [Priority Level]

### Objective {Task-ID}

[Describe the objective of the task.]

### Implementation Details {Task-ID}

**Files to Create/Update/Delete:**

- `[File Path]` - [Description of the file's purpose]

**Data Model:**

```typescript
// [TypeScript data model]
```

#### Key Features {Task-ID}

- [Feature 1]
- [Feature 2]
- [Feature 3]

#### Validation Checklist {Task-ID}

- [ ] [Validation Item 1]
- [ ] [Validation Item 2]
- [ ] [Validation Item 3]

#### Documentation References  {Task-ID}

- `[Link to relevant documentation]`
- `[Link to additional resources]`

---
