<!-- .slide: class="exercice" -->

<h1 id="rendering-methods" style="margin-bottom: 30px;">14.01 - Rendering Methods</h1>

## Lab

<small>

**1. Freeze the list of real employee ids**

- In `app/providers/employees.ts`, import `cacheLife` alongside `cacheTag`
  from `next/cache`
- Add `getEmployeeIds()`: `'use cache'`, `cacheTag('employee-ids')`,
  `cacheLife('max')`, then fetch employees with `{ per_page: 100 }` and
  return `items.map(item => item.id)`

**2. Prerender every employee page at build time**

- In `employees/[id]/page.tsx` and `employees/[id]/edit/page.tsx`, import
  `getEmployeeIds` and add `export async function generateStaticParams()`
  that returns `(await getEmployeeIds()).map(id => ({ id }))`
- Inside each page's content component, right after reading `id` from
  `params`, fetch `validIds` the same way and call `notFound()` when
  `!validIds.includes(id)` — before the existing `try`/`catch` around
  `getEmployee`

**3. Prerender only the 5 most recent expenses**

- In `app/providers/expensees.ts`, add `'use cache'` and
  `cacheTag('one-expense')` to `getExpenseById`
- Add `getExpenseIds(limit = 5)`, calling the existing `getExpenses` and
  mapping `items` to their `id`s — no `'use cache'` needed here
- In `expenses/[id]/page.tsx`, import `getExpenseIds` and add the same
  `generateStaticParams` shape as step 2 — no extra guard needed, the
  existing `notFound()` catch already covers ids outside the 5

**4. Force the homepage's "latest employees" widget to stay live**

- In `app/providers/employees.ts`, add `getEmployeesUncached` — same body
  as `getEmployees`, minus `'use cache'` and `cacheTag`
- In `@employeesSlot/page.tsx`, import `connection` from `next/server`,
  call `await connection()` as the first line of `EmployeesList`, then
  fetch with `getEmployeesUncached` instead of `getEmployees`

**5. Verify against the solution**

- Run `13-rendering-methods-solution` alongside yours and compare
  `app/providers/employees.ts`, `app/providers/expensees.ts`,
  `employees/[id]/page.tsx`, `employees/[id]/edit/page.tsx`,
  `expenses/[id]/page.tsx` and `@employeesSlot/page.tsx`

</small>

<br/>

**ℹ️ Running the lab**<br/>
`13-rendering-methods`'s `dev` target starts the `server` backend for you —
just run `npm run dev -- 13-rendering-methods` (same for
`13-rendering-methods-solution`)

Notes:

Step 2's guard is the one worth lingering on: it's what makes an id created after the build genuinely 404 instead of silently rendering on demand, which is a deliberate teaching choice, not the only correct one — say so explicitly if asked. If a group finishes early, have them run npx nx build 13-rendering-methods and grep the output for the prerendered /employees/<id> routes versus the handful of /expenses/<id> ones, to see generateStaticParams' effect made concrete in the build log.
