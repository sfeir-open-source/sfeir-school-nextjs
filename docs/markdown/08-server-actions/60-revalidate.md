<!-- .slide: class="with-code" -->

# This is where the stale photocopy gets thrown away

Module 07 ended with a forward pointer: a mutation would eventually be
"something running inside the app" calling `revalidateTag`, instead of an
external webhook hitting `/api/revalidate`. This is that moment:

<small>

```tsx
// app/(dashboard)/employees/action.ts
export const createEmployee = async (form: FormData) => {
  const { id } = await postEmployee(formDataToUpsertPerson(form));
  revalidateTag('one-employee', { expire: 0 });
  redirect(`/employees/${id}`);
};

export const updateEmployee = async (form: FormData) => {
  const id = form.get('id') as string;
  await putEmployee(id, formDataToUpsertPerson(form));
  revalidateTag('all-employees', { expire: 0 });
  redirect(`/employees`);
};
```

</small>

- Same `revalidateTag(tag, { expire: 0 })` from module 07's Route Handler,
  called from a completely different place: right after `postEmployee` /
  `putEmployee` confirm the write actually happened.
- Notice which tag each one clears: `createEmployee` redirects to
  `/employees/${id}`, which reads `getEmployee` — tagged `one-employee` — so
  that's the tag it revalidates. `updateEmployee` redirects to `/employees`,
  which reads `getEmployees` — tagged `all-employees` — so that's the one
  *it* clears.
- The rule from module 07 hasn't changed at all: revalidating doesn't edit
  anything, it just empties the shelf for that tag, so the next read does
  the work again and refills it with the new data.

Notes:

This is the payoff slide — let it land. Ask the room to predict, before revealing the code, which tag each function should clear based only on where it redirects to. That's the exact reasoning worth walking through out loud.
