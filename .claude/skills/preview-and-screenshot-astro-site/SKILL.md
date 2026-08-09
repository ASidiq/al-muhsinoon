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
npm run preview   # serve the built ./dist locally (also port 4321)
```

**Screenshot `/programmes` against `preview`, not `dev`.** The dev server's React Fast Refresh
transform has an intermittent `Missing field 'moduleType'` error in this Astro/Vite version that
renders `/programmes` blank. It never affects the production build, so verify that page with
`npm run build && npm run preview`. Start `preview` as a background task and poll `curl` until it
answers 200 before shooting.

`dev` and `preview` both want port 4321, so only run one at a time — a 200 from `curl` tells you
something is up, not which. Stop the background task when the review pass is done. And `preview`
serves the last `dist/`, so **rebuild after every edit** or you'll screenshot stale output.

## Screenshotting

`screenshot.mjs` lives in the project root and uses the `puppeteer` devDependency already installed (Chrome is cached locally, no download needed):

```sh
node screenshot.mjs <url> <label> [--width=N] [--height=N] [--scroll-to=<section-id>]
```

It already handles the section-scroll and lazy-image cases — reach for the flags before writing
any script of your own:

```sh
node screenshot.mjs http://localhost:4321/ home-desktop
node screenshot.mjs http://localhost:4321/ programs-mobile --scroll-to=programs --width=390 --height=844
node screenshot.mjs "http://localhost:4321/programmes#hajj-and-umrah" deeplink   # quote URLs with a #
```

- Saves to `./temporary screenshots/screenshot-N-label.png` (auto-incremented, never overwritten).
- Read the PNG back with the Read tool to view it.
- Delete `./temporary screenshots/` when a review pass is done — it's gitignored but no need to let it pile up.
- `--scroll-to` captures the **viewport** at that section; without it you get a **full-page** shot.
- Defaults are `1440x900`. Quote any URL containing `#`, or the shell truncates it.

`--scroll-to` exists because `src/styles/global.css` sets `html { scroll-behavior: smooth }` — a
plain `scrollIntoView()` animates, so a shot taken straight after still shows the old position. The
script forces `behavior: 'instant'` and waits for layout to settle. Section ids: `#top` (hero/nav),
`#mission`, `#programs`, `#rhythm`, `#give`, `#visit`.

### When you need more than a screenshot

For clicking through a carousel, counting elements, or catching 404s, write a one-off puppeteer
script **into the project root** and delete it in the same command:

```sh
cat > _check.mjs <<'EOF'
import puppeteer from 'puppeteer';
// ...
EOF
node _check.mjs; rm -f _check.mjs
```

It must live in the project root. Node resolves ESM imports from the **script's own** directory, not
the working directory, so a script in `/tmp` fails with `ERR_MODULE_NOT_FOUND: Cannot find package
'puppeteer'` no matter where you run it from.

### Viewports used for this site

- Desktop: `1440x900`
- Mobile: `390x844` (iPhone-class) — check the hamburger menu (`#menu-toggle` / `#mobile-menu`) opens and closes correctly at this width.

## Don't

- Don't screenshot a `file:///` URL — always serve on localhost first.
- Don't write throwaway scripts to `/tmp` — they can't resolve `puppeteer` (see above). Project root, deleted in the same command.
- Don't leave one-off scripts behind. If a capability is worth keeping, add it to `screenshot.mjs` as a flag rather than growing a second script.
