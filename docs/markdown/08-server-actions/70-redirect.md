<!-- .slide: class="with-code" -->

# `redirect`: leave the form behind after success

Once the employee is saved, staying on `/employees/new` makes no sense —
`redirect`, from `next/navigation`, sends the visitor somewhere else:

```tsx
import { redirect } from 'next/navigation';

export const createEmployee = async (form: FormData) => {
  const { id } = await postEmployee(formDataToUpsertPerson(form));
  revalidateTag('one-employee', { expire: 0 });
  redirect(`/employees/${id}`); // ← straight to the employee that was just created
};
```

- Order matters: `revalidateTag` runs first, `redirect` second. `redirect`
  works by throwing a special error that Next.js catches — any line written
  after it never executes, so it has to be the last thing the function does.
- Same `redirect` you'd use in a Server Component to bail out of a page —
  it isn't a Server Action–specific API, just one that's especially useful
  right after a mutation succeeds.
- The visitor lands on `/employees/${id}` and sees the employee they just
  created — which only shows fresh data because the line right above it
  already threw away the stale `one-employee` photocopy.

Notes:

Worth a quick "why not redirect first" check with the room — because redirect throws, anything after it is dead code, so revalidate-then-redirect is the only order that works. Small detail, but a common bug if reversed.
