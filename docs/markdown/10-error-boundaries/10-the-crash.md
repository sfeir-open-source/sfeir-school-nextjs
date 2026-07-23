<!-- .slide: class="with-code" -->

# Module 09 left one branch unhandled

`createEmployee`'s `catch` block only returns friendly state for a `400`
`ApiError` — a bad email, a missing field. Everything else still `throw`s on
purpose:

```tsx
// app/(dashboard)/employees/action.ts — from module 09
} catch (error) {
  if (error instanceof ApiError && error.status === 400) {
    return { message: error.message, errors: error.errors };
  }
  throw error; // ← a real 500, a network drop... this line
}
```

- Same story on the read side: `getEmployees`, `getExpenses` — every
  provider built since module 06 — calls the shared `fetchData` helper,
  which `throw`s an `ApiError` the moment the backend answers anything that
  isn't `ok`. No `try`/`catch` wraps those calls in a page.
- Stop the `server` app for a second (or just forget to start it) and load
  `/employees`: `getEmployees` throws while the page is rendering. Nothing
  in `EmployeesPage` catches it.
- An unhandled exception thrown while rendering a Server Component doesn't
  stay local — it bubbles all the way up. Without anything in its way, it
  takes the whole page down.

Notes:

Live-demo this if you can: kill the server terminal for 09-error-boundaries and reload /employees, or throw a one-line `throw new Error('boom')` inside a Server Component. Concrete crash sells the next slides far better than describing it.
