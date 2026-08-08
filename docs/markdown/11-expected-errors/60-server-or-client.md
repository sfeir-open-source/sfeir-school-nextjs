<!-- .slide: class="with-code" -->

# `not-found.tsx` defaults to Server — unlike `error.tsx`

Module 10 opened its `error.tsx` slide with `'use client'` as a hard rule —
every error boundary needs it. `not-found.tsx` doesn't: by default it's an
ordinary **Server Component**, and the root one above never touched
`'use client'` at all.

But the per-segment ones in `10-expected-errors-solution` do:

<small>

```tsx
// app/(dashboard)/employees/[id]/not-found.tsx — solution
'use client';

import { useParams } from 'next/navigation';
import { Alert } from '@sfeir/ui-solution/server';

const EmployeeNotFound = () => {
  const params = useParams();
  return <Alert>Oops, the employee {params.id} does not exist</Alert>;
};

export default EmployeeNotFound;
```

</small>

- Next.js calls `not-found.tsx` with **no props at all** — not even the
  route's `params`. The page that called `notFound()` knew the id; this
  file, by design, doesn't.
- Wanting the specific id in the message — "employee `abc123` does not
  exist" instead of a generic sentence — means reading it from somewhere
  else: `useParams()`, a Client Component hook, which is why this one file
  needs `'use client'` while the root one doesn't.
- The rule, precisely: `not-found.tsx` is a Server Component *by default* —
  reach for `'use client'` only when the fallback genuinely needs a browser
  API or a hook like this one, the same module 04 decision rule as ever.

Notes:

This is the slide most likely to get a "wait, doesn't every special file need use client like error.tsx?" question — be ready with the precise answer: error boundaries are implemented with React's client-only error boundary mechanism, not-found.tsx is just a regular route-segment file with no such constraint. Point at the no-props detail as the actual reason this specific file opts into use client.
