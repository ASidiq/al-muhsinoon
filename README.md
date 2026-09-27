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

## Tests

```sh
npm test         # node:test, run over tests/
```

Node runs the TypeScript directly (native type stripping, Node 22.18+), so there's no test-runner dependency. The suites cover the Upcoming page's countdown-poster selection and the Anniversary page's data (page wrap-around, alt text, graduand and award lists) — see Content notes.

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

Pushing to `main` triggers the workflow: `npm ci` → `npm test` → `npm run build` → confirm/create the Pages project → `wrangler pages deploy dist --project-name=almuhsinoon`. No adapter or Pages Functions are needed — this is a fully static site.

### Scheduled rebuilds

The workflow also runs on a daily cron (`17 4 * * *`, i.e. 04:17 UTC) and can be triggered by hand from the Actions tab (`workflow_dispatch`). This exists so the Upcoming page's countdown poster, which is baked in at build time, never goes more than a day stale in the published HTML — the page also corrects itself in the browser, but crawlers and link previews only see what was built. Two things to know: GitHub disables scheduled workflows in a repo with no activity for 60 days (a push re-enables them), and a scheduled run deploys whatever is on `main`, so `main` should always be in a deployable state.

## Project structure

- `src/pages/index.astro` — the landing page, assembled from section components in `src/components/`
- `src/pages/programmes/index.astro` — the Programmes page: full write-up and photo galleries for every programme
- `src/pages/upcoming/index.astro` — the Upcoming page: the next community gathering, with its invitation and promo artwork
- `src/pages/anniversary/index.astro` — the 10th Anniversary & First Walimatul Qur'an special edition: magazine reader, PDF download, graduands, awardees, felicitations. Linked from the home page by `src/components/AnniversaryBand.astro` (between the Hero and Mission sections); not in the nav
- `src/components/MagazineReader.astro` — the in-page magazine reader (a small vanilla client script, no React): prev/next, ← → keys, thumbnail strip, and `a[data-open-page]` links elsewhere on the page that jump to a page
- `src/data/anniversary.ts` — the Anniversary page's content: page labels (alt text), graduands, awards, felicitations, the PDF path and the `SHOW_FROM_THE_DAY` flag (tested in `tests/anniversary.test.ts`). `src/lib/anniversary-assets.ts` resolves its filenames to built images
- `src/data/upcoming.ts` — the next event's date and its poster set, plus `posterFor(now)`, which picks the countdown poster for the current week (tested in `tests/upcoming.test.ts`)
- `src/data/nav.ts` — single source of truth for the primary nav links (and the active-page rule), imported by both `Nav.astro` and `Footer.astro`
- `src/data/programmes.ts` — single source of truth for programme copy, icons, and photos; imported by both the landing page's teaser cards (`src/components/Programs.astro`) and the Programmes page. Photos are resolved through `programmePhoto()` (see [Images and caching](#images-and-caching))
- `src/components/ProgrammesExplorer.tsx` + `src/components/ui/interactive-selector.tsx` + `src/components/ui/carousel.tsx` — the React island powering the Programmes page (see "React & shadcn" below)
- `src/layouts/Layout.astro` — HTML shell: meta tags, favicons, OG/Twitter card, fonts
- `src/styles/global.css` — Tailwind import + design tokens (colors, fonts, shadows) under `@theme`
- `src/assets/programmes/<slug>/` — curated, web-sized (max ~1600px, resized via macOS `sips`) photos for each programme; resolved by `programmePhoto()` in `src/data/programmes.ts`
- `src/assets/upcoming/` — web-sized (max ~1400px, resized via macOS `sips`) event artwork: the save-the-date, the five weekly countdown posters, and the graduands poster
- `src/assets/magazine/` — the anniversary magazine, one image per page (`page-01.jpg` … `page-32.jpg`, 764×1080, rendered from the PDF)
- `src/assets/anniversary/graduands/` — graduand portraits (`g-<slug>.jpg`, ~384px square, cropped from the magazine)
- `public/magazine/al-muhsinoon-10th-anniversary.pdf` — the anniversary magazine PDF (~20 MB), in `public/` so it keeps a fixed, shareable URL. Cloudflare Pages caps files at 25 MB, so a heavier re-export must be compressed first
- `public/` — favicons, manifest, OG image, and brand lockups (copied from `brand_assets/`). **Content photography does not belong here** — see [Images and caching](#images-and-caching)
- `tests/` — `node:test` suites, kept out of `src/` so nothing test-related is scanned into the build
- `brand_assets/` — source brand guidelines and exported logo files (not deployed; reference only)

## React & shadcn

This is otherwise a fully static Astro + Tailwind site with no JS framework. The Programmes page is the one exception: it uses `@astrojs/react` plus two React components installed via the [shadcn](https://ui.shadcn.com) CLI (an image-fan "Interactive Selector" for switching programmes, and an Ark UI–based `Carousel` for browsing each programme's photos), restyled to the site's brand tokens in `src/components/ui/`. Only that page ships the React bundle (`client:load` on `<ProgrammesExplorer />`) — the landing page stays framework-free.

## Images and caching

**Content photography lives in `src/assets/`, never `public/`.**

Files in `public/` are copied to `dist/` byte-for-byte with their names untouched, so their URLs never change. Cloudflare Pages serves them with `cache-control: public, max-age=14400`, which means replacing a photo in place leaves visitors on the old one for up to four hours — the URL they cached is still the current URL. That is a real bug we hit, not a theoretical one.

Images under `src/assets/` go through Astro's asset pipeline instead. The build fingerprints them with a content hash (`_astro/jummah-service-03.Bnu2A4k8.jpg`) and converts the Astro-rendered ones to WebP (~60% smaller). Change the file, the hash changes, the URL changes, and no browser can serve a stale copy.

`public/` is reserved for files that need a fixed, predictable URL: favicons, `site.webmanifest`, the OG image, the brand lockups, and the anniversary magazine PDF.

**Adding or replacing a photo:**

1. Drop it in `src/assets/programmes/<slug>/`, `src/assets/upcoming/`, or (for the Anniversary page) `src/assets/magazine/` / `src/assets/anniversary/graduands/`.
2. Reference it through the resolver, not a URL string — `programmePhoto('<slug>/<file>.jpg')` for programme photos, `posterAsset('<file>.jpg')` on the Upcoming page, `magazinePage(n)` / `graduandPhoto(slug)` for the Anniversary page. Both throw at build time on a typo rather than shipping a broken `<img>`.
3. In `.astro` files use `<Image src={...} />` from `astro:assets` so the image is optimised. The React island can't — it renders plain `<img>` from `photo.src`, which is still fingerprinted, just not converted.

Two deliberate wrinkles:

- `src/data/upcoming.ts` stores a bare **filename** (`file`), not a URL, because `tests/upcoming.test.ts` imports it under plain `node --test`, where Vite-only syntax like `import.meta.glob` would fail. `src/pages/upcoming/index.astro` maps filename → built URL.
- That same page resolves **every** poster up front and passes the map to the client script on a `data-poster-urls` attribute. The script swaps posters at runtime and cannot run the image pipeline itself, so it can't derive a hashed URL on its own.

## Content notes

- The Upcoming page carries one event: the 10th Year Anniversary & First Walimatul Qur'an (Sat 12 September 2026, 11:00am, The Memory Hall, Bolton). The date, venue, graduand names and enquiry contacts are transcribed from the event flyers in `Al-Muhsinoon_Content/Upcomings/`. The page assumes one event at a time — when this one passes, replace it rather than leaving it stale.
- **The event poster changes week by week.** In the five weeks before the event the page shows the centre's matching countdown poster ("5 Weeks to go!" … "1 Week to go!"); outside that window — earlier than five weeks out, or once the event has passed — it falls back to the save-the-date artwork. `posterFor()` runs twice: once at build time (so the HTML is correct with JavaScript disabled) and again in the browser on every page load, against the visitor's own clock. That second pass is what keeps a refresh correct on a site that hasn't been rebuilt in weeks.
- **Anniversary page (`/anniversary`).** The awardee names are transcribed from page 24 of the magazine, with the client's corrections applied.
- **"From the day" is built but hidden.** Set `SHOW_FROM_THE_DAY = true` in `src/data/anniversary.ts` once the photos and video from the event are ready, and replace the placeholder tiles in `src/pages/anniversary/index.astro` with the real media first.
- To replace the magazine, swap the page images in `src/assets/magazine/` and the PDF in `public/magazine/`, then update `MAGAZINE_PAGE_COUNT` and `PAGE_LABELS` in `src/data/anniversary.ts`.
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
