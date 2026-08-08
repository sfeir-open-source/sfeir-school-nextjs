<!-- .slide: class="exercice" -->

<h1 id="data-fetching" style="margin-bottom: 30px;">06.01 - Data Fetching</h1>

## Lab

<small>

**1. Point the app at the real API**

- In `05-data-fetching/.env.local`, set `API_BASE_URL=http://localhost:9000/api`
  and add `API_KEY=''` — `src/shared/env.ts` already reads both

**2. Write the providers**

- Create `app/providers/employees.ts` with `getEmployees(search?)` and
  `getEmployee(id)`, and `app/providers/expensees.ts` with `getExpenses()`,
  `getExpenseById(id)` and `getExpensesByEmployee(employeeId)` — each one
  builds a URL from `API_BASE_URL`, sends `x-api-key: API_KEY`, and calls
  `fetchData` from `@sfeir/helpers`

**3. Swap the JSON fixtures for real fetches**

- In `employees/page.tsx`, `employees/[id]/page.tsx`, `expenses/page.tsx` and
  `expenses/[id]/page.tsx`, remove the `@/data/*.json` imports and `await`
  the matching provider instead — the JSX barely changes, only where the
  data comes from

**4. Give the "Load expenses" button something to call**

- `EmployeeExpenses` (on the employee detail page) already `fetch`es
  `/api/expenses?employeeId=...` — create `app/api/expenses/route.ts` with an
  `export const GET` that reads `employeeId` off
  `request.nextUrl.searchParams` and returns `Response.json(...)` from
  `getExpensesByEmployee`

**5. Verify against the solution**

- Run `05-data-fetching-solution` alongside yours and compare
  `app/providers/` and `app/api/expenses/route.ts`

</small>

<br/>

**ℹ️ Running the lab**<br/>
`npm run dev -- 05-data-fetching` — this workshop also needs the shared
`server` Fastify backend running on port 9000; start it in another terminal
with `npx nx serve server` (the `-solution` app wires it automatically as a
`dev` dependency, so running `npm run dev -- 05-data-fetching-solution`
alongside yours works too)

Notes:

If a group finishes early, have them open EmployeeExpenses.tsx in libs/ui-solution and trace the request end to end: click "Load expenses" in the browser, watch it hit /api/expenses, which calls getExpensesByEmployee, which calls the Fastify server on :9000. Three hops, three files, each with exactly one job.
