# Vox Meridian — v2 site

Eleventy + Netlify. Design language: Neue Typografie (see `CLAUDE.md` in the design project for
the shipping palette). Deployed at **voxmeridian.online**.

---

## Uploading this to GitHub

Netlify is already connected to `lexizotomayor/voxmeridian` and builds on every push to
`main` — build command `npx @11ty/eleventy`, publish directory `_site`, base directory blank.
You do not touch Netlify at all. You put files in GitHub; Netlify rebuilds.

1. Download this folder (`design_handoff_v2`) and unzip it.
2. Go to **github.com/lexizotomayor/voxmeridian**, make sure the branch selector says `main`.
3. **Add file → Upload files.**
4. Drag in the *contents* of the unzipped folder — `src/`, `admin/`, `.eleventy.js`,
   `netlify.toml`, `package.json`, `README.md`. Not the folder itself: the files must land at
   the repository root, next to where `package.json` already sits.
5. GitHub will ask about replacing existing files. Replace them — that is the point.
6. Commit message: `v2 design: templates, styles, wire`. Click **Commit changes**.
7. Netlify starts building within seconds. Watch **Deploys**. About two minutes.

If the deploy fails, open the log and read the last ten lines — it is almost always a typo in a
template name or a missing front-matter field, and the log names the file.

### Files you can safely delete from the repo after uploading

The v1 templates, if any are still there: `src/section.njk` (replaced by `sections.njk`),
`src/newsletter.njk` and `src/support.njk` (replaced by `subscribe.njk`), and
`src/_includes/base.njk`'s old version (overwritten).

---

## Demo mode

`src/_data/site.js` has two independent flags.

`preview: true` — demo notice:

- an esmeralda **For demo use** bar sits above the masthead on every page, linking to the
  explanation at `/about/#preview`
- the about page carries the "Where we are right now" disclosure
- the site is fully live and shareable in this state; it simply says what it is

`indexable: false` — search engines:

- every page carries `<meta name="robots" content="noindex, nofollow">`
- `/robots.txt` disallows all crawlers

Flip `indexable` to `true` when you want the demo found and indexed — you can do that
while the demo bar is still up. Edit the bar's wording in `site.js` (`previewNote`).
- `/about/` shows a "Where we are right now" section

This is what lets you launch for investors without publishing fiction as journalism: the
site is complete and demonstrably working, and every stand-in says so on the page.

**On launch day:** replace the placeholder content, then set `preview: false`. That single
change removes the bar, the noindex tags, and the crawler block site-wide.

## The model: wire-first

The Wire leads the nav and fills the site. Each item is a headline, a two-sentence summary
written by us, a dateline, a section, and a link out to the newsroom that reported it. Nothing
in the wire is presented as ours.

Wire items carry a `section` field, so:

- `/wire/` shows everything, newest first, each item tagged with its section
- `/business/`, `/security-and-diplomacy/`, `/politics/` show our own reporting first (when
  there is any), then the wire items for that section
- the homepage leads with an explainer — our own work — and runs the day's wire beneath it

Adding an item: edit `src/_data/wire.js` (or the CMS "The Wire" collection). Required on every
item: `title`, `summary`, `source`, `url`, `time`, `place`, `section`. Optional: `oursLabel`
and `oursHref` to point at a related explainer — that is the link that turns someone else's
news into a reader for your work.

Write your own summaries. Do not paste the outlet's dek: two sentences in your own words,
credited and linked, is ordinary aggregation practice; reproducing their copy is not.

## ⚠ Before you make the site public

`src/articles/` is now empty — the fabricated sample stories were deleted. Files in
`src/columns/` and `src/explainers/` are **placeholder text**
and carries `sample: true` in its front matter, which renders a terracotta banner on the page
reading "Sample layout content." They exist so the templates have something to lay out.

Do one of these before launch:

- **Replace them** with real reporting and set `sample: false` (or delete the line), or
- **Delete them** and publish with The Wire and real explainers only.

Do not publish them as-is. They describe events in a way that reads like reporting and none of
it was reported.

The Wire items in `src/_data/wire.js` are **real**: each one summarises a story another
newsroom published, in our words, and links the actual article. Four rules are written at the
top of that file — the important one is that no item ships without a working outbound URL,
because a credit with a dead or generic link is a false credit. Outlet names in the "Who we
read" sidebar come from `src/_data/outlets.js` and link to each newsroom; add an outlet there
the first time it appears in the feed.

---

## Structure

```
.eleventy.js          filters, collections, passthrough copy
netlify.toml          build command + publish dir
admin/                Decap CMS (config.yml is the schema writers see)
src/
  _data/              site, nav, sections, ticker, staff, desks, plans, wire, outlets, build
  _includes/          base.njk + article/column/explainer layouts
  articles/           reported stories (markdown)
  columns/            opinion columns (markdown)
  explainers/         explainers (markdown, with glossary + sources)
  css/style.css       the whole design; media queries at 1080 and 760
  images/             photographs and hedcuts
  index.njk           homepage
  sections.njk        generates /business/, /security-and-diplomacy/, /politics/
  wire.njk            /wire/ — the aggregation feed
  opinion.njk         /opinion/
  explainers.njk      /explainers/
  about.njk subscribe.njk rss.njk contact.njk thanks.njk
  feed.xml.njk        /feed.xml (everything)
  section-feed.njk    /<section>/feed.xml
  robots.txt.njk sitemap.xml.njk
```

## Running it locally (optional)

```
npm install
npm run serve
```

Then open the address it prints, usually `localhost:8080`.

## Forms

Four Netlify forms, all with a honeypot field and all redirecting to `/thanks/` with a
`?form=` parameter that switches the confirmation copy:

| Form | Where | Redirect |
| --- | --- | --- |
| `newsletter` | /subscribe/ | /thanks/?form=newsletter |
| `contact` | /contact/ | /thanks/?form=contact |
| `letters` | /opinion/ and every column | /thanks/?form=letter |
| `questions` | /explainers/ and every explainer | /thanks/?form=question |

Submissions appear under **Forms** in the Netlify dashboard. To get them by email:
Netlify → Site configuration → Forms → Form notifications → Add notification.

## The CMS

`/admin/` on the live site. Netlify Identity and Git Gateway are already configured from v1, so
existing writer logins still work. Invite new writers under Netlify → Identity → Invite users.

Editorial workflow is on: writers save drafts, an editor publishes. Drafts do not appear on the
site until published.

Note: the CMS `wire` and `settings` collections point at `.json` files, but the repo currently
ships `.js` data files. Either keep editing `wire.js` by hand, or convert those two to JSON —
whichever you prefer. Everything else in the CMS works as-is.

## Sections

Add a section by adding its name to `src/_data/sections.js` and `src/_data/nav.js`. The section
page, its feed, and the nav entry are generated automatically. Existing stories keep working.
