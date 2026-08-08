<!-- .slide: class="exercice" -->

<h1 id="composition" style="margin-bottom: 30px;">05.01 - Composition</h1>

## Lab

**1. Build `ExpensesTableRow`**

- In `libs/ui/src/lib/ExpensesTable.tsx`, remove the `'use client'` at the top
  of the file — the table itself doesn't need it
- Create `libs/ui/src/lib/ExpensesTableRow.tsx`, a `'use client'` component
  that renders a `<tr>` around its `children`, and calls `router.push()`
  (`useRouter` from `next/navigation`) to navigate to `/expenses/{id}` on
  click
- Back in `ExpensesTable`, replace the `<tr>...</tr>` with
  `<ExpensesTableRow expense={expense} className={/* ... */}>` around the
  same `<td>`s you already had — `ExpensesTable` just hands them over as
  `children`, it doesn't need to know what happens on click

**2. Build `NavigationItem`**

- In `libs/ui/src/lib/NavigationMenu.tsx`, replace the three hardcoded
  `<a>` links with a `<Suspense>`-wrapped list rendering a new
  `NavigationItem` component per link (don't worry about *why* `Suspense` is
  there yet — that's module 12)
- Create `libs/ui/src/lib/NavigationItem.tsx`, a `'use client'` component
  using `usePathname` to compare the current URL against its own `href`, and
  a Next.js `<Link>` with a highlighted background when they match

**3. Verify against the solution**

- Run `04-composition-solution` alongside yours — click an expense row, and
  watch the sidebar highlight the page you're on
- Open `libs/ui-solution/src/lib/ExpensesTableRow.tsx` and
  `NavigationItem.tsx` and compare them to what you wrote

<br/>

**ℹ️ Running the lab**<br/>
`npm run dev -- 04-composition`

Notes:

If a group finishes early, point them at Theme.tsx and (dashboard)/layout.tsx and ask them to explain out loud why Theme never needs to import anything from the pages it wraps — good check that the resolution slide actually landed.
