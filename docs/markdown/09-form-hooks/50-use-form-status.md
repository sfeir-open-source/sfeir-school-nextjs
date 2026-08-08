<!-- .slide: class="with-code" -->

# `useFormStatus`: read the pending flag from inside the form

A second hook, this one from `react-dom`, answers a narrower question: *is
the nearest parent `<form>` currently submitting?* No arguments in, a status
object out:

<small>

```tsx
// libs/ui-solution/src/lib/SubmitFormButton.tsx
'use client';

import { useFormStatus } from 'react-dom';
import { Button } from './Button';

const SubmitFormButton = memo(({ children, ...props }: SubmitFormButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-4" loading={pending} {...props}>
      {children}
    </Button>
  );
});
```

</small>

- `useFormStatus()` returns `{ pending, data, method, action }`. `pending`
  is `true` from the moment the form's action starts until it settles — the
  exact flag module 08's hand-rolled `useState(false)` was trying to fake.
- `data`, `method` and `action` are also on that object, but `Button`'s
  `loading` prop only needs `pending` here.
- No prop drilling, no ref, nothing passed down from `EmployeeForm` — the
  hook finds its parent `<form>` on its own.

Notes:

If someone asks "why not the isPending third value from useActionState instead" — fair question, both work; this app picked useFormStatus specifically so the button can be its own small reusable component, decoupled from any one form's state shape. Keep it brief, the next slide is the important gotcha.
