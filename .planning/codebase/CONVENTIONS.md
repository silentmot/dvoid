# Coding Conventions

**Analysis Date:** 2024-02-10

## Naming Patterns

**Files:**
- PascalCase for component files: `RealityCompilerHero.tsx`
- kebab-case for routes: `uses/page.tsx`
- camelCase for utility functions: `cn()`

**Functions:**
- PascalCase for React components: `const RealityCompilerHero = () => {}`
- camelCase for utility functions: `const cn = () => {}`
- Private variables prefixed with underscore: `_privateVar`

**Variables:**
- camelCase for local variables: `const [isClient, setIsClient] = useState(false)`
- PascalCase for interfaces: `interface RealityCompilerHeroProps {}`
- Type aliases using PascalCase: `type UserId = string`

**Types:**
- PascalCase for interfaces and type aliases
- Union types with descriptive names: `type Status = 'loading' | 'success' | 'error'`

## Code Style

**Formatting:**
- Tool: Biome
- Indentation: Tabs (not spaces)
- Quotes: Double quotes for strings
- Line length: Not enforced but kept reasonable
- Trailing commas: Always in multi-line structures

**Linting:**
- Tool: Biome
- Key rules enforced:
  - `noUnusedVariables`: error
  - `noExplicitAny`: error
  - `noVar`: error (use `const` and `let` instead)
  - `useConst`: error (use `const` when possible)
  - `useAsConstAssertion`: error (use `as const` when possible)

## Import Organization

**Order:**
1. React imports: `import { FC, useEffect, useState } from "react"`
2. External library imports: `import { Float, Stars } from "@react-three/drei"`
3. Internal imports with @ alias: `import { cn } from "@/lib/utils"`
4. Relative imports: `import { Button } from "../ui/button"`

**Path Aliases:**
- `@/*` maps to the project root: `@/lib/utils` → `./lib/utils`

## Error Handling

**Patterns:**
- No explicit error handling patterns observed in the codebase
- TypeScript strict mode enabled in tsconfig.json
- Optional chaining used for safe property access: `optional?.prop`

## Logging

**Framework:** Console logging only
**Patterns:**
- No formal logging framework implemented
- Development-time console.log statements are not standardized

## Comments

**When to Comment:**
- Complex shader code has extensive comments
- Component sections are commented with `//` syntax
- TypeScript interfaces are commented before their definitions

**JSDoc/TSDoc:**
- Not consistently used across the codebase
- Primarily used for public interfaces

## Function Design

**Size:** Components are moderately sized (100-400 lines)
**Parameters:** Destructured object props with defaults
**Return Values:** JSX elements or null for components

**Example pattern:**
```typescript
const Component: FC<Props> = ({
  prop1 = defaultValue,
  prop2,
}: Props) => {
  // implementation
  return <div>{/* content */}</div>;
};
```

## Module Design

**Exports:**
- Default exports for components: `export default RealityCompilerHero;`
- Named exports for utilities: `export function cn() {}`
- No barrel files (index.ts) in directories

**Imports:**
- Dynamic imports used for large components: `const Component = dynamic(() => import('./Component'))`
- Tree-shaking enabled through specific imports

## Component Patterns

**Structure:**
- Interface definitions at top of file
- Components separated by comments
- Fallback components for different rendering modes

**Props:**
- Optional props with default values
- TypeScript interfaces for props
- Destructured with spread operator for rest props

**State:**
- useState for component state
- useEffect for side effects
- useMemo for expensive calculations
- useRef for direct DOM access

---

*Convention analysis: 2024-02-10*