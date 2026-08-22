<!-- .slide: class="exercice" -->

<h1 id="form-hooks" style="margin-bottom: 30px;">09.01 - Form Hooks</h1>

## Lab

Make the Server Actions return structured errors, then switch the form
pages to hook-wired components using `useActionState` and `useFormStatus`.

📖 See `apps/08-form-hooks/README.md` for full step-by-step instructions.

<br/>

**ℹ️ Running the lab**<br/>
`npm run dev -- 08-form-hooks` — the shared `server` Fastify backend on port
9000 starts automatically as part of this app's `dev` target (same for
`08-form-hooks-solution`), so no extra terminal is needed

Notes:

If a group finishes early, have them log state in EmployeeForm right before the return to watch it change across a failed submit vs a successful one — makes useActionState's re-render concrete instead of abstract. Also worth pointing out: nothing in step 1 touches EmployeeForm or SubmitFormButton, both hooks live entirely in the already-solved ui-solution library — the lab is about making the Server Action side hold up its end of the contract.
