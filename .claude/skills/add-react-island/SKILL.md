---
name: add-react-island
description: Add an interactive React UI component (shadcn, 21st.dev, or hand-rolled) as a hydrated island to this otherwise-static Astro site. Use when a feature needs client-side interactivity that plain Astro + a small inline script can't cleanly do (carousels, selectors, anything with shared React state), or when asked to pull in a shadcn / 21st.dev component.
---

# Adding a React island to this Astro site

This site is **Astro 5 + Tailwind v4**, otherwise static. React was added in the Programmes work so a few components could be interactive islands. Most pages should stay framework-free — only reach for this when an inline `<script>` would be genuinely worse. The first time, this took a lot of trial-and-error; this skill is the shortcut.

## What's already installed (don't redo)

- `@astrojs/react` is wired into `astro.config.mjs` (`integrations: [react()]`).
- shadcn is initialised: `components.json` (style `radix-nova`), `src/lib/utils.ts` (the `cn()` helper), path alias `@/*` → `src/*` in `tsconfig.json`.
- Deps present: `react`, `react-dom`, `@ark-ui/react` (headless primitives, e.g. carousel), `lucide-react` + `react-icons` (icons), `class-variance-authority`, `clsx`, `tailwind-merge`.
- shadcn's semantic tokens (`--primary`, `--background`, `--ring`, …) are **remapped to the brand palette** in `src/styles/global.css` `:root`, and `--font-sans`/`--font-heading` point at the brand fonts in `@theme inline`. There is no dark mode block — don't reintroduce one.

If you ever re-run init from scratch on a clean checkout: `tsconfig.json` needs the `@/*` path alias **before** `npx shadcn init` will run, and the command is non-interactive only with flags: `npx shadcn@latest init -t astro -b radix -p nova -y`.

## Getting the component source

- **shadcn's own registry** works via CLI: `npx shadcn@latest add <name>` → lands in `src/components/ui/`.
- **21st.dev components are gated** ("authentication required") and can't be fetched by the CLI without a paid account. Get the source another way (the user can paste it) and save it into `src/components/ui/` by hand. Watch for: `<style jsx>` (Next-only — convert to Tailwind or a real `<style>`), hardcoded demo data (make it a prop), `react-icons` sets that may not exist (verify the icon name is in `node_modules/react-icons/<set>/index.d.ts` first), and fixed pixel sizes (make them responsive).

## Restyle to brand (anti-generic guardrails still apply)

Any pulled-in component arrives generic. Before using it:
- Strip/replace default greys and blues — no `slate-*`/`zinc-*`/`oklch(... 0 0)` literals, no `dark:` variants. Use the brand tokens (`maroon`, `gold`, `sand`, `cream`, `ink`) and `shadow-soft`/`shadow-lift`.
- Replace `transition-all` with explicit properties: `transition-[transform,opacity]` etc. Only animate transform/opacity.
- Every interactive element needs hover + `focus-visible` (the repo's `.focus-ring` class) + active states.
- `prefers-reduced-motion` is handled globally in `global.css`, so new components inherit it for free — don't re-add it.

## Wire it up as an island

- Put shared content (copy, image paths, icons) in `src/data/*.ts` and import it into **both** the `.astro` page and the `.tsx` component, so copy isn't duplicated. See `src/data/programmes.ts`.
- Two widgets that share selection state must be **one composite `.tsx` component** holding the state — separate islands can't share React state. See `src/components/ProgrammesExplorer.tsx` (selector + carousel + body copy in one).
- Import the component into the `.astro` page and add a client directive: `<ProgrammesExplorer client:load />` for primary above-the-fold content, `client:visible` for below-the-fold. No directive = it renders static and won't be interactive.
- Images shown by plain React `<img>` get **no** `astro:assets` optimisation. Resize/compress curated photos with macOS `sips` into `public/<area>/…` (no new dependency):
  `sips -Z 1600 -s formatOptions 82 in.jpg --out public/programmes/<slug>/name.jpg`

## Verify (important)

`npm run dev` has a known intermittent bug in this Astro/Vite/rolldown version: `[vite] Internal server error: Missing field 'moduleType'` from `builtin:vite-react-refresh-wrapper`, which makes pages with React islands render **blank**. It does **not** affect the production build. Always verify islands with:

```sh
npm run build && npm run preview      # serves dist/ on http://localhost:4321
```

then screenshot via the `preview-and-screenshot-astro-site` skill (desktop 1440 + mobile 390). Also run `npx astro check` — pre-existing `Nav.astro` script-typing errors are unrelated noise.
