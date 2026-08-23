# Sea Otters — MATE ROV Club Field Guide

A student-built, fun-to-read learning website for a teen robotics club preparing for the
[MATE ROV Competition](https://materovcompetition.org). It rebuilds the official (and rather
dry) PDF knowledge base into a fast, friendly, multi-section site — focused on the
**SCOUT**, **NAVIGATOR**, and **RANGER** classes.

## Structure

```
site/                    The website (static HTML/CSS/JS)
  index.html             Home
  start.html             Start Here — orientation for absolute beginners
  classes.html           The classes compared                    [Guide]
  build.html             Build guide (frame, thrusters, …)       [Guide]
  safety.html            Safety inspection checklist + JSEA      [Guide]
  scoring.html           Scoring & deliverables                  [Guide]
  team.html              Team & practice — roles, drills, mistakes [Guide]
  plan.html              Season Plan 2027 — our roadmap          [Season]
  mission.html           The 2026 mission, task by task          [Season]
  mission-compare.html   NAV vs RANGER, line by line             [Season]
  results.html           Our 2026 regional scorecard             [Season]
  resources.html         Official downloads by class + curated community links
  assets/                style.css (design system) + main.js (nav, theme, reveal)

orig_docs/       Original 2026 MATE PDFs, sorted by class (local only, git-ignored)
work/            Research notes & extracted text (local only, git-ignored)
```

The nav groups pages into evergreen **Guide** (how to compete, any year) and **Season**
(this season's mission, plan, and results). When the 2027 mission drops, only the Season
group needs new content — the Guide stays as is.

## Running it

It's a plain static site — just open `site/index.html` in a browser, or serve the folder:

```
python3 -m http.server --directory site 8000
# then visit http://localhost:8000
```

## Deploying

Pushing to `main` publishes automatically: a GitHub Actions workflow
(`.github/workflows/deploy.yml`) uploads `site/` to GitHub Pages on every push.
Nothing else to do — no build step. The workflow can also be re-run manually from
the Actions tab (`workflow_dispatch`).

## Editing

- **Rename the club or change the nav:** edit the `SITE` object at the top of
  `site/assets/js/main.js` — the header and footer are generated from it on every page.
  Nav entries are links `{ href, label }` or dropdown groups `{ label, items: [...] }`.
- **Colors, fonts, spacing:** all live as CSS custom properties at the top of
  `site/assets/css/style.css`. Light and dark themes are both defined there.
- **Content:** each page is self-contained HTML using the shared component classes
  (`.card`, `.callout`, `.checklist`, `.table-wrap`, `.badge`, `.timeline`, …).

## TODO

### Site

- [x] Merge `build.html` and `playbook.html` — done: Build absorbed the hardware content
      (toolkit, pool-day habits); the rest became `team.html` (Team & Practice: roles,
      practice, judge Q&A, mistakes). `playbook.html` is gone.
- [x] De-duplicate the "paperwork is 40–50% of your score" callout — full version lives
      in Scoring (+ evidence in Results); other pages link to it in one line.
- [x] Trim `resources.html`: dropped stale/World-Championship-only PDFs (2023 shipping,
      Crab Samples, WC scoresheets, duplicate rubric); NAVIGATOR group opens by default,
      RANGER marked as the 2028 target.
- [x] Slim the Home ↔ Start Here overlap — Home keeps hero + stats + section map;
      the "what is MATE" explainer lives only on Start Here.
- [ ] When the 2027 mission preview drops (~Oct 1): add a 2027 mission page to the Season
      group and move the 2026 pages (mission, NAV vs RANGER, scorecard) into an archive
      subsection.
- [ ] Update TBD dates in `plan.html` (registration, regional date) once MATE publishes
      the 2027 calendar.

### Open questions (from the season plan)

- [ ] Is the school's one-per-school RANGER slot taken by the other team? (confirm)
- [ ] Exact depths of both practice pools — is either really 4 m?
- [ ] Fundraiser date and venue.
- [ ] Will the professor join as club advisor / mock judge?

## Sources

All content is distilled from the official 2026 MATE ROV documents (in `orig_docs/`) and
verified community resources (see `resources.html`). Source material © MATE ROV Competition.
