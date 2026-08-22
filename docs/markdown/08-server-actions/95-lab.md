<!-- .slide: class="exercice" -->

<h1 id="server-actions" style="margin-bottom: 30px;">08.01 - Server Actions</h1>

## Lab

Add write-side providers plus Server Actions to create and update
employees, and wire them into new create/edit form pages.

📖 See `apps/07-server-action/README.md` for full step-by-step
instructions.

<br/>

**ℹ️ Running the lab**<br/>
`npm run dev -- 07-server-action` — the shared `server` Fastify backend on
port 9000 starts automatically as part of this app's `dev` target (same for
`07-server-action-solution`), so no extra terminal is needed

Notes:

If a group finishes early, have them create an employee, watch the redirect land on that employee's fresh detail page, then go edit it and watch the redirect land back on a fresh list — that's revalidateTag and redirect working together, made visible. Worth pointing out the two revalidateTag calls target different tags on purpose, tied to where each action redirects to.
