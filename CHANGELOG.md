# Detailed Change History

Development versions describe completed local work. A version heading alone does not mean a Git tag,
commit, or deployment exists. Entries use America/New_York time with an explicit UTC offset.
Keep newest versions first and record exact files, changes, validation, and outstanding limitations.

## 0.4.0 — About me, Reports, Web Apps, and Gaming

- Recorded: `2026-09-15T11:05:40-04:00` (America/New_York).
- Status: publication requested on 2026-09-15; deployment verification pending.
- Request: replace the tagline, remove the Melvor calculator, scaffold the four content sections,
  add résumé and contact placeholders, and link Arctic Wes on Twitch.

### Content and navigation

- Replaced the hero text with the exact requested tagline: “Building things. Breaking things. Learning along the way.”
- Replaced Projects with About me, Reports, Web Apps, and Gaming tabs, in that order, followed by Settings.
- About me opens by default, with a labeled portrait placeholder, Ryan's name, biography placeholder,
  résumé page links, and a Contact me section awaiting details. No personal history or contact addresses were invented.
- Added actual Job history, Education, and Skills pages with labeled content placeholders, sibling navigation,
  and a back link to About me. Saved themes apply to these pages as well.
- Reports has an explicit empty state for statistical reports; Web Apps has an empty state for future apps.
- Gaming includes an empty state for future games and a Twitch card linking to the exact URL supplied by Ryan,
  `https://www.twitch.tv/arcticwes`, in a new tab. No live-stream status is implied.
- Removed the calculator HTML and unused standalone calculation JavaScript. Its old URL is intentionally retired.
- Updated alternative concept cards to point to the Web Apps section, removing retired calculator references.

### File-by-file changes

| File | Action | Specific changes |
| --- | --- | --- |
| `index.html` | Updated | New navigation, exact tagline, About me profile/contact placeholders, résumé links, empty Reports/Web Apps sections, Gaming/Twitch card, updated title/description, and no-script explanation. |
| `about/job-history.html` | Added | Role/company/date and responsibilities/achievements placeholders, shared theme assets, résumé subnavigation, and About me back link. |
| `about/education.html` | Added | School/program/date and certifications/course placeholders with the same navigation and theme support. |
| `about/skills.html` | Added | Skill category and tools/technology placeholders with the same navigation and theme support. |
| `assets/site.css` | Updated | Profile/photo placeholder, compact résumé links, contact layout, empty states, stream card, résumé page styling, smaller tagline, and wrapping mobile navigation. |
| `assets/site.js` | Updated | Generalized section/hash/title handling, About me fallback, skip-link preservation, and optional Settings controls so standalone résumé pages can reuse theme restoration. |
| `concepts/workbench.html` | Updated | Mirrors the new homepage with directory-correct links and shared assets. |
| `concepts/editorial.html` | Updated | Replaced calculator content with a future Web Apps entry linking to the current site. |
| `concepts/playground.html` | Updated | Replaced calculator content and artwork wording with future app content linking to Web Apps. |
| `concepts/index.html` | Updated | Removed gallery footer claim that the calculator is the featured project. |
| `concepts/gallery.js` | Updated | Describes Workbench's current content sections and Settings themes. |
| `melvorCalc.html` | Removed | Removed the retired calculator page. |
| `index.js` | Removed | Removed its unused standalone calculation functions. |
| `README.md` | Updated | Documents sections, résumé pages, calculator removal, and local 0.4.0 status. |
| `AGENTS.md` | Updated | Records exact tagline, section order, placeholder boundaries, provided Twitch URL, calculator removal, and shared script requirements. |
| `CHANGELOG.md` | Updated | Added this detailed version record. |

### Validation

- Headless Edge checked all five tabs at 1440px, 768px, 390px, and 320px: correct direct URL/selection,
  one visible panel, and no horizontal page overflow in all 20 combinations.
- Confirmed exact tagline text, provided Twitch URL, keyboard arrow/End navigation, and all four saved themes.
- Checked all three résumé pages at 1440px, 390px, and 320px: restored Paper theme, correct sibling
  selection, and no horizontal overflow in all nine combinations.
- Verified résumé back navigation, updated Workbench Gaming preview, and unknown-hash fallback.
- No JavaScript runtime exceptions occurred during the final browser run.
- Visually reviewed desktop About me and phone About me/Gaming screenshots.
- All eight HTML pages return HTTP 200 locally, and all local file links/assets resolve.
- Source search confirms no calculator references remain in served HTML/JavaScript.
- Confirmed both retired files are absent. JavaScript syntax and Git whitespace checks passed.

### Remaining content

