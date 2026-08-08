# 04 — Composition

## What you'll build

A dark/light theme that actually does something: `Theme` will detect the
visitor's OS-level color scheme preference and share it through React
context, and `Logo` will read that context to swap between a light-mode and
a dark-mode logo image. Both live in the shared UI library
(`libs/ui/src/lib/`, consumed by this app via `@sfeir/ui` — editing them
here is picked up automatically).

## Concepts you'll practice

- **React Context** — sharing a value (the current theme) down the tree
  without threading it through every component's props.
- **`useSyncExternalStore`** — the correct way to read a browser-only value
  (here, `window.matchMedia(...)`) that can change without React knowing,
  and to keep server/client rendering consistent.
- **`use()`** — reading a context value inside a component (the modern
  replacement for `useContext`).
- All of this only works in `'use client'` components — `window` and
  `matchMedia` don't exist on the server.

Docs:

- [`createContext`](https://react.dev/reference/react/createContext)
- [`useSyncExternalStore`](https://react.dev/reference/react/useSyncExternalStore)
- [`use`](https://react.dev/reference/react/use)
- [Composition Patterns](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns)

## Where to work

- `libs/ui/src/lib/Theme.tsx` — edit (currently just renders `children`,
  no theme detection at all)
- `libs/ui/src/lib/Logo.tsx` — edit (currently always renders the light
  logo)

There's no `_static/` folder for this exercise — you're extending two
existing files, guided by the steps below.

## Steps

### 1. Confirm `Theme` already wraps the layout

Nothing to write here — this is a two-minute orientation before you touch
any code. `src/app/(dashboard)/layout.tsx` already imports `Theme` from
`@sfeir/ui` and wraps the entire dashboard with it:

```tsx
// src/app/(dashboard)/layout.tsx (already there, don't change it)
import { Logo, Theme } from '@sfeir/ui';
// ...

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  return (
    <Theme>
      <div className="flex bg-blue-50 dark:bg-slate-950 dark:text-white">
        <header className="...">
          <Link href="/">
            <Logo className="h-10 w-auto mb-5 pl-4" />
          </Link>
          <NavigationMenu />
        </header>
        <main className="w-full p-4">{children}</main>
      </div>
    </Theme>
  );
};
```

This matters because it tells you exactly where the context provider you're
about to build actually gets *used*: `<Theme>` sits above `<Logo>` in the
tree, so once `Theme` provides a real value through `ThemeContext`, `Logo`
(rendered as `children`, several levels down) will be able to read it with
`use(ThemeContext)`. You don't need to add or move anything in this file —
your work in steps 2 and 3 is entirely inside `Theme.tsx` and `Logo.tsx`
themselves.

### 2. Detect the OS theme preference in `Theme`

Right now `Theme` does nothing but render `children` inside a `<section>` —
the `<Theme>` wrapper from step 1 is there, but it's not providing anything
yet. Your job: make it detect `prefers-color-scheme: dark` and expose the
result through context.

```tsx
// libs/ui/src/lib/Theme.tsx
'use client';

import { createContext, memo, ReactNode, useSyncExternalStore } from 'react';

type ThemeContext = 'dark' | 'light';

const subscribeThemeChange = (callback: (event: MediaQueryListEvent) => void) => {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', callback);
  return () => {
    window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', callback);
  };
};

const useTheme = () => {
  return useSyncExternalStore(
    subscribeThemeChange,
    // TODO: client snapshot — return 'dark' or 'light' by reading
    //       window.matchMedia('(prefers-color-scheme: dark)').matches
    () => 'light',
    // TODO: server snapshot — always 'light', since the server has no
    //       window to read a preference from
    () => 'light',
  ) satisfies ThemeContext;
};

export const ThemeContext = createContext<ThemeContext>('light');

type ThemeProps = {
  children: ReactNode;
};

export const Theme = memo(({ children }: ThemeProps) => {
  // TODO: call useTheme() and provide it via <ThemeContext value={theme}>
  //       instead of a bare <section>
  return <section>{children}</section>;
});
```

`useSyncExternalStore` takes three functions: how to *subscribe* to changes
(already written for you above), how to read the *current* value on the
client, and how to read a *fallback* value on the server (where
`matchMedia` doesn't exist). Fill in the two TODOs, then wrap `children` in
`<ThemeContext value={theme}>`.

### 3. Read the theme in `Logo` and swap the image

`Logo` currently always imports and renders `logoLight`. `logoDark` is
already exported from `libs/ui/src/index.ts` — you just need to pick the
right one.

```tsx
// libs/ui/src/lib/Logo.tsx
'use client';

import Image from 'next/image';
import { memo, use } from 'react';
import { logoDark, logoLight } from '../index';
import { ThemeContext } from './Theme';

type LogoProps = {
  className?: string;
};

export const Logo = memo(({ className = '' }: LogoProps) => {
  // TODO: const theme = use(ThemeContext);
  // TODO: pick logoDark when theme === 'dark', logoLight otherwise
  return <Image src={logoLight} alt="People logo" className={className} />;
});
```

### 4. Verify against the solution

- Run `04-composition-solution` alongside your app (see below).
- Toggle your OS/browser's color scheme (macOS: System Settings →
  Appearance; Chrome DevTools: Rendering tab → "Emulate CSS
  prefers-color-scheme") and confirm the logo swaps in both apps.
- Once both work, open `libs/ui-solution/src/lib/Theme.tsx` and
  `libs/ui-solution/src/lib/Logo.tsx` and compare them to what you wrote.

## Running the exercise

```bash
npm run dev -- 04-composition
```

## Troubleshooting

- **"window is not defined"** — something is reading `window`/`matchMedia`
  outside the client snapshot function, or `'use client'` is missing from
  the top of `Theme.tsx`/`Logo.tsx`. `useSyncExternalStore`'s server
  snapshot exists precisely so this can't happen if you use it correctly —
  make sure the server snapshot function never touches `window`.
- **Hydration mismatch warning in the console** — this means the server
  snapshot and the first client render disagree. The server snapshot must
  always return `'light'` (the safe default); let `useSyncExternalStore`
  reconcile to the real value after hydration, don't try to guess the theme
  on the server.
- **Logo never changes, even after fixing `matchMedia`** — check that
  `Theme` actually provides the value: `<ThemeContext value={theme}>`, not
  a bare `<section>`. If the provider never updates, `Logo`'s
  `use(ThemeContext)` always reads the default (`'light'`).
- **`use(ThemeContext)` throws or returns `undefined`** — `Logo` must be
  rendered somewhere inside `<Theme>` in the component tree. Check
  `(dashboard)/layout.tsx` still wraps everything with `<Theme>`.
- **Toggling the OS theme doesn't update the page without a reload** —
  confirm `subscribeThemeChange` is actually wired up as the first argument
  to `useSyncExternalStore` (not skipped) — that's what makes React
  re-render when the media query's `change` event fires.
- **Nx doesn't pick up your `libs/ui` changes** — this app depends on
  `@sfeir/ui` via the Nx workspace, so a normal save should hot-reload. If
  it doesn't, stop and restart `npm run dev -- 04-composition`.
