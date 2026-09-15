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

- **About me** (`#about`, the default): photo and biography placeholders, résumé page links, and Contact me placeholders.
- **Reports** (`#reports`): an empty collection for future statistical reports.
- **Web Apps** (`#web-apps`): an empty collection for future browser tools and apps.
- **Gaming** (`#gaming`): space for future games and a link to [Arctic Wes on Twitch](https://www.twitch.tv/arcticwes).
- **Settings** (`#settings`): four saved color themes.

Job history, Education, and Skills are separate static pages under `about/`. Their content is explicitly
placeholder text; there are no fabricated credentials or working contact form yet.

## Style concepts

The current homepage uses the selected **Workbench** direction with a compact layout.
Open http://127.0.0.1:8000/ and choose **Settings** for Graphite, Ocean, Violet, or Paper.
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
Version 0.3.0 was published on 2026-09-15.
Version 0.4.0 adds the four content sections and résumé placeholders; see `CHANGELOG.md` for publication status.

## Publishing

GitHub Pages is configured to publish the repository root from `main`.
Once a change is reviewed and ready to publish, commit the intended files and push to `origin/main`.
GitHub starts its Pages build automatically. Check the repository's Actions page and verify
https://rdharhar.github.io/ after deployment. A successful push alone does not confirm a live update.

Git Credential Manager is authorized on the current development machine; it may request sign-in again
if authorization expires. Credentials are not stored in this repository.
There is no maintained automated test suite or custom deployment workflow in this checkout;
GitHub provides the branch-based Pages deployment workflow.