- Awaiting profile photo, biography, employment/education/skills details, contact information, reports, apps, and games.
- Contact is a placeholder section, not a submission form. Twitch is an outbound link, not an embedded player.
- Browser review used responsive Edge viewports; no physical-device or full screen-reader audit was performed.

## 0.3.0 — Compact Workbench homepage and theme Settings

- Recorded: `2026-09-15T10:45:31-04:00` (America/New_York).
- Status: published to GitHub Pages on 2026-09-15; release commit `d696b05f63709c3401a3fac74b21c87461b55e16`.
- Request: refine preferred concept 02 to feel less bulky and offer multiple colors under a Settings tab.

### Publication preparation — 2026-09-15

- Ryan explicitly requested publication of the current version.
- Fetched `origin/main` and confirmed it still points to imported baseline `3a5be56`; no remote changes need merging.
- Public GitHub repository metadata confirms Pages is enabled; the live site still serves the original homepage.
- Prepared one publication commit containing setup documentation, concept studies, and the 0.3.0 homepage.
- Rechecked JavaScript syntax and Git whitespace before committing. Prior browser validation remains applicable.
- GitHub initially required sign-in. Ryan completed Git Credential Manager's device authorization,
  and the authenticated account was verified as `RDHarHar`.

### Publication completed — `2026-09-15T10:55:00-04:00`

