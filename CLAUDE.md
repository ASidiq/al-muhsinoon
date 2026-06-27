# CLAUDE.md — Frontend Website Rules

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.

## Reference Images
- If a reference image is provided: match layout, spacing, typography, and color exactly. Swap in placeholder content (images via `https://placehold.co/`, generic copy). Do not improve or add to the design.
- If no reference image: design from scratch with high craft (see guardrails below).
- Screenshot your output, compare against reference, fix mismatches, re-screenshot. Do at least 2 comparison rounds. Stop only when no visible differences remain or user says so.

## Local Server & Screenshots
- This project is an **Astro 5 + Tailwind v4** site (see Stack below) — there is no `serve.mjs`. Use the `preview-and-screenshot-astro-site` skill for the full dev-server and screenshot workflow (start command, port, viewport sizes, the scroll-behavior gotcha when screenshotting a specific section, and cleanup).
- **Always serve on localhost** — never screenshot a `file:///` URL.

## Stack
- Astro 5, static output (`output: "static"`), Tailwind v4 via `@tailwindcss/vite` (no `@astrojs/tailwind`, no CDN script).
- `src/pages/index.astro` assembles section components from `src/components/`; shared head/meta lives in `src/layouts/Layout.astro`; design tokens (colors, fonts, shadows) live in `src/styles/global.css` under `@theme`.
- `public/` holds favicons, manifest, OG image, and logo files copied from `brand_assets/` — these are what actually ship.
- Build with `npm run build` → `dist/`. Deploys to Cloudflare Pages via GitHub (build command `npm run build`, output directory `dist`, no adapter).
- `npm run dev` / `npm run build` / `npm run preview` are the only scripts — don't reach for `node serve.mjs` or a CDN Tailwind script in this project.
- Mostly framework-free, but **React + shadcn are installed** for interactive islands (the `/programmes` page). When adding any React/shadcn/21st.dev component, use the `add-react-island` skill — it covers the setup, the brand-restyle gotchas, and the dev-mode bug that makes you verify via `npm run build && npm run preview` instead of `npm run dev`.

## Keeping README.md Current
- Whenever a change affects how someone would build, run, deploy, or understand this site — new scripts, a changed dev port, a new dependency, a restructured `src/` or `public/`, new deploy settings, or new placeholder content that needs real data before launch — update `README.md` in the same change, not as a follow-up.
- Specifically keep these README sections in sync: Development/Build commands, Deploying to Cloudflare Pages, Project structure, and Content notes (placeholder copy that still needs the client's real details).

## End of Session — Capture Reusable Skills
- Before wrapping up substantial work, ask whether the session produced a **repeatable procedure that was non-obvious to derive** — a multi-step setup, a workflow with a specific command sequence, or hard-won gotchas. If so, capture it as a project skill in `.claude/skills/<name>/SKILL.md` so the next session doesn't re-solve it from scratch.
- Only extract what clears the bar: it took real trial-and-error, it's likely to recur, and it isn't already obvious from the code or README. Skip one-offs and anything the repo already records.
- One focused skill beats several thin ones — fold small gotchas into a related skill rather than making a skill per fact. Match the existing format: YAML frontmatter (`name`, plus a `description` that says *when* to use it) then a concise how-to. Model it on `.claude/skills/preview-and-screenshot-astro-site/SKILL.md`.

## Output Defaults
- This project overrides the generic default below: see **Stack**.
- Single `index.html` file, all styles inline, unless user says otherwise
- Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`
- Mobile-first responsive

## Brand Assets
- Always check the `brand_assets/` folder before designing. It may contain logos, color guides, style guides, or images.
- If assets exist there, use them. Do not use placeholders where real assets are available.
- If a logo is present, use it. If a color palette is defined, use those exact values — do not invent brand colors.
- Verifiable facts (charity registration number, address, regulator, social handles) also live in `brand_assets/Al-Muhsinoon_Brand_Guidelines.dc.html` — check there before adding any such detail to the site. Never invent one; if it's not in brand_assets and not already on the page, ask the user rather than guessing.

## Anti-Generic Guardrails
- **Colors:** Never use default Tailwind palette (indigo-500, blue-600, etc.). Pick a custom brand color and derive from it.
- **Shadows:** Never use flat `shadow-md`. Use layered, color-tinted shadows with low opacity.
- **Typography:** Never use the same font for headings and body. Pair a display/serif with a clean sans. Apply tight tracking (`-0.03em`) on large headings, generous line-height (`1.7`) on body.
- **Gradients:** Layer multiple radial gradients. Add grain/texture via SVG noise filter for depth.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Use spring-style easing.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states. No exceptions.
- **Images:** Add a gradient overlay (`bg-gradient-to-t from-black/60`) and a color treatment layer with `mix-blend-multiply`.
- **Spacing:** Use intentional, consistent spacing tokens — not random Tailwind steps.
- **Depth:** Surfaces should have a layering system (base → elevated → floating), not all sit at the same z-plane.

## Hard Rules
- Do not add sections, features, or content not in the reference
- Do not "improve" a reference design — match it
- Do not stop after one screenshot pass
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo as primary color
