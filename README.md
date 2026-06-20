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
