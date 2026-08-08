<!-- .slide: class="with-code" -->

# Two ways to fail, two different landings

`createEmployee` today assumes `postEmployee` always succeeds. Real forms
don't get that luxury — and Next.js treats a Server Function's failures in
two genuinely different ways, depending on how they leave the function:

```tsx
export const createEmployee = async (form: FormData) => {
  const employee = formDataToUpsertPerson(form);
  if (!employee.email) {
    return { error: 'Email is required' }; // an expected error
  }
  const { id } = await postEmployee(employee); // an unhandled rejection here is an uncaught exception
  revalidateTag('one-employee', { expire: 0 });
  redirect(`/employees/${id}`);
};
```

- **Return a plain value** (`{ error: '...' }`) for anything the visitor can
  fix by resubmitting — a blank field, a duplicate email. This is exactly
  the `state` module 09's `useActionState` reads — no `try`/`catch` on
  either side.
- **Let it throw** for anything that isn't the visitor's fault to fix — a
  timed-out request to `postEmployee`, a bug. Next.js treats that as an
  uncaught exception and routes it to the nearest `error.tsx` instead —
  module 10's topic.
- The [Next.js docs](https://nextjs.org/docs/app/getting-started/error-handling#server-functions)
  are explicit about which is which: *"For \[expected] errors, avoid using
  try/catch blocks and throw errors. Instead, model expected errors as
  return values."*

Notes:

Pure forward pointer — don't teach useActionState or error.tsx today, one paragraph each is enough so the branch (return vs throw) has a name and a destination before modules 09-11 fill those in. Ground it concretely: postEmployee hitting the real Fastify server on :9000 can genuinely fail if the server isn't running, which is a believable "let it throw" case, unlike a contrived example.
