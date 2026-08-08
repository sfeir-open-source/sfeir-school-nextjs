# SFEIR School - Next.js

Welcome! This repository is the training platform used for the SFEIR Next.js
school. It contains the presentation slides you'll follow along with, and a
set of hands-on workshop applications where you'll practice what you just
learned.

The whole project is managed with [Nx](https://nx.dev), a monorepo tool that
lets us host dozens of small apps and shared libraries side by side, and run
commands (`dev`, `build`, `test`, `lint`, ...) against any of them consistently.

## Goal of this project

Each Next.js concept taught in the slides (layouts, routing, server
components, data fetching, mutations, error handling, middleware, rendering
strategies, suspense, ...) has a matching **workshop app** where you implement
it yourself, plus a **solution app** you can compare against or peek at if
you're stuck. The idea is: watch the slides for a topic, then go build it in
the corresponding workshop app.

## Project structure

```
/apps
  ├── 01-layout                       # Workshop: Layout & Components
  ├── 01-layout-solution               # Solution to the above
  ├── 02-navigation                    # Workshop: Routing & Navigation
  ├── 02-navigation-solution
  ├── 03-server-components             # Workshop: Server Components
  ├── 03-server-components-solution
  ├── 04-composition                   # Workshop: Composition patterns
  ├── 04-composition-solution
  ├── 05-data-fetching                 # Workshop: Data fetching
  ├── 05-data-fetching-solution
  ├── 06-data-caching                  # Workshop: Data caching
  ├── 06-data-caching-solution
  ├── 07-server-action                 # Workshop: Server Actions
  ├── 07-server-action-solution
  ├── 08-form-hooks                    # Workshop: Form hooks (useActionState, ...)
  ├── 08-form-hooks-solution
  ├── 09-error-boundaries               # Workshop: Error boundaries
  ├── 09-error-boundaries-solution
  ├── 10-expected-errors                # Workshop: Handling expected errors
  ├── 10-expected-errors-solution
  ├── 11-lifecycle                      # Workshop: Request/render lifecycle
  ├── 11-lifecycle-solution
  ├── 12-middleware                     # Workshop: Middleware
  ├── 12-middleware-solution
  ├── 13-rendering-methods               # Workshop: Rendering strategies (SSR/SSG/ISR)
  ├── 13-rendering-methods-solution
  ├── 14-suspense                        # Workshop: Suspense & streaming
  ├── 14-suspense-solution
  └── server                             # Shared Fastify backend API used by the workshops

/docs
  ├── markdown/                     # Slide content, one folder per training module:
  │   ├── 00-school                 #   Welcome & environment setup
  │   ├── 01-intro                  #   Introduction to Next.js
  │   ├── 02-routing                #   Routing fundamentals
  │   ├── 03-server-components      #   Server Components deep-dive
  │   ├── 04-data-fetching          #   Data fetching patterns
  │   ├── 05-mutations              #   Forms & mutations
  │   ├── 06-error-management       #   Error boundaries & handling
  │   ├── 07-middleware             #   Middleware
  │   ├── 08-rendering-methods      #   Rendering strategies
  │   ├── 09-deploying-and-hosting  #   Deployment & hosting
  │   └── 20-conclusion             #   Wrap-up
  ├── scripts/                      # Slide deck build/automation scripts
  ├── scss/                         # Slide deck styling
  └── assets/                       # Images & media used in the slides

/libs
  ├── helpers/         # Shared utility/helper functions used across apps
  ├── type/             # Shared TypeScript types used across apps
  ├── ui/                # Shared React UI component library (workshop version)
  └── ui-solution/       # Same UI components, "solution" version
```

**In short:**
- `/apps` is where you write and run code, one folder per topic (workshop +
  its `-solution` pair), plus a shared `server` backend the workshops call.
- `/docs` is the slide deck itself (content, styling, and the scripts that
  build/serve it).
- `/libs` holds code shared by multiple apps, so you don't rewrite the same
  UI components or helpers in every workshop.

## Commands

### Getting started

- `npm install` — install all dependencies for the monorepo.
- `npm run launch:slides` — start the training slides at http://localhost:4242.
- `npm run dev -- <app_name>` — start a specific workshop's dev server, e.g.
  `npm run dev -- 01-layout`.
- `npm run start:server` — start the shared backend API used by the workshop apps.

### Working with Nx directly

Nx is the tool orchestrating everything in this monorepo. You can call it
through `npm run nx <command>`, or use its dedicated CLI commands below:

- `npx nx dev <app-name>` — start a workshop app's Next.js dev server.
- `npx nx build <app-name>` — build a specific app (or library).
- `npx nx lint <app-name>` — lint a project's code.
- `npx nx test <app-name>` — run a project's tests.
- `npx nx run-many --target=test` — run tests across every project.
- `npx nx affected --target=build` — build only the projects impacted by
  your latest changes.
- `npx nx graph` — open a visual graph of how every app/library depends on
  each other.

### Other useful scripts

- `npm run lint:ci` — lint every affected project (used in CI).
- `npm run build:ci` — build every affected project (used in CI).
- `npm run sync-nx-workspace` — sync generated TypeScript project references.

## Reporting a problem: the `create-issue` skill

If you find a bug or something wrong in a workshop app (`/apps`) or in a
slide module (`/docs`), you can ask Claude Code to open a GitHub issue for it
using the built-in `create-issue` skill.

Just ask, for example:

> Create an issue: the cart total doesn't update in 05-data-fetching after
> adding an item.

The skill will:

1. Check that the GitHub CLI (`gh`) is installed and you're authenticated
   (`gh auth login` if not).
2. Ask you which app/module is impacted and for a description of the problem.
3. Automatically enrich the issue with a list of likely impacted files and a
   ready-to-use prompt you can paste into an AI assistant to fix it.
4. Create the issue with `gh issue create` and give you back its URL.

You need the [GitHub CLI](https://cli.github.com/manual/) installed and
authenticated (`gh auth login`) for this to work.

## Learn more

- [Nx Documentation](https://nx.dev/docs)
- [Next.js Documentation](https://nextjs.org/docs)