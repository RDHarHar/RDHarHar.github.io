# Project Guidance and Lessons

## Purpose

This file is persistent working memory for development of Ryan Harwick's personal website.
Read it before making changes. Add dated decisions, constraints, and lessons that help future work.
Keep detailed change records in `CHANGELOG.md`. Never store secrets or private personal information here.

## Project facts

- Owner: Ryan Harwick; GitHub: `RDHarHar`.
- Repository: https://github.com/RDHarHar/RDHarHar.github.io
- Workspace: `E:\Personal Website`.
- Imported baseline: `3a5be56308cbfbac516530f4fa6bc0742628f2c0` on `main`.
- Stack: static HTML, inline CSS, browser JavaScript; no dependencies or build process.
- Existing pages: `index.html` and `melvorCalc.html`.
- Active calculator logic is inline in `melvorCalc.html`; neither page loads `index.js`.
- GitHub Pages hosting was confirmed on 2026-09-15 through public repository metadata and the live
  site at https://rdharhar.github.io/. Authenticated branch/build settings remain to be checked.

## Collaboration

- Ryan wants incremental development and will supply content through future requests.
- Check Git status before edits and preserve unrelated work.
- Complete requested implementation and appropriate validation.
- Ground personal biography, contact information, project claims, and account links in owner-provided information.
- Distinguish local changes, commits, and published releases when reporting results.

## Design and engineering principles

### 2026-09-15 — Initial baseline

- Existing appearance: dark gray background, light text, centered content, native buttons and inputs.
  This describes the imported site; it is not a finalized visual identity.
- No new visual direction or content structure has been approved yet.
- Preserve static hosting compatibility and existing page URLs unless a requested change requires migration.
- Start with the lightweight stack; add dependencies only for a concrete need.
- For new UI, use semantic HTML, keyboard-accessible controls, visible focus, associated labels,
  readable contrast, and layouts that work on small screens.
- Prefer relative internal links and asset paths compatible with local preview and static hosting.
- Validate empty, invalid, and boundary numeric inputs when modifying the calculator.

## 2026-09-15 — First visual concepts (0.2.0)

- Ryan requested multiple style directions before choosing a final design.
- Proposals live under `concepts/`; the original homepage and calculator remain unchanged.
- Editorial: warm paper `#f3f0e8`, olive, serif headlines, abstract orbital art, and a project list.
- Workbench: charcoal `#101314`, lime `#c3f568`, large sans-serif headlines, monospace details, project cards.
- Playground: off-white, cobalt `#222bdb`, citrus `#e6fc77`, bold typography, graphic stickers and hard shadows.
- All three use the existing Melvor calculator as the only real project; other copy is exploratory.
- No direction is approved yet. Let Ryan's feedback determine which elements to retain or combine.
- Keep previews self-contained: current concepts use system fonts, CSS, and inline SVG without external assets.
- Gallery style and width selections live in query parameters for bookmarking and browser navigation.
- Lesson: changing an iframe's source can add unwanted joint browser-history entries. The gallery replaces
  the preview frame when changing styles so Back restores the intended style/width state.
- External GitHub links open in a separate tab so they work from inside the embedded preview.

## 2026-09-15 — Selected direction and theme settings (0.3.0)

- Ryan prefers concept 02, Workbench, but wants it less bulky and wants color options under Settings.
  This supersedes the earlier pending-direction status.
- The local `index.html` now uses a compact Workbench layout: 960px maximum width, 54px maximum hero
  headline (previously 94px), tighter section spacing, and one horizontal project row.
- Preserve the reduced density and avoid restoring oversized cards and empty placeholder panels.
- Settings offers Graphite (default charcoal/lime), Ocean (navy/blue), Violet (ink/lavender),
  and Paper (warm light/forest green). Use CSS custom properties for all homepage colors.
- Save theme choice under `ryan-harwick-theme` in localStorage. Restore before stylesheet load to avoid
  a wrong-theme flash; allow switching even when storage is blocked. Never imply server-side account settings.
- Projects/Settings are accessible tabs with native theme radio inputs, keyboard navigation, and URL hashes.
- `index.html` and `concepts/workbench.html` share `assets/site.css` and `assets/site.js`.
  Keep their page markup aligned, adjusting only relative links for the different directory depths.
- The old standalone `concepts/workbench.css` was removed to avoid keeping a competing styling source.
- The original calculator is not yet themed and its known defects remain outside this design change.
- Palette selection is a visitor preference; adding future content should not depend on one palette.

## Known issues from initial inspection (original site)

These predate setup and remain unfixed. Game formulas have not been verified against current rules.

- `melvorCalc.html`: empty fields produce `NaN`; placeholders do not provide default values.
- Its strict comparisons can incorrectly select melee when ranged and magic tie above melee.
  Temporary calculation variables are assigned without declarations.
- Unused `index.js` disagrees with the active page on the prayer multiplier (`0.6` versus `0.5`).
  Its magic-dominant branch assigns melee, and ties can leave the initial highest value of `1`.
- The calculator still places `style` outside `head` and lacks associated input labels.
  The original homepage's invalid style placement was resolved by its replacement in 0.3.0.
- Establish intended game rules before consolidating calculator implementations.

## Lessons learned

### 2026-09-15 — Setup

- Check script references: editing `index.js` alone will not affect the live calculator page.
- A loopback-only Python HTTP server suffices for preview; no package manager is needed.
- Preserve imported Git history and record the baseline for traceability.
- The imported README was not UTF-8; setup rewrote it as UTF-8 for normal Markdown tooling.

## Version and record convention

- `CHANGELOG.md` is the source of truth for development versions.
- Start at `0.1.0` for setup; do not retroactively assign versions to old commits.
- Use `0.x.0` for meaningful feature increments and `0.x.y` for smaller fixes or documentation updates.
- Each completed batch records an ISO date/time with timezone, local/published status, changed files,
  exact changes, checks actually performed, and remaining limitations.
- Record lasting lessons here rather than duplicating whole changelog entries.
