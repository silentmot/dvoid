---
applyTo: '**'
---
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
