<!-- .slide: class="exercice" -->

<h1 id="layout" style="margin-bottom: 30px;">02.01 - Layout</h1>

## Lab

**1. Build the dashboard shell**

- In `01-layout/src/app`, create a `(dashboard)` route group
- Copy `_static/dashboard-layout.tsx` into `(dashboard)/layout.tsx` — it
  renders the logo, the sidebar navigation, and wraps `{children}`
- Copy `_static/dashboard-page.tsx` into `(dashboard)/page.tsx`

**2. Add the employees and expenses pages**

- Copy `_static/employee-page.tsx` into `(dashboard)/employees/page.tsx`
- Copy `_static/expenses-page.tsx` into `(dashboard)/expenses/page.tsx`
- Visit `/employees` and `/expenses` — same sidebar, different content, and
  employee photos now go through `next/image`

**3. Check the persistence**

- Navigate between `/employees` and `/expenses` a few times — watch the
  sidebar stay put while only the main content swaps

<br/>

**ℹ️ Running the lab**<br/>
`npm run dev -- 01-layout`

Notes:

If someone finishes early, have them open the Network tab while navigating between /employees and /expenses — no full-document reload, only the payload for the changed segment. Don't explain why yet, that's module 04's job — just let them notice it.
