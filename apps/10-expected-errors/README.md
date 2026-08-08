# 10 — Expected Errors

## What you'll build

Module 09 (`09-error-boundaries`) was about **unexpected** failures: a real
`500`, a backend that's down, a bug nobody planned for. `error.tsx` exists to
contain that damage.

A missing employee id is a different kind of problem: nothing crashed, the
server answered fine, it just didn't find what you asked for. Right now this
app treats that as a crash anyway — `getEmployee`/`getExpenseById` never
return `undefined` (they `throw` an `ApiError` on a `404`, via the shared
`fetchData` helper), so the existing `if (!employee) return …` checks are
dead code. The real `ApiError` goes uncaught and lands on `app/error.tsx`,
showing the same generic "service unavailable" screen a real outage would.

Your job: catch that specific `404` case and tell Next.js it was
**expected**, using `notFound()` and a per-segment `not-found.tsx`, instead
of letting it fall through to `error.tsx`.

## Concepts you'll practice

- The difference between an expected outcome (model it, handle it precisely)
  and a genuinely unexpected exception (let it throw, `error.tsx` catches
  it) — see [Error Handling — Next.js docs](https://nextjs.org/docs/app/building-your-application/routing/error-handling)
- Calling `notFound()` from `next/navigation` to hand a specific case off to
  Next.js's not-found rendering — see the
  [`notFound()` API reference](https://nextjs.org/docs/app/api-reference/functions/not-found)
- The file convention: a `not-found.tsx` next to a `page.tsx` renders in
  place of that segment the moment `notFound()` fires inside it — see the
  [`not-found.js` file convention](https://nextjs.org/docs/app/api-reference/file-conventions/not-found)
- A root `app/not-found.tsx` as the catch-all for both explicit `notFound()`
  calls and URLs that don't match any route at all — same
  [`not-found.js` file convention](https://nextjs.org/docs/app/api-reference/file-conventions/not-found)
  doc, "Root `not-found.js` file" section
- Returning expected errors as data instead of throwing, in the broader
  Next.js mutation context — see
  [Server Actions and Mutations — handling expected errors](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#handling-expected-errors)

## Steps

### 1. Fix `app/(dashboard)/employees/[id]/page.tsx`

- Import `notFound` from `next/navigation` and `ApiError` from
  `@sfeir/helpers`.
- Wrap the `getEmployee(id)` call in a `try`/`catch`.
- Delete the `if (!employee) return …` line — it can never run.
- In the `catch`, check `error instanceof ApiError && error.status === 404`.
  If true, call `notFound()`. Otherwise, re-`throw` the error — anything
  that isn't a 404 is still a real crash and stays `error.tsx`'s job.
- Move the success-path JSX (the `<PersonCard>` render) inside the `try`.

```tsx
import { getEmployee } from '@/app/providers/employees';
import { notFound } from 'next/navigation';
import { ApiError } from '@sfeir/helpers';
// ...other imports stay as-is

const EmployeeDetailContent = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  try {
    const employee = await getEmployee(id);
    // TODO: return the existing success-path JSX (the <PersonCard> render)
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    throw error;
  }
};
```

### 2. Apply the same fix to `app/(dashboard)/employees/[id]/edit/page.tsx`

Same shape: `try`/`catch` around `getEmployee(id)`, `notFound()` on a 404,
re-throw everything else, drop the dead `if (!employee)` check.

```tsx
import { getEmployee } from '@/app/providers/employees';
import { notFound } from 'next/navigation';
import { ApiError } from '@sfeir/helpers';
// ...other imports stay as-is

const EmployeeEditContent = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  try {
    const employee = await getEmployee(id);
    // TODO: return the existing success-path JSX (the <PageTitle> + <EmployeeForm> render)
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    throw error;
  }
};
```

### 3. Apply the same fix to `app/(dashboard)/expenses/[id]/page.tsx`

Same pattern again, this time around `getExpenseById(id)` from
`@/app/providers/expensees`.

```tsx
import { getExpenseById } from '@/app/providers/expensees';
import { notFound } from 'next/navigation';
import { ApiError } from '@sfeir/helpers';
// ...other imports stay as-is

const SingleExpenseContent = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  try {
    const expense = await getExpenseById(id);
    // TODO: return the existing success-path JSX (the <ExpenseDetails> render)
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    throw error;
  }
};
```

### 4. Add a root `app/not-found.tsx`

- Import `PageError` from `@sfeir/ui/server`.
- Render `<PageError code={404}>` with a short, generic "page not found"
  message.
- This one file covers two situations: any `notFound()` call that isn't
  caught by a more specific segment, and URLs that don't match any route in
  `app/` at all.

```tsx
import { PageError } from '@sfeir/ui/server';

export default async function NotFound() {
  // TODO: return <PageError code={404}>...a short, generic message...</PageError>
}
```

### 5. Add a scoped `not-found.tsx` for each lookup

Create three files, each `'use client'`, each reading the failed id with
`useParams()` from `next/navigation` and rendering it through the `Alert`
component from `@sfeir/ui/server`. The message text and the resource named
in it should match what actually failed to load — don't reuse one generic
message for every segment.

**`app/(dashboard)/employees/[id]/not-found.tsx`** — mention the missing
employee id:

```tsx
'use client';

import { useParams } from 'next/navigation';
import { Alert } from '@sfeir/ui/server';

const EmployeeNotFound = () => {
  const params = useParams<{ id: string }>();

  // TODO: return <Alert>No employee found with id "{params.id}"</Alert>
};

export default EmployeeNotFound;
```

**`app/(dashboard)/employees/[id]/edit/not-found.tsx`** — same idea, same
employee-focused message, just living next to the edit segment's `page.tsx`:

```tsx
'use client';

import { useParams } from 'next/navigation';
import { Alert } from '@sfeir/ui/server';

const EmployeeEditNotFound = () => {
  const params = useParams<{ id: string }>();

  // TODO: return <Alert>No employee found with id "{params.id}" to edit</Alert>
};

export default EmployeeEditNotFound;
```

**`app/(dashboard)/expenses/[id]/not-found.tsx`** — same pattern, but this
one is about an expense, not an employee: different resource name, different
data shape (an expense id, not an employee id), so say so explicitly:

```tsx
'use client';

import { useParams } from 'next/navigation';
import { Alert } from '@sfeir/ui/server';

const ExpenseNotFound = () => {
  const params = useParams<{ id: string }>();

  // TODO: return <Alert>No expense found with id "{params.id}"</Alert>
};

export default ExpenseNotFound;
```

### 6. Break it on purpose, twice

- Visit `/employees/does-not-exist` — you should see your specific "employee
  does not exist" alert, with the sidebar and page shell still intact,
  **not** `app/error.tsx`'s generic "service unavailable" screen.
- Visit a URL that matches nothing at all, e.g. `/this-page-does-not-exist`
  — your root `app/not-found.tsx` should render instead.

### 7. Verify against the solution

Run `10-expected-errors-solution` alongside your app and diff the three
`page.tsx` lookups and the four `not-found.tsx` files. Don't copy it in —
use it to check your approach once yours works.

## Running the exercise

```
npm run dev -- 10-expected-errors
```

This app's `dev` target depends on `server:serve`, so the backend starts
automatically — you don't need a second terminal for it. (Unlike module 09,
a stopped backend isn't what you're debugging here; a missing employee id
is.)

## Troubleshooting

- **The generic `error.tsx` screen still shows up instead of your alert.**
  You're probably still `throw`ing the `ApiError` (or an `if (!x)` check)
  instead of calling `notFound()` on the 404 case. Only a genuinely
  unexpected error should reach `error.tsx` — a `404` needs to be caught and
  handled explicitly.
- **`notFound()` doesn't seem to do anything / the whole page still
  crashes.** `notFound()` works by throwing a special error internally
  (`NEXT_HTTP_ERROR_FALLBACK;404`) that Next.js needs to see uninterrupted.
  If you wrapped the `notFound()` call itself in another `try`/`catch`, that
  outer block will swallow it before Next.js can react. Only catch around
  the data fetch, never around `notFound()`.
- **`not-found.tsx` never renders, even though you added the file.** Check
  it's a sibling of the right `page.tsx` (same folder), and that `notFound()`
  is actually being called from a Server Component, Server Function, or
  Route Handler — it has to run somewhere Next.js is watching for it.
- **`useParams()` returns `undefined` for the id in your `not-found.tsx`.**
  These files must be Client Components — make sure `'use client'` is the
  first line. Forgetting it is an easy way to get a confusing runtime error
  instead of the id you expected.
- **A real 500 (e.g. from a stopped backend) now renders your 404 alert
  instead of the generic error screen.** Check your `catch` block re-throws
  anything that isn't `error instanceof ApiError && error.status === 404`.
  If you call `notFound()` unconditionally, every failure — including real
  outages — gets mislabeled as "not found".
