<!-- .slide: class="exercice" -->

<h1 id="suspense" style="margin-bottom: 30px;">15.01 - Suspense</h1>

## Lab

<small>

**1. Replace the home page's manual boundaries with `loading.tsx`**

- In `app/(dashboard)/(home)/@employeesSlot/page.tsx`, remove the `Suspense`
  import and the wrapping `EmployeesSlot` component — keep only the
  `async` component that calls `getEmployeesUncached`, renamed
  `EmployeesSlot`, as the page's default export
- Add a sibling `app/(dashboard)/(home)/@employeesSlot/loading.tsx`: a
  `grid-cols-3` grid of 6 `Skeleton` components (`@sfeir/ui/server`),
  matching the widget's own layout
- Do the same for `app/(dashboard)/(home)/@expensesSlot/page.tsx` and its
  own sibling `loading.tsx`, falling back to a single `TableLoading`
  (`rows={10} cols={4}`)

**2. Do the same for the expenses list page**

- In `app/(dashboard)/expenses/page.tsx`, remove the `Suspense` wrapper and
  the inner/outer component split — one `async` default-exported component
  is enough
- Add `app/(dashboard)/expenses/loading.tsx`, rendering the same
  `PageTitle` the page uses, plus a `TableLoading` (`rows={10} cols={4}`)
- Reload `/` and `/expenses`, throttled to "Slow 3G" — same fallbacks as
  before, now written once each instead of by hand inside every `page.tsx`

**3. Stream the employee detail page's expenses, without a click**

- In `app/(dashboard)/employees/[id]/page.tsx`, stop importing
  `EmployeeExpenses` from `@sfeir/ui`; import `ExpensesTable` from
  `@sfeir/ui/server` and `getExpenses` from `@/app/providers/expensees`
  instead
- Write your own `EmployeeExpenses`: an `async` component taking
  `employeeId`, calling `getExpenses({ employeeId })`, and rendering the
  result with `ExpensesTable`
- Next to the existing `PersonCard`, add a `Paper` holding a heading and a
  `<Suspense fallback={<TableLoading rows={5} cols={5} />}>` wrapping your
  new component
- Reload an employee's page — the person's details appear immediately, the
  expenses table streams in a beat later, with no button to click

**4. Verify against the solution**

- Run `14-suspense-solution` alongside yours and compare the three
  `loading.tsx` files, `expenses/page.tsx`, and `employees/[id]/page.tsx`

</small>

<br/>

**ℹ️ Running the lab**<br/>
`14-suspense`'s `dev` target starts the `server` backend for you — just run
`npm run dev -- 14-suspense` (same for `14-suspense-solution`)

Notes:

Step 3 is the one worth lingering on — it's not just a Suspense exercise, it's replacing a client-side workaround with the real pattern this course has built toward since module 07. If a group finishes early, have them temporarily remove the nested <Suspense> from step 3 without removing the async EmployeeExpenses component, and watch cacheComponents refuse to render — same guardrail as module 12's lab step 3, one level deeper in the tree this time.
