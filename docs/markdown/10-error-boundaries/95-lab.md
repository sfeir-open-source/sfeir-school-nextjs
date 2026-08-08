<!-- .slide: class="exercice" -->

<h1 id="error-boundaries" style="margin-bottom: 30px;">10.01 - Error Boundaries</h1>

## Lab

<small>

**1. Give the whole app a safety net**

- Create `app/error.tsx`: start with `'use client'`, import `PageError` from
  `@sfeir/ui/server`, and render a generic fallback message (e.g. "The
  service is currently unavailable. Please try again later")

**2. Isolate the two home page widgets**

- Create `app/(dashboard)/(home)/@employeesSlot/error.tsx`: `'use client'`,
  import `Alert` from `@sfeir/ui/server`, and show a short message about the
  employees widget failing to load
- Create `app/(dashboard)/(home)/@expensesSlot/error.tsx`: same idea, a
  message about the expenses widget failing to load

**3. Break it on purpose, twice**

- With the `server` backend stopped, reload `/` — confirm you see two small
  red alerts in place of the two widgets, while the page title and sidebar
  keep rendering
- Temporarily delete (or rename) one of the two slot `error.tsx` files,
  reload `/` again, and watch the failure jump all the way up to your root
  `error.tsx` instead — then restore the file

**4. Verify against the solution**

- Run `09-error-boundaries-solution` alongside yours and compare
  `app/error.tsx`, `app/(dashboard)/(home)/@employeesSlot/error.tsx` and
  `app/(dashboard)/(home)/@expensesSlot/error.tsx`

</small>

<br/>

**ℹ️ Running the lab**<br/>
`09-error-boundaries`'s `dev` target does **not** start the backend for you
— run `npx nx serve server` in one terminal, then `npm run dev -- 09-error-boundaries`
in a second one (same for `09-error-boundaries-solution`)

Notes:

Point out the difference from every previous lab this week: this app's dev target has no dependency on server:serve, so a group that only runs npm run dev -- 09-error-boundaries will just see every page crash — which is actually a free, real demo of the whole module before they've written a single error.tsx. If a group finishes early, have them delete app/error.tsx entirely and reload with the server stopped, to see Next.js's own generic screen from the start of the module one more time.
