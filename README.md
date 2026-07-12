# Sea Otters — MATE ROV Club Field Guide

A student-built, fun-to-read learning website for a teen robotics club preparing for the
[MATE ROV Competition](https://materovcompetition.org). It rebuilds the official (and rather
dry) PDF knowledge base into a fast, friendly, multi-section site — focused on the
**SCOUT**, **NAVIGATOR**, and **RANGER** classes.

## Structure

```
site/            The website (static HTML/CSS/JS — open site/index.html)
  index.html     Home
  start.html     Start Here — orientation for absolute beginners
  classes.html   The three classes compared
  mission.html   The 2026 mission, task by task
  build.html     Build guide (frame, thrusters, buoyancy, electronics…)
  safety.html    Safety inspection checklist + JSEA
  scoring.html   Scoring & deliverables — where points really live
  playbook.html  Rookie playbook — community wisdom
  resources.html Official downloads by class + curated community links
  assets/        style.css (design system) + main.js (nav, theme, reveal)

orig_docs/       Original 2026 MATE PDFs, sorted by class (SCOUT/NAV/RANGER/general)
  INDEX.md       Catalog of everything downloaded
work/            Research notes & extracted text (git-ignored)
```

## Running it

It's a plain static site — just open `site/index.html` in a browser, or serve the folder:

```
python3 -m http.server --directory site 8000
# then visit http://localhost:8000
```

Deploy anywhere that serves static files (GitHub Pages, Netlify, etc.).

## Editing

- **Rename the club or change the nav:** edit the `SITE` object at the top of
  `site/assets/js/main.js` — the header and footer are generated from it on every page.
- **Colors, fonts, spacing:** all live as CSS custom properties at the top of
  `site/assets/css/style.css`. Light and dark themes are both defined there.
- **Content:** each page is self-contained HTML using the shared component classes
  (`.card`, `.callout`, `.checklist`, `.table-wrap`, `.badge`, …).

## Sources

All content is distilled from the official 2026 MATE ROV documents (in `orig_docs/`) and
verified community resources (see `resources.html`). Source material © MATE ROV Competition.
