<!-- .slide: class="with-code" -->

# `not-found.tsx`: the UI that catches it

Same file-convention story as `error.tsx`: drop a file named `not-found.tsx`
next to a `page.tsx`, and Next.js renders it in place of that segment the
moment `notFound()` throws inside it:

```tsx
// app/not-found.tsx — the root one, from 10-expected-errors-solution
import { PageError } from '@sfeir/ui-solution/server';

export default async function NotFound() {
  return <PageError code={404}>Oops, the page requested is not found</PageError>;
}
```

- One root `app/not-found.tsx` is enough to have *some* 404 UI everywhere:
  it also catches URLs that don't match any route at all — visit a page
  that plain doesn't exist in `app/`, and this same file renders.
- `<PageError code={404}>` is the very same component `app/error.tsx` used
  in module 10, just with a different `code` — same visual language, a
  different, more precise number for a completely different kind of
  problem.
- Without this file, Next.js falls back to its own generic 404 page — the
  same idea as the generic crash screen from module 10, just for the
  "not found" case instead.

Notes:

Worth saying explicitly: PageError code=404 vs the error.tsx's default code=500 is the whole visual distinction the app makes between "this doesn't exist" and "something broke" — same component, different number, very different meaning to the person reading it.
