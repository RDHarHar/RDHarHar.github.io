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
- Current pages: `index.html`, résumé placeholders under `about/`, and design studies under `concepts/`.
- The Melvor calculator and unused `index.js` were removed at Ryan's request in 0.4.0.
- GitHub Pages hosting and authenticated settings were confirmed on 2026-09-15:
  https://rdharhar.github.io/ deploys from `main`, repository root `/`, using the branch-based Pages build.

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

## 2026-09-15 — Content structure (0.4.0)

- Exact tagline: “Building things. Breaking things. Learning along the way.”
- Section order is About me, Reports, Web Apps, Gaming, then Settings. About me is the default.
- Use distinct static pages under `about/` for résumé content; initial pages are Job history, Education, and Skills.
- Biography, portrait, work/education/skills details, and contact information are placeholders until supplied.
  Do not add fabricated history, credentials, contact endpoints, or a pretend-working contact form.
- Reports will contain statistical reports supplied by Ryan. Web Apps and Gaming have no posted projects yet.
- Ryan provided the Twitch channel https://www.twitch.tv/arcticwes for Arctic Wes; link to it from Gaming.
  Do not show a live/offline status unless backed by actual stream data.
- The calculator was removed completely, including its unused script and links in alternative design concepts.
- Shared theme code must work on both tabbed pages and résumé pages without Settings controls.
- Keep responsive tabs keyboard-accessible, and use `#about`, `#reports`, `#web-apps`, `#gaming`, and `#settings`.
- Ryan requested publication of all 0.4.0 changes on 2026-09-15. Release commit `e76530f` deployed
  successfully; all 15 served source files matched the release and both retired URLs returned 404.

## 2026-09-15 — UTC Converter (0.5.0)

- The first Web App is `web-apps/utc-converter.html`, based on Ryan's supplied mockup:
  stacked live Local/UTC clocks above adjacent UTC-to-local and local-to-UTC panels.
- Preserve the two-panel desktop layout, stack on mobile, and inherit the existing saved theme.
- “Local” means the visitor's device time zone, not Ryan's time zone or a fixed offset.
- Always convert a date together with the time; offsets depend on the chosen date. Show the result date
  so crossing midnight, month, or year is clear. Results use 24-hour time and an explicit offset.
- Reject nonexistent local times and expose both occurrences of repeated times. Do not silently adjust
  a daylight-saving gap or assume all clock changes are one hour.
- Conversion helpers live in `assets/utc-core.js`; UI code lives in `assets/utc-converter.js`.
- Run `node --test tests/utc-converter.test.cjs` when changing conversion logic.
- The supported input years are 1900–9999. Time-zone correctness relies on the browser's timezone data.
- Version 0.5.0 is local until publication is requested.

## 2026-09-15 — Epoch support (0.6.0)

- Ryan clarified that the numeric timestamp they wanted was Unix epoch time, and asked to add it alongside UTC.
- Keep the existing converter URL. The page and Web Apps card are now named UTC & Epoch Converter.
- Epoch input explicitly selects seconds or milliseconds; never infer units solely from digit count.
- Accept integer timestamps, including zero and negatives, within UTC years 1900–9999.
- Preserve millisecond precision in epoch-to-date results. Date inputs now accept seconds and output both epoch units.
- The live epoch display refreshes once per second, including its millisecond snapshot.
- Version 0.6.0 remains local; it includes all previously unpublished converter work.

## 2026-09-15 — Converter layout and reverse form (0.7.0)

- Ryan requested the exact heading “Epoch time” and moved epoch conversion below the two UTC/local panels.
- The lower row pairs Epoch time (timestamp to date) with Date and time (date to epoch).
- The dedicated reverse form selects Local or UTC, returns both epoch units, and reuses the existing
  validation and daylight-saving helpers. Keep repeated-hour selection and Use now correct in local mode.
- Inputs/zone changes clear stale reverse results. The four panels stack in document order on mobile.
- Version 0.7.0 remains local until publication is requested.

## Home layout — 2026-09-15 (0.8.0)

