<!-- .slide: class="with-code" -->

# Scaffolding a project

You never hand-assemble the pieces from the previous slides. One command
gives you a fully wired, ready-to-run project:

```bash
npx create-next-app@latest
```

It asks a few questions, then generates the project. Today, saying yes
to the **recommended defaults** gets you:

- **TypeScript** — typed from the first file
- **ESLint** — linting configured out of the box
- **Tailwind CSS** — utility-first styling, zero setup
- **App Router** — the `app/` folder, enabled by default
- **Turbopack** — the default bundler, for both `dev` and `build`
- Import alias `@/*`, so `../../../components/x` becomes `@/components/x`

<small>Every `/apps` workshop in this training was generated exactly
this way.</small>

Notes:

Mention `--yes` skips the prompts and accepts these same defaults, useful for live-coding a fresh project quickly if there's time.
