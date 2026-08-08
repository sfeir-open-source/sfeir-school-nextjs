# 14 - Suspense

## What you'll build

This app already streams the home page and the expenses list with hand-written
`<Suspense>` boundaries (the pattern from module 12). You'll convert those
route-segment-wide boundaries to Next.js's `loading.tsx` file convention, and
add a brand-new, narrowly-scoped `<Suspense>` boundary around the one slow
piece of the otherwise-fast `/employees/[id]` page — replacing a client-side
"click to load" workaround with real server streaming. When you're done,
reloading `/`, `/expenses`, and any employee detail page under throttled
network conditions shows skeleton fallbacks that resolve into real content
with no buttons and no manual `Suspense` wrapper left in the page files that
don't need one.

## Concepts you'll practice

- **`loading.tsx` file convention** — dropping this file next to a `page.tsx`
  makes Next.js wrap that segment's `page.tsx` (and any nested
  `not-found.tsx` / deeper `layout.tsx`) in a `<Suspense>` for you, using the
  file's default export as the fallback. It does **not** wrap a `layout.tsx`
  sitting in the same folder.
  [Next.js — Loading UI and Streaming](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)
- **Hand-written `<Suspense>` boundaries** — reach for `loading.tsx` when the
  whole segment is slow to start; reach for a nested, hand-written
  `<Suspense>` when most of the page is fast and only one specific piece is
  slow, so the fast 90% doesn't wait on the slow 10%.
  [React — `<Suspense>`](https://react.dev/reference/react/Suspense)

## Steps

### 1. Convert `@employeesSlot` to `loading.tsx`

File: `src/app/(dashboard)/(home)/@employeesSlot/page.tsx`

- Remove the `Suspense` import and the wrapping component that returns
  `<Suspense fallback={...}><EmployeesList /></Suspense>`.
- Rename the inner `async` component (the one that actually calls
  `getEmployeesUncached` and renders `PersonCard`s) to `EmployeesSlot`, and
  make it the page's default export directly — no wrapper left.
- Create a sibling file `@employeesSlot/loading.tsx` exporting a default
  component that renders a `grid grid-cols-3 gap-4` of 6 `Skeleton`
  components (`Skeleton` comes from `@sfeir/ui/server`), matching the
  widget's own grid layout.

`page.tsx` should end up shaped like this (no more `Suspense` import, no
wrapper):

```tsx
import { getEmployeesUncached } from '@/app/providers/employees';
import { PersonCard } from '@sfeir/ui/server';
import { connection } from 'next/server';

const EmployeesSlot = async () => {
  await connection();
  const latestEmployees = await getEmployeesUncached({ perPage: 6, sortBy: 'entryDate', order: 'desc' });
  return (
    <div className="grid grid-cols-3 gap-4">
      {latestEmployees.items.map(employee => (
        <PersonCard key={employee.id} person={employee} compact />
      ))}
    </div>
  );
};

export default EmployeesSlot;
```

And the new `loading.tsx` — the skeleton count and layout are fixed UI
config (6 cards, same grid as above), so those lines are filled in for you:

```tsx
import { Skeleton } from '@sfeir/ui/server';

const LoadingEmployeesSlot = () => (
  <div className="grid grid-cols-3 gap-4">
    <Skeleton className="h-32 w-full" />
    <Skeleton className="h-32 w-full" />
    <Skeleton className="h-32 w-full" />
    <Skeleton className="h-32 w-full" />
    <Skeleton className="h-32 w-full" />
    <Skeleton className="h-32 w-full" />
  </div>
);

export default LoadingEmployeesSlot;
```

### 2. Convert `@expensesSlot` to `loading.tsx`

File: `src/app/(dashboard)/(home)/@expensesSlot/page.tsx`

- Same move: drop the `Suspense` wrapper, keep one plain `async` default
  export named `ExpensesSlot`.
- Create `@expensesSlot/loading.tsx` with a default export that renders a
  single `TableLoading` (`@sfeir/ui/server`) with `rows={10} cols={4}`
  (`TableLoading` accepts `rows`, `cols`, and an optional `heading` prop —
  these two are the values that match the real table below).

`page.tsx` collapses to one plain `async` component:

```tsx
import { getExpenses } from '@/app/providers/expensees';
import { ExpensesTable } from '@sfeir/ui/server';
import { connection } from 'next/server';

const ExpensesSlot = async () => {
  await connection();
  // TODO: fetch the latest expenses with getExpenses({ perPage: 10, sortBy: 'updateDate', order: 'desc' })
  // and render them with <ExpensesTable expenses={...} />
};

export default ExpensesSlot;
```

```tsx
import { TableLoading } from '@sfeir/ui/server';

const LoadingExpensesSlot = () => <TableLoading rows={10} cols={4} />;

export default LoadingExpensesSlot;
```

### 3. Convert `/expenses` list page to `loading.tsx`

File: `src/app/(dashboard)/expenses/page.tsx`

- Collapse the inner/outer component split back into one plain `async`
  default-exported component — no `Suspense` import left in this file.
- Create `src/app/(dashboard)/expenses/loading.tsx` whose default export
  renders the same `PageTitle` the page uses, plus a `TableLoading`
  (`rows={10} cols={4}`), so the fallback matches the real layout.

```tsx
import { ExpensesTable, PageTitle } from '@sfeir/ui/server';
import { getExpenses } from '@/app/providers/expensees';

const Expenses = async () => {
  // TODO: fetch expenses with getExpenses() and render
  // <PageTitle>Expenses</PageTitle> + <ExpensesTable expenses={...} />
};

export default Expenses;
```

```tsx
import { PageTitle, TableLoading } from '@sfeir/ui/server';

const LoadingExpenses = () => (
  <>
    <PageTitle>Expenses</PageTitle>
    <TableLoading rows={10} cols={4} />
  </>
);

export default LoadingExpenses;
```

After steps 1-3, reload `/` and `/expenses` with your browser devtools
network throttled to "Slow 3G" — you should see the same skeletons as
before, just declared once each instead of hand-typed inside every
`page.tsx`.

### 4. Stream the expenses panel on `/employees/[id]`, no click required

File: `src/app/(dashboard)/employees/[id]/page.tsx`

Today this page imports `EmployeeExpenses` from `@sfeir/ui` — a client
component that shows a "Load expenses" button and only fetches once clicked:

```tsx
import { EmployeeExpenses } from '@sfeir/ui';
// ...
<PersonCard person={employee} actions={<EmployeeExpenses employeeId={employee.id} />} />
```

That's a workaround from before this course covered Suspense; replace it
with real streaming:

- Stop importing `EmployeeExpenses` from `@sfeir/ui`. Instead import
  `ExpensesTable` from `@sfeir/ui/server` and `getExpenses` from
  `@/app/providers/expensees`.
- Write your own `EmployeeExpenses`: a small `async` component that takes an
  `employeeId` prop, calls `getExpenses({ employeeId })`, and renders the
  result with `ExpensesTable`. This must be its **own component** — inlining
  the `await` directly in the page component means the whole page waits on
  it, defeating the point.
- Next to the existing `PersonCard`, add a `Paper` containing a heading and
  a `<Suspense fallback={<TableLoading rows={5} cols={5} />}>` that wraps
  your new `EmployeeExpenses` component.
- Reload an employee's detail page: the person's card should appear
  immediately (it's backed by a `'use cache'` fetch), and the expenses table
  should stream in a beat later — with no button anywhere.

Shape to build (imports + component signature — fill in the TODO):

```tsx
import { getExpenses } from '@/app/providers/expensees';
import { ExpensesTable, Paper, TableLoading } from '@sfeir/ui/server';
import { Suspense } from 'react';

const EmployeeExpenses = async ({ employeeId }: { employeeId: string }) => {
  // TODO: fetch this employee's expenses with getExpenses({ employeeId })
  // and render them with <ExpensesTable expenses={...} />
};
```

And, next to the existing `PersonCard` inside `EmployeeDetailContent`'s
returned JSX:

```tsx
<Paper>
  <h2 className="text-xl font-bold p-4">Last expenses</h2>
  <Suspense fallback={<TableLoading rows={5} cols={5} />}>
    <EmployeeExpenses employeeId={id} />
  </Suspense>
</Paper>
```

### 5. Verify against the solution

Run `14-suspense-solution` alongside your own app and compare the three new
`loading.tsx` files, `expenses/page.tsx`, and `employees/[id]/page.tsx`.
Don't copy from it — use it to check your fallback markup and component
boundaries line up.

## Running the exercise

```bash
npm run dev -- 14-suspense
```

This starts the Fastify backend (`server`) for you automatically — no need
to run it separately.

## Troubleshooting

- **Wrapped the entire page in one `<Suspense>` and nothing streams
  independently anymore.** A single boundary around everything means the
  whole subtree waits for its slowest fetch together — you lose the
  "fast parts appear first" benefit. Keep `loading.tsx` for segments that
  are uniformly slow (`/expenses`, both home slots), and use a narrow,
  hand-written `<Suspense>` only around the one slow piece on otherwise-fast
  pages (`/employees/[id]`).
- **`EmployeeExpenses` doesn't suspend independently.** If you inline its
  `await getExpenses(...)` directly inside the page's component instead of
  a separate `async` component, there's nothing for the nested `<Suspense>`
  to catch — the whole page blocks on it. It must be its own component,
  rendered as a child inside the `<Suspense>` boundary.
- **Fallback UI causes a layout jump when the real content arrives.** If
  your `Skeleton` grid, `TableLoading` dimensions, or `PageTitle` don't
  match the shape of the real content (wrong column count, missing title,
  wrong row/col counts), the page visibly reflows once streaming finishes.
  Match `rows`/`cols` and structure exactly to what the loaded component
  renders.
- **`loading.tsx` doesn't seem to trigger.** It only activates for the
  `page.tsx` (and nested `not-found.tsx` / deeper `layout.tsx`) in the same
  route segment — it does not wrap a `layout.tsx` living in that same
  folder, and it won't apply if you put it in the wrong folder (e.g. a
  parent segment instead of the slot's own folder for `@employeesSlot` /
  `@expensesSlot`).
- **Forgot to remove the old `Suspense` import/wrapper after adding
  `loading.tsx`.** You'd end up with two nested boundaries doing the same
  job. Once a route segment has its own `loading.tsx`, its `page.tsx` goes
  back to being one plain `async` component with no `Suspense` import.
- **Removed the nested `<Suspense>` in step 4 but kept the async
  `EmployeeExpenses` component.** Without a boundary to catch it, the async
  component's data requirement propagates up — expect the page to refuse to
  render until the fetch resolves (or an error, depending on config), rather
  than a silent fallback. Put the `<Suspense>` back around it.
