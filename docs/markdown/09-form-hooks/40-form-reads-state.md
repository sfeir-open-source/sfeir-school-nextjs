<!-- .slide: class="with-code" -->

# `state` flows back into the exact field that was wrong

Back in `EmployeeForm`, `state.errors` is read once per field — the same
`Record<string, string>` the Fastify validation handler built, keyed by
field name:

```tsx
// libs/ui-solution/src/lib/EmployeeForm.tsx
<TextField
  id="email"
  name="email"
  label="Email address"
  defaultValue={employee?.email}
  errorMessages={state?.errors?.email}
/>
```

- `TextField` already knew how to render an error — a red border and a
  message under the input — it just never received one before, because the
  old form never had a `state` to read from.
- Only the field whose key appears in `errors` turns red; every other field
  renders exactly as it did before.
- `defaultValue` still comes from what the user typed (via the redirected
  re-render), so a failed submit never wipes the form — only the redirect
  path clears it, and that only happens on success.

Notes:

Worth naming explicitly: this is the same TextField component from every earlier module, it already had an errorMessages prop sitting unused. Nothing new to build here — just a new source of data flowing into a prop that already existed.
