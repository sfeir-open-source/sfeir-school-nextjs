<!-- .slide: class="with-code" -->

# Hand the function straight to the form

No `onSubmit`, no `preventDefault`, no manual `fetch` — a Server Function can
go directly into a `<form>`'s `action` prop:

```tsx
// app/(dashboard)/employees/new/page.tsx
import { EmployeeForm, PageTitle } from '@sfeir/ui-solution/server';
import { createEmployee } from '@/app/(dashboard)/employees/action';

const NewEmployeeForm = () => (
  <>
    <PageTitle backHref="/employees">Employees | Create</PageTitle>
    <EmployeeForm action={createEmployee} />
  </>
);
```

- Before: the starter's `EmployeeForm` renders `<form action={action}>` with
  no `action` passed in — submit does nothing. After: pass `createEmployee`
  as that prop and the form is fully wired, in one line.
- Under the hood this is still a real `<form>`. React extends the HTML
  `action` attribute to accept a function — press submit, and React calls
  `createEmployee(formData)` for you.
- `EmployeeForm` itself is a `'use client'` component — you'll notice its
  real source wraps this call in a hook called `useActionState`, to track a
  pending/error state. That's module 09's whole topic; mentally simplify it
  to `<form action={createEmployee}>` for today, the wiring is identical.

Notes:

If someone asks "does this need JavaScript to work" — yes for this exact interactive form (EmployeeForm is a Client Component), but it's worth mentioning in passing that Server Functions passed to a form in a Server Component submit even before JS has loaded, thanks to progressive enhancement. Don't get pulled into a long detour, one sentence is enough.
