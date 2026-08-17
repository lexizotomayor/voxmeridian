# Handoff: Vox Meridian News Website

## Overview
Vox Meridian is a Pacific/US-focused news site (business, security & diplomacy, politics) with daily
coverage from overseas writers, standard news-site advertising, and reader signup/support pages.
This package is a **working Eleventy (11ty) starter** wired to **Decap CMS** (free, git-based CMS),
ready to push to GitHub and deploy on Netlify.

## About the design files
The `Vox Meridian - *.dc.html` files in the parent project are **HTML design references** —
high-fidelity mockups of the homepage, article page, section page, newsletter/support/contact pages.
This folder is the **real, buildable implementation** of that design as a static site: same layout,
colors (navy #1f3b5c / maroon #9a1b3a / off-white #f7f6f2), and Lora + Public Sans type pairing,
translated into Eleventy templates + plain CSS (no build step beyond Eleventy itself).

## Fidelity
High-fidelity. Colors, type, and layout match the approved mockups. Treat the `.dc.html` files as the
visual source of truth if anything here needs adjusting.

## What's included
- `src/_includes/base.njk` — shared header/nav/footer shell
- `src/_includes/article.njk` — article page layout
- `src/index.njk` — homepage (lead story + grid, pulled from `src/articles/*.md`)
- `src/section.njk` — auto-generates one page per section (Business, Security & Diplomacy, etc.)
- `src/articles/*.md` — 5 sample articles (front matter + markdown body) matching the mockups
- `src/css/style.css` — all design tokens (colors, fonts, spacing) as plain CSS
- `admin/config.yml` + `admin/index.html` — Decap CMS setup, so your overseas writers get a
  browser-based editor (no code, no local setup) that commits directly to GitHub
- `netlify.toml` — Netlify build config

## Local setup
```
npm install
npm run serve      # preview at localhost:8080
npm run build      # outputs static site to _site/
```

## Launching on Netlify (voxmeridian.online)
1. **Push this folder to a new GitHub repo** (e.g. `vox-meridian`). If you're not comfortable with
   git, ask a developer for 15 minutes, or use GitHub's "upload files" web UI for the initial commit.
2. **Netlify → Add new site → Import an existing project** → pick the GitHub repo. Netlify will read
   `netlify.toml` automatically (build command `npx @11ty/eleventy`, publish folder `_site`).
3. **Enable Netlify Identity** (Site settings → Identity → Enable). Set registration to "Invite only."
4. **Enable Git Gateway** (Identity → Services → Git Gateway → Enable). This lets Decap CMS commit to
   your repo on behalf of invited writers, without giving them a GitHub account.
5. **Invite your writers**: Identity tab → Invite users → enter each writer's email. They'll get a
   link to set a password, then log in at `https://voxmeridian.online/admin/` to write and publish
   stories — no code, no local setup, works from anywhere.
6. **Connect your domain**: Site settings → Domain management → Add custom domain → enter
   `voxmeridian.online`. Netlify will show you the DNS records (usually a couple of A/CNAME records)
   to add at your domain registrar. Netlify issues a free SSL certificate automatically once DNS
   points to it (can take up to a few hours to propagate).
7. **Add real images**: drop photos into `src/images/` (or have writers upload via the CMS media
   picker) — replace the placeholder assets copied over from the mockups.

## Ongoing cost
- Netlify free tier covers this comfortably at typical traffic (100GB bandwidth/month free).
- Decap CMS is free and open source — no subscription.
- Only paid cost is the domain itself (already purchased) and, if traffic grows a lot, a Netlify
  paid tier. This is about as inexpensive as self-hosted news publishing gets.

## Design tokens
- Navy: `#1f3b5c` · Maroon: `#9a1b3a` · Off-white bg: `#f7f6f2` · Ink: `#1a1a1a`
- Headline font: Lora (serif) · Body/UI font: Public Sans (sans)
- Sections: Business, Security & Diplomacy, Politics, Pacific, US, Opinion, Explainers

## Not yet built here (next steps if wanted)
- Ad slots are static placeholders — wire up your ad network's script tags (e.g. Google Ad Manager)
  in `base.njk` where the `.ad-slot` divs are.
- Newsletter/Support/Contact pages exist as mockups (`Vox Meridian - Newsletter/Support/Contact.dc.html`)
  but aren't yet built as Eleventy templates — same pattern as `index.njk`, straightforward to add.
- Dark mode toggle from the mockups isn't implemented here — would need a small client-side JS toggle
  swapping a CSS class, plus a dark-mode CSS block mirroring the mockup's dark palette.
