<!-- .slide: class="with-code" -->

# Passing more than the form: `.bind()`

`updateEmployee` reads `id` back out of a hidden form field. JavaScript's
[`Function.prototype.bind`](https://nextjs.org/docs/app/guides/forms#passing-additional-arguments)
is the alternative — pre-fill an argument before the form ever calls it:

<small>

```tsx
// app/(dashboard)/employees/[id]/edit/page.tsx — illustrative alternative to
// the hidden `id` field this app's real updateEmployee reads instead
import { updateEmployee } from '@/app/(dashboard)/employees/action';

const EditEmployee = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const updateThisEmployee = updateEmployee.bind(null, id);
  return <EmployeeForm action={updateThisEmployee} />;
};
```

```tsx
// app/(dashboard)/employees/action.ts
export const updateEmployee = async (id: string, form: FormData) => {
  await putEmployee(id, formDataToUpsertPerson(form));
  // ...
};
```

</small>

- `.bind(null, id)` returns a new function with `id` already filled in as
  the first argument. The `<form>` only ever has to send the fields it
  actually renders — the id was never part of the HTML at all.
- The Server Function's signature shifts to match: the bound argument first,
  `FormData` last. `updateEmployee(id, form)` instead of `form.get('id')`.
- `bind` works in both Server and Client Components, and — like everything
  else this module covered — still supports progressive enhancement.

Notes:

Frame as "another tool," not a required change — this app's real hidden-field approach is simpler for a single id and is exactly as valid. bind earns its keep when the value shouldn't be rendered into the HTML at all (a value the form itself has no business exposing), which a hidden input always does.
