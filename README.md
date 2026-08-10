# Al-Muhsinoon

Website for Al-Muhsinoon Islamic Cultural Centre, Manchester — built with [Astro](https://astro.build) and Tailwind CSS v4. The site is three pages: a landing page (`/`), a Programmes page (`/programmes`) that uses React for an interactive photo selector/carousel, and an Upcoming page (`/upcoming`) listing the next community gathering — see [Project structure](#project-structure).

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

## Deploying to Cloudflare Pages

Deploys are handled by GitHub Actions (`.github/workflows/deploy.yml`), not Cloudflare's own Git integration — the Pages project is **direct-upload**, not connected to the GitHub repo, so the two don't both try to build the same push. The workflow creates the Pages project itself the first time it runs (checks the Cloudflare API for a project named `almuhsinoon`, creates it if missing), so there's no manual `wrangler pages project create` step.

### One-time setup

1. **Buy the domain** (Cloudflare Registrar → Register a Domain → search `almuhsinoon`, pick a TLD). Buying through Cloudflare adds it as a managed zone automatically.
2. **Get an API token and account ID:**
   - My Profile → API Tokens → Create Token → "Edit Cloudflare Workers" template, scoped to your account.
   - Account ID is in the sidebar of any Workers & Pages page.
3. **Add GitHub repo secrets** (Settings → Secrets and variables → Actions):
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
4. **Push to `main`** — the workflow creates the `almuhsinoon` Pages project (if it doesn't exist yet) and deploys to it in the same run.
5. **Add the custom domain:** Workers & Pages → almuhsinoon → Custom domains → Add `almuhsinoon.org` (and `www` if wanted). DNS + SSL are configured automatically since the zone is already in Cloudflare.

### Every push after that

Pushing to `main` triggers the workflow: `npm ci` → `npm run build` → confirm/create the Pages project → `wrangler pages deploy dist --project-name=almuhsinoon`. No adapter or Pages Functions are needed — this is a fully static site.

## Project structure

- `src/pages/index.astro` — the landing page, assembled from section components in `src/components/`
- `src/pages/programmes/index.astro` — the Programmes page: full write-up and photo galleries for every programme
- `src/pages/upcoming/index.astro` — the Upcoming page: the next community gathering, with its invitation and promo artwork
- `src/data/nav.ts` — single source of truth for the primary nav links (and the active-page rule), imported by both `Nav.astro` and `Footer.astro`
- `src/data/programmes.ts` — single source of truth for programme copy, icons, and image paths; imported by both the landing page's teaser cards (`src/components/Programs.astro`) and the Programmes page
- `src/components/ProgrammesExplorer.tsx` + `src/components/ui/interactive-selector.tsx` + `src/components/ui/carousel.tsx` — the React island powering the Programmes page (see "React & shadcn" below)
- `src/layouts/Layout.astro` — HTML shell: meta tags, favicons, OG/Twitter card, fonts
- `src/styles/global.css` — Tailwind import + design tokens (colors, fonts, shadows) under `@theme`
- `public/programmes/<slug>/` — curated, web-sized (max ~1600px, resized via macOS `sips`) photos for each programme; paths are referenced directly in `src/data/programmes.ts`
- `public/upcoming/` — web-sized (max ~1400px, resized via macOS `sips`) event artwork referenced by the Upcoming page
- `public/` — favicons, manifest, OG image, and brand lockups (copied from `brand_assets/`)
- `brand_assets/` — source brand guidelines and exported logo files (not deployed; reference only)

## React & shadcn

This is otherwise a fully static Astro + Tailwind site with no JS framework. The Programmes page is the one exception: it uses `@astrojs/react` plus two React components installed via the [shadcn](https://ui.shadcn.com) CLI (an image-fan "Interactive Selector" for switching programmes, and an Ark UI–based `Carousel` for browsing each programme's photos), restyled to the site's brand tokens in `src/components/ui/`. Only that page ships the React bundle (`client:load` on `<ProgrammesExplorer />`) — the landing page stays framework-free.

## Content notes

- The Upcoming page currently carries one event, Walimatul Qur'an (12 September 2026). Its details are transcribed from the printed invitation in `Al-Muhsinoon_Content/Upcomings/`; the venue postcode reads `BI3 5EL` on the artwork and is set as `BL3 5EL` on the site — confirm with the centre. When the event passes, replace or remove the page rather than leaving it stale.
- Visit details (address, opening hours) and the weekly programme times in `src/components/Rhythm.astro` and `src/components/Visit.astro` are written as honest placeholders — update them with the centre's real schedule and contact details before launch.

## Screenshot workflow

`screenshot.mjs` (Puppeteer) captures the running dev server to `./temporary screenshots/`:

```sh
node screenshot.mjs http://localhost:4321/ label
node screenshot.mjs http://localhost:4321/ label --width=390 --height=844   # mobile viewport
node screenshot.mjs http://localhost:4321/ label --scroll-to=programs       # jump to a section id first
```

Note: the dev server's React Fast Refresh transform has a known intermittent `Missing field 'moduleType'` error in this Astro/Vite version that can make `/programmes` render blank during `npm run dev`. It doesn't affect the production build — if you hit it, verify against `npm run build && npm run preview` instead.

See `.claude/skills/preview-and-screenshot-astro-site/SKILL.md` for the full workflow (section-specific screenshots, viewports, a scroll-behavior gotcha).
