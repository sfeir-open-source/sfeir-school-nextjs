# 02 - Navigation

## What you'll build

Two flat lists (employees, expenses) become navigable apps: each item gets
its own detail page reachable through a real `<Link>`, expense rows become
clickable, and the sidebar highlights whichever page you're on. The first
half uses plain Server Components; the second half introduces your first
two client-side hooks.

## Concepts you'll practice

- **Dynamic segments** — a folder named `[id]` that matches any value in
  that position of the URL (`/employees/1`, `/employees/42`, ...) and serves
  them all from one `page.tsx`.
  Docs: [Dynamic Routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)
- **Reading route params** — the `params` prop Next.js hands to a page,
  which in this version of Next.js is a `Promise` you must `await`.
  Docs: [Page.js props](https://nextjs.org/docs/app/api-reference/file-conventions/page)
- **Client-side navigation with `<Link>`** — swapping a plain `<a>` for
  `next/link`'s `Link` so the sidebar/layout persists and Next.js can
  prefetch the target route.
  Docs: [`<Link>` component](https://nextjs.org/docs/app/api-reference/components/link) ·
  [Linking and Navigating](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating)
- **`useRouter`** — a client hook to navigate imperatively (e.g. on a row
  click, not just a link click).
  Docs: [`useRouter`](https://nextjs.org/docs/app/api-reference/functions/use-router)
- **`usePathname`** — a client hook that reads the current URL so a
  component can react to "am I the active page?".
  Docs: [`usePathname`](https://nextjs.org/docs/app/api-reference/functions/use-pathname)

Both hooks only work in a `'use client'` component, and both live in
`libs/ui/src/lib/` (this app depends on `@sfeir/ui`, so anything you edit
there is picked up automatically) — you're building small, focused client
components, not converting whole pages to client-side rendering.

## Steps

### 1. Build the employee detail page

1. In `src/app/(dashboard)/employees/`, create an `[id]` folder containing a
   `page.tsx`.
2. The page receives `params` as a **Promise** — `await` it, then read
   `params.id`.
3. Use that `id` to find the matching record in `src/data/employee.json`
   (`Array.prototype.find`).
4. Render the result with `PageTitle` and `PersonCard`, both importable from
   `@sfeir/ui/server`. `PageTitle` accepts a `backHref` prop if you want a
   back arrow to `/employees`.
5. Handle the "not found" case — if no employee matches the id, render
   `PageTitle` with a short message instead of crashing.
6. Visit `http://localhost:3000/employees/<some-id>` directly (copy an id
   out of `employee.json`) to confirm the route renders on its own, before
   wiring up a link to it.

```tsx
// src/app/(dashboard)/employees/[id]/page.tsx
import employeesData from '@/data/employee.json' with { type: 'json' };
import { PageTitle, PersonCard } from '@sfeir/ui/server';

type EmployeeDetailProps = {
  params: Promise<{ id: string }>;
};

const EmployeeDetail = async ({ params }: EmployeeDetailProps) => {
  const { id } = await params;
  // TODO: find the matching employee in employeesData (Array.prototype.find)

  // TODO: if nothing matches, return <PageTitle backHref="/employees">
  //       with a short "not found" message instead of <PersonCard>

  return (
    <div>
      <PageTitle backHref="/employees">{/* TODO: employee full name */}</PageTitle>
      {/* TODO: <PersonCard person={employee} /> */}
    </div>
  );
};

export default EmployeeDetail;
```

### 2. Link to it from the employee list

1. Open `src/app/(dashboard)/employees/page.tsx`.
2. Each `PersonCard` in the grid takes an optional `actions` prop
   (`React.ReactNode`) rendered under the card — that's where the link
   goes.
3. Import `Link` from `next/link` and point its `href` at
   `` /employees/${employee.id} ``.
4. Click through from the list: the navigation should feel instant, with no
   full white-page reload and no re-render of the sidebar.

```tsx
// src/app/(dashboard)/employees/page.tsx
import Link from 'next/link';
// ...existing imports

{employeesData?.map(employee => (
  <PersonCard
    key={employee.id}
    person={employee}
    actions={
      // TODO: a <Link href={`/employees/${employee.id}`}> with a label
      //       like "View profile"
      undefined
    }
  />
))}
```

### 3. Do the same for expenses

1. Create `src/app/(dashboard)/expenses/[id]/page.tsx`, following the same
   shape as the employee detail page but reading from
   `src/data/expense.json`.
2. Visit `/expenses/<some-id>` directly to prove the route resolves.

```tsx
// src/app/(dashboard)/expenses/[id]/page.tsx
import expensesData from '@/data/expense.json' with { type: 'json' };
import { PageTitle } from '@sfeir/ui/server';
import { Expense } from '@sfeir/types';

type ExpenseDetailProps = {
  params: Promise<{ id: string }>;
};

const ExpenseDetail = async ({ params }: ExpenseDetailProps) => {
  const { id } = await params;
  // TODO: cast expensesData as Array<Expense> and find the matching one

  // TODO: guard the "not found" case, same idea as the employee page

  return (
    <div>
      <PageTitle backHref="/expenses">{/* TODO: expense label */}</PageTitle>
      {/* TODO: render whatever expense fields you want (category, price...) */}
    </div>
  );
};

export default ExpenseDetail;
```

### 4. Make expense rows clickable — your first `'use client'` hook

Right now `ExpensesTable` (`libs/ui/src/lib/ExpensesTable.tsx`) renders each
`<tr>` with a `cursor-pointer` style but no actual click behavior — and the
whole file is marked `'use client'` even though only the click needs a
browser. You're going to split that one interactive bit into its own tiny
component.

1. Remove the `'use client'` directive from the top of `ExpensesTable.tsx`
   — the table itself doesn't need it.
2. Create `libs/ui/src/lib/ExpensesTableRow.tsx`:

```tsx
// libs/ui/src/lib/ExpensesTableRow.tsx
'use client';

import { Expense } from '@sfeir/types';
import { useRouter } from 'next/navigation';
import { memo, ReactNode, useCallback } from 'react';

type ExpensesTableRowProps = {
  className?: string;
  children: ReactNode;
  expense: Expense;
};

export const ExpensesTableRow = memo(({ expense, children, className = '' }: ExpensesTableRowProps) => {
  const router = useRouter();

  const handleClickRow = useCallback(() => {
    // TODO: router.push to /expenses/${expense.id}
  }, [router, expense.id]);

  return (
    <tr className={className} role="link" onClick={handleClickRow} aria-label={`View details of expense : "${expense.label}"`}>
      {children}
    </tr>
  );
});
```

3. Back in `ExpensesTable.tsx`, replace the `<tr>...</tr>` inside the
   `.map()` with `<ExpensesTableRow expense={expense} className={/* your existing clsx call */}>`,
   keeping the same `<td>`s as `children`:

```tsx
{expenses.map((expense, index) => (
  <ExpensesTableRow
    key={expense.id}
    expense={expense}
    className={clsx(/* same clsx call you already had */)}
  >
    {/* TODO: move the four existing <td> cells here, unchanged */}
  </ExpensesTableRow>
))}
```

4. Click a row on `/expenses` and confirm it navigates to `/expenses/<id>`.

### 5. Highlight the active sidebar link — your second `'use client'` hook

`NavigationMenu` (`libs/ui/src/lib/NavigationMenu.tsx`) currently renders
three hardcoded, always-plain `<a>` links. You'll swap them for a small
client component that knows which one is "active".

1. Create `libs/ui/src/lib/NavigationItem.tsx`:

```tsx
// libs/ui/src/lib/NavigationItem.tsx
'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { memo, ReactNode } from 'react';

type NavigationItemProps = {
  href: string;
  children: ReactNode;
};

export const NavigationItem = memo(({ href, children }: NavigationItemProps) => {
  const pathname = usePathname();

  // TODO: compute isActive — true when pathname matches href.
  //       Careful with "/": it must match exactly, or every route would
  //       highlight Home too. Every other href can use pathname.includes(href).
  const isActive = false;

  return (
    <li>
      <Link href={href} className={clsx('block px-4 py-2 rounded-md', isActive && 'bg-gray-100')}>
        {children}
      </Link>
    </li>
  );
});
```

2. In `NavigationMenu.tsx`, replace the three `<li><a>...</a></li>` blocks
   with a `.map()` over an `items` array, rendering one `NavigationItem`
   per link:

```tsx
// libs/ui/src/lib/NavigationMenu.tsx
import { NavigationItem } from './NavigationItem';

const items = [
  { href: '/', label: 'Home' },
  { href: '/employees', label: 'Employees' },
  { href: '/expenses', label: 'Expenses' },
];

export const NavigationMenu = () => {
  return (
    <nav>
      <ul className="flex flex-col gap-2">
        {/* TODO: items.map(item => <NavigationItem key={item.href} href={item.href}>{item.label}</NavigationItem>) */}
      </ul>
    </nav>
  );
};
```

3. Navigate between Home / Employees / Expenses and confirm the sidebar
   link for the current page gets the highlighted background.

### 6. Verify against the solution

Run `02-navigation-solution` alongside your app (see below, swap the app
name) and compare your four edited/created files
(`employees/[id]/page.tsx`, `expenses/[id]/page.tsx`,
`libs/ui/src/lib/ExpensesTableRow.tsx`, `libs/ui/src/lib/NavigationItem.tsx`)
against its equivalents in `libs/ui-solution`.

## Running the exercise

```bash
npm run dev -- 02-navigation
```

## Troubleshooting

- **"params.id is undefined" or a TypeError on `.find`** — `params` is a
  `Promise` in this Next.js version. Make sure your page component is
  `async` and you `await params` before reading `.id`.
- **Clicking the list link still does a full page reload** — you're
  probably still using a plain `<a href="...">` instead of
  `<Link href="...">` from `next/link`. Check the import.
- **`/employees/999` (or any bad id) crashes instead of showing a
  message** — you're not guarding against `find` returning `undefined`.
  Add an early return that renders `PageTitle` (or similar) when no
  matching employee/expense is found.
- **Clicking an expense row does nothing** — make sure `onClick` is set on
  the `<tr>` inside `ExpensesTableRow`, and that `useRouter`'s `router.push`
  actually runs inside it (not left as a TODO). The click handler has to
  live in the Client Component; `ExpensesTable` never sees the click.
- **Nav links never highlight** — `usePathname()` only works inside a
  `'use client'` file. If `NavigationItem` is missing the directive, or the
  `isActive` computation is still hardcoded to `false`, the highlight will
  silently never show.
- **The Home link is always highlighted, even on other pages** — your
  `isActive` check for `/` needs an exact match (`pathname === '/'`), not
  `.includes('/')` — every path includes `/`.
- **TypeScript complains about the `[id]` folder's page props** — the
  params type must be `Promise<{ id: string }>`, matching the folder name.
  A typo like `[Id]` or destructuring without awaiting will surface as a
  type error.
- **Nothing renders at `/employees/<id>` even though the file exists** —
  the file must be `src/app/(dashboard)/employees/[id]/page.tsx` exactly
  (default export, folder literally named `[id]` with brackets).
