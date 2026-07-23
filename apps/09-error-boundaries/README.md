# 09 - Error Boundaries

## What you'll build

Right now, any crash in this app falls straight through to Next.js's own
generic "Something went wrong" screen — no branding, no way back. Your job
is to add three `error.tsx` files so failures are caught close to where they
happen instead of taking the whole page down:

1. A root-level safety net for the whole app.
2. Two independent safety nets for the home page's two parallel-route
   widgets (`@employeesSlot` and `@expensesSlot`), so one broken widget
   doesn't nuke the other or the sidebar around it.

## Concepts you'll practice

- The `error.tsx` file convention: a special file that wraps its route
  segment (and everything nested below it) in a React error boundary.
  See the [`error.js` file convention API reference](https://nextjs.org/docs/app/api-reference/file-conventions/error).
- Why `error.tsx` must always start with `'use client'`. See
  [Error Handling — Next.js docs](https://nextjs.org/docs/app/building-your-application/routing/error-handling).
- How parallel routes (`@slotName` folders) behave like independent mini
  routes — including having their own `error.tsx`. See
  [Parallel Routes — Next.js docs](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes).
- How the "closest boundary catches the crash" rule changes what breaks
  when you add or remove an `error.tsx`. See
  [React error boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary).

## Steps

### 1. Watch the app crash (no code yet)

Unlike previous workshops, **this app's `dev` target does not start the
backend automatically**. That's on purpose — with no `error.tsx` anywhere
yet, running the app against a dead backend is exactly how you'll observe
the problem this module solves.

- Run the app (see "Running the exercise" below) **without** starting the
  `server` app.
- Load the home page. You should see Next.js's default, unbranded crash
  screen — this is the generic fallback you're about to replace.

### 2. Give the whole app a root safety net

Create `src/app/error.tsx`:

- Start the file with `'use client'` — error boundaries are always Client
  Components.
- Import `PageError` from `@sfeir/ui/server`.
- Export a default component that renders `PageError` with a short, generic
  message (e.g. "The service is currently unavailable. Please try again
  later").

Skeleton to start from:

```tsx
'use client';

import { PageError } from '@sfeir/ui/server';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // TODO: render <PageError> with a short, generic message
  return <PageError>{/* TODO: your message here */}</PageError>;
}
```

Reload the home page. This component should now render instead of Next.js's
default screen.

### 3. Isolate the employees widget

The home page (`src/app/(dashboard)/(home)/layout.tsx`) renders two parallel
route slots side by side: `@employeesSlot` and `@expensesSlot`. Each behaves
like its own mini route, so each can — and should — have its own
`error.tsx`.

Create `src/app/(dashboard)/(home)/@employeesSlot/error.tsx`:

- Starts with `'use client'`.
- Imports `Alert` from `@sfeir/ui/server`.
- Exports a default component rendering `Alert` with a short message about
  the employees widget failing to load (e.g. "Something went wrong trying
  to fetch latest employees").

Skeleton to start from:

```tsx
'use client';

import { Alert } from '@sfeir/ui/server';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // TODO: render <Alert> with a message specific to the employees widget
  return <Alert>{/* TODO: e.g. "Unable to load employees" */}</Alert>;
}
```

### 4. Isolate the expenses widget

Same idea, mirrored for the other slot. Create
`src/app/(dashboard)/(home)/@expensesSlot/error.tsx`:

- Starts with `'use client'`.
- Imports `Alert` from `@sfeir/ui/server`.
- Exports a default component rendering `Alert` with a short message about
  the expenses widget failing to load (e.g. "Something went wrong trying
  to fetch latest expenses").

Skeleton to start from:

```tsx
'use client';

import { Alert } from '@sfeir/ui/server';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // TODO: render <Alert> with a message specific to the expenses widget
  return <Alert>{/* TODO: e.g. "Unable to load expenses" */}</Alert>;
}
```

Structurally these two files are identical (same imports, same props, same
`Alert` shape) — only the wording of the message differs, because each
boundary should tell the user which widget failed, not a generic "something
broke".

### 5. Break it on purpose, twice

- With the `server` backend **stopped**, reload `/`. You should see two
  small red alerts in place of the two widgets, while the page title and
  sidebar keep rendering normally — each slot contained its own failure.
- Now temporarily delete (or rename) one of the two slot `error.tsx` files
  and reload `/` again. Watch that failure jump all the way up to your root
  `app/error.tsx` instead, replacing the entire page. Restore the file
  afterwards.

This demonstrates the core rule: the *closest* `error.tsx` above a crash
catches it — remove it, and the next one up the tree takes over.

### 6. Verify against the solution

Run `09-error-boundaries-solution` alongside your app and compare your three
files against its `app/error.tsx`,
`app/(dashboard)/(home)/@employeesSlot/error.tsx` and
`app/(dashboard)/(home)/@expensesSlot/error.tsx`.

## Running the exercise

This app's `dev` target does **not** start the backend for you. Run the
backend and the app in two separate terminals:

```
npx nx serve server
npm run dev -- 09-error-boundaries
```

(The same applies to `09-error-boundaries-solution` if you run it side by
side for comparison.)

## Troubleshooting

- **Nothing changes, still see Next.js's default crash screen.**
  Check that `error.tsx` starts with `'use client'`. Without it, Next.js
  will fail to treat the file as a valid error boundary component.
- **The error boundary doesn't catch anything.**
  `error.tsx` only catches errors thrown *during rendering* (including in
  `useEffect`), not errors thrown inside event handlers (e.g. an `onClick`
  callback) or in `setTimeout`/async callbacks unrelated to render. Those
  need a manual `try/catch` instead.
- **A widget's error still takes down the whole page.**
  Make sure the `error.tsx` is placed *inside* the slot folder itself
  (`@employeesSlot/error.tsx`, not `(home)/error.tsx`) — an `error.tsx`
  only wraps the segment it sits in, plus everything nested below it.
- **`reset()` on a "Try again" button doesn't seem to fix anything.**
  `reset()` only re-renders the boundary's children — it doesn't guarantee
  the underlying cause (e.g. a backend that's still down) has gone away. If
  the same request fails again, the boundary will just show the error again.
- **Import error on `PageError` or `Alert`.**
  This workshop app depends on `@sfeir/ui` (not `@sfeir/ui-solution` — that
  package is only used by the `-solution` app). Double-check your import
  path is `@sfeir/ui/server`.

## Reference docs

Most links are already inlined under "Concepts you'll practice" above. One
extra, relevant to the *next* workshop (`10-expected-errors`) but useful
context here too:

- [`not-found.js` file convention API reference](https://nextjs.org/docs/app/api-reference/file-conventions/not-found)
