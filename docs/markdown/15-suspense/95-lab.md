<!-- .slide: class="exercice" -->

<h1 id="suspense" style="margin-bottom: 30px;">15.01 - Suspense</h1>

## Lab

Replace manual `<Suspense>` boundaries with `loading.tsx` files on the home
page and expenses list, then stream the employee detail page's expenses
table without a manual click.

📖 See `apps/14-suspense/README.md` for full step-by-step instructions.

<br/>

**ℹ️ Running the lab**<br/>
`14-suspense`'s `dev` target starts the `server` backend for you — just run
`npm run dev -- 14-suspense` (same for `14-suspense-solution`)

Notes:

Step 3 is the one worth lingering on — it's not just a Suspense exercise, it's replacing a client-side workaround with the real pattern this course has built toward since module 07. If a group finishes early, have them temporarily remove the nested <Suspense> from step 3 without removing the async EmployeeExpenses component, and watch cacheComponents refuse to render — same guardrail as module 12's lab step 3, one level deeper in the tree this time.
