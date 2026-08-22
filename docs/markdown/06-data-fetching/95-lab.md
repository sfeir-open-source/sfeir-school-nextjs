<!-- .slide: class="exercice" -->

<h1 id="data-fetching" style="margin-bottom: 30px;">06.01 - Data Fetching</h1>

## Lab

Replace the JSON fixtures with real data providers hitting the Fastify
backend, and add an API route so the "Load expenses" button has something
to call.

📖 See `apps/05-data-fetching/README.md` for full step-by-step instructions.

<br/>

**ℹ️ Running the lab**<br/>
`npm run dev -- 05-data-fetching` — this workshop also needs the shared
`server` Fastify backend running on port 9000; start it in another terminal
with `npx nx serve server` (the `-solution` app wires it automatically as a
`dev` dependency, so running `npm run dev -- 05-data-fetching-solution`
alongside yours works too)

Notes:

If a group finishes early, have them open EmployeeExpenses.tsx in libs/ui-solution and trace the request end to end: click "Load expenses" in the browser, watch it hit /api/expenses, which calls getExpensesByEmployee, which calls the Fastify server on :9000. Three hops, three files, each with exactly one job.
