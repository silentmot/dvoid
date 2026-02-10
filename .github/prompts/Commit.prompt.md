---
agent: Ops
description: This prompt is used to commit all current working tree changes in batches of 10 staged changes at a time, ensuring compliance with commitlint and committerrc policies.
name: CommitChanges
---

# Commit All Changes in Batches of 10

> **Apply all the steps below to commit all current working tree changes without pushing.**

You are operating inside VS Code with access to the **GitHub MCP tool** for repository actions. Your task is to commit _all current working tree changes_ in **batches of 10 staged changes at a time**.

## Non‑negotiable constraints

1. **Batching rule:** Stage **10 changes** (files) per commit. If fewer than 10 files remain, stage and commit the remainder.
2. **No guessing:** If any rule is ambiguous, **read the config files** and apply them exactly.
3. **Repeat until clean:** Continue the batch process until `git status` shows **no remaining changes**.

## Step 0 — Read policy/config sources

- Extract and summarize (internally) the concrete constraints that affect commit messages, including:
  - Allowed `type` values
  - Scope rules (required/optional, allowed formats)
  - Subject rules (case, length, punctuation, ticket prefixes)
  - Body/footer requirements
  - Any special conventions (breaking changes, references, issue IDs)

## Step 1 — Inspect repo state

- Run `git status --porcelain`.
- Build a deterministic list of changed files (including new/deleted/renamed).
- If there are **no changes**, stop.

## Step 2 — Create commit batches (10 files each)

For each batch:

1. **Select up to 10 files** from the remaining change list.
   - Prefer grouping by logical cohesion if it doesn’t violate the “10 files per commit” rule.
   - If cohesion conflicts, follow the deterministic ordering (e.g., `git status` order).

2. Review diffs for those files (to craft accurate commit messages).

## Step 3 — Stage the batch

- Stage **only** the selected batch files.
- Verify staged set:
  - `git diff --cached --name-only` must show **exactly** the batch files.

## Step 4 — Generate a compliant conventional commit message

Produce a **single commit message** that:

- Is accurate to the staged diff.
- Uses the most specific `type` and scope possible (based on config rules).

### Message construction requirements

- **Subject line:** concise, imperative, matches case/length rules.
- **Scope:** include only if allowed/required by config; use valid scope format.
- **Body:** include if required by `.committerrc.json` or if change complexity warrants it.
- **Footers:** include breaking change notation and references if required.

## Step 5 — Commit

- Commit the staged batch using the generated message.
- Immediately re-check:
  - `git status --porcelain` to confirm the batch is committed.

## Step 6 — Loop

- Repeat Steps 2–5 until the working tree is clean.

## Output expectations

For each commit, output:

1. **Batch index** (e.g., `Commit 1/N`)
2. **Staged file list** (10 or fewer)
3. **Final commit message** (exact text to be used)
4. **Confirmation** (show `git status --porcelain` result after commit)

## Use GitHub MCP

Use the GitHub MCP tool for:

- Reading files (`commitlint.config.ts`, `.committerrc.json`)
- Running git commands
- Staging specific files
- Committing changes

Proceed now.

## Optional (if MCP supports it): safer staging

If available, prefer explicit file-by-file staging APIs (or `git add <file1> ... <file10>`) over broad `git add -A`.

## Edge cases

- **Renames:** ensure rename pairs are within the same batch.
- **Generated/build artifacts:** do not commit unless the repo policy explicitly requires.
- **Lockfiles:** keep them with the dependency changes that caused them, if possible.
