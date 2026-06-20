# Al-Muhsinoon

Landing page for Al-Muhsinoon Islamic Cultural Centre, Manchester — built with [Astro](https://astro.build) and Tailwind CSS v4.

## Development

```sh
npm install
npm run dev      # http://localhost:4321
```

## Build

```sh
npm run build    # outputs static site to ./dist
npm run preview  # serve the production build locally
```

## Deploying to Cloudflare Pages (via GitHub)

1. Push this repo to GitHub.
2. In Cloudflare Pages, create a project connected to the GitHub repo.
3. Build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. No adapter or functions are required — this is a fully static site.

## Project structure

- `src/pages/index.astro` — the page, assembled from section components in `src/components/`
- `src/layouts/Layout.astro` — HTML shell: meta tags, favicons, OG/Twitter card, fonts
- `src/styles/global.css` — Tailwind import + design tokens (colors, fonts, shadows) under `@theme`
- `public/` — favicons, manifest, OG image, and brand lockups (copied from `brand_assets/`)
- `brand_assets/` — source brand guidelines and exported logo files (not deployed; reference only)

## Content notes

Visit details (address, opening hours) and the weekly programme times in `src/components/Rhythm.astro` and `src/components/Visit.astro` are written as honest placeholders — update them with the centre's real schedule and contact details before launch.

## Screenshot workflow

`screenshot.mjs` (Puppeteer) captures the running dev server to `./temporary screenshots/`:

```sh
node screenshot.mjs http://localhost:4321/ label
```

See `.claude/skills/preview-and-screenshot-astro-site/SKILL.md` for the full workflow (section-specific screenshots, viewports, a scroll-behavior gotcha).
