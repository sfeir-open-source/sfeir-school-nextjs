<!-- .slide: class="with-code" -->

# The Server Action returns state instead of exploding

For `state` to ever hold something useful, `createEmployee` has to catch a
failed write and *return* a description of what went wrong, instead of
letting it throw all the way up:

<small>

```tsx
// app/(dashboard)/employees/action.ts
import { ApiError } from '@sfeir/helpers';

type ActionState = {
  message?: string;
  errors?: Record<string, string>;
};

export const createEmployee = async (form: FormData): Promise<ActionState | void> => {
  let id: string;
  try {
    ({ id } = await postEmployee(formDataToUpsertPerson(form)));
  } catch (error) {
    if (error instanceof ApiError && error.status === 400) {
      return { message: error.message, errors: error.errors };
    }
    throw error;
  }
  revalidateTag('one-employee', { expire: 0 });
  redirect(`/employees/${id}`);
};
```

</small>

- `ApiError` is what the shared `fetchData` helper throws whenever the
  backend answers with a non-`ok` status — the Fastify server's Valibot
  validation replies `400` with exactly `{ message, errors }` when a field
  like `email` is invalid.
- Catch that specific case and `return` a plain object — that object is what
  `useActionState` hands back as the new `state`, no throwing required.
- Anything that *isn't* a `400` `ApiError` — a real `500`, a network drop —
  still `throw`s. Turning that into a friendly screen is module 10's job
  (error boundaries), not this hook's.

Notes:

Emphasize the branch: catch-and-return only for the "this is the user's fault, tell them" case (400). Everything else keeps throwing on purpose — don't let the room think this try/catch is meant to swallow every error.
