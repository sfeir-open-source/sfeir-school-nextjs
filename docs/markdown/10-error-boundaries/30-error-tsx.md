<!-- .slide: class="with-code" -->

# `error.tsx`: a fallback UI for its segment, and everything below it

Drop a file named `error.tsx` next to a `page.tsx`, and Next.js wraps that
route segment — and every segment nested inside it — in a boundary. Throw
anywhere in there, and this file's component renders instead:

```tsx
// app/error.tsx
'use client';

import { PageError } from '@sfeir/ui-solution/server';

const RootError = () => {
  return <PageError>The service is currently unavailable. Please try again later</PageError>;
};

export default RootError;
```

- Think of it as a circuit breaker: the moment something downstream trips
  it, everything past that point in the tree gets swapped for this
  component — the crash stops spreading instead of taking the whole app
  down with it.
- This is the real `app/error.tsx` from `09-error-boundaries-solution` — the
  root one. Kill the `server` app and reload any page: this is what renders
  now, instead of Next.js's generic screen from the last slide.
- Same file-convention idea as `page.tsx` or `layout.tsx` — a reserved name,
  no import needed, Next.js wires it in for you based on where it sits in
  `app/`.

Notes:

Point out PageError itself is just an ordinary component from ui-solution — nothing magic about its JSX, the magic is entirely in the filename and its position in the tree.
