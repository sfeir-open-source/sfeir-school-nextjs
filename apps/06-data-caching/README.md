# 06 - Data Caching

## What you'll build

Right now every provider in this app re-fetches from the backend on every
single request — correct, but wasteful. By the end of this lab, the
`employees` provider "photocopies" its results with Next.js's Cache
Components model instead of re-typing them from scratch each time: the
employee list and employee detail pages serve cached data, the pages that
depend on `params`/`searchParams` (or otherwise do per-request work) are
isolated behind `<Suspense>` boundaries, and a `/api/revalidate` route lets
you throw away a specific cached "photocopy" on demand — e.g. after editing
an employee.

## Concepts you'll practice

- **`cacheComponents: true`** — the master switch in `next.config.js`. Until
  it's on, `'use cache'` does nothing at all.
  ([`cacheComponents` config](https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheComponents))
- **`'use cache'`** — a directive (like `'use client'`), placed as the first
  line of an `async` function, that turns its result into a cached
  "photocopy" shared across requests.
  ([`use cache` directive](https://nextjs.org/docs/app/api-reference/directives/use-cache))
- **`cacheTag('name')`** — labels a cached entry so you can invalidate it
  specifically later, instead of nuking the whole cache.
  ([`cacheTag`](https://nextjs.org/docs/app/api-reference/functions/cacheTag))
- **`<Suspense>` boundaries around per-request data** — once
  `cacheComponents` is on, anything that can't be resolved ahead of time
  (reading `params`/`searchParams`, or doing uncached I/O like a file read)
  must be isolated in its own component and wrapped in `<Suspense>`.
  ([Caching in Next.js](https://nextjs.org/docs/app/guides/caching))
- **`revalidateTag` / `revalidatePath`** — how you tell Next.js "this cached
  entry is now wrong, throw it away" from a route handler, typically after a
  mutation.
  ([`revalidateTag`](https://nextjs.org/docs/app/api-reference/functions/revalidateTag) /
  [`revalidatePath`](https://nextjs.org/docs/app/api-reference/functions/revalidatePath))
- **`cacheLife`** — not used in this lab, but worth knowing about: it
  configures a cache entry's staleness/expiration profile instead of the
  default. ([`cacheLife`](https://nextjs.org/docs/app/api-reference/functions/cacheLife))

## Steps

### 1. Flip the switch in `next.config.js`

Add `cacheComponents: true` to the exported config. Nothing is cached yet
after this step — it just makes `'use cache'` meaningful.

```js
//@ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  distDir: '../../dist/apps/06-data-caching',
};

module.exports = nextConfig;
```

### 2. Cache the employee providers

Open `src/app/providers/employees.ts` — right now both functions call
`fetchData` on every invocation, with no caching at all:

```ts
import { API_BASE_URL, API_KEY } from '@/app/shared/env';
import { fetchData } from '@sfeir/helpers';
import { Paginated, Person } from '@sfeir/types';

export async function getEmployees(search?: string) {
  let stringQueryParams: string | undefined;
  if (search) {
    stringQueryParams = `search=${search}`;
  }
  const url = `${API_BASE_URL}/people${stringQueryParams ? `?${stringQueryParams}` : ''}`;
  const headers = {
    'x-api-key': API_KEY ?? '',
  };
  return await fetchData<Paginated<Person>>(url, { headers });
}

export async function getEmployee(id: string) {
  const url = `${API_BASE_URL}/people/${id}`;
  const headers = {
    'x-api-key': API_KEY ?? '',
  };
  return await fetchData<Person>(url, { headers });
}
```

Turn each one into a cached "photocopy":

- Import `cacheTag` from `next/cache`.
- In `getEmployees`, add `'use cache'` as the very first line of the
  function body, then call `cacheTag('all-employees')` right after it.
- Do the same in `getEmployee`, but tag it `cacheTag('one-employee')`
  instead — it's a different photocopy (a single record vs. a list), so it
  needs its own label.
- Leave `src/app/providers/expensees.ts` untouched — it's intentionally out
  of scope for this lab.

```ts
import { API_BASE_URL, API_KEY } from '@/app/shared/env';
import { fetchData } from '@sfeir/helpers';
import { Paginated, Person } from '@sfeir/types';
import { cacheTag } from 'next/cache'; // TODO: add this import

export async function getEmployees(search?: string) {
  'use cache'; // TODO: first line of the function body
  cacheTag('all-employees'); // TODO: right after the directive
  // ...rest of the function is unchanged
}

export async function getEmployee(id: string) {
  'use cache'; // TODO: first line of the function body
  cacheTag('one-employee'); // TODO: right after the directive
  // ...rest of the function is unchanged
}
```

### 3. Wrap the now-required `<Suspense>` boundaries

With `cacheComponents` on, any part of a page that reads `params` or
`searchParams`, or otherwise does uncached per-request work (a `fetch` not
covered by `'use cache'`, a file read, etc.), can no longer live directly in
the page component — split that logic into its own inner `async` component
and wrap it in `<Suspense fallback={...}>`. Apply this shape in:

- `src/app/(dashboard)/employees/page.tsx` (reads `searchParams`)
- `src/app/(dashboard)/employees/[id]/page.tsx` (reads `params`)
- `src/app/(dashboard)/employees/[id]/edit/page.tsx` (reads `params`)
- `src/app/(dashboard)/employees/logs/page.tsx` (uncached file read)
- `src/app/(dashboard)/expenses/page.tsx` (uncached fetch via `expensees.ts`)
- `src/app/(dashboard)/expenses/[id]/page.tsx` (reads `params` + uncached fetch)

Don't worry about explaining exactly *why* `<Suspense>` is required here —
module 12 starts covering that, and module 15 goes deep. For now just
recognize and match the pattern: page component renders
`<Suspense><InnerContent {...props} /></Suspense>`, and `InnerContent` does
the actual `await` of `params`/`searchParams` and data fetching.

**Before** — `src/app/(dashboard)/employees/[id]/page.tsx` today, reading
`params` directly in the page component. This is exactly what breaks once
`cacheComponents` is on:

```tsx
import { getEmployee } from '@/app/providers/employees';
import { EmployeeExpenses } from '@sfeir/ui';
import { PageTitle, PersonCard } from '@sfeir/ui/server';

const EmployeeDetail = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const employee = await getEmployee(params.id);

  if (!employee) return <PageTitle backHref="/employees">Single Employee - Not found</PageTitle>;

  return <PersonCard person={employee} actions={<EmployeeExpenses employeeId={employee.id} />} />;
};

export default EmployeeDetail;
```

**After** — page component just renders `<Suspense>`; the inner component
does the `await`:

```tsx
import { Suspense } from 'react';
import { getEmployee } from '@/app/providers/employees';
import { EmployeeExpenses } from '@sfeir/ui';
import { PageTitle, PersonCard } from '@sfeir/ui/server';

const EmployeeDetailContent = async (props: { params: Promise<{ id: string }> }) => {
  // TODO: destructure the prop(s) this page actually needs (params here)
  const params = await props.params;
  const employee = await getEmployee(params.id);

  if (!employee) return <PageTitle backHref="/employees">Single Employee - Not found</PageTitle>;

  return <PersonCard person={employee} actions={<EmployeeExpenses employeeId={employee.id} />} />;
};

const EmployeeDetail = (props: { params: Promise<{ id: string }> }) => {
  return (
    <Suspense fallback={/* TODO: pick a fallback UI */ null}>
      <EmployeeDetailContent {...props} />
    </Suspense>
  );
};

export default EmployeeDetail;
```

A second example, since `employees/page.tsx` destructures `searchParams`
instead of `params` — same shape, different prop:

**Before** — `src/app/(dashboard)/employees/page.tsx` today:

```tsx
import { getEmployees } from '@/app/providers/employees';
import { Person } from '@sfeir/types';
import { Search } from '@sfeir/ui';
import { Button, PageTitle, PersonCard } from '@sfeir/ui/server';
import Link from 'next/link';

const Employees = async ({ searchParams }: { searchParams: Promise<{ search: string }> }) => {
  const search = (await searchParams).search || '';
  const employees = await getEmployees(search);

  return (
    <div className="flex flex-col">
      <PageTitle>Employees</PageTitle>
      <Search />
      <div className="grid grid-cols-4 gap-4">
        {employees.items.map(employee => (
          <PersonCard key={employee.id} person={employee} actions={/* ...actions omitted */ null} />
        ))}
      </div>
    </div>
  );
};

export default Employees;
```

**After**:

```tsx
import { Suspense } from 'react';
import { getEmployees } from '@/app/providers/employees';
import { Person } from '@sfeir/types';
import { Search } from '@sfeir/ui';
import { Button, PageTitle, PersonCard } from '@sfeir/ui/server';
import Link from 'next/link';

const EmployeesContent = async ({ searchParams }: { searchParams: Promise<{ search: string }> }) => {
  // TODO: destructure the prop(s) this page actually needs (searchParams here)
  const search = (await searchParams).search || '';
  const employees = await getEmployees(search);

  return (
    <div className="grid grid-cols-4 gap-4">
      {employees.items.map(employee => (
        <PersonCard key={employee.id} person={employee} actions={/* ...actions omitted */ null} />
      ))}
    </div>
  );
};

const Employees = (props: { searchParams: Promise<{ search: string }> }) => {
  return (
    <div className="flex flex-col">
      <PageTitle>Employees</PageTitle>
      <Search />
      <Suspense fallback={/* TODO: pick a fallback UI */ null}>
        <EmployeesContent {...props} />
      </Suspense>
    </div>
  );
};

export default Employees;
```

Apply the same before/after shape to the other four pages — each one
differs only in which prop (`params`, `searchParams`, both, or neither —
`employees/logs/page.tsx` and `expenses/page.tsx` take no props at all, but
still do uncached work that must move into the inner `Content` component).

### 4. Give mutations a way to invalidate the cache

Create `src/app/api/revalidate/route.ts` with an `export const GET` that:

- Reads `tag` off `request.nextUrl.searchParams`.
- If `tag` is missing, responds with an error instead of proceeding.
- If `tag === 'all'`, calls `revalidatePath('/', 'layout')`.
- Otherwise calls `revalidateTag(tag, { expire: 0 })`.
- Both `revalidatePath` and `revalidateTag` come from `next/cache`.

```ts
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export const GET = (request: NextRequest) => {
  const tag = request.nextUrl.searchParams.get('tag');

  if (!tag) {
    // TODO: return a NextResponse with an error status (e.g. 400) and a helpful message
  }

  if (tag === 'all') {
    // TODO: call revalidatePath('/', 'layout') and return a success NextResponse
  }

  // TODO: otherwise call revalidateTag(tag, { expire: 0 }) and return a success NextResponse
};
```

Once this route works, hit `/api/revalidate?tag=one-employee` from your
browser's address bar, then reload an employee detail page — you should see
it re-fetch. That's the whole "throw away one photocopy" story, made
visible.

### 5. Verify against the solution

Run `06-data-caching-solution` alongside your app and compare
`next.config.js`, `src/app/providers/employees.ts`, every page you touched
in step 3, and `src/app/api/revalidate/route.ts`.

## Running the exercise

```bash
npm run dev -- 06-data-caching
```

The shared `server` Fastify backend (port 9000) starts automatically as
part of this app's `dev` target — you don't need a second terminal.

## Troubleshooting

- **Nothing seems cached, even after adding `'use cache'`.**
  Check `next.config.js` — if `cacheComponents: true` isn't set, `'use
  cache'` is silently a no-op. This is the single most common miss.

- **Build/dev fails with an error about a component reading `params` or
  `searchParams` outside `<Suspense>`.**
  That's `cacheComponents` doing its job — it now requires per-request data
  to be isolated. Split the offending JSX into its own `async` inner
  component and wrap the call site in `<Suspense fallback={...}>` (see step
  3).

- **`revalidateTag('one-employee')` doesn't seem to clear anything.**
  The string passed to `revalidateTag` must match the string passed to
  `cacheTag` *exactly* — typos (`'employee'` vs `'one-employee'`) silently
  fail to invalidate anything. Double-check both call sites.

- **Data still looks stale after calling `/api/revalidate`.**
  Remember `revalidateTag(tag)` alone is deprecated — pass a second
  argument, `{ expire: 0 }`, to force immediate invalidation rather than a
  soft/background refresh.

- **Backend data changed but the app still shows old data, and you're sure
  the code is right.**
  The `server` Fastify app (mock DB in `apps/server/src/db/db.json`) only
  reflects file changes on restart in some setups — stop and restart `npm
  run dev -- 06-data-caching` to be sure you're not chasing a caching bug
  that's actually a stale backend process.

- **`'use cache'` added but TypeScript/ESLint complains the function isn't
  `async`.**
  `'use cache'` only works on `async` functions — both `getEmployees` and
  `getEmployee` already are, so if you see this error you likely pasted the
  directive into a non-async helper by mistake.
