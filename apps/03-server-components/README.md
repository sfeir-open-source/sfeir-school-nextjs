# 03 · Server Components

## What you'll build

A search-logging feature, entirely on the server: every search on
`/employees` gets appended as a JSON line to a log file, and a new
`/employees/logs` page reads that file back and renders it. Nothing here
ships a byte of extra JavaScript to the browser — that's the whole point.

## Concepts you'll practice

- Server Components run **only on the server** — they can use Node.js APIs
  (`node:fs`, `node:path`) directly, with zero JavaScript shipped to the
  browser for them.
- Every component under `src/app/` is a Server Component **by default**.
  You don't opt into that — you'd opt *out* of it with `'use client'`.
- `'use client'` is only needed when a component needs state, an event
  handler, or a browser API/hook (`useState`, `useRouter`, `usePathname`,
  `onClick`, ...). You won't need to add it anywhere in this exercise.
- The `'use client'` boundary follows the **import graph**, not the file
  layout — everything a client component imports and renders comes along
  for the ride, so keep that boundary as small as possible.

Docs:

- [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [`'use client'` directive](https://react.dev/reference/rsc/use-client)
- [Data fetching / async Server Components](https://nextjs.org/docs/app/getting-started/fetching-data)

## Steps

### 1. Log every employee search from the server

Open `src/app/(dashboard)/employees/page.tsx`. `Employees` is already an
`async` Server Component that filters `employeesData` by the `search` query
param — that's what makes step 1 possible without any extra setup.

1. Import `appendFile` from `node:fs/promises` and `join` from `node:path`.
2. After computing `filteredEmployees`, build a small object with the
   current date, the search term, and `filteredEmployees.length`.
3. Use `join(process.cwd(), '../../', 'logs.txt')` to point at a
   `logs.txt` file two levels above the app (at the workspace root), and
   `appendFile` a JSON line (`JSON.stringify(...) + '\n'`) to it.
4. Keep rendering the page exactly as before — this is a side effect that
   happens *while* the page renders on the server.

```tsx
import { appendFile } from 'node:fs/promises';
import { join } from 'node:path';

export default async function Employees({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const { search } = await searchParams;
  const filteredEmployees = employeesData.filter(/* ... existing filter ... */);

  const logPath = join(process.cwd(), '../../', 'logs.txt');
  // TODO: build a log entry object — { date: new Date().toISOString(),
  //       search, results: filteredEmployees.length } — then
  //       await appendFile(logPath, JSON.stringify(entry) + '\n')

  return (
    // ... existing JSX, unchanged ...
  );
}
```

Why this works without any config: `page.tsx` never runs in the browser, so
`node:fs` is simply available. Try doing the same thing in a `'use client'`
component and see what error you get (see Troubleshooting below).

### 2. Read the logs back in a new page

Create `src/app/(dashboard)/employees/logs/page.tsx` — a new route at
`/employees/logs`.

1. It should be an `async` Server Component (same shape as `Employees`).
2. Read the same `logs.txt` file with `readFile` from `node:fs/promises`
   (`utf-8` encoding), using the same `join(process.cwd(), '../../', 'logs.txt')`
   path as step 1.
3. Render the file contents through `<Code lang="json">` from the `bright`
   package (`import { Code } from 'bright'`).
4. Handle the case where the file doesn't exist yet (nobody has searched)
   with a `try`/`catch` — return a friendly fallback string instead of
   crashing the page.

```tsx
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { Code } from 'bright';
import { PageTitle } from '@sfeir/ui/server';

export default async function EmployeeLogs() {
  const logPath = join(process.cwd(), '../../', 'logs.txt');

  let logs: string;
  try {
    // TODO: logs = await readFile(logPath, 'utf-8')
    logs = '';
  } catch {
    logs = 'No searches logged yet.';
  }

  return (
    <div>
      <PageTitle backHref="/employees">Search logs</PageTitle>
      <Code lang="json">{logs}</Code>
    </div>
  );
}
```

Search a few times on `/employees`, then visit `/employees/logs` and watch
the log grow.

### 3. Sanity-check what module 02 already gave you

No code to write here. In module 02 you already built `ExpensesTableRow`
(`useRouter`, on click) and `NavigationItem` (`usePathname`, active link)
in `libs/ui/src/lib/` — two small `'use client'` components sitting next to
plain Server Components (`ExpensesTable`, `NavigationMenu`).

- Click a row on `/expenses` — it should still navigate to `/expenses/{id}`.
- Check the sidebar — the current page's link should still be highlighted.

If either broke while you were adding the logging feature above, it's a
sign something in `libs/ui` got touched by mistake — this module's work is
entirely inside `src/app/(dashboard)/employees/`, nothing in `libs/ui`.

## Running the exercise

```
npm run dev -- 03-server-components
```

This also boots the shared Fastify `server` app that some pages depend on.

## Troubleshooting

- **"You're importing a component that needs `useState`. This React hook
  only works in a client component"** — you're calling a hook or using
  `onClick`/`onChange` in a file without `'use client'` at the very top
  (before any imports). Either add the directive, or push the interactive
  bit into its own small component instead.
- **`Error: Cannot find module 'node:fs/promises'` or `fs` works locally but
  breaks the build in a client component** — Node built-ins only work in
  Server Components. If you added `appendFile`/`readFile` to a component
  that (directly or via an import) has `'use client'` at the top, move the
  file logic back into a plain `async` Server Component.
- **Hydration mismatch warning in the console** — usually caused by
  something non-deterministic rendered on the server (like `new
  Date().toLocaleString()` without a fixed locale/timezone) producing
  different output on server vs. client. Keep the log's `date` field an ISO
  string (`new Date().toISOString()`) and only format it for display, not in
  a way that depends on the browser's locale.
- **`/employees/logs` throws instead of showing the fallback message** —
  make sure the `readFile` call is wrapped in `try`/`catch`; the first time
  through, `logs.txt` won't exist yet and `readFile` rejects.
- **`logs.txt` never appears / can't find it** — the path is
  `join(process.cwd(), '../../', 'logs.txt')`, i.e. two directories above
  the Next.js app itself (at the workspace root), not inside `apps/`. Log
  `logPath` once if you're unsure where it landed.
- **Row click or nav highlight from module 02 stopped working** — check you
  didn't accidentally edit `libs/ui/src/lib/ExpensesTableRow.tsx` or
  `NavigationItem.tsx` — this module doesn't touch either file.
