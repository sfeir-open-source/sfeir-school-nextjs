<!-- .slide: class="exercice" -->

<h1 id="lifecycle" style="margin-bottom: 30px;">12.01 - Lifecycle</h1>

## Lab

<small>

**1. Watch the streaming actually happen**

- Open `/` with the browser's Network tab open, throttle to "Slow 3G" if you
  can, and reload a few times
- Watch `@employeesSlot`'s widget appear almost immediately while
  `@expensesSlot` briefly shows its `Loading...` fallback before the real
  table swaps in — same page, two different arrival times

**2. Turn the fast slot into a slow one**

- In `app/providers/employees.ts`, comment out the `'use cache'` line (and
  the `cacheTag('all-employees')` right after it) inside `getEmployees`
- Reload `/` a few times — confirm `@employeesSlot` now shows its own
  `Loading...` flash too, every single time, instead of resolving instantly
- Uncomment both lines to put it back the way you found it

**3. Break a `<Suspense>` boundary on purpose**

- In `app/(dashboard)/(home)/@expensesSlot/page.tsx`, temporarily remove the
  `<Suspense>` wrapper around `<ExpensesList />` (render `<ExpensesList />`
  directly instead)
- Reload `/` — with `cacheComponents: true` in `next.config.js`, Next.js
  refuses to render this: it points at `getExpenses`'s uncached fetch and
  tells you it needs a `<Suspense>` boundary around it
- Put the `<Suspense>` wrapper back and confirm the error goes away

**4. Add the redirects and rewrites `next.config.js` is still missing**

- In `11-lifecycle`'s `next.config.js`, add an `async redirects()` that
  returns three entries: `/expenses/variation` → `/expenses`, `/employees/:id`
  → `/e_:id`, and `/employees/:id/edit` → `/e_:id/edit` — all three with
  `permanent: false`
- Add an `async rewrites()` that returns `{ beforeFiles, afterFiles: [],
  fallback: [] }`, with `beforeFiles` holding three entries: `/e_:employeeId`
  → `/employees/:employeeId`, `/e_:employeeId/edit` →
  `/employees/:employeeId/edit`, and `/expenses` → `/expenses/variation`
  gated behind `has: [{ type: 'cookie', key: 'abtest', value: 'true' }]`
- Restart the dev server (`next.config.js` changes aren't hot-reloaded),
  then click into an employee from `/` and confirm the URL becomes `/e_<id>`
  while the real employee page still renders
- Add an `abtest=true` cookie on the app's origin (devtools → Application →
  Cookies) and reload `/expenses` — confirm the page's content changes even
  though the URL stays `/expenses`; remove the cookie and reload to see it
  flip back
- Visit `/expenses/variation` directly — confirm it bounces you back to
  `/expenses` instead of showing the variation on that URL

**5. Verify against the solution**

- Run `11-lifecycle-solution` alongside yours and compare `next.config.js` —
  everything else in the two apps is identical on purpose, so this file is
  the only diff

</small>

<br/>

**ℹ️ Running the lab**<br/>
`11-lifecycle`'s `dev` target starts the `server` backend for you — just run
`npm run dev -- 11-lifecycle` (same for `11-lifecycle-solution`)

Notes:

Steps 1 to 3 are the same "break it on purpose" exercise as before — there's still nothing to write there. Step 4 is the new, real task: 11-lifecycle's next.config.js is missing redirects() and rewrites() entirely, only 11-lifecycle-solution has them. Remind the room next.config.js edits need a dev server restart, unlike everything else in this app. If a group finishes early, have them add a fourth redirect of their own (e.g. a short-link mask for /login) to confirm they understand the source/destination pattern-matching, not just copy-pasted the solution's three entries.
