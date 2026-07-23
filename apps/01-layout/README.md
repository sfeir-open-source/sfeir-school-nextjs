# 01 - Layout

## What you'll build

The SFEIR People dashboard shell: one sidebar/logo layout shared by
`/employees` and `/expenses`, organized under a `(dashboard)` route group so
it doesn't leak into the URL. The sidebar and logo render once and persist
across navigation, while `<main>` swaps between the employees list and the
expenses table. Employee photos go through `next/image` for automatic
resizing and lazy-loading.

## Concepts you'll practice

- **Shared layouts** (`layout.tsx`) — a component that wraps `children` and
  persists across navigations instead of re-rendering.
  https://nextjs.org/docs/app/api-reference/file-conventions/layout
- **Nested layouts** — layouts stack: the root layout wraps your new
  dashboard layout, which wraps the `employees` and `expenses` pages.
  https://nextjs.org/docs/app/getting-started/layouts-and-pages
- **Route groups** — `(folderName)` organizes routes under a shared layout
  without adding a path segment to the URL.
  https://nextjs.org/docs/app/api-reference/file-conventions/route-groups
- **`next/image`** — automatic resizing, lazy-loading, and layout-shift
  prevention instead of a plain `<img>`.
  https://nextjs.org/docs/app/api-reference/components/image
- **Layout persistence across navigation** — you'll verify the sidebar
  doesn't remount when switching between pages that share it.

## A note on `@sfeir/ui` vs `@sfeir/ui-solution`

`01-layout` depends on `@sfeir/ui` — the unsolved component library. A few of
the components you'll use here are intentionally simpler than what you might
spot later in a `-solution` app's `@sfeir/ui-solution`:

- **`NavigationMenu`** in `@sfeir/ui` renders plain, static links with no
  active-route highlighting. The `@sfeir/ui-solution` version wraps each link
  in a `NavigationItem`/`Suspense` pair to highlight the current page — that's
  a later module's topic, not something missing from your setup here.
- **`EmployeeForm`** and **`ExpensesTable`** in `@sfeir/ui` don't yet wire up
  real submission/navigation behavior (no `useActionState`, no
  per-row navigation) — those land with server actions and mutations in a
  later workshop. Submitting the employee form or clicking an expense row
  doing nothing right now is expected, not a bug in your layout code.

If something in the sidebar or pages looks "unfinished" beyond the layout
itself, it's very likely one of these — double-check you're not comparing
against `-solution` behavior before assuming your `(dashboard)` wiring is
wrong.

## Steps

1. **Create the route group.**
   Inside `src/app`, create a folder named `(dashboard)` (parentheses
   included). Route groups are invisible in the URL — they're purely for
   organizing which pages share a layout.

   ```
   src/app/
     (dashboard)/        <- new, empty for now
   ```

2. **Add the dashboard layout.**
   Copy `_static/dashboard-layout.tsx` into `src/app/(dashboard)/layout.tsx`.
   Read through it before moving on — it already renders the logo (via
   `next/image`), the sidebar (`NavigationMenu` from `@sfeir/ui/server`), and
   wraps `{children}` where the matched page will render.

   ```tsx
   import Image from 'next/image';
   import { NavigationMenu } from '@sfeir/ui/server';
   import logo from '@/assets/svg/logo.svg';
   import { ReactNode } from 'react';

   type DashboardLayoutProps = { children: ReactNode };

   const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
     return (
       <div className="flex bg-blue-50 dark:bg-slate-950 dark:text-white">
         <header className="p-4 min-h-screen min-w-64 bg-white ...">
           {/* TODO: logo (Image) + <NavigationMenu /> */}
         </header>
         <main className="w-full p-4">{children}</main>
       </div>
     );
   };

   export default DashboardLayout;
   ```

3. **Add the dashboard's own page.**
   Copy `_static/dashboard-page.tsx` into `src/app/(dashboard)/page.tsx`.
   This becomes the content shown when the layout has no deeper route
   selected.

   ```tsx
   import { PageTitle } from '@sfeir/ui/server';

   const Dashboard = () => <PageTitle>{/* TODO: title text */}</PageTitle>;

   export default Dashboard;
   ```

