<!-- .slide: class="exercice" -->

<h1 id="server-components" style="margin-bottom: 30px;">04.01 - Server Components</h1>

## Lab

**1. Prove a Server Component can touch the filesystem**

- In `03-server-components/src/app/(dashboard)/employees/page.tsx`, after
  filtering the employees, use `node:fs/promises`' `appendFile` (and
  `node:path`'s `join`) to log each search — date, search term, number of
  results — as a JSON line into `../../logs.txt`
- Nothing extra to configure: this works because `page.tsx` is a Server
  Component and never ships to the browser

**2. Read it back**

- Create `(dashboard)/employees/logs/page.tsx` — an `async` Server Component
  that reads `../../logs.txt` with `readFile` and renders it with `<Code
  lang="json">` from the `bright` package
- Visit `/employees/logs` after searching a few times on `/employees`

**3. Spot the payoff from last module**

- Run `03-server-components-solution` alongside yours — click an expense row
  (it now navigates to `/expenses/{id}`), and watch the sidebar highlight the
  page you're on
- Both come from the same trick: a small `'use client'` component
  (`ExpensesTableRow`, `NavigationItem`) doing only the one thing that needs a
  browser — nothing else around it had to change

<br/>

**ℹ️ Running the lab**<br/>
`npm run dev -- 03-server-components`

Notes:

If a group finishes early, have them open ExpensesTableRow.tsx and NavigationItem.tsx in libs/ui-solution and find the 'use client' line plus the hook that needed it — useRouter and usePathname respectively. Also worth pointing out ExpensesTable.tsx in the starter lib is marked 'use client' for no real reason — a good "would you leave this as-is?" discussion prompt using today's decision rule.
