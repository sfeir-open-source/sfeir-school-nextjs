<!-- .slide: class="with-code" -->

# `useActionState`: give the form a memory

A hook from `react` that wraps a Server Action so its *result* — success, or
a structured error — becomes state the component can read and re-render:

```tsx
// libs/ui-solution/src/lib/EmployeeForm.tsx
import { useActionState } from 'react';

const [state, formAction] = useActionState(async (previousState: State, formData: FormData) => {
  const result = await action?.(formData);
  return result ?? previousState;
}, {} as State);

return <form action={formAction} className={className}>{/* ... */}</form>;
```

- **First argument**: the function to wrap. It always receives
  `(previousState, formData)` — here it calls the `action` prop
  (`createEmployee` or `updateEmployee`), and falls back to `previousState`
  if the action returns nothing (success redirects away, so there's no new
  state to show).
- **Second argument**: `initialState` — `{} as State` here, an empty object
  matching `{ message?, errors? }`. Only used before the first submit.
- **Returns** `[state, formAction]` (a third value, a pending flag, is
  available too — the next slide covers a different way to get it): `state`
  is what to render, `formAction` is what goes into `<form action={...}>`
  instead of the raw Server Action.

Notes:

Point at the exact line that changed vs module 08: <form action={action}> becomes <form action={formAction}>. formAction is React's wrapper — never call the original action prop directly once useActionState is wrapping it.
