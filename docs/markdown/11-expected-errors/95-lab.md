<!-- .slide: class="exercice" -->

<h1 id="expected-errors" style="margin-bottom: 30px;">11.01 - Expected Errors</h1>

## Lab

<small>

**1. Replace the dead `if (!x)` checks with `notFound()`**

- In `app/(dashboard)/employees/[id]/page.tsx`, `app/(dashboard)/employees/[id]/edit/page.tsx`
  and `app/(dashboard)/expenses/[id]/page.tsx`: wrap the lookup
  (`getEmployee`/`getExpenseById`) in a `try`/`catch`, import `ApiError`
  from `@sfeir/helpers` and `notFound` from `next/navigation`
- On `error instanceof ApiError && error.status === 404`, call `notFound()`
  — re-`throw` anything else, and delete the old `if (!employee) return …`
  line, it can never run

**2. Give each lookup its own `not-found.tsx`**

- Create `app/not-found.tsx`: import `PageError` from `@sfeir/ui/server`,
  render `<PageError code={404}>…</PageError>` with a generic message
- Create `app/(dashboard)/employees/[id]/not-found.tsx` and
  `app/(dashboard)/employees/[id]/edit/not-found.tsx`: `'use client'`,
  `useParams()` from `next/navigation`, `Alert` from `@sfeir/ui/server`,
  mention the missing employee id
- Create `app/(dashboard)/expenses/[id]/not-found.tsx`: same idea, for the
  missing expense id

**3. Break it on purpose, twice**

- Visit `/employees/does-not-exist` — confirm the specific "employee does
  not exist" alert renders, sidebar and page shell intact, instead of
  `app/error.tsx`'s generic "service unavailable" screen
- Visit a URL that matches nothing at all (e.g. `/this-page-does-not-exist`)
  — confirm your root `app/not-found.tsx` renders instead

**4. Verify against the solution**

- Run `10-expected-errors-solution` alongside yours and compare all four
  `not-found.tsx` files and the three `page.tsx` lookups

</small>

<br/>

**ℹ️ Running the lab**<br/>
`10-expected-errors`'s `dev` target starts the `server` backend for you —
just run `npm run dev -- 10-expected-errors` (same for
`10-expected-errors-solution`)

Notes:

Unlike 09-error-boundaries last module, this app's dev target does depend on server:serve, so a stopped backend is not the demo here — the missing employee id is. Make sure groups understand fetchData still throws a 404 ApiError normally; the fix is catching that specific case with notFound(), not touching fetchData itself.
