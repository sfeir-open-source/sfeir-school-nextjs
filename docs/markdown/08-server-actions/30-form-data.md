<!-- .slide: class="with-code" -->

# What the function actually receives: `FormData`

When a `<form>` calls a Server Function, it doesn't send JSON — it sends the
same [`FormData`](https://developer.mozilla.org/docs/Web/API/FormData) the
browser would build for a plain HTML form submit. Read it with `.get(...)`,
one field at a time:

<small>

```tsx
// app/(dashboard)/employees/action.ts
const formDataToUpsertPerson = (form: FormData): UpsertEmployee => ({
  firstname: form.get('firstname') as string,
  lastname: form.get('lastname') as string,
  email: form.get('email') as string,
  phone: form.get('phone') as string,
  birthDate: form.get('birthDate') as string,
  entryDate: form.get('entryDate') as string,
  isManager: false,
  manager: form.get('manager') as string,
  position: form.get('position') as string,
});

export const createEmployee = async (form: FormData) => {
  const { id } = await postEmployee(formDataToUpsertPerson(form));
  // ...
};
```

</small>

- `form.get('firstname')` works because the `<input>` in `EmployeeForm` has
  `name="firstname"` — same `name` attribute plain HTML forms have always
  used, nothing Next.js–specific about it.
- `.get()` always returns `FormDataEntryValue | null`, so the real code casts
  it — this is native browser API behaviour, not something to fight.
- `postEmployee` is just another server-only provider, the same shape as
  `getEmployees` from module 06 — except this one sends a `POST` with a
  body instead of reading one back.

Notes:

If someone asks about useActionState-style field-level errors on this shape — that's a fair question, and it's exactly what module 09 is for. Today the goal is just: FormData in, a plain object out, one call to a provider.
