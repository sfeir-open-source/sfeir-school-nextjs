# Apps

This folder contains every runnable project in the SFEIR School Next.js training platform: one Fastify backend (`server`) and a progressive sequence of numbered Next.js workshops, each shipped as a `workshop` / `workshop-solution` pair.

## Folder Structure

```
apps/
  01-layout                     # Workshop: starter code (exercises to complete)
  01-layout-solution             # Same workshop, fully solved reference
  02-navigation
  02-navigation-solution
  03-server-components
  03-server-components-solution
  04-composition
  04-composition-solution
  05-data-fetching
  05-data-fetching-solution
  06-data-caching
  06-data-caching-solution
  07-server-action
  07-server-action-solution
  08-form-hooks
  08-form-hooks-solution
  09-error-boundaries
  09-error-boundaries-solution
  10-expected-errors
  10-expected-errors-solution
  11-lifecycle
  11-lifecycle-solution
  12-middleware
  12-middleware-solution
  13-rendering-methods
  13-rendering-methods-solution
  14-suspense
  14-suspense-solution
  server                         # Shared Fastify backend consumed by every workshop
```

Each numbered pair maps to a training module in `docs/markdown/` and builds on the previous one — the workshop apps are cumulative, so `NN` generally starts from `NN-1`'s solution plus a new topic. When fixing a bug in one workshop, check whether the same code was copied forward into later apps.

## Workshop App Structure

Every `NN-topic` / `NN-topic-solution` app is an independent Next.js app with the same shape:

```
NN-topic/
  .env.local                # Local env vars (e.g. backend API URL)
  .swcrc                    # SWC compiler config
  eslint.config.mjs
  next.config.js
  next-env.d.ts
  index.d.ts
  postcss.config.mjs        # Tailwind CSS 4 via PostCSS
  tsconfig.json
  package.json              # Per-app deps + Nx target overrides (build/dev)
  public/                   # Static assets (svg logos, portrait images)
  src/
    app/                    # Next.js App Router
      layout.tsx
      page.tsx / not-found.tsx / error.tsx
      global.css
      (route-groups)/       # e.g. (auth), (dashboard) — later workshops
      @slots/                # Parallel route slots — later workshops (e.g. @employeesSlot)
      api/                   # Route handlers — later workshops
    assets/                 # Images and SVGs imported by components
    data/                   # Local JSON fixtures used before data-fetching topics are introduced
    providers/               # Data-fetching wrapper functions calling the backend server — later workshops
    shared/                  # Small app-local utilities (e.g. env.ts) — later workshops
  _static/                   # Reference snippets shown in workshop-only apps (not imported by the app)
```

Progression notes:

- Early workshops (`01`–`03`) use local JSON fixtures in `src/data/`.
- From `05-data-fetching` onward, apps fetch from the `server` app via `src/app/providers/*` and read config from `src/app/shared/env.ts`.
- From `07-server-action`/`08-form-hooks` onward, apps introduce mutations, form actions, and `(auth)` route groups.
- `09`–`10` introduce `error.tsx`, `not-found.tsx`, and expected-error handling per route segment.
- `11-lifecycle` and `12-middleware` introduce root `middleware.ts`-driven auth flows, parallel route slots (`@employeesSlot`, `@expensesSlot`), and route groups like `(dashboard)`/`(auth)`.
- `-solution` apps depend on `@sfeir/ui-solution`; the corresponding workshop apps depend on `@sfeir/ui` (the unsolved component library counterpart). Both consume `@sfeir/types` where relevant.
- Non-solution "starter" apps often ship a `_static/` folder with reference JSX/TSX snippets the trainee is meant to copy in or refer to — it isn't part of the compiled app.

## `server`

Shared Fastify backend used by every workshop's `dev` target (Nx wires `dev` to depend on `server:serve`).

```
apps/server/
  src/
    main.ts                 # Entry point
    app/
      app.ts                # Fastify app assembly
      routes/                # employee.ts, expense.ts, root.ts
      controllers/            # employee.ts, expense.ts
      services/               # employee.service.ts, expense.service.ts
      schema/                  # Valibot request/response schemas
      documentation/           # Swagger doc fragments per resource
      plugins/                 # cors, env, sensible, swagger
      handler/                 # delay, security, validation-body
      utils/query.ts
    db/db.json                # Flat-file mock database
    assets/portraits/          # Employee portrait images served by the API
  dist/                        # esbuild output (build target)
```

Built with `@nx/esbuild` (`server:build`, CJS output to `dist/apps/server`) and run continuously via `server:serve` (`@nx/js:node`).

## Stack (apps-specific)

- **Next.js 16.1.6** — App Router, route groups, parallel routes (`@slot`), middleware, server actions.
- **React 19** for all workshop UI.
- **Tailwind CSS 4** via PostCSS for styling; SASS is only used under `/docs`.
- **SWC** (`.swcrc`) as the compiler for the Next.js apps.
- **Fastify 5** (`server`) — routing, CORS, Swagger docs, Sensible plugin — with **Valibot** for request/response schema validation.
- **Nx** orchestrates all targets; workshop apps declare `build`/`dev` target overrides in their own `package.json` under the `nx.targets` key (`build` depends on `build-deps`, `dev` depends on `watch-deps` and, where noted, the `server:serve` target).
- Shared code comes from `/libs`: `@sfeir/ui` / `@sfeir/ui-solution` (component libraries) and `@sfeir/types` (shared TypeScript types).

## Running an app

```
npm run dev -- <app-name>      # e.g. npm run dev -- 12-middleware-solution
npx nx dev <app-name>          # equivalent, direct Nx invocation
npx nx serve server            # run the backend alone
```