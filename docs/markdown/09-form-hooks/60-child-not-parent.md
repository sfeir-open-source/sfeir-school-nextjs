<!-- .slide: class="with-code" -->

# The one rule: a *child* of the form, never the component rendering it

`useFormStatus` only reports on the closest `<form>` **ancestor** — a
component that renders a `<form>` itself doesn't count as being inside it:

```tsx
// ❌ called in the component that renders the <form> — always pending: false
const EmployeeForm = () => {
  const { pending } = useFormStatus(); // no parent <form> exists yet here
  return <form action={formAction}>{/* ... */}</form>;
};
```

```tsx
// ✅ called in SubmitFormButton, which EmployeeForm renders *inside* the <form>
<form action={formAction}>
  {/* ...fields... */}
  <SubmitFormButton>Submit</SubmitFormButton>
</form>
```

- This is exactly why the app has a separate `SubmitFormButton` component
  instead of inlining the button and the hook straight into `EmployeeForm` —
  there's no other way to get a "real" parent `<form>` in scope.
- Easy trap on a first form: if `pending` is stubbornly `false` the whole
  time, this is the first thing to check.
- Same shape as `'use client'` boundaries from module 04 — the hook needs to
  physically sit lower in the tree than the thing it's reading.

Notes:

Ask the room to predict, before showing the fix, why the naive version always reads false — good moment for them to reason about React's render tree rather than just being told the rule.
