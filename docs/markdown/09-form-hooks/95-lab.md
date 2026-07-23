<!-- .slide: class="exercice" -->

<h1 id="form-hooks" style="margin-bottom: 30px;">09.01 - Form Hooks</h1>

## Lab

<small>

**1. Make the Server Actions return structured errors**

- In `app/(dashboard)/employees/action.ts`, import `ApiError` from
  `@sfeir/helpers` and add an `ActionState` type: `{ message?: string;
  errors?: Record<string, string> }`
- Wrap the `postEmployee(...)` call in `createEmployee` in a `try`/`catch`:
  on `error instanceof ApiError && error.status === 400`, `return { message:
  error.message, errors: error.errors }`; otherwise `throw error`
- Do the same around `putEmployee(...)` in `updateEmployee`
- Update both functions' return type to `Promise<ActionState | void>`

**2. Switch the form pages to the hook-wired components**

- In `app/(dashboard)/employees/new/page.tsx` and
  `app/(dashboard)/employees/[id]/edit/page.tsx`, change the import of
  `EmployeeForm` and `PageTitle` from `@sfeir/ui/server` to
  `@sfeir/ui-solution/server` — that library's `EmployeeForm` already wraps
  `action` with `useActionState`, and its submit button already reads
  `useFormStatus`

**3. Try to break it, on purpose**

- Submit the create form with a one-character first name (or any field the
  backend rejects) — confirm a red border and message appear under the
  right field, and every other field keeps what you typed
- Double-click submit on a valid form — confirm the button disables/shows a
  spinner instead of firing twice

**4. Verify against the solution**

- Run `08-form-hooks-solution` alongside yours and compare
  `app/(dashboard)/employees/action.ts` and the two form pages

</small>

<br/>

**ℹ️ Running the lab**<br/>
`npm run dev -- 08-form-hooks` — the shared `server` Fastify backend on port
9000 starts automatically as part of this app's `dev` target (same for
`08-form-hooks-solution`), so no extra terminal is needed

Notes:

If a group finishes early, have them log state in EmployeeForm right before the return to watch it change across a failed submit vs a successful one — makes useActionState's re-render concrete instead of abstract. Also worth pointing out: nothing in step 1 touches EmployeeForm or SubmitFormButton, both hooks live entirely in the already-solved ui-solution library — the lab is about making the Server Action side hold up its end of the contract.
