# Instructions for Claude Code — Vox Meridian

Read this file completely before touching anything. It is written to stop the three
things that have already gone wrong twice on this project.

---

## What this repo is

An Eleventy 2.0.1 site, built on Netlify, live at **voxmeridian.online**. The build is
`npx @11ty/eleventy` and publishes `_site`. No bundler, no framework, no npm packages beyond
Eleventy itself. `src/css/style.css` is hand-written CSS with custom properties — there is no
Tailwind, no PostCSS, no preprocessor. Keep it that way.

The design language is Neue Typografie: rule stacks (7px double borders), torn-paper photo
mounts via an SVG turbulence filter, vertical display type in the right rail, no rounded
corners, no centered layouts. `CLAUDE.md` at the repo root holds the palette and the rules
about it. **Read `CLAUDE.md` before writing any CSS.**

---

## The three rules

### 1. Replace, do not merge

This handoff is a complete, self-consistent tree. When installing it, delete the existing
`src/`, `admin/`, `.eleventy.js`, `netlify.toml` and `package.json` first, commit that, then
add these files. A merge leaves half-rewritten files behind with matching filenames, which
builds cleanly and renders wrong — that is exactly the failure this project has already hit.

### 2. Do not refactor, restructure, or improve

Do only what you are asked. Specifically, do **not**:

- convert the CSS to Tailwind, CSS modules, SCSS, or utility classes
- introduce a build step, bundler, or framework
- reformat, re-indent, or reorder `style.css`
- rename classes, files, data keys, or URLs
- "modernise" the Nunjucks templates or replace them with another template language
- add dependencies

If you believe a refactor is needed, say so and stop. Do not perform it.

### 3. Verify the edit actually applied

Every string replacement must be confirmed by re-reading the file and finding the new text.
A silent no-match — pattern not found, file saved unchanged, no error raised — has already
shipped a broken deploy on this project. Grep for the new content after every edit. If a
pattern does not match, report it; do not guess at a looser pattern.

---

## Invariants that will break the design if you change them

These are not preferences. Each one has already caused a visible failure.

| Invariant | Why |
| --- | --- |
| **The homepage has no horizontal navbar** | See below — this is the one that took six rounds to find |
| Shell gutters are **symmetric**: `--pad-l` and `--pad-r` both `clamp(20px, 3vw, 48px)` | Asymmetric values shove the whole desktop layout off-centre |
| `.cols` sidebar is `clamp(200px, 20vw, 300px)` | Wider steals measure from the main column |
| The phone breakpoint is **900px**, not 760px | The design switches composition there, not just size |
| `.nameplate__word` holds **one short word** (`vox`) | `writing-mode: vertical-rl` + `nowrap` makes every character a full em of *height* |
| `.topnav` is `flex-wrap: nowrap` and scrolls | Nine items wrap onto a second line and double the masthead height |
| Terracotta has two steps, one per ground | `#C4501F` on Esmeralda only, `#7A3216` on bege only — see `CLAUDE.md` |
| Filter lists **before** limiting them | See below |

### The homepage structure

This is the mistake that survived six rounds of fixes, so read it twice.

The homepage does **not** have a horizontal masthead. Its navigation is a **vertical section
list in the right rail**, sitting above the `vox meridian` wordmark set vertically with
`writing-mode: vertical-rl`. The page is one two-column CSS grid:

```
row 1   .homegrid__main   lead story + more stories + wire   |  .rail-nav   section list, then wordmark
row 2   .homegrid__pod    podcast band                       |  .homegrid__foot   dark footer panel
```

It uses `layout: home.njk`, which carries **only** the demo bar, the phone header, and the
date/ticker strip — deliberately no `.masthead`. Every other page uses `base.njk`, which does
have the horizontal masthead. That asymmetry is intentional and matches the design files.

If the homepage looks wrong, do not "fix" it by adding a conventional header, moving the
wordmark to the top left, or turning the rail into a top nav bar. That is how it broke before.
Compare against `Vox Meridian v2 - Homepage.dc.html` in the design set, which is the source
of truth.

### The filter-then-limit rule

In Nunjucks, `loop.index0` counts position in the **whole** list, not in the matches. This is
wrong and silently renders nothing:

```njk
{% for it in wire.all %}
  {% if it.section == section and loop.index0 < 3 %}   {# BUG #}
```

Use the filters defined in `.eleventy.js`:

```njk
{% for it in wire.all | where('section', section) | limit(3) %}
```

`limit`, `where`, `exclude` and `byName` all live in `.eleventy.js`. Use them.

---

## Editorial rules that are not style choices

**The Wire is aggregation.** Every item in `src/_data/wire.js` summarises a story another
newsroom published, in our words, and links their article. Four rules are written at the top
of that file. The one that matters: **no item ships without a working outbound URL**, because
a credit with a dead or generic link is a false credit. Never paste an outlet's copy. Never
invent an item. Never attach a real outlet name to a summary you wrote from nothing.

**No fabricated bylines.** Do not invent authors, staff, or quotes. `src/_data/staff.js` holds
real people only.

**Demo mode is deliberate.** `preview: true` in `src/_data/site.js` adds the "For demo use"
bar, sets `noindex`, and blocks robots. Do not remove it. It comes off when the newsroom
decides, not when the code looks finished.

**The podcast does not exist yet.** `src/_data/podcast.js` ships `sample: true`, which prints
a caveat line, and every episode has `audio: null`, which greys its play button. Do not remove
the caveat to make the page look better. Either leave it, or set `show: false`.

---

## Verification before you report done

Run the build and confirm all of this. Do not report success without it.

```
npx @11ty/eleventy --serve
```

1. Build completes with no warnings; check the page count against the previous deploy.
2. **Desktop at 1440px, homepage**: no horizontal navbar. Section list runs vertically down
   the right rail, with `vox meridian` set vertically beneath it and the dark footer panel
   below that. Lead headline sits left of a torn-paper 4:3 photo. Gutters equal on both sides.
3. **Desktop at 1440px, any other page**: masthead is one row — wordmark left, nav right, no
   wrapping.
4. **Tablet at 1000px**: sidebar has dropped below the main column; header still one row.
5. **Phone at 390px**: the compact sticky header is showing with the hamburger, the desktop
   masthead is gone, the lead photo is full-bleed 3:2 above the headline, and no vertical type
   appears anywhere.
6. Open an article page: related-stories sidebar is **not empty** — it should list stories
   and/or wire items on the same section.
7. Homepage wire shows five items, not one.
8. Every Wire link opens the outlet's article in a new tab.
9. `/podcast/` renders with the caveat line and greyed play buttons.
10. Forms: `contact`, `letters`, `questions`, `newsletter` all still detected in the deploy log.

If any check fails, fix it and re-run all ten. Report which checks you ran.

---

## Known outstanding work

Not bugs — real gaps, listed so you do not "fix" them by inventing content.

- The Wire items are dated and go stale; they need refreshing from real outlets by hand.
- Article and Column have hand-built phone layouts in the design mockups that are **not** yet
  ported — only the Homepage phone composition exists in code.
- The publisher role in the masthead is intentionally unfilled.