4. **Add the employees page.**
   Copy `_static/employee-page.tsx` into
   `src/app/(dashboard)/employees/page.tsx`. This is what makes `/employees`
   resolve — nested inside `(dashboard)`, so it automatically picks up the
   layout from step 2. The `PersonCard` component it renders already uses
   `next/image` internally for employee photos, so you get resized,
   lazy-loaded images for free.

   ```tsx
   import employeesData from '@/data/employee.json' with { type: 'json' };
   import { EmployeeForm, PageTitle, PersonCard } from '@sfeir/ui/server';

   const Employees = async () => {
     return (
       <div className="flex flex-col">
         <PageTitle>Employees</PageTitle>
         <EmployeeForm />
         <div className="grid grid-cols-4 gap-4">
           {/* TODO: map employeesData to <PersonCard person={employee} /> */}
         </div>
       </div>
     );
   };

   export default Employees;
   ```

5. **Add the expenses page.**
   Copy `_static/expenses-page.tsx` into
   `src/app/(dashboard)/expenses/page.tsx`, giving you `/expenses` under the
   same shared layout.

   ```tsx
   import { ExpensesTable } from '@sfeir/ui';
   import { PageTitle } from '@sfeir/ui/server';
   import expensesData from '@/data/expense.json' with { type: 'json' };
   import { Expense } from '@sfeir/types';

   const Expenses = async () => {
     return (
       <>
         <PageTitle>Expenses</PageTitle>
         {/* TODO: <ExpensesTable expenses={...} /> */}
       </>
     );
   };

   export default Expenses;
   ```

6. **Confirm the folder shape.**
   You should end up with:

   ```
   src/app/
     layout.tsx                      (root layout — untouched)
     page.tsx                        (untouched)
     (dashboard)/
       layout.tsx
       page.tsx
       employees/page.tsx
       expenses/page.tsx
   ```

7. **Check persistence.**
   Run the app and navigate back and forth between `/employees` and
   `/expenses` a few times. Watch the sidebar and logo stay exactly where
   they are — only the content inside `<main>` swaps. If you're curious, open
   the Network tab while navigating: no full-document reload happens, just
   the payload for the changed segment.

   ```tsx
   // src/app/(dashboard)/layout.tsx must render {children} — that's the
   // slot that gets swapped, everything else around it persists.
   const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
     return (
       <div className="flex bg-blue-50 dark:bg-slate-950 dark:text-white">
         <header /* unchanged across navigations */>{/* logo + nav */}</header>
         <main className="w-full p-4">{children}</main>
       </div>
     );
   };
   ```

8. **Verify against the solution.**
   Compare your routes with `apps/01-layout-solution/src/app`. The shape and
   prop names should match — the only intentional difference is the import
   source: your app pulls components from `@sfeir/ui` /
   `@sfeir/ui/server`, the solution from `@sfeir/ui-solution` /
   `@sfeir/ui-solution/server`.

   ```tsx
   // yours (01-layout)
   import { NavigationMenu } from '@sfeir/ui/server';

   // solution (01-layout-solution)
   import { NavigationMenu } from '@sfeir/ui-solution/server';
   ```

## Running the exercise

```bash
npm run dev -- 01-layout
```

## Troubleshooting

- **`/dashboard/employees` shows up instead of `/employees`.**
  The folder isn't a route group — check that it's literally named
  `(dashboard)` with parentheses, not `dashboard`. Only parenthesized folder
  names are stripped from the URL.

- **Sidebar/logo disappear or the page renders blank.**
  Your `(dashboard)/layout.tsx` must render `{children}` somewhere (inside
  `<main>` in the static snippet). If `{children}` isn't rendered, nested
  pages never appear.

- **`/employees` or `/expenses` gives a 404.**
  Confirm the file is exactly `page.tsx` (not `Page.tsx` or `index.tsx`)
  inside `(dashboard)/employees/` or `(dashboard)/expenses/`, and that the
  folder sits *inside* `(dashboard)`, not next to it — otherwise it won't
  inherit the dashboard layout at all.

- **Sidebar seems to "flicker" or reset state when navigating.**
  This usually means the layout got duplicated into each page instead of
  living once in `(dashboard)/layout.tsx` — Next.js only persists a layout
  across navigations when it's the same layout file matched for both routes.

- **Employee photos look like plain unoptimized `<img>` tags, or you get an
  image domain/size error.**
  Photos should come through `PersonCard`, which already uses `next/image`.
  If you're customizing further, remember `next/image` needs explicit
  `width`/`height` (or a statically-imported source) to avoid layout shift.
