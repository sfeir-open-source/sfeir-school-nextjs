<!-- .slide: class="exercice" -->

<h1 id="expected-errors" style="margin-bottom: 30px;">11.01 - Expected Errors</h1>

## Lab

Replace the dead `if (!x)` checks with `notFound()`, and give each lookup
(employee, expense, edit page) its own dedicated `not-found.tsx`.

📖 See `apps/10-expected-errors/README.md` for full step-by-step
instructions.

<br/>

**ℹ️ Running the lab**<br/>
`10-expected-errors`'s `dev` target starts the `server` backend for you —
just run `npm run dev -- 10-expected-errors` (same for
`10-expected-errors-solution`)

Notes:

Unlike 09-error-boundaries last module, this app's dev target does depend on server:serve, so a stopped backend is not the demo here — the missing employee id is. Make sure groups understand fetchData still throws a 404 ApiError normally; the fix is catching that specific case with notFound(), not touching fetchData itself.
