---
name: refactorComponent
description: Refactor a demo/hardcoded component to production-ready with dynamic data, SSOT patterns, and proper state management.
argument-hint: Path to the component to refactor and a reference component to follow
---
# Refactor Component to Production-Ready

Refactor the specified component from a demo/hardcoded implementation to a production-ready component following established patterns.

Never create standalone components if an update to an existing one is sufficient; always refactor in place unless instructed otherwise.

Always state your refactoring approach before providing the code. Halt and wait for confirmation before proceeding with the code to ensure alignment and **Avoid Duplication**.

> All components must follow the project's Design System and Architectural Patterns for consistency and maintainability.

## Requirements

1. **Eliminate Hardcoded Values**

   - Extract, Create, than Remove in line Sub Components
   - Remove local type definitions that duplicate centralized types
   - Remove hardcoded constants (labels, colors, mock data generators)
   - Import all constants from the Single Source of Truth (SSOT) location
   - Import colors from design tokens
   - Utilize `useTheme` hook or CSS variables to eliminate hardcoded hex/utility values (e.g., replace `bg-slate-950` with `theme.background.primary`, `var(--background-surface)`, etc.)

2. **Integrate Dynamic Data & State**

   - Replace mock data with real-time data fetching via hooks or props
   - Use appropriate store selectors for current global state (user context, site settings, filters)
   - Add data transformation logic to convert API responses to the component's required interface
   - Ensure the component reacts correctly when parameters or props change (reactivity)

3. **Follow Reference Component Patterns**

   - Match the import/export pattern of the provided reference component
   - Use the same state handling wrapper patterns (loading skeletons, error boundaries, empty states)
   - Apply consistent styling, spacing, and positioning logic
   - Maintain consistent hover/interaction behaviors defined in the reference

4. **Maintain Functional & Visual Integrity**

   - Preserve the existing core functionality and UI configuration
   - Keep tooltips, labels, accessible attributes, and visual styling intact
   - Ensure proper alignment with sibling components in the layout
   - Adhere strictly to design tokens for all style values

5. **Clean Up**

   - Remove extra debug panels, temporary placeholders, or non-production elements
   - Remove `console.log` and commented-out code
   - Update parent page imports to use the refactored component if file paths changed (though in-place refactor is preferred)
   - Remove unused imports and dead variables from parent components

## Execution Steps

1. Analyze the reference component for structural and logic patterns
2. Identify SSOT locations for constants, types, and theme tokens
3. Refactor the target component to use dynamic data fetching and centralized state
4. Update container styling and internal logic to match the reference implementation
5. Verify parent page integration (updates props or imports if necessary)
6. Clean up unused imports and dead code

## Core Paths to consider during refactor:

**`@app/`**

- `app/api/[[...route]]/routes/**.ts` Hono/Next.js API routes for data fetching

**`@components/`**

- `components/shared/**.tsx` Shared customized Components
- `components/**` Components used across multiple pages

**`@lib/`**

- `lib/api/modules/**.ts` API data fetching and transformation logic
- `lib/api/types/**.ts` Centralized types for API responses and entities
- `lib/constants/**.ts` Centralized constants for labels, config, etc.
- `lib/stores/**.ts` Store selectors for global state application
- `lib/hooks/**.ts` Custom hooks for data fetching and logic reuse
- `lib/schemas/**.ts` Zod schemas for validation
- `lib/types/**.ts` Centralized TypeScript types
- `lib/services/**.ts` Business logic services for data processing
