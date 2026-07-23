<!-- .slide: class="exercice" -->

<h1 id="navigation" style="margin-bottom: 30px;">03.01 - Navigation</h1>

## Lab

**1. Build the employee detail page**

- In `02-navigation/src/app/(dashboard)/employees`, create an `[id]` folder
  with a `page.tsx` inside
- Read `params.id` — remember it's a Promise, so `await` it — find the
  matching employee in `employee.json`, and render it with `PageTitle` and
  `PersonCard` from `@sfeir/ui/server`
- Visit `/employees/1` directly to check it renders

**2. Link to it from the list**

- Back in `employees/page.tsx`, use `<Link>` from `next/link` to point each
  `PersonCard`'s `actions` slot at `/employees/{id}`
- Click through from the list — no full-page reload, sidebar stays put

**3. Same idea, for expenses**

- Create `(dashboard)/expenses/[id]/page.tsx` the same way, reading from
  `expense.json` this time
- Visit `/expenses/{id}` directly to prove the route works

**4. Compare with the solution**

- Run `02-navigation-solution` alongside yours — notice each expense row is
  clickable, and the current page's link is highlighted in the sidebar. Same
  ideas you just used, just built out further — the mechanics land next
  module

<br/>

**ℹ️ Running the lab**<br/>
`npm run dev -- 02-navigation`

Notes:

If a group finishes early, have them try navigating to a bad id like /employees/999 and notice the "Not found" fallback branch — good segue into error handling later in the course, no need to explain it now. Keep them from over-building the expense row click handler themselves; that needs a client hook they haven't met yet, next-directly-in-the-URL is a fine stopping point today.
