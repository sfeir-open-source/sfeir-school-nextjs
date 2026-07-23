<!-- .slide: class="with-code" -->

# `notFound()`: tell Next.js this was expected

`next/navigation` exports a function for exactly this case. Call it once
you know the thing you looked up isn't there, and rendering for that
segment stops right there — no `return` needed after it:

<small>

```tsx
// app/(dashboard)/employees/[id]/page.tsx — solution
import { notFound } from 'next/navigation';
import { ApiError } from '@sfeir/helpers';

try {
  const employee = await getEmployee(id);
  return <PersonCard person={employee} />;
} catch (error) {
  if (error instanceof ApiError && error.status === 404) {
    notFound();
  }
  throw error; // anything else is still a real crash — module 10 handles it
}
```

</small>

- `notFound()` still works by throwing — internally it's a special
  `NEXT_HTTP_ERROR_FALLBACK;404` error — but Next.js recognizes it and
  treats it completely differently from an ordinary exception.
- That's why the `catch` block re-throws everything else: a `404` is
  expected and gets `notFound()`; a real `500` is still a crash, and stays
  `error.tsx`'s job exactly like module 10 left it.
- It still has to reach Next.js unobstructed: only call it from a Server
  Component, a Server Function, or a Route Handler, and never wrap the call
  itself in another `try`/`catch` — that would catch the `404` interrupt
  before Next.js ever sees it, and no `not-found.tsx` would render.

Notes:

Point out this is the exact same shape as module 09's createEmployee catch block: check the specific expected case first, re-throw everything else. Same instinct, now applied to a GET instead of a mutation.
