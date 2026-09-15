# Ryan Harwick's Personal Website

Source for Ryan's personal website and small web projects.

- Repository: https://github.com/RDHarHar/RDHarHar.github.io
- GitHub Pages website: https://rdharhar.github.io/
- Local workspace: `E:\Personal Website`

## Local preview

This static HTML/JavaScript site has no package dependencies or build steps.
Python 3 is available on this development machine. In PowerShell:

```powershell
Set-Location 'E:\Personal Website'
python -m http.server 8000 --bind 127.0.0.1
```

Open http://127.0.0.1:8000/ in a browser. Refresh after saving edits.
Press `Ctrl+C` in the terminal to stop the server.

## Site sections

- **Home** (`#home`, the default): a featured latest update, five recent updates, and FAQ/Quick info placeholders.
- **About me** (`#about`): photo and biography placeholders, résumé page links, and Contact me placeholders.
- **Reports** (`#reports`): an empty collection for future statistical reports.
- **Web Apps** (`#web-apps`): browser tools, starting with the UTC Converter.
- **Gaming** (`#gaming`): space for future games and a link to [Arctic Wes on Twitch](https://www.twitch.tv/arcticwes).
- **Settings** (`#settings`): four saved color themes.

Job history, Education, and Skills are separate static pages under `about/`. Their content is explicitly
placeholder text; there are no fabricated credentials or working contact form yet.

## UTC & Epoch Converter

Open http://127.0.0.1:8000/web-apps/utc-converter.html or use the Web Apps card.
Live local and UTC clocks sit above two conversion panels. Choose a date and time, then convert
in either direction; **Use now** fills and converts the current time. Dates initially use today
in the input's corresponding time zone, and time fields initially remain empty.

Local means the device's time zone. Results show a 24-hour time, date, and UTC offset.
The browser may display native input controls in 12-hour or 24-hour format according to device settings.
Skipped local times show an error; repeated local times offer first/second occurrence choices.
The converter supports dates from 1900 through 9999 and uses the browser's installed time-zone data.
All conversion happens in the browser; no API or account is needed.

The page also shows a live Unix epoch timestamp. Paste an integer timestamp and explicitly choose
**Seconds** or **Milliseconds** to see its local and UTC date/time. Zero and negative timestamps
are supported; millisecond inputs preserve fractional seconds. The date/time panels accept seconds
and return epoch values in both units. The existing converter URL is unchanged.

The top row contains the UTC/local converters. Below it, **Epoch time** converts timestamps into dates,
and **Date and time** converts a date/time into epoch seconds and milliseconds. Select Local or UTC
for the latter; it includes Use now and repeated-hour selection for daylight-saving changes.

## Style concepts

The current homepage uses the selected **Workbench** direction with a compact layout.
Open http://127.0.0.1:8000/ and choose **Settings** for Graphite, Ocean, Violet, or Paper.
Graphite is the default charcoal-and-orange theme.
Colors update immediately and are remembered in this browser. **Reset to Graphite** restores the default.
Settings also has a direct link: http://127.0.0.1:8000/#settings.

Open http://127.0.0.1:8000/concepts/ while the preview server is running.
Choose **Editorial**, **Workbench**, or **Playground**, then use **Wide / Mobile** to compare layouts.
**Open full page** opens the selected design in its own tab. The preview itself is scrollable.
You can bookmark a choice, for example `http://127.0.0.1:8000/concepts/?style=workbench&size=mobile`.
The three standalone HTML pages also work directly from disk or from the links below the preview.

Editorial and Playground remain exploratory alternatives. Workbench previews the current homepage design.
The Melvor calculator and its unused script were removed in 0.4.0; its old URL is retired.

## Project files

| File | Purpose |
| --- | --- |
| `index.html` | Compact Workbench homepage with About me, Reports, Web Apps, Gaming, and Settings tabs. |
| `about/` | Job history, Education, and Skills placeholder pages. |
| `assets/site.css` | Shared responsive homepage styles and four color palettes. |
| `assets/site.js` | Theme persistence, reset, accessible tabs, and browser navigation. |
| `web-apps/utc-converter.html` | UTC/local converter and live clocks. |
| `assets/utc-core.js` | Validated date/time parsing and conversion helpers. |
| `assets/utc-converter.js` | Clock updates, form handling, results, and repeated-time selection. |
| `assets/utc-converter.css` | Responsive two-panel converter layout using shared themes. |
| `tests/utc-converter.test.cjs` | Automated conversion and time-zone regression tests. |
| `AGENTS.md` | Persistent guidance, design decisions, lessons, and known issues. |
| `CHANGELOG.md` | Detailed, dated development versions and validation records. |
| `.gitignore` | Excludes local machine files and private environment files. |
| `concepts/` | Three responsive homepage concepts and an interactive comparison gallery. |

## Working together

1. Check `git status` and read `AGENTS.md` before editing.
2. Implement the request and preview affected pages at desktop and mobile widths.
3. Check navigation and changed interactions; run targeted automated checks when useful.
4. Update `CHANGELOG.md` with the date, version, exact changes, and checks performed.
5. Record lasting decisions and useful lessons in `AGENTS.md`.

Development versions in `CHANGELOG.md` do not imply a Git tag or live deployment.
Version 0.4.0 was published and verified on 2026-09-15, including the four content sections and résumé placeholders.
See `CHANGELOG.md` for release commits and deployment evidence.
The converter header links directly to About me, Reports, Web Apps, Gaming, and Settings.
Version 0.9.4 (Home, converter, build notes, and orange default accent) is currently local and not published.
Shared stylesheet links include a version query to refresh cached colors after palette changes.

## Behind the scenes

The converter's top link opens `web-apps/utc-converter-behind-the-scenes.html`.
This first-person article covers the original sketch, UTC/epoch clarification, time-zone lessons,
separation of page behavior from conversion rules, and testing. It uses Ryan's requested casual,
direct developer voice with light humor, describing building, coding, and testing in first person.
Its code map links to local source files.

## Home updates

The large Home panel starts with the newest update. Click one of the five recent update cards to read
its details. Entries in `assets/home.js` are maintained newest first and reflect actual project changes;
the sidebar includes the newest entry. Add future updates there and keep the initial static featured
content in `index.html` and `concepts/workbench.html` aligned with the newest entry.
FAQ and Quick info are placeholders awaiting owner-provided content.

## Tests

With Node.js installed, run:

```powershell
node --test tests/utc-converter.test.cjs
```

These tests cover invalid inputs, date rollovers, daylight-saving gaps and repeats, fractional offsets,
and a skipped calendar day. No package installation is required.

## Publishing

GitHub Pages is configured to publish the repository root from `main`.
Once a change is reviewed and ready to publish, commit the intended files and push to `origin/main`.
GitHub starts its Pages build automatically. Check the repository's Actions page and verify
https://rdharhar.github.io/ after deployment. A successful push alone does not confirm a live update.

Git Credential Manager is authorized on the current development machine; it may request sign-in again
if authorization expires. Credentials are not stored in this repository.
The converter has a maintained Node test suite. GitHub provides the branch-based Pages deployment
workflow; there is no custom deployment workflow in this checkout.
