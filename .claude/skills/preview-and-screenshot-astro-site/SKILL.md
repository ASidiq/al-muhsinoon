---
name: preview-and-screenshot-astro-site
description: Launch the Al-Muhsinoon Astro dev server and capture screenshots for design review. Use when asked to run, start, preview, or screenshot this site, or to verify a frontend change actually looks right before calling it done.
---

# Previewing & screenshotting this site

This project is a static **Astro 5 + Tailwind v4** site (see [README.md](../../../README.md)). There is no `serve.mjs` — Astro has its own dev server.

## Start the dev server

```sh
npm run dev
```

Serves at `http://localhost:4321`. Check if it's already running before starting a second instance:

```sh
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4321/
```

## Build (production check)

```sh
npm run build     # outputs to ./dist — run this after any non-trivial change to confirm it compiles
npm run preview   # serve the built ./dist locally
```

## Screenshotting

`screenshot.mjs` lives in the project root and uses the `puppeteer` devDependency already installed (Chrome is cached locally, no download needed):

```sh
node screenshot.mjs http://localhost:4321/ label
```

- Saves full-page PNGs to `./temporary screenshots/screenshot-N-label.png` (auto-incremented, never overwritten).
- Read the PNG back with the Read tool to view it.
- Delete `./temporary screenshots/` when a review pass is done — it's gitignored but no need to let it pile up.

### Screenshotting a specific section

`src/styles/global.css` sets `html { scroll-behavior: smooth }`. A plain `scrollIntoView()` will animate, so a screenshot taken immediately after will still show the old scroll position. Force an instant jump and give layout a beat to settle:

```js
await page.evaluate(
  (id) => document.getElementById(id).scrollIntoView({ behavior: 'instant', block: 'start' }),
  id
);
await new Promise((r) => setTimeout(r, 150));
```

Section ids on the page: `#top` (hero/nav), `#mission`, `#programs`, `#rhythm`, `#give`, `#visit`.

### Viewports used for this site

- Desktop: `1440x900`
- Mobile: `390x844` (iPhone-class) — check the hamburger menu (`#menu-toggle` / `#mobile-menu`) opens and closes correctly at this width.

## Don't

- Don't screenshot a `file:///` URL — always serve on localhost first.
- Don't write one-off screenshot scripts into the project root and leave them — write throwaway scripts to `/tmp` and run them with the working directory unchanged, or extend `screenshot.mjs` directly if the capability is worth keeping. Clean up anything ad hoc when done.
