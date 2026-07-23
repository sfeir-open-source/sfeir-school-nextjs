# 07 - Server Actions

## What you'll build

You make the Employees section fully writable: a **Create employee** page and
a working **Edit employee** form, both backed by real **Server Actions** that
mutate data on the Fastify backend (no client-side `fetch`, no API route
handler). When you're done, submitting either form persists the change on the
backend, invalidates the right cached data, and redirects the user straight to
the page that shows the result.

Starting point already in the codebase:

- `src/app/(dashboard)/employees/page.tsx` — the employee list (read-only)
- `src/app/(dashboard)/employees/[id]/page.tsx` — employee detail (read-only)
- `src/app/(dashboard)/employees/[id]/edit/page.tsx` — edit page shell with an
  `<EmployeeForm employee={employee} />` that has no `action` wired up yet
- `src/app/providers/employees.ts` — `getEmployees` / `getEmployee`, both
  reading from the backend and tagged for caching (`'all-employees'` /
  `'one-employee'`)

What's missing is the *write* side: the providers that POST/PUT to the
backend, the Server Actions that call them, and the two form pages (plus a
link to reach the create page) that use those actions.

## Concepts you'll practice

- Marking a function as a Server Action with the `'use server'` directive —
  [Server Actions and Mutations](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- Binding a Server Action directly to `<form action={...}>` (no client-side
  `onSubmit`, no manual `fetch`) —
  [Forms with Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#forms)
- Reading submitted values off a `FormData` object —
  [MDN: FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData)
- Calling the backend to persist a mutation (`POST` / `PUT`) with `fetch` —
  [Next.js `fetch`](https://nextjs.org/docs/app/api-reference/functions/fetch)
- Invalidating stale cached data with `revalidateTag` after a successful
  mutation —
  [`revalidateTag`](https://nextjs.org/docs/app/api-reference/functions/revalidateTag)
- Redirecting the user to the right page with `redirect()` once the mutation
  completes —
  [`redirect`](https://nextjs.org/docs/app/api-reference/functions/redirect)

## Steps

### 1. Add the write-side providers

In `src/app/providers/employees.ts`, add two functions next to the existing
`getEmployees`/`getEmployee`:

- `postEmployee(employee: UpsertEmployee)` — `POST` to `${API_BASE_URL}/people`
  with `method: 'POST'`, the same `x-api-key` header as the other calls, and
  `JSON.stringify(employee)` as the body
- `putEmployee(id: string, employee: UpsertEmployee)` — same idea, `PUT` to
  `${API_BASE_URL}/people/${id}`

Reuse `fetchData` from `@sfeir/helpers` like the existing functions do.
`UpsertEmployee` comes from `@sfeir/types`.

```ts
// src/app/providers/employees.ts
import { API_BASE_URL, API_KEY } from '@/app/shared/env';
import { fetchData } from '@sfeir/helpers';
import { Paginated, Person, UpsertEmployee } from '@sfeir/types'; // add UpsertEmployee to the existing import
import { cacheTag } from 'next/cache';

// ...existing getEmployees / getEmployee stay untouched...

export async function postEmployee(employee: UpsertEmployee) {
  // TODO: build the `${API_BASE_URL}/people` url
  // TODO: reuse the same `x-api-key` headers object as getEmployees/getEmployee
  // TODO: return fetchData<Person>(url, { headers, method: 'POST', body: JSON.stringify(employee) })
}

export async function putEmployee(id: string, employee: UpsertEmployee) {
  // TODO: build the `${API_BASE_URL}/people/${id}` url
  // TODO: same headers, method: 'PUT'
}
```

### 2. Write the Server Actions

Create `src/app/(dashboard)/employees/action.ts`. It must start with the
`'use server'` directive on its own line at the top of the file.

- Add a `formDataToUpsertPerson(form: FormData)` helper that reads each field
  off the form with `form.get(...)` and returns an `UpsertEmployee`
- Add `createEmployee(form: FormData)`:
  1. Build the payload with your helper
  2. Call `postEmployee(...)`
  3. Call `revalidateTag('one-employee', { expire: 0 })`
  4. `redirect(`/employees/${id}`)` using the id the backend just returned
- Add `updateEmployee(form: FormData)`:
  1. Read the `id` off the form
  2. Build the payload and call `putEmployee(id, ...)`
  3. Call `revalidateTag('all-employees', { expire: 0 })`
  4. `redirect('/employees')`

Note the two actions revalidate *different* tags on purpose — each one
invalidates the cache for the page it's about to redirect to.

```ts
// src/app/(dashboard)/employees/action.ts
'use server';

import { UpsertEmployee } from '@sfeir/types';
import { postEmployee, putEmployee } from '@/app/providers/employees';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

const formDataToUpsertPerson = (form: FormData): UpsertEmployee => {
  // TODO: read every UpsertEmployee field off `form` with form.get(...)
  // (firstname, lastname, email, phone, birthDate, entryDate, manager, position...)
};

export const createEmployee = async (form: FormData) => {
  // TODO: call postEmployee(formDataToUpsertPerson(form)), keep the returned id
  // TODO: revalidateTag(/* which tag? */, { expire: 0 })
  // TODO: redirect(`/employees/${id}`)
};

export const updateEmployee = async (form: FormData) => {
  // TODO: read `id` off the form
  // TODO: call putEmployee(id, formDataToUpsertPerson(form))
  // TODO: revalidateTag(/* which tag? */, { expire: 0 })
  // TODO: redirect('/employees')
};
```

### 3. Wire the create form

Create `src/app/(dashboard)/employees/new/page.tsx`. It needs a `PageTitle`
and an `<EmployeeForm action={createEmployee} />` (both from `@sfeir/ui/server`
/ your `action.ts`). Look at `[id]/edit/page.tsx` for the surrounding layout
conventions (wrapper div, `Suspense`, etc.) — this page doesn't need a
`Suspense` boundary itself since there's no employee to fetch, just a form to
render.

```tsx
// src/app/(dashboard)/employees/new/page.tsx
import { EmployeeForm, PageTitle } from '@sfeir/ui/server';
import { createEmployee } from '@/app/(dashboard)/employees/action';

const NewEmployeePage = () => {
  return (
    <>
      {/* TODO: <PageTitle backHref="/employees">Employees | Create</PageTitle> */}

      <div className="flex gap-4 bg-white p-4 rounded-lg dark:bg-slate-900">
        {/* TODO: <EmployeeForm className="w-full" action={createEmployee} /> */}
      </div>
    </>
  );
};

export default NewEmployeePage;
```

### 4. Wire the edit form

In `src/app/(dashboard)/employees/[id]/edit/page.tsx`, import `updateEmployee`
from your new `action.ts` and pass it as the `action` prop on the existing
`<EmployeeForm employee={employee} ... />`. The rest of the page (the
`Suspense` wrapper, the `getEmployee` call, the not-found branch) stays as-is.

```tsx
// src/app/(dashboard)/employees/[id]/edit/page.tsx
import { getEmployee } from '@/app/providers/employees';
import { EmployeeForm, PageTitle } from '@sfeir/ui/server';
import { Suspense } from 'react';
import { updateEmployee } from '@/app/(dashboard)/employees/action'; // add this import

const EmployeeEditContent = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const employee = await getEmployee(id);

  if (!employee) return <PageTitle>Single Employee - Not found</PageTitle>;

  return (
    <>
      <PageTitle backHref={`/employees/${id}`}>
        Single Employee - {employee.firstname} {employee.lastname} <span className="font-normal">| Edit</span>
      </PageTitle>

      <div className="flex gap-4 bg-white p-4 rounded-lg dark:bg-slate-900">
        {/* TODO: add `action={updateEmployee}` to this <EmployeeForm> */}
        <EmployeeForm className="w-full" employee={employee} />
      </div>
    </>
  );
};

// ...EmployeeDetail wrapper with <Suspense> stays unchanged...
```

### 5. Make the create form reachable

In `src/app/(dashboard)/employees/page.tsx`, add a `Button` (from
`@sfeir/ui/server`) next to the `<Search />` component that links to
`/employees/new`, using the same `component={Link} href="..."` pattern as the
"View detail" / "Edit" buttons in `actions(employee)` further down the file.

```tsx
// src/app/(dashboard)/employees/page.tsx
import { Button, PageTitle, PersonCard } from '@sfeir/ui/server';
import Link from 'next/link';
// ...existing imports stay...

const Employees = ({ searchParams }: { searchParams: Promise<{ search: string }> }) => (
  <section className="flex flex-col">
    <PageTitle>Employees</PageTitle>
    <Suspense>
      <Search />
      {/* TODO: <Button component={Link} href="/employees/new">New Employee</Button> */}
    </Suspense>
    <Suspense fallback={<div>Loading...</div>}>
      <EmployeeList searchParams={searchParams} />
    </Suspense>
  </section>
);
```

### 6. Verify against the solution

Run `07-server-action-solution` alongside your app and compare
`action.ts`, `providers/employees.ts`, and the two form pages. Then try the
flow end to end: create an employee and watch the redirect land on that
employee's fresh detail page, then edit it and watch the redirect land back
on a fresh employee list.

## Running the exercise

```bash
npm run dev -- 07-server-action
```

The shared `server` Fastify backend (port 9000) starts automatically as part
of this app's `dev` target — no extra terminal needed.

## Troubleshooting

- **"Server Actions must be async functions" / build error on `action.ts`**
  — make sure `'use server'` is the very first line in the file (before any
  imports), and that every exported function in that file is `async`.
- **Form submits but nothing happens / a plain page reload with no data
  change** — you're probably still using `onSubmit` or `fetch` from a Client
  Component instead of passing the action straight to `<form action={fn}>`.
  Let the form element call the Server Action directly.
- **New/updated employee doesn't show up until a hard refresh** — you forgot
  `revalidateTag`, called it with the wrong tag name, or called it *before*
  awaiting the mutation. Double-check the tag string matches exactly what
  `getEmployees`/`getEmployee` declare (`'all-employees'` / `'one-employee'`).
- **Redirect throws an unexpected error in a `try/catch`** — `redirect()`
  works by throwing internally; Next.js expects that. Don't wrap it in a
  `try/catch` that swallows the throw, or call it inside one that treats it
  as an error.
- **`form.get('field')` returns `null`** — the `name` attribute on the input
  in `EmployeeForm` must exactly match the key you read with `form.get(...)`
  in `formDataToUpsertPerson`.