- Home is now the default tab and fallback for unknown hashes, superseding About me as the landing section.
- Follow Ryan's sketch: large latest-update panel left, five smaller recent entries right, then FAQ left
  and Quick info right. Stack content on narrow screens; preserve the existing themes and compact design.
- The recent-five list includes the newest/featured entry. Selecting an entry updates the large panel.
- Update entries are real project changes, newest first in `assets/home.js`. Avoid claims that an update is live
  until published. Keep static latest-update fallback content aligned in homepage and Workbench preview.
- FAQ and Quick info must stay placeholders until Ryan provides their content.
- Home links are present in converter and résumé headers; existing section URLs remain valid.
- Version 0.8.0 remains local, including all unpublished converter work.

## Publishing workflow — confirmed 2026-09-15

### Default orange accent — 2026-09-15 (0.9.1)

- Ryan prefers orange over neon green as the main site color. Graphite now uses accent `#ffab66`
  and tint `#39291f`, superseding the earlier lime default.
- Keep the `graphite` theme key so saved preferences and reset behavior automatically use the new palette.
- Ocean, Violet, and Paper remain independent alternatives. Historical concept palettes remain as designed.
- In 0.9.2, Ryan still saw green in the local preview. The server and a fresh browser both showed orange;
  shared stylesheet links now use `?v=0.9.2` to bypass an older cached copy. Bump the stylesheet version
  when a visual change needs to invalidate cached CSS. Do not overwrite a visitor's chosen alternate theme.

### First-person build notes — 2026-09-15 (0.9.0)

- Ryan requested “Behind the scenes - Code and lessons” at the top of the converter, linking to
  a broad walkthrough in his voice. He chose casual/direct with a little humor, focused on decisions
  and lessons rather than discussing development tools.
- Article: `web-apps/utc-converter-behind-the-scenes.html`. Ground first-person content in actual requests,
  changes, and verified behavior. Ryan subsequently requested a direct first-person developer voice:
  describe building, coding, and testing rather than asking for changes. Keep the implementation accurate
  and avoid invented personal anecdotes or debugging stories.
- Keep it readable without line-by-line code explanations; optional source links support deeper exploration.
- Keep the test count and implementation descriptions current as the converter changes.
- Home now features the build notes. Version 0.9.0 remains local until publication is requested.

### Converter navigation — 2026-09-15 (0.7.1)

- Ryan expects the converter header to expose all primary site sections, not only Web Apps and Settings.
- Keep About me, Reports, Web Apps, Gaming, Settings, and GitHub visible in its header.
- Use real links back to homepage section hashes; highlight Web Apps as the containing section.


- Ryan authorized publication of 0.3.0. Release commit `d696b05` was pushed and its live files verified.
- Git Credential Manager has been authorized as `RDHarHar`; use stored credentials without displaying them.
- Repository-local commit identity uses Ryan Harwick and `RDHarHar@users.noreply.github.com`.
- When Ryan requests publication, fetch/check `origin/main`, review and commit the intended files,
  push normally to `main`, monitor Pages, and verify live content. Never assume a successful push means deployment succeeded.
- Keep `.preview/` and local environment files excluded. Update `CHANGELOG.md` with actual publication evidence.
- Lesson: Git Credential Manager's device sign-in prompt was visible with an interactive terminal (`tty: true`);
  a noninteractive invocation stalled without displaying its authorization code. Do not store device codes or tokens.

## Known issues from initial inspection (original site)

Historical observations only: the calculator and its unused script were removed in 0.4.0,
so these issues no longer apply to the current site. Preserve this record only for historical context.

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

- Ryan requested removal of “Design studies” footer links on 2026-09-15. Keep the concept files available
  for development, but do not reintroduce that footer link on the current site or mirrored Workbench page.

- `CHANGELOG.md` is the source of truth for development versions.
- Start at `0.1.0` for setup; do not retroactively assign versions to old commits.
- Use `0.x.0` for meaningful feature increments and `0.x.y` for smaller fixes or documentation updates.
- Each completed batch records an ISO date/time with timezone, local/published status, changed files,
  exact changes, checks actually performed, and remaining limitations.
- Record lasting lessons here rather than duplicating whole changelog entries.
