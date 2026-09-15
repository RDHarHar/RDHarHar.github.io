# Detailed Change History

Development versions describe completed local work. A version heading alone does not mean a Git tag,
commit, or deployment exists. Entries use America/New_York time with an explicit UTC offset.
Keep newest versions first and record exact files, changes, validation, and outstanding limitations.

## 0.10.1 — Snake behind-the-scenes article

- Publication: release commit `9744f0961be80d7fc850696d739756994d2d0930` includes 0.10.0 and 0.10.1.
  [Pages run 34997475141](https://github.com/RDHarHar/RDHarHar.github.io/actions/runs/34997475141)
  completed successfully. Verified at `2026-09-15T12:51:13-04:00`: all 27 tracked HTML/CSS/JS files
  returned HTTP 200 and matched the release; both retired calculator URLs still returned 404.
  Six Snake rule tests, JavaScript syntax checks, and Git whitespace checks passed before publication.
  This supersedes the local-status notes below, which describe the status when development was recorded.

- Recorded: `2026-09-15T12:43:12-04:00` (America/New_York). Status: local, not published.
- `gaming/snake.html`: added “Behind the scenes - Code and lessons” above the game heading,
  beside Back to Gaming; updated the Snake stylesheet URL to `?v=0.10.1`.
- `gaming/snake-behind-the-scenes.html`: added a first-person article in Ryan's casual, direct
  developer voice, based on recorded development notes. Covers separation of rules and display,
  queued input, departing-tail collisions, full-board food placement, pause behavior, local scores,
  six rule tests, and the actual arrow-encoding issue. Includes full navigation, section links,
  source links, and return links to Snake; reuses the existing build-notes styles.
- `assets/snake.css`: added a wrapping top-link row and accent styling for article return links.
- Updated `README.md`, `AGENTS.md`, and the development notes with the article location.
- Validation: game/article local assets and links resolve; browser checks passed at 1440, 768,
  390, and 320px, including top-link navigation, article anchors, return navigation, saved theme,
  and no runtime errors. Game logic is unchanged.

## 0.10.0 — Snake and a local leaderboard

- Recorded: `2026-09-15T12:37:34-04:00` (America/New_York). Status: local, not published.
- `gaming/snake.html`: added a themed standalone game with full site navigation, score/best displays,
  canvas board, Start/Pause/Resume, keyboard and touch controls, and a named top-10 leaderboard.
- `assets/snake-core.js`: implemented a 20-by-20 board, two-turn queue, reversal protection, food/growth,
  wall/body collisions, legal movement into the departing tail, and explicit full-board victory.
- `assets/snake.js`: added progressively faster scheduled movement, automatic pause on hidden tab/window
  blur, swipe/button/arrow/WASD controls, live theme redraw, one save per run, validated localStorage
  records, safe text rendering of names, and in-memory fallback when storage is unavailable.
- `assets/snake.css`: responsive board/sidebar layout, mobile direction controls, all four shared themes.
- `index.html`, `concepts/workbench.html`: replaced the Gaming empty state with a Snake link; retained Twitch.
- `tests/snake.test.cjs`: all six rule tests passed. Headless Edge checks passed at 1440/768/390/320px,
  including pause/resume, game over, saving, reload persistence, malformed storage, safe name rendering,
  navigation, and no runtime exceptions. Screenshot review caught shell-corrupted arrows, fixed with entities.
- `docs/snake-development-notes.md`: recorded actual implementation decisions, edge cases, validation,
  and possible article topics. `README.md` and `AGENTS.md` document usage and maintenance expectations.
- Leaderboard is local per Ryan's choice; it is not shared or tamper-proof. Concurrent browser-tab writes
  can race. Starting another run without saving discards the previous unsaved score.

## 0.9.4 — Remove Design studies footer links

- Recorded: `2026-09-15T12:27:47-04:00` (America/New_York).
- Status: published as commit `a9a7f0b67c0a8d6dc0b8afcba68fc280ada05187` on 2026-09-15.
- Deployment verified at `2026-09-15T12:31:47-04:00`: [Pages run 34995359103](https://github.com/RDHarHar/RDHarHar.github.io/actions/runs/34995359103)
  completed successfully. All 22 tracked HTML/CSS/JS files returned HTTP 200 and matched local content;
  the linked converter test source also matched. Retired `melvorCalc.html` and `index.js` returned HTTP 404.
- This release includes all development work from 0.5.0 through 0.9.4: Home and recent updates,
  UTC/epoch conversion, shared navigation, first-person build notes, orange theme, and footer cleanup.
  Earlier local-status entries describe their status when recorded; these changes are now published.
- Release preparation: fetched the unchanged remote branch, passed all 13 converter tests and JavaScript
  syntax checks, verified local page links/assets, and versioned app script/stylesheet URLs with `?v=0.9.4`
  so returning visitors load the new Home navigation, converter code, and orange theme together.
- `index.html` and `concepts/workbench.html`: removed the “Design studies” footer anchors,
  retaining the owner/work-in-progress text. Other current pages did not have this footer link.
- Concept files remain available at their existing URLs. Updated project guidance and version documentation.
- Verified both footer links are removed; Git whitespace check passed. No behavior or styling changes.

## 0.9.3 — Direct developer voice in build notes

- Recorded: `2026-09-15T12:23:37-04:00` (America/New_York).
- Status: local, not committed/pushed/deployed.
- Request: make the behind-the-scenes article read as direct first-person coding notes rather than requests for work.
- `web-apps/utc-converter-behind-the-scenes.html`: rewrote the opening around building the layout, clocks,
  and conversion logic; replaced “asked for UTC” and conversation framing with implementation and iteration.
  Made the unit selector, skipped/repeated-time handling, tests, and stale-result cleanup active first-person
  descriptions. Renamed the code-map heading to “How I organized the code.”
- `AGENTS.md` and `README.md`: recorded the refined voice preference for future writing.
- Reviewed the copy against existing behavior; no new anecdotes or technical functionality were introduced.
  HTML structure and links are unchanged. Git whitespace check passed.

## 0.9.2 — Refresh cached default theme styles

- Recorded: 2026-09-15 (America/New_York), following the report that the local preview still appeared green.
- Status: local, not committed/pushed/deployed.
- Confirmed the local server serves orange `#ffab66`; the previously visible green was not reproduced
  in a fresh browser. Cached CSS was a plausible cause, not conclusively observed in Ryan's browser.
- `index.html`, all three `about/` pages, `concepts/workbench.html`, and both `web-apps/` pages now request
  shared styles with `assets/site.css?v=0.9.2`, preserving directory-correct relative paths.
- Browser verification confirmed Graphite's computed accent is `#ffab66` on Home, the converter, and the
  behind-the-scenes article, with the versioned stylesheet loaded. Saved alternative palettes remain untouched.
- `README.md` and `AGENTS.md` document cache refresh behavior. Git whitespace check passed.

## 0.9.1 — Orange default accent

- Recorded: `2026-09-15T12:20:28-04:00` (America/New_York).
- Status: local, not committed/pushed/deployed; includes all earlier unpublished work.
- Request: replace the main neon-green color with orange.
- `assets/site.css`: changed Graphite accent from `#c3f568` to warm orange `#ffab66` and tint from
  `#293622` to `#39291f`. Shared theme variables apply this to headings, links, controls, clocks,
  outlines, and illustrations throughout the current site.
- `index.html` and `concepts/workbench.html`: renamed the Graphite description to “Charcoal & warm orange.”
- `concepts/gallery.css`: updated Workbench's swatches to orange and warm dark brown.
- Kept the saved `graphite` key, default, and reset behavior. Other selectable palettes are unchanged.
- `README.md` and `AGENTS.md`: documented the new main color and local version.
- Verified orange text contrast exceeds 4.5:1 against both Graphite page and card backgrounds.
  Git whitespace check passed. No functional JavaScript changes.

## 0.9.0 — Converter behind-the-scenes article

- Recorded: `2026-09-15T12:19:31-04:00` (America/New_York).
- Status: local, not committed/pushed/deployed; includes earlier unpublished converter and Home work.
- Request: add a top-of-converter “Behind the scenes - Code and lessons” link and a broad walkthrough
  in Ryan's voice, covering how it was developed and useful programming/system-design lessons.
- Clarification: Ryan chose a casual, direct voice with a little humor, focused on decisions and lessons.

### Changes

- `web-apps/utc-converter.html`: added the requested article link beside the Web Apps back link.
- `assets/utc-converter.css`: added a wrapping top-link row with theme-aware article-link styling.
- `web-apps/utc-converter-behind-the-scenes.html`: added a first-person article with Ryan's byline/date,
  full site navigation, converter return links, six-section contents navigation, and a compact source-code map.
  Covers the mockup/epoch clarification, explicit dates/units, daylight-saving ambiguity, separating conversion
  rules from UI behavior, shared themes/navigation, tests, stale-result clearing, and device/browser dependencies.
- `assets/build-notes.css`: added readable article typography, lesson callouts, code links, desktop contents sidebar,
  mobile contents layout, and shared-theme support.
- `assets/home.js`: added the article as the newest update; the sidebar still displays the five most recent entries.
- `index.html` and `concepts/workbench.html`: aligned initial featured-update content and links with the new article.
- `README.md` and `AGENTS.md`: documented the article, voice preference, maintenance requirements, and local version.

### Verification

- Reviewed article claims against the actual converter code, test suite, and recorded development decisions.
- Headless Edge checked article layout at 1440px, 768px, 390px, and 320px: no horizontal overflow,
  one main heading, and six contents links.
- Verified converter-to-article navigation, internal contents anchors, return to converter, saved Paper theme,
  and the newest Home update's destination. No JavaScript runtime errors.
- All article file links and fragment targets resolve. Article, stylesheet, conversion source, and test-source
  URLs returned HTTP 200 locally. Desktop screenshot visually reviewed.
- JavaScript syntax and Git whitespace checks passed. Conversion logic was not modified.

## 0.8.0 — Home page with latest updates and information placeholders

- Recorded: `2026-09-15T11:51:00-04:00` (America/New_York).
- Status: local, not committed/pushed/deployed; includes all unpublished converter versions. Live remains 0.4.0.
- Request: add Home with a dominant latest-update panel, five recent updates on its right,
  and FAQ/Quick info sections below, following the supplied layout sketch.

### Implementation

- `index.html`: added Home as the first/default tab, a featured update article, five-entry sidebar,
  FAQ and Quick info placeholders, Home title, and updated no-script guidance.
- `assets/home.js`: added five real update summaries (0.8.0, 0.7.1, 0.7.0, 0.6.0, 0.5.0), newest first.
  Sidebar includes the latest entry. Buttons update featured title, summary, detail bullets, date,
  category, version, and destination; selected state is exposed with aria-pressed and changes are announced.
- `assets/site.css`: added a 2.4-to-1 desktop update grid, compact recent cards, two-column lower info area,
  theme-aware borders/type, and mobile stacking. Featured article grows to match the sidebar height.
- `assets/site.js`: changed default/unknown-hash fallback to Home while retaining existing section hashes.
- `concepts/workbench.html`: synchronized Home markup, scripts, and relative links with the homepage.
- `web-apps/utc-converter.html`: added Home to full site navigation and pointed brand link to Home.
- `about/job-history.html`, `about/education.html`, `about/skills.html`: added Home links and updated brand destinations.
- `README.md`, `AGENTS.md`, `CHANGELOG.md`: documented Home, update maintenance, placeholder boundaries,
  changed default navigation, and local version status.

### Verification

- Headless Edge checked default Home, exactly five sidebar buttons, and no horizontal overflow at
  1440px, 768px, 390px, and 320px. All five update selections passed at every width.
- Verified direct About me URLs, the featured About me link, converter links from the Workbench preview,
  the converter's Home link, and saved Paper theme on Home.
- No JavaScript runtime errors; syntax and whitespace checks passed. Desktop layout visually reviewed.
- FAQ and Quick info contain only explicit placeholders, without invented questions or personal details.

## 0.7.1 — Full navigation on converter page

- Recorded: `2026-09-15T11:43:40-04:00` (America/New_York).
- Status: local, not committed/pushed/deployed; includes earlier unpublished converter changes.
- Request: restore links to the other site sections at the top of the converter.
- `web-apps/utc-converter.html`: replaced the two-link header with About me, Reports, Web Apps,
  Gaming, Settings, and GitHub. Section links target the corresponding homepage hashes; Web Apps
  is marked as the current location. Uses navigation anchors rather than in-page tab controls.
- `assets/utc-converter.css`: added matching link spacing, selected/hover states, and mobile wrapping.
- `README.md` and `AGENTS.md`: documented the full header and local version.
- Headless Edge verified five section links at 1440px, 768px, 390px, and 320px without horizontal overflow;
  clicking each opened the correct homepage panel. No runtime errors. Git whitespace check passed.
- Converter behavior is unchanged.

## 0.7.0 — Lower epoch row and dedicated date-to-epoch converter

- Recorded: `2026-09-15T11:41:49-04:00` (America/New_York).
- Status: local, not committed/pushed/deployed; includes unpublished 0.5.0–0.6.0 work.
- Request: change “That long string of numbers.” to “Epoch time,” move it below the UTC/local panels,
  and add a dedicated converter from a date/time to epoch.

### Changes by file

- `web-apps/utc-converter.html`: renamed the epoch heading; moved its panel to a second two-column row;
  added an adjacent Date and time form with Local/UTC selector, date/time inputs, repeated-hour selector,
  Convert to epoch/Use now buttons, validation messages, and both epoch outputs.
- `assets/utc-converter.js`: implemented the independent reverse form using existing conversion helpers;
  added result clearing on edits/zone changes, local gap errors, repeated-time selection, exact current-occurrence
  handling for Use now, and UTC confirmation of the result.
- `assets/utc-converter.css`: added second-row spacing and reverse-form styles, stacked the timestamp panel's
  two results within its narrower column, and retained mobile stacking in document order.
- `README.md`, `AGENTS.md`, `CHANGELOG.md`: documented the new layout, independent reverse flow, and local version.

### Validation

- Headless Edge confirmed all panels fit 1440px, 768px, 390px, and 320px without horizontal overflow.
- Verified exact heading replacement and that the epoch panel appears below the UTC/local panels.
- Dedicated reverse checks passed for UTC epoch zero, local offset/second precision, daylight-saving gap rejection,
  two repeated-hour choices, zone-change cleanup, and Use now.
- Existing clock, UTC/local, epoch input, validation, theme, and navigation browser checks passed.
- No JavaScript runtime exceptions; script syntax and Git whitespace checks passed. Desktop layout visually reviewed.
- Conversion helpers are unchanged; the prior 13 unit-test results remain applicable.

## 0.6.0 — Unix epoch support

- Recorded: `2026-09-15T11:36:40-04:00` (America/New_York).
- Status: local, not committed/pushed/deployed; includes unpublished 0.5.0 work. Live site remains 0.4.0.
- Request: add numeric epoch timestamps to the converter page alongside UTC/local time.

### Changes

- Added a live epoch seconds clock with a millisecond snapshot, refreshed every second.
- Added an epoch input panel above the existing conversion columns with explicit Seconds/Milliseconds selection,
  unit guidance, Use now, validation, and local/UTC results including dates and offsets.
- Supported zero and negative integer timestamps and preserved three-digit fractional seconds for millisecond inputs.
- Rejected malformed, fractional, unsafe, and out-of-range epoch values; supported UTC years remain 1900–9999.
- Added epoch seconds and milliseconds to both existing date/time conversion results.
- Upgraded date/time fields and conversion logic from minute to second precision, including repeated local times.
- Unit changes reconvert the entered value; edits clear stale results. Existing daylight-saving handling is retained.
- Renamed the page and listing to UTC & Epoch Converter while preserving the existing URL.

### Files

- `web-apps/utc-converter.html`: updated title/metadata, third clock, epoch form/results, second-resolution inputs,
  and reverse epoch outputs.
- `assets/utc-core.js`: strict epoch parser, epoch output helper, optional seconds in time parsing, and second-aware local matching.
- `assets/utc-converter.js`: live epoch updates, both-unit outputs, epoch form/validation/Use now, millisecond rendering,
  and stale-result cleanup.
- `assets/utc-converter.css`: epoch clock, full-width input panel, responsive result columns, and epoch output rows.
- `index.html` and `concepts/workbench.html`: updated converter name and description.
- `tests/utc-converter.test.cjs`: four additional regression tests covering epoch inputs, validation, precision,
  and second-resolution date conversions.
- `README.md`, `AGENTS.md`, `CHANGELOG.md`: updated usage, behavior conventions, and version history.

### Verification

- All 13 Node tests passed, including the nine existing timezone/conversion tests.
- Headless Edge passed layout checks at 1440px, 768px, 390px, and 320px; existing clock, DST, form, theme,
  and navigation checks passed with second-resolution results.
- New browser checks passed for epoch zero/date rollover, millisecond precision, negative epochs,
  invalid-input cleanup, reverse conversion into both units, Use now, and the live epoch clock.
- No JavaScript runtime exceptions; syntax and Git whitespace checks passed. Desktop screenshot visually reviewed.
- Dates entered in the existing panels have whole-second precision. Epoch milliseconds retain their full input precision.

## 0.5.0 — UTC Converter, the first Web App

- Recorded: `2026-09-15T11:29:00-04:00` (America/New_York).
- Status: local working-tree changes; not committed, pushed, or deployed. Published version remains 0.4.0.
- Request: build a UTC converter following Ryan's mockup: Local/UTC clocks above two conversion columns.

### User-facing behavior

- Added live Local time and UTC time clocks with seconds, calendar dates, detected device zone, and local UTC offset.
- Added UTC-to-local and local-to-UTC panels with labeled date/time inputs, conversion buttons, and Use now buttons.
- Dates default to today in the corresponding input zone; times remain blank until entered or Use now is selected.
- Results show 24-hour time, full date, and UTC offset. UTC-to-local also identifies the local time zone.
- Rejected empty/invalid inputs and nonexistent local times during forward clock changes.
- Repeated local times expose first/second occurrence choices, with distinct offsets and UTC results.
  Use now selects the occurrence corresponding to the current instant when the clock repeats.
- Input changes clear stale results. Errors and conversion results have accessible announcements;
  the clocks update without live announcements every second.
- Panels sit side by side on desktop and stack on phones. Saved themes, Settings links, and Web Apps back links work.
- Replaced the Web Apps empty state with a compact UTC Converter card on the homepage and Workbench preview.

### File-by-file changes

| File | Action | Specific changes |
| --- | --- | --- |
| `web-apps/utc-converter.html` | Added | Page metadata, navigation, clocks, two conversion forms, repeated-time selector, result/error regions, and timezone guidance. |
| `assets/utc-core.js` | Added | Strict input parsing, UTC/local conversion, gap rejection, repeated-time candidate discovery, date/time formatting, and offset labels; usable from browser and Node. |
| `assets/utc-converter.js` | Added | Live clocks, current-date defaults, form submissions, Use now, result/error updates, stale-result clearing, and repeated-time selection. |
| `assets/utc-converter.css` | Added | Compact clock rows, bordered columns, themed inputs/buttons/results, responsive stacking, and narrow-screen field layout. |
| `tests/utc-converter.test.cjs` | Added | Nine Node regression tests with isolated time-zone environments. |
| `index.html` | Updated | Web Apps now lists the UTC Converter with a working link. |
| `concepts/workbench.html` | Updated | Mirrors the listing with a directory-correct converter link. |
| `README.md` | Updated | Converter usage, file map, input/timezone behavior, test command, and local release status. |
| `AGENTS.md` | Updated | Mockup/layout requirements, timezone semantics, daylight-saving rules, test command, and maintenance conventions. |
| `CHANGELOG.md` | Updated | Added this detailed implementation and validation record. |

### Validation

- Nine Node tests passed: strict input validation/leap day, winter UTC-to-local previous-day rollover,
  summer local-to-UTC next-day rollover, New York forward gap and backward repeat, Lord Howe's half-hour
  repeat, Kathmandu's quarter-hour offset, UTC round-trip, and Apia's skipped date.
- Headless Edge verified the converter fits 1440px, 768px, 390px, and 320px without horizontal overflow.
- Browser checks passed for live clock progression, both conversion directions with date rollover,
  gap rejection/stale-result clearing, both repeated-time choices, empty-input errors, and both Use now buttons.
- Verified saved Paper theme on mobile, the narrow-screen Web Apps listing, and navigation into the converter.
- No JavaScript runtime exceptions occurred during the final browser run.
- Visually reviewed the populated desktop converter and mobile Paper-theme layout.
- All new app assets return HTTP 200 locally; related local links resolve. JavaScript syntax and Git whitespace checks passed.

### Limitations

- Local zone and current clocks use device settings. Conversion relies on installed browser time-zone data.
- Input range is 1900–9999, with minute precision. Native date/time controls follow device locale;
  displayed results and clocks use 24-hour time.
- No arbitrary time-zone selector, external API, saved conversion history, or new dependencies were added.
- Validation used Node and responsive desktop Edge viewports, not physical mobile devices or a full screen-reader audit.

## 0.4.0 — About me, Reports, Web Apps, and Gaming

- Recorded: `2026-09-15T11:05:40-04:00` (America/New_York).
- Status: published on 2026-09-15; release commit `e76530f7bb5f679b33f0cd395c817b91b6ac1902`.
- Request: replace the tagline, remove the Melvor calculator, scaffold the four content sections,
  add résumé and contact placeholders, and link Arctic Wes on Twitch.

### Publication — `2026-09-15T11:17:42-04:00`

- Ryan requested “publish everything.” Fetched `origin/main`; no remote changes conflicted with the release.
- Rechecked JavaScript syntax, staged-file whitespace, and the file inventory; committed all pending site
  changes and documentation, including the three new résumé pages and two calculator-file deletions.
- Pushed commit `e76530f` to `main` without force-pushing; ignored local review artifacts remain excluded.
- [GitHub Pages deployment 34987374772](https://github.com/RDHarHar/RDHarHar.github.io/actions/runs/34987374772)
  completed successfully for this release.
- Verified all 15 tracked HTML/CSS/JavaScript files on the live site returned HTTP 200 and exactly matched
  local release content after normalizing line endings. This includes every résumé page and design concept.
- Verified retired `/melvorCalc.html` and `/index.js` both return HTTP 404.
- Live site: https://rdharhar.github.io/. Publication evidence is recorded in a follow-up documentation commit.

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
