<!-- .slide: class="with-code" -->

# What actually changed for the user

<div>

- **Double-click submit** — `SubmitFormButton` disables and shows a spinner
  (`loading={pending}`) the instant the action starts, so a second click
  can't fire a second request.
- **Invalid email** — instead of a thrown error killing the page, the same
  form re-renders with a red border and a message under Email, and every
  other field still holds what the user typed.
- Everything from module 08 still holds exactly as written — `'use server'`,
  `FormData`, `revalidateTag`, `redirect`. `useActionState` and
  `useFormStatus` are a layer of state and status on top, not a
  replacement for any of it.

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->

Notes:

This is the landing slide — let the two bullets breathe. Good moment to go back to the live demo from the opening slide and show the exact same double-click / bad-email scenario now behaving correctly.
