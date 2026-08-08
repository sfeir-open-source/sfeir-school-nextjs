<!-- .slide: class="with-code" -->

# Right now, a missing employee looks like a crash

`10-expected-errors`'s employee page already tries to handle a missing id —
but the check it wrote can never actually run:

```tsx
// app/(dashboard)/employees/[id]/page.tsx — starter
const employee = await getEmployee(id);

if (!employee) return <PageTitle backHref="/employees">Single Employee - Not found</PageTitle>;
```

- `getEmployee` calls the shared `fetchData` helper — the same one from
  module 06 — and `fetchData` never returns `undefined`. On a `404` it
  `throw`s an `ApiError` instead. `employee` is never falsy; that `if` is
  dead code.
- So the real `ApiError` goes uncaught, bubbles past this page, and lands on
  `app/error.tsx` — the exact same "service is currently unavailable" screen
  a *real* backend outage would show.
- That's the bug this module fixes: a normal 404 currently looks
  indistinguishable from the server being on fire.

Notes:

Live-demo this one too if you can: load /employees/does-not-exist in the starter app and watch the generic error.tsx screen from module 10 render for what is just a typo'd id. Great, concrete motivation for notFound() on the next slide.
