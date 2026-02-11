# Data Spine Hero Variations (Wordless Engineering)

Goal: one hero concept (“Data Spine”) with **3 distinct art directions** that remain:

- dark-only, quiet premium
- teal-forward (no neon)
- minimal motion outside hero
- wordless (no labels)
- accessible (reduced-motion + mobile static poster fallback)

---

## Option A — Black Ice Blueprint

**Vibe:** precise, architectural, “CAD meets glass”.

- **Palette:** deep near-black backgrounds; teal as the only active hue; secondary is desaturated blue-grey.
- **Materials:** glass edges + thin rim light; minimal reflections; no bloom.
- **Spine:** a single clean spline with subtle thickness taper (authority gradient).
- **Nodes:** sharp, technical primitives (octahedra + rings). Internals revealed only under lens.
- **Signals:** sparse packets; duplicates collapse instantly (idempotency) with crisp snap.
- **Backdrop:** faint world grid plane (very low alpha) + soft noise film.
- **Camera:** stable, slow drift (sub-1% movement), parallax tied to pointer.

**Best if you want:** maximum “engineering” credibility and restraint.

---

## Option B — Glass Circuit Sculpture

**Vibe:** premium product sculpture; still technical, slightly warmer.

- **Palette:** charcoal + teal; occasional muted sea-green highlight (still within teal family).
- **Materials:** more pronounced HDR reflections (controlled); glass + brushed-metal mix.
- **Spine:** appears like a polished conductor channel.
- **Nodes:** dodecahedron orchestrator core + ring contracts; nodes feel like designed hardware.
- **Signals:** packets have a micro “scanline” trail (subtle). Retries show delayed pulse loop.
- **Backdrop:** volumetric haze *very light* (only desktop), none on mobile.
- **Camera:** slightly closer framing; hero reads like a premium product page.

**Best if you want:** most “wow” while staying quiet-premium.

---

## Option C — Lineage Constellation Minimal

**Vibe:** ultra-minimal, cerebral; almost museum-like.

- **Palette:** near-black + teal; everything else nearly monochrome.
- **Materials:** matte ceramics + thin emissive edges (no glass dominance).
- **Spine:** barely-there line; becomes visible under lens (inspection theme).
- **Nodes:** tiny, precise forms; interactions reveal lineage paths rather than big lighting changes.
- **Signals:** extremely sparse—only a few packets at a time.
- **Backdrop:** clean void + subtle vignette gradient; no stars.
- **Camera:** almost static; pointer only affects local clarity.

**Best if you want:** the most serious, “systems architect” tone.

---

## Shared semantics (all options)

Visual rules (so it’s readable without words):

- **Line thickness = authority** (spine thickest; secondary edges thinner)
- **Brightness = health** (teal bright = good; muted teal = waiting)
- **Off-ramp containment** = dead-letter/quarantine (dim node, only reveals under lens)
- **Contract gate** = iris shutter ring (brief close/open as packets pass)
- **Idempotency** = duplicate packet collapses into original (clean snap)

---

## Mobile + reduced-motion

- **Mobile default:** static poster (same composition). Optional “lite 3D” later.
- **Reduced motion:** no smooth scroll, no phase shifts; still hero/poster.
