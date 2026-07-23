# 13 - Rendering Methods

## What you'll build

This app already caches its data providers (`'use cache'`, `cacheTag`) from
earlier modules. What's missing is telling Next.js **which pages can be
built once, ahead of time** versus **which must stay live on every
request**. By the end of this workshop:

- `/employees/<id>` and `/employees/<id>/edit` are prerendered for every
  real employee id at build time, and any id outside that frozen set
  genuinely 404s instead of silently rendering on demand.
- `/expenses/<id>` prerenders only the 5 most recent expenses, showing
  that `generateStaticParams` doesn't have to cover 100% of a dataset.
- The homepage's "latest employees" widget stays fully dynamic (SSR on
  every request) via `connection()`, even though the rest of the page
  around it is static.

## Concepts you'll practice

- **Static vs dynamic rendering** — deciding which routes can be built
  once vs which must run per-request:
  [Static and Dynamic Rendering](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic)
- **`generateStaticParams`** — telling Next.js the full (or partial) set
  of dynamic segment values to prerender at build time:
  [`generateStaticParams`](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)
- **`'use cache'` + `cacheLife`/`cacheTag`** — controlling how long a
  cached function's result lives and how it gets invalidated:
  [Directives: `use cache`](https://nextjs.org/docs/app/api-reference/directives/use-cache),
  [`cacheLife`](https://nextjs.org/docs/app/api-reference/functions/cacheLife)
- **`connection()`** — opting a single component out of static rendering
  to force it dynamic without affecting the rest of the page:
  [`connection()`](https://nextjs.org/docs/app/api-reference/functions/connection)
- **Route Segment Config** — the broader set of per-route rendering
  controls (`dynamic`, `dynamicParams`, `revalidate`):
  [Route Segment Config](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config)

## Steps

### 1. Freeze the list of real employee ids

In `src/app/providers/employees.ts`:

- Import `cacheLife` alongside `cacheTag` from `next/cache`.
- Add an exported `getEmployeeIds()` function: mark it `'use cache'`, tag
  it with `cacheTag('employee-ids')`, and set `cacheLife('max')` — this
  list should only change on a fresh deploy, not on a schedule.
- Inside, fetch employees with `{ per_page: 100 }` (reuse the existing
  fetch pattern from `getEmployees`) and return `items.map(item => item.id)`.

```ts
import { API_BASE_URL, API_KEY } from '@/app/shared/env';
import { buildQueryParamsToString, fetchData } from '@sfeir/helpers';
import { Paginated, Person } from '@sfeir/types';
import { cacheLife, cacheTag } from 'next/cache';

export async function getEmployeeIds(): Promise<string[]> {
  'use cache';
  cacheTag('employee-ids');
  cacheLife('max');
  // TODO: reuse the same fetch pattern as `getEmployees`:
  //   const stringQueryParams = buildQueryParamsToString({ per_page: 100 });
  //   const url = `${API_BASE_URL}/people?${stringQueryParams}`;
  //   const { items } = await fetchData<Paginated<Person>>(url, { headers: { 'x-api-key': API_KEY ?? '' } });
  // TODO: return items.map(item => item.id)
}
```

### 2. Prerender every employee page at build time

Both `src/app/(dashboard)/employees/[id]/page.tsx` **and**
`src/app/(dashboard)/employees/[id]/edit/page.tsx` need the identical
change — each is its own route with its own dynamic segment, so each
needs its own `generateStaticParams` export and its own guard.

**`src/app/(dashboard)/employees/[id]/page.tsx`:**

- Import `getEmployeeIds` and export an `async function generateStaticParams()`
  that returns `(await getEmployeeIds()).map(id => ({ id }))`.
- Inside `EmployeeDetailContent`, right after reading `id` from `params`,
  fetch the valid ids the same way and call `notFound()` when the current
  `id` isn't in that list — do this **before** the existing `try`/`catch`
  around `getEmployee`.

```tsx
import { getEmployee, getEmployeeIds } from '@/app/providers/employees';
import { ApiError } from '@sfeir/helpers';
import { EmployeeExpenses } from '@sfeir/ui';
import { PageTitle, PersonCard } from '@sfeir/ui/server';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export async function generateStaticParams() {
  // TODO: fetch the ids and map each one to the { id } shape Next.js expects
  // const ids = await getEmployeeIds();
  // return ids.map(id => ({ id }));
}

const EmployeeDetailContent = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  // TODO: fetch the valid ids (getEmployeeIds) and call notFound() when
  // `id` isn't among them, e.g.:
  // const validIds = await getEmployeeIds();
  // if (!validIds.includes(id)) notFound();

  try {
    const employee = await getEmployee(id);
    // ...existing rendering logic (PageTitle, PersonCard, etc.)
  } catch (error) {
    // ...existing catch (ApiError 404 -> notFound(), otherwise rethrow)
  }
};
```

**`src/app/(dashboard)/employees/[id]/edit/page.tsx`:**

Same shape, same import, same guard — this is a *separate* dynamic route
(`/employees/[id]/edit`) so Next.js needs its own
`generateStaticParams` here too, not just on the sibling `page.tsx`.

```tsx
import { updateEmployee } from '@/app/(dashboard)/employees/action';
import { getEmployee, getEmployeeIds } from '@/app/providers/employees';
import { ApiError } from '@sfeir/helpers';
import { EmployeeForm, PageTitle } from '@sfeir/ui/server';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export async function generateStaticParams() {
  // TODO: same as above — fetch the ids and map each one to { id }
}

const EmployeeEditContent = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  // TODO: same guard as the detail page — fetch getEmployeeIds() and
  // call notFound() when `id` isn't among them

  try {
    const employee = await getEmployee(id);
    // ...existing rendering logic (PageTitle, EmployeeForm, etc.)
  } catch (error) {
    // ...existing catch
  }
};
```

This is the important part to understand, not just copy: `generateStaticParams`
runs at build time (or on first navigation in `next dev`) and tells Next.js
the full set of `/employees/<id>` (and `/employees/<id>/edit`) pages to
prerender. The manual `includes(id)` check afterwards is what makes an id
created *after* the build genuinely 404, instead of silently rendering on
demand.

See [`generateStaticParams`](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) in the docs.

### 3. Prerender only the 5 most recent expenses

In `src/app/providers/expensees.ts`:

- Add `'use cache'` and `cacheTag('one-expense')` to `getExpenseById`.
- Add `getExpenseIds(limit = 5)`: call the existing `getExpenses` and map
  `items` to their ids. It does **not** need `'use cache'` —
  `generateStaticParams` only ever runs at build time, never per visitor,
  so there's nothing to save by caching it.

```ts
import { API_BASE_URL, API_KEY } from '@/app/shared/env';
import { buildQueryParamsToString, fetchData } from '@sfeir/helpers';
import { Expense, Paginated } from '@sfeir/types';
import { cacheTag } from 'next/cache';

export async function getExpenses(filter: Record<string, unknown> = {}) {
  // ...existing body, unchanged
}

export async function getExpenseById(id: string) {
  'use cache';
  cacheTag('one-expense');
  const url = `${API_BASE_URL}/expenses/${id}`;
  const headers = { 'x-api-key': API_KEY ?? '' };
  return await fetchData<Expense>(url, { headers });
}

export async function getExpenseIds(limit = 5): Promise<string[]> {
  // TODO: const { items } = await getExpenses({ per_page: limit });
  // TODO: return items.map(item => item.id)
}
```

In `src/app/(dashboard)/expenses/[id]/page.tsx`:

- Import `getExpenseIds` and add the same `generateStaticParams` shape as
  step 2. No extra guard is needed here — the existing `notFound()` catch
  around `getExpenseById` already covers ids outside the 5 that got baked.

```tsx
import { getExpenseById, getExpenseIds } from '@/app/providers/expensees';
import { ApiError } from '@sfeir/helpers';
import { ExpenseDetails, PageTitle } from '@sfeir/ui/server';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export async function generateStaticParams() {
  // TODO: fetch the ids and map each one to the { id } shape Next.js expects
  // const ids = await getExpenseIds();
  // return ids.map(id => ({ id }));
}

const SingleExpenseContent = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  try {
    const expense = await getExpenseById(id);
    // ...existing rendering logic — no extra guard needed here
  } catch (error) {
    // ...existing catch (ApiError 404 -> notFound(), otherwise rethrow)
  }
};
```

Notice the deliberate contrast with step 2: employees bakes *all* ids,
expenses bakes only a subset. Same API, two different calls on "how much
is worth prerendering."

### 4. Force the homepage's "latest employees" widget to stay live

In `src/app/providers/employees.ts`:

- Add `getEmployeesUncached` — same body as `getEmployees`, minus
  `'use cache'` and `cacheTag`.

```ts
export async function getEmployeesUncached(filter: Record<string, unknown>) {
  // TODO: same fetch logic as getEmployees, minus 'use cache' and cacheTag
  // const stringQueryParams = buildQueryParamsToString(filter);
  // const url = `${API_BASE_URL}/people${stringQueryParams ? `?${stringQueryParams}` : ''}`;
  // return await fetchData<Paginated<Person>>(url, { headers: { 'x-api-key': API_KEY ?? '' } });
}
```

In `src/app/(dashboard)/(home)/@employeesSlot/page.tsx`:

- Import `connection` from `next/server`.
- Call `await connection()` as the first line inside the component that
  fetches the list (`EmployeesList`).
- Fetch with `getEmployeesUncached` instead of `getEmployees`, using the
  same filter as before.

```tsx
import { getEmployeesUncached } from '@/app/providers/employees';
import { PersonCard } from '@sfeir/ui/server';
import { connection } from 'next/server';
import { Suspense } from 'react';

const EmployeesList = async () => {
  await connection();
  // TODO: fetch with getEmployeesUncached instead of getEmployees, same filter as before:
  // const latestEmployees = await getEmployeesUncached({ perPage: 6, sortBy: 'entryDate', order: 'desc' });
  // return (...); // ...existing rendering logic (grid of PersonCard)
};
```

`connection()` opts that one component out of static rendering and forces
it to run per-request — SSR for just this widget, while the rest of the
page can stay static.

### 5. Verify against the solution

Run `13-rendering-methods-solution` alongside your app and compare the
same six files: `providers/employees.ts`, `providers/expensees.ts`,
`employees/[id]/page.tsx`, `employees/[id]/edit/page.tsx`,
`expenses/[id]/page.tsx`, and `@employeesSlot/page.tsx`.

Want to see the effect made concrete? Run `npx nx build 13-rendering-methods`
once you're done and check the build output — every prerendered
`/employees/<id>` route will be listed, versus only the handful of
`/expenses/<id>` ones.

## Running the exercise

```
npm run dev -- 13-rendering-methods
```

The `dev` target automatically starts the `server` backend for you — no
need to run it separately.

## Troubleshooting

- **`generateStaticParams` runs but the build still fails or complains
  about missing params.** Make sure it returns an array of objects shaped
  like `{ id }` (matching the folder's dynamic segment name exactly), not
  a bare array of strings, and that it actually calls the id-fetching
  provider (`getEmployeeIds` / `getExpenseIds`) rather than a stub.

- **A route you expected to be static is opted into fully dynamic
  rendering.** Reading `cookies()`, `headers()`, or calling `connection()`
  anywhere in a component (including nested ones) forces that render path
  to be dynamic. Check you only added `connection()` where step 4 asked —
  inside `@employeesSlot`'s `EmployeesList` — and nowhere else.

- **An employee id you know exists still 404s.** `getEmployeeIds` is
  cached with `cacheLife('max')`, so it's frozen until the next
  build/deploy. If you added the employee after starting `next dev`,
  restart the dev server (or wait for a rebuild) so the cached list picks
  it up.

- **Every `/expenses/<id>` page 404s, even ones that should exist.**
  Double check `getExpenseIds` actually calls `getExpenses` with the
  `limit` param wired to `per_page`, and that `generateStaticParams` in
  `expenses/[id]/page.tsx` awaits it before mapping. Also confirm you did
  *not* add a manual `notFound()` guard here — expenses relies on the
  existing catch block around `getExpenseById`, not a duplicate check.

- **The "latest employees" widget shows stale data after an update.**
  This means it's still going through the cached `getEmployees` path.
  Confirm `@employeesSlot/page.tsx` imports and calls
  `getEmployeesUncached`, not `getEmployees`, and that `await connection()`
  is the very first line executed in that component.
