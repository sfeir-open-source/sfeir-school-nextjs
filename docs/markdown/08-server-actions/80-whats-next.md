<!-- .slide: class="with-code" -->

# What this slide isn't showing yet

`createEmployee` and `updateEmployee` assume everything goes right — the
`FormData` is valid, `postEmployee` succeeds, `redirect` fires. Real forms
need a pending spinner while the request is in flight, and a way to show
validation errors without leaving the page.

- You already saw the hook that does this — `useActionState`, inside
  `EmployeeForm`'s real source — but today it stayed a black box on
  purpose.
- Module 09 is entirely dedicated to it: how a Server Action returns
  structured state (errors, messages) instead of just redirecting, and how
  a form reads a pending flag to disable its own submit button.
- Everything from today still holds exactly as-is — `'use server'`,
  `FormData`, `revalidateTag`, `redirect`. Module 09 adds a layer on top,
  it doesn't replace any of it.

Notes:

Purely a forward pointer, mirror module 07's closing slide — don't teach useActionState here, one paragraph is enough so the room isn't left wondering "wait, what was that hook in EmployeeForm?"
