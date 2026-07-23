# 05 - Data Fetching

## What you'll build

In the previous modules every page read from a local JSON fixture in
`src/data/`. This time you'll fetch real data from the shared Fastify
backend (`apps/server`) — no `useEffect`, no loading state, just `async`
Server Components that `await` their data. By the end, `/employees` and
`/expenses` (list + detail) render live API data, and the "Load expenses"
button on an employee's page calls a Route Handler you write yourself.

## Concepts you'll practice

- **Fetching data straight inside an async Server Component** — `await` in
  the component body, no client-side state, no `useEffect`.
  Docs: [Fetching Data](https://nextjs.org/docs/app/getting-started/fetching-data)
- **Server and Client Components** — knowing which side of the boundary a
  component runs on, and why only the server side may see `API_KEY`.
  Docs: [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- **The provider pattern** — small server-only wrapper functions in
  `app/providers/` that own the `fetch` call, the URL, and the auth header,
  so pages never build URLs or send headers themselves.
- **Route Handlers** (`route.ts`) — so a Client Component can reach
  server-only data without ever seeing the API key.
  Docs: [Route Handlers](https://nextjs.org/docs/app/api-reference/file-conventions/route)
- **Reading configuration from environment variables** via `src/shared/env.ts`
  and `.env.local`.
  Docs: [Environment Variables](https://nextjs.org/docs/app/guides/environment-variables)

## What you need to build

Diffing this app against `05-data-fetching-solution` shows the gap:

1. `.env.local` currently points `API_BASE_URL` at a placeholder
   (`http://localhost:3001`) and has no `API_KEY`. `src/shared/env.ts`
   already reads both — it re-exports `process.env.API_BASE_URL` and
   `process.env.API_KEY` so every provider agrees on where config comes
   from.
2. There is no `app/providers/` folder yet. You need to create it, with one
   file per resource, following the pattern shown in the slides
   (`app/providers/employees.ts`, `app/providers/expensees.ts`).
3. The pages under `(dashboard)/employees/` and `(dashboard)/expenses/`
   still import their data from `@/data/employee.json` /
   `@/data/expense.json`. They need to `await` your providers instead.
4. There is no `app/api/expenses/route.ts` yet — the "Load expenses" button
   on the employee detail page (a Client Component, `EmployeeExpenses` from
   `@sfeir/ui`) already calls `fetch('/api/expenses?employeeId=...')`, but
   nothing answers that request yet.

## Steps

### 1. Point the app at the real API

Edit `.env.local`:

```
API_BASE_URL=http://localhost:9000/api
API_KEY=''
```

`src/shared/env.ts` doesn't need to change — it already exports both
values:

```ts
// src/shared/env.ts (already there, don't edit)
export const API_BASE_URL = process.env.API_BASE_URL;
export const API_KEY = process.env.API_KEY;
```

Because `env.ts` is only ever imported by server-only code (providers,
route handlers), `API_KEY` never reaches the browser bundle.

### 2. Write the providers

Create `src/app/providers/employees.ts` exporting:

- `getEmployees(search?: string)`
- `getEmployee(id: string)`

And `src/app/providers/expensees.ts` exporting:

- `getExpenses()`
- `getExpenseById(id: string)`
- `getExpensesByEmployee(employeeId: string)`

Each function should build a URL from `API_BASE_URL`, send an
`x-api-key: API_KEY` header, and call `fetchData` from `@sfeir/helpers` to
do the actual request and JSON parsing. Type the response with the shared
types from `@sfeir/types` (`Person`, `Expense`, `Paginated<T>`). One
function, one job — build the URL, call the API, return typed data.

`src/app/providers/employees.ts`:

```ts
import { API_BASE_URL, API_KEY } from '@/shared/env';
import { fetchData } from '@sfeir/helpers';
import { Paginated, Person } from '@sfeir/types';

export async function getEmployees(search?: string) {
  const headers = { 'x-api-key': API_KEY ?? '' };
  // TODO: build the `${API_BASE_URL}/people` URL, appending
  // `?search=...` only when `search` is truthy
  const url = '';
  return await fetchData<Paginated<Person>>(url, { headers });
}

export async function getEmployee(id: string) {
  const headers = { 'x-api-key': API_KEY ?? '' };
  // TODO: build the `${API_BASE_URL}/people/${id}` URL
  const url = '';
  return await fetchData<Person>(url, { headers });
}
```

`src/app/providers/expensees.ts` (yes, `expensees` — matches the
`-solution` app, don't rename it):

```ts
import { API_BASE_URL, API_KEY } from '@/shared/env';
import { fetchData } from '@sfeir/helpers';
import { Expense, Paginated } from '@sfeir/types';

export async function getExpenses() {
  const headers = { 'x-api-key': API_KEY ?? '' };
  // TODO: build the `${API_BASE_URL}/expenses` URL
  const url = '';
  return await fetchData<Paginated<Expense>>(url, { headers });
}

export async function getExpenseById(id: string) {
  const headers = { 'x-api-key': API_KEY ?? '' };
  // TODO: build the `${API_BASE_URL}/expenses/${id}` URL
  const url = '';
  return await fetchData<Expense>(url, { headers });
}

export async function getExpensesByEmployee(employeeId: string) {
  const headers = { 'x-api-key': API_KEY ?? '' };
  // TODO: build the `${API_BASE_URL}/expenses` URL with an
  // `?employeeId=...` query param
  const url = '';
  return await fetchData<Paginated<Expense>>(url, { headers });
}
```

### 3. Swap the JSON fixtures for real fetches

In each of these pages, remove the `@/data/*.json` import and `await` the
matching provider instead. The JSX barely changes — only where the data
comes from:

- `src/app/(dashboard)/employees/page.tsx` → `getEmployees(search)`
- `src/app/(dashboard)/employees/[id]/page.tsx` → `getEmployee(id)`
- `src/app/(dashboard)/expenses/page.tsx` → `getExpenses()`
- `src/app/(dashboard)/expenses/[id]/page.tsx` → `getExpenseById(id)`

Since the component is already `async`, this is just replacing a
synchronous array read with an `await` call.

`src/app/(dashboard)/employees/page.tsx` — before/after the import and the
data line:

```tsx
// before
import employeesData from '@/data/employee.json' with { type: 'json' };
// ...
const filteredEmployees = employeesData.filter(
  employee =>
    employee.firstname.toLowerCase().includes(search.toLowerCase()) ||
    employee.lastname.toLowerCase().includes(search.toLowerCase()),
);

// after
import { getEmployees } from '@/app/providers/employees';
// ...
// TODO: await getEmployees(search) instead of filtering a local array —
// does the API already support a `search` query param, or do you still
// filter client-side after fetching?
const filteredEmployees = /* TODO */ [];
```

`src/app/(dashboard)/employees/[id]/page.tsx`:

```tsx
// before
import employeesData from '@/data/employee.json' with { type: 'json' };
const employee = employeesData.find(employee => employee.id === params.id);

// after
import { getEmployee } from '@/app/providers/employees';
// TODO: const employee = await getEmployee(params.id);
// what happens to the `if (!employee)` guard if the fetch throws instead
// of returning undefined?
```

`src/app/(dashboard)/expenses/page.tsx` and
`src/app/(dashboard)/expenses/[id]/page.tsx` follow the same shape, swapping
`expensesData` for `await getExpenses()` / `await getExpenseById(id)`
respectively:

```tsx
// src/app/(dashboard)/expenses/page.tsx — after
import { getExpenses } from '@/app/providers/expensees';

const Expenses = async () => {
  // TODO: const { data: expenses } = await getExpenses();
  return (
    <div>
      {/* ...same JSX as before, mapping over `expenses` instead of expensesData */}
    </div>
  );
};
```

### 4. Give the "Load expenses" button something to call

`EmployeeExpenses` is a `'use client'` component — it cannot import a
provider directly (server-only code) and must not send `API_KEY` to the
browser. It calls `/api/expenses?employeeId=...`, a URL inside this Next.js
app, not the Fastify backend directly.

Create `src/app/api/expenses/route.ts` with an `export const GET` that:

- reads `request.nextUrl.searchParams.get('employeeId')`
- calls `getExpensesByEmployee(employeeId)`
- returns the result with `Response.json(...)`

This file lives under `app/` next to your `page.tsx` files — same
file-based routing convention, a different special filename.

`src/app/api/expenses/route.ts`:

```ts
import { NextRequest } from 'next/server';

import { getExpensesByEmployee } from '@/app/providers/expensees';

export const GET = async (request: NextRequest) => {
  // TODO: read the `employeeId` search param off `request.nextUrl`,
  // call getExpensesByEmployee with it, and return Response.json(...)
};
```

### 5. Verify against the solution

Run `05-data-fetching-solution` alongside your app and compare your
`app/providers/` and `app/api/expenses/route.ts` against its versions:

```bash
npm run dev -- 05-data-fetching-solution
```

- Click through `/employees`, an employee detail page, `/expenses`, and an
  expense detail page — every list/detail should show live data from the
  backend, not the JSON fixtures.
- On an employee's detail page, click "Load expenses" and confirm the
  request in the Network tab hits `/api/expenses?employeeId=...` and
  returns a `200` with a JSON array/paginated payload.
- Diff your `src/app/providers/employees.ts`, `src/app/providers/expensees.ts`,
  and `src/app/api/expenses/route.ts` against the equivalent files in
  `05-data-fetching-solution/src/app/providers/` and
  `05-data-fetching-solution/src/app/api/expenses/route.ts`.

## Running the exercise

```bash
npm run dev -- 05-data-fetching
```

This starter app's `dev` target does **not** automatically start the
backend (check `package.json` → `nx.targets.dev` — only the `-solution`
app declares `server:serve` as a dependency). Start the Fastify server
yourself in another terminal:

```bash
npx nx serve server
```

It listens on port `9000`, which is why `API_BASE_URL` must end in
`http://localhost:9000/api`.

## Troubleshooting

- **"Cannot find module '@/app/providers/employees'"** — you haven't
  created the file yet, or it's not exported as `app/providers/employees.ts`
  (case-sensitive path, matches the `@/*` alias to `src/*`).
- **`fetch failed` / `ECONNREFUSED` in the terminal** — the Fastify backend
  isn't running. Start it with `npx nx serve server` in a separate terminal
  and keep it running while you develop.
- **Page renders with no data / empty arrays, no error thrown** — check
  `.env.local`: `API_BASE_URL` still pointing at the old placeholder
  (`:3001` instead of `:9000/api`), or a typo in the path. Restart `npx nx
  dev 05-data-fetching` after editing `.env.local` — Next.js only reads env
  files on startup.
- **401 / unauthorized-looking failures from the API** — the provider isn't
  sending the `x-api-key` header, or `API_KEY` isn't set in `.env.local`
  (an empty string `''` is fine, just make sure the variable exists).
- **"Load expenses" button does nothing / 404 in the Network tab** — you
  haven't created `app/api/expenses/route.ts` yet, or it doesn't export a
  `GET` function. Note this route is only reachable once the page it's on
  requests `/api/expenses` — check the `employeeId` query param arrives
  correctly with `request.nextUrl.searchParams`.
- **Forgot `async` on a page component** — `await` outside an `async`
  function is a build/type error. Every page fetching data in this module
  must be declared `async ({ ... }) => { ... }`.
