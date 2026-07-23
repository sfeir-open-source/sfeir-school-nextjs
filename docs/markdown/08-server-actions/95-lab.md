<!-- .slide: class="exercice" -->

<h1 id="server-actions" style="margin-bottom: 30px;">08.01 - Server Actions</h1>

## Lab

<small>

**1. Add the write-side providers**

- In `app/providers/employees.ts`, add `postEmployee(employee: UpsertEmployee)`
  and `putEmployee(id: string, employee: UpsertEmployee)` — same shape as
  `getEmployees`/`getEmployee`, but `method: 'POST'` / `method: 'PUT'` with a
  `JSON.stringify(employee)` body

**2. Write the Server Actions**

- Create `app/(dashboard)/employees/action.ts` starting with `'use server'`
- Add a `formDataToUpsertPerson(form: FormData)` helper that reads every
  field with `form.get(...)`
- Add `createEmployee(form: FormData)`: call `postEmployee`, then
  `revalidateTag('one-employee', { expire: 0 })`, then
  `redirect(`/employees/${id}`)` with the id it gets back
- Add `updateEmployee(form: FormData)`: read `id` off the form, call
  `putEmployee`, then `revalidateTag('all-employees', { expire: 0 })`, then
  `redirect('/employees')`

**3. Wire the create form**

- Create `app/(dashboard)/employees/new/page.tsx`: a `PageTitle` plus
  `<EmployeeForm action={createEmployee} />`

**4. Wire the edit form**

- In `app/(dashboard)/employees/[id]/edit/page.tsx`, import `updateEmployee`
  and pass it as the `action` prop on the existing `<EmployeeForm>`

**5. Make the create form reachable**

- In `app/(dashboard)/employees/page.tsx`, add a `Button` next to the search
  field, linking to `/employees/new`

**6. Verify against the solution**

- Run `07-server-action-solution` alongside yours and compare
  `app/(dashboard)/employees/action.ts`, `app/providers/employees.ts` and the
  two form pages

</small>

<br/>

**ℹ️ Running the lab**<br/>
`npm run dev -- 07-server-action` — the shared `server` Fastify backend on
port 9000 starts automatically as part of this app's `dev` target (same for
`07-server-action-solution`), so no extra terminal is needed

Notes:

If a group finishes early, have them create an employee, watch the redirect land on that employee's fresh detail page, then go edit it and watch the redirect land back on a fresh list — that's revalidateTag and redirect working together, made visible. Worth pointing out the two revalidateTag calls target different tags on purpose, tied to where each action redirects to.
