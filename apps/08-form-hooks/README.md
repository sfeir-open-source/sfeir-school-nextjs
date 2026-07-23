# 08 · Form Hooks

This workshop picks up right where `07-server-action` left off: `createEmployee` and
`updateEmployee` are wired to a real `<form action={...}>` and the backend saves data.
But the form has no memory of what its own submission is doing — double-click submit
and it fires twice; type an invalid email and the request just fails silently.

Your job is to give the form that memory using two React 19 hooks.

## What you'll build

1. `Promise<ActionState | void>`-returning Server Actions that catch a `400` validation
   error from the backend and return `{ message, errors }` instead of letting it throw.
2. Form pages that use the already-hook-wired `EmployeeForm` / `SubmitFormButton` from
   `@sfeir/ui-solution` instead of the plain versions in `@sfeir/ui`.

When you're done, submitting the create/edit employee form with bad data (e.g. a
one-character first name) re-renders the form with a field-level error message instead
of crashing, and double-clicking submit on valid data can't fire the action twice
because the button disables itself while pending.

## Concepts you'll practice

- **[`useActionState`](https://react.dev/reference/react/useActionState)** (from `react`) — wraps a Server Action so its result
  (success, or a structured error) becomes state the form can read and re-render with.
- **[`useFormStatus`](https://react.dev/reference/react-dom/hooks/useFormStatus)** (from `react-dom`) — reports whether the nearest
  parent `<form>` is currently submitting, so a submit button can disable/show a
  pending state without any prop drilling.
- **[Next.js — Forms with Server Actions](https://nextjs.org/docs/app/guides/forms)** — how a `<form action={...}>` wires a native
  form submission to a `'use server'` function.

Good news: `EmployeeForm` and `SubmitFormButton` in `@sfeir/ui-solution` **already**
implement both hooks for you. Your work is entirely on the Server Action side — making
`createEmployee`/`updateEmployee` return structured state instead of throwing — plus
pointing the two form pages at the hook-wired components.

## Steps

### 1. Make the Server Actions return structured errors

File: `src/app/(dashboard)/employees/action.ts`

- Import `ApiError` from `@sfeir/helpers`.
- Add a type for the action's return value:
  ```ts
  type ActionState = {
    message?: string;
    errors?: Record<string, string>;
  };
  ```
- In `createEmployee`, wrap the `postEmployee(...)` call in a `try`/`catch`. If
  `error instanceof ApiError && error.status === 400`, `return { message: error.message,
  errors: error.errors }`. Anything else should keep `throw`ing — a `400` is "the user's
  fault, tell them"; a `500` or network failure is not something this hook should swallow.
  Starting point (fill in the `try` body and the returned object):
  ```ts
  import { ApiError } from '@sfeir/helpers';

  export const createEmployee = async (form: FormData): Promise<ActionState | void> => {
    let id: string;
    try {
      // TODO: call postEmployee(formDataToUpsertPerson(form)) and destructure `id`
    } catch (error) {
      if (error instanceof ApiError && error.status === 400) {
        // TODO: return { message: ..., errors: ... } built from `error`
      }
      throw error;
    }
    revalidateTag('one-employee', { expire: 0 });
    redirect(`/employees/${id}`);
  };
  ```
- Do the same around `putEmployee(...)` in `updateEmployee`:
  ```ts
  export const updateEmployee = async (form: FormData): Promise<ActionState | void> => {
    const id = form.get('id') as string;
    try {
      // TODO: call putEmployee(id, formDataToUpsertPerson(form))
    } catch (error) {
      if (error instanceof ApiError && error.status === 400) {
        // TODO: return { message: ..., errors: ... } built from `error`
      }
      throw error;
    }
    revalidateTag('all-employees', { expire: 0 });
    redirect(`/employees`);
  };
  ```
- Update both functions' return type to `Promise<ActionState | void>` (they still
  `redirect()` on success, which never returns) — already shown above.

### 2. Switch the form pages to the hook-wired components

Files:
- `src/app/(dashboard)/employees/new/page.tsx`
- `src/app/(dashboard)/employees/[id]/edit/page.tsx`

Change the import of `EmployeeForm` and `PageTitle` from `@sfeir/ui/server` to
`@sfeir/ui-solution/server`. That library's `EmployeeForm` already calls
`useActionState` around the `action` prop, and its submit button
(`SubmitFormButton`) already reads `useFormStatus` to show a pending state — you
don't need to touch either component, just start importing the solved ones.

In both files:

```ts
// before
import { EmployeeForm, PageTitle } from '@sfeir/ui/server';

// after
import { EmployeeForm, PageTitle } from '@sfeir/ui-solution/server';
```

Nothing else on the page changes — same props, same JSX.

### 3. Try to break it, on purpose

- Submit the create form with a one-character first name (or any field the backend
  rejects) — a red border and message should appear under the *right* field, and every
  other field should keep what you typed.
- Double-click submit on a valid form — the button should disable/show a pending state
  instead of firing the action twice.

### 4. Verify against the solution

Run `08-form-hooks-solution` alongside your app and compare `action.ts` and the two
form pages against yours.

## Running the exercise

```bash
npm run dev -- 08-form-hooks
```

The shared `server` Fastify backend (port 9000) starts automatically as part of this
app's `dev` target — no second terminal needed.

## Troubleshooting

- **`useFormStatus` always returns `pending: false`** — it only reports on the closest
  `<form>` **ancestor**. Calling it in the same component that renders the `<form>`
  doesn't count; it has to live in a child rendered *inside* the form (which is exactly
  why `SubmitFormButton` is its own component). If you're debugging this inside
  `@sfeir/ui-solution`, check the hook sits below the `<form>`, not beside it.
- **Errors show up but on the wrong field, or not at all** — `state.errors` is keyed by
  field name (`{ email: "...", firstname: "..." }`), matching the Fastify/Valibot
  validation response. Double-check your `catch` block returns `error.errors` unchanged
  rather than re-wrapping or renaming it.
- **The action always throws instead of returning state** — make sure the `catch` only
  swallows the `400` case (`error instanceof ApiError && error.status === 400`). If you
  `return` for every error, real failures (500s, network drops) will silently look like
  validation errors instead of surfacing as actual crashes.
- **TypeScript complains about the action's return type** — `createEmployee` and
  `updateEmployee` need to return `Promise<ActionState | void>`, since the success path
  calls `redirect()` (which never returns) and the failure path returns `ActionState`.
- **Nothing changes after editing `action.ts`** — confirm the form pages were switched
  to `@sfeir/ui-solution/server` (step 2). The plain `@sfeir/ui` version of `EmployeeForm`
  doesn't call `useActionState` at all, so your new return value is never read.
