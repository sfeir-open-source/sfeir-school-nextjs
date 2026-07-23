# SFEIR School - NextJS

A comprehensive Next.js training platform built with Nx monorepo, featuring interactive workshops, training slides, and shared component libraries.

## Project Overview

This project is organized as an Nx monorepo containing:

- **Training Slides**: Interactive presentation materials for learning Next.js concepts
- **Workshop Applications**: Hands-on exercises for various Next.js topics with starter code and solutions
- **Shared Libraries**: Reusable UI components, utilities, and type definitions across apps

## Technologies Stack

**Core Framework & Build:**

- Next.js 16.1.6 - React framework with server components support
- Nx 23.0.1 - Monorepo management and task orchestration
- React 19.0.0 - UI library
- TypeScript 6.0.3 - Type-safe development

**Styling & Design:**

- Tailwind CSS 4.3.3 - Utility-first CSS framework
- PostCSS 8.5.19 - CSS processing
- SASS - Advanced CSS preprocessing
- Bright 1.0.0 - Code syntax highlighting
- SFEIR School Theme 4.0.0-rc-16 - Custom branding and presentation theme

**Testing & Quality:**

- Vitest 4.1.0 - Unit and integration testing
- @testing-library/react 16.3.0 - React component testing
- @testing-library/dom 10.4.0 - DOM testing utilities
- ESLint 9.8.0 - Code linting with Next.js plugin

**Backend & Data:**

- Fastify 5.2.1 - High-performance server framework
- Fastify Autoload, CORS, Sensible plugins - Server utilities
- Fastify Swagger - API documentation
- Valibot 1.4.2 - Schema validation (lightweight alternative to Zod)

**Tooling:**

- Prettier 3.9.4 - Code formatting
- SWC - Faster TypeScript/JavaScript compiler
- esbuild - Fast JavaScript bundler
- Vite - Frontend build tool

## Project Structure

```
/apps
  ├── 01-layout                    # Layout & Components workshop
  ├── 01-layout-solution          # Solution reference
  ├── 02-navigation                # Routing & Navigation workshop
  ├── 02-navigation-solution      # Solution reference
  ├── 03-server-components         # Server Components workshop
  ├── 03-server-components-solution # Solution reference
  └── server                       # Fastify backend server

/docs
  ├── markdown/                    # Training slide content modules:
  │   ├── 00-school               # Welcome & setup
  │   ├── 01-intro                # Introduction to Next.js
  │   ├── 02-routing              # Routing fundamentals
  │   ├── 03-server-components    # Server Components deep-dive
  │   ├── 04-data-fetching        # Data fetching patterns
  │   ├── 05-mutations            # Form handling & mutations
  │   ├── 06-error-management     # Error boundaries & handling
  │   ├── 07-middleware           # Middleware implementation
  │   ├── 08-rendering-methods    # Rendering strategies
  │   ├── 09-deploying-and-hosting # Deployment & hosting
  │   └── 20-conclusion           # Course wrap-up
  ├── scripts/                     # Presentation automation
  ├── scss/                        # Slide styling
  └── assets/                      # Images & media

/libs
  ├── helpers/                     # Utility functions and helpers
  ├── type/                        # Shared TypeScript type definitions
  ├── ui/                          # React UI component library
  └── ui-solution/                 # UI component solutions
```

**Note**: The `/apps` folder is designed to grow with additional workshop modules as the curriculum expands.

## Principal Commands

### Workspace Management

- `npm run dev -- {app_name}` - Start specific development server (e.g. `npm run dev -- 01-layout`)
- `npm run launch:slides` - Launch training slides at http://localhost:4242
- `npm run nx <command>` - Run Nx CLI commands
- `npm run prepare` - Prepare/build documentation

### Nx Task Execution

- `npx nx dev <app-name>` - Development mode for active project
- `npx nx build <app-name>` - Build specific app
- `npx nx lint <app-name>` - Lint project code
- `npx nx test <app-name>` - Run project tests
- `npx nx run-many --target=test` - Run tests across projects
- `npx nx affected --target=build` - Build affected projects
- `npx nx graph` - Visualize project dependency graph

### Development Workflows

- `npx nx dev <app-name>` - Start Next.js app (dev server)
- `npx nx build <library>` - Build specific library
- `npx nx typecheck` - Type-check all projects

<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

## General Guidelines for working with Nx

- For navigating/exploring the workspace, invoke the `nx-workspace` skill first - it has patterns for querying projects, targets, and dependencies
- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- Prefix nx commands with the workspace's package manager (e.g., `npx nx build`, `npx nx test`) - avoids using globally installed CLI
- You have access to the Nx MCP server and its tools, use them to help the user
- For Nx plugin best practices, check `node_modules/@nx/<plugin>/PLUGIN.md`. Not all plugins have this file - proceed without it if unavailable.
- NEVER guess CLI flags - always check nx_docs or `--help` first when unsure

## Scaffolding & Generators

- For scaffolding tasks (creating apps, libs, project structure, setup), ALWAYS invoke the `nx-generate` skill FIRST before exploring or calling MCP tools

## When to use nx_docs

- USE for: advanced config options, unfamiliar flags, migration guides, plugin configuration, edge cases
- DON'T USE for: basic generator syntax (`nx g @nx/react:app`), standard commands, things you already know
- The `nx-generate` skill handles generator discovery internally - don't call nx_docs just to look up generator syntax

<!-- nx configuration end-->