- Confirmed authenticated Pages settings: deploy from branch `main`, repository root `/`, legacy branch build.
- Set repository-local commit identity to Ryan Harwick with `RDHarHar@users.noreply.github.com`.
- Pushed release commit `d696b05` to `origin/main`, advancing it from `3a5be56` without force-pushing.
- GitHub triggered [Pages build and deployment](https://github.com/RDHarHar/RDHarHar.github.io/actions/runs/34984752973).
- Verified live HTTP 200 responses and exact UTF-8 content matches (normalizing line endings) for
  `index.html`, `assets/site.css`, `assets/site.js`, `concepts/workbench.html`, and `melvorCalc.html`.
- Live website: https://rdharhar.github.io/; Settings: https://rdharhar.github.io/#settings.
- This publication includes the earlier 0.1.0 setup and 0.2.0 concept work as well as 0.3.0.
  Their original local-status records below describe their status when first completed.
- Publication metadata is recorded in a follow-up documentation commit; no website behavior changes in that commit.

### Layout and behavior

- Applied the selected Workbench direction to `index.html` and its existing concept preview.
- Reduced the maximum content width from 1200px to 960px and headline from 94px to 54px.
  Hero padding changed from 68px/52px to 48px/38px; mobile spacing is reduced further.
- Replaced the large chart card and future-project panel with a compact horizontal calculator row,
  an 86px by 72px decorative thumbnail on desktop, and a single-line future-work note.
- Removed the large hero call-to-action, background grid, and oversized source section.
- Added Projects and Settings tabs with active state, associated panels, arrow/Home/End keyboard
  navigation, focus management, tab-specific document titles, and direct `#settings` links.
- Added four immediately applied themes: Graphite (charcoal/lime), Ocean (navy/blue), Violet
  (ink/lavender), and Paper (warm white/forest green). Settings shows mini layout previews and native radio choices.
- Theme choice persists in localStorage under `ryan-harwick-theme` and loads before styles.
  Invalid values fall back to Graphite; blocked storage permits in-session switching with an accurate status message.
- Added reset to Graphite, screen-reader status announcements, and storage-event synchronization across tabs.

### File-by-file changes

| File | Action | Specific changes |
| --- | --- | --- |
| `index.html` | Replaced | Promoted the compact Workbench design to the homepage, with navigation tabs, project row, Settings form, descriptive metadata, and design-gallery link. |
| `assets/site.css` | Added | Shared layout, semantic theme color variables, compact project illustration, responsive two/four-column palette grid, selected/focus styles, and light/dark native control modes. |
| `assets/site.js` | Added | Pre-paint theme restoration, allowlisted palette changes, persistence, storage fallback, reset, radio events, tab selection, keyboard controls, hashes, and cross-tab storage events. |
| `concepts/workbench.html` | Replaced | Mirrors homepage markup with corrected relative stylesheet, script, home, calculator, and gallery links. |
| `concepts/workbench.css` | Removed | Retired the initial bulky concept's unused stylesheet; styling is now shared with the homepage. |
| `concepts/gallery.js` | Updated | Workbench's description now identifies the compact selected direction and Settings themes. |
| `README.md` | Updated | Documents the selected homepage, Settings URL, palette persistence/reset, shared assets, and unchanged calculator appearance. |
| `AGENTS.md` | Updated | Records the selected design, compact dimensions, palette and storage conventions, shared-preview maintenance, and remaining calculator limitations. |
| `CHANGELOG.md` | Updated | Added this detailed version record. |

### Validation

- `node --check assets/site.js` passed.
- Headless Edge checked Projects and all four Settings themes at 1440px, 768px, 390px, and 320px:
  no horizontal document overflow and each changed theme updated the document and saved value.
- Verified reload restores Paper and its selected radio, direct Settings links, keyboard tab navigation,
  native radio arrow navigation, reset persistence, invalid-value fallback, and shared preview assets.
- Confirmed changing a theme in the Workbench preview persists on returning to the homepage.
- Confirmed clicking the project row opens `/melvorCalc.html`.
- Simulated inaccessible localStorage: changing the theme still worked, with a persistence-limit message.
- No JavaScript runtime exceptions occurred during the final browser run.
- Visually reviewed desktop homepage, desktop Settings, and mobile Paper Settings screenshots.
- Local asset/link checks, palette text contrast checks, and Git whitespace checks passed.
- `melvorCalc.html` and `index.js` remain unchanged. No dependencies were added.

### Scope and limitations

- Preview remains at `http://127.0.0.1:8000/`; the gallery also contains the refined Workbench design.
- Themes cover the homepage and Workbench preview; the legacy calculator retains its existing styling.
- Validation used desktop Edge with responsive viewports; physical-device and full screen-reader audits remain unperformed.
- Theme preferences are browser-local and do not sync between devices. Cross-tab synchronization is implemented
  through storage events but was not independently exercised by the browser review.

## 0.2.0 — Three homepage style concepts

- Recorded: `2026-09-15T10:34:47-04:00` (America/New_York).
- Status: local working-tree changes; not committed, tagged, pushed, or deployed.
- Request: generate multiple concepts to establish the site's style direction.

### Designs and behavior

- Editorial: paper background, olive and rust accents, Georgia serif headlines, orbital CSS artwork,
  a restrained project row, and a spacious closing section.
- Workbench: charcoal background, lime accents, monospace metadata, a grid-backed hero, a calculator
  project card with decorative skill bars, and a placeholder for future work.
- Playground: cobalt and citrus palette, oversized uppercase hero, inline SVG smile sticker,
  a static graphic strip, a tilted window illustration, and a bold split project card.
- Each concept links to the existing calculator and Ryan's GitHub. No additional projects, biography,
  contact details, or professional claims were invented. Proposed copy is marked exploratory.
- Gallery offers three direction selectors, Wide/Mobile preview controls, a full-page link, descriptive
  palette swatches, and direct-page fallback links. Mobile preview is capped at 390px and shrinks on smaller screens.
- Query parameters preserve selected style and preview size; browser Back restores previous selections.
  Invalid style parameters safely fall back to Editorial.

### File-by-file changes

| File | Action | Specific changes |
| --- | --- | --- |
| `concepts/index.html` | Added | Comparison page with direction links, preview toolbar, titled iframe, guidance, and direct concept links. |
| `concepts/gallery.css` | Added | Responsive gallery layout, color swatches, selected styles, browser frame, and narrow preview mode. |
| `concepts/gallery.js` | Added | Allowlisted style selection, URL state, active/pressed accessibility states, descriptions, full-page destination, width switching, and Back handling. Replaces the iframe on style changes to avoid extra history entries. |
| `concepts/base.css` | Added | Shared sizing, navigation, footer, skip links, focus indicators, mobile spacing, and reduced-motion support. |
| `concepts/editorial.html` | Added | Full Editorial proposal with CSS illustration and a project row linking to the original calculator. |
| `concepts/editorial.css` | Added | Editorial typography, palette, orbital illustration, project list, and responsive layout. |
| `concepts/workbench.html` | Added | Full Workbench proposal with project directory, decorative skill chart, future-work panel, and repository link. |
| `concepts/workbench.css` | Added | Dark grid hero, lime buttons, chart artwork, cards, and responsive stacking. |
| `concepts/playground.html` | Added | Full Playground proposal with SVG smile graphic, static decorative strip, illustrated project card, and closing section. |
| `concepts/playground.css` | Added | Oversized type, cobalt/citrus surfaces, sticker and window artwork, hard shadows, and responsive stacking. |
| `README.md` | Updated | Added concept preview instructions, direct URL example, provisional-design status, and directory map entry. |
| `AGENTS.md` | Updated | Recorded the three proposals, pending design decision, self-contained asset approach, and iframe-history lesson. |
| `.gitignore` | Updated | Excluded `.preview/`, which holds local screenshots and the temporary browser review script. |
| `CHANGELOG.md` | Updated | Recorded development version 0.2.0 and detailed implementation and verification results. |

### Validation and review

- Used headless Microsoft Edge to check each standalone concept at 1440px, 390px, and 320px widths:
  no horizontal document overflow, exactly one main heading, and a calculator link present in all nine cases.
- Captured and visually reviewed desktop and 390px screenshots for all three concepts and the desktop gallery.
- Checked gallery style switching, mobile controls, selected state, URL synchronization, Back navigation,
  direct mobile-style URLs, and invalid-style fallback. All passed after fixing the extra iframe history entry.
- No JavaScript runtime exceptions occurred during the final browser run.
- `node --check concepts/gallery.js` passed; local link/asset checks and Git whitespace checks passed.
- Original `index.html`, `melvorCalc.html`, and `index.js` remain unchanged.
- No package dependencies, external fonts, generated raster assets, or build pipeline were added.

### Preview and limitations

- A Python server is running at `http://127.0.0.1:8000/` for this review session; open `/concepts/`.
  Restart it with the README command if the process stops. This is local, not a public deployment.
- Phone checks used narrow desktop-browser viewports, not physical mobile devices.
- Full screen-reader and cross-browser audits have not been performed. Existing calculator defects remain.
- Awaiting Ryan's style feedback; none of these concepts replaces the production homepage.

## 0.1.0 — Local development setup

- Recorded: `2026-09-15T10:21:28-04:00`.
- Status: local working-tree changes; not committed, tagged, pushed, or deployed.
- Request: prepare the workspace for ongoing collaborative website development and create persistent
  project guidance plus a specific, dated version/change record.
- Baseline: `main` at `3a5be56308cbfbac516530f4fa6bc0742628f2c0`.

### Workspace setup

- Cloned `https://github.com/RDHarHar/RDHarHar.github.io.git` directly into `E:\Personal Website`.
- Preserved existing Git history and the `origin` remote; local `main` tracks `origin/main`.
- Inspected all four imported source/documentation files and the six existing commits.
- Confirmed Git `2.54.0.windows.1`, Python `3.10.6`, and Node.js `24.15.0` are available.
  Python is sufficient for the documented preview; Node.js is not required by the site.
- No dependency installation or build configuration was necessary for the existing static site.

### File-by-file changes

| File | Action | Specific changes |
| --- | --- | --- |
| `README.md` | Replaced and converted to UTF-8 | Replaced the two-heading placeholder with project identity, repository and expected hosting address, exact PowerShell preview command, loopback URL, stop instructions, file map, development workflow, and publishing/validation caveats. |
| `AGENTS.md` | Added | Established persistent agent guidance, ownership and repository facts, baseline commit, collaboration expectations, observed visual baseline, future accessibility and hosting principles, known calculator issues, setup lessons, and version-record conventions. |
| `CHANGELOG.md` | Added | Established development version `0.1.0`, timezone-aware records, this detailed setup inventory, validation evidence, limitations, and the imported commit history below. |
| `.gitignore` | Added | Excludes OS metadata, `.env` and `.env.*` except `.env.example`, logs, Python caches, and compiled Python files. |

### Validation performed

- Started a temporary Python HTTP server bound to `127.0.0.1` on an automatically allocated port.
- Requested `index.html`, `melvorCalc.html`, and `index.js`: all returned HTTP 200 and response bodies
  exactly matching local file bytes. Shut the server down after checking.
- Confirmed documentation is readable as UTF-8.
- `git diff --exit-code -- index.html melvorCalc.html index.js` passed: all existing website code is unchanged.
- `git diff --check` passed for tracked changes.
- `git check-ignore` confirmed `.env`, `.env.local`, `preview.log`, and `__pycache__/preview.pyc` are ignored.

### Limitations and follow-up

- No browser visual review or calculator correctness test was performed for this documentation/setup change.
- Existing calculator defects and accessibility observations are recorded in `AGENTS.md`; no fixes are included.
- GitHub Pages settings, live deployment state, and push authorization have not been verified.
- No background preview server remains running. Use the README command to start one.
- Owner-provided content and visual preferences will guide subsequent development.

## Imported history — Unversioned

These timestamps and subjects come from Git author metadata. They are historical commit labels,
not independently verified release dates or a reconstructed file-by-file changelog.

| Author timestamp | Commit | Original subject |
| --- | --- | --- |
| `2024-01-09T20:23:08-05:00` | `3a5be56` | added link to homepage |
| `2024-01-09T20:19:14-05:00` | `979a83e` | added homepage |
| `2024-01-09T20:09:21-05:00` | `97103f4` | Added combat calculator |
| `2024-01-09T16:44:07-05:00` | `4c4b18e` | added files |
| `2024-01-09T16:37:15-05:00` | `574d80b` | first commit |
| `2024-01-09T16:33:00-05:00` | `54df864` | first commit |
