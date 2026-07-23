<!-- .slide: class="with-code" -->

# `'use client'`: the opt-in escape hatch

The search box you've already been using on `/employees` needs state (what's
currently typed) and an event handler (`onChange`) — so it opts in with a
directive at the very top of the file:

<small>

```tsx
// libs/ui/src/lib/Search.tsx
'use client';

import { useMemo } from 'react';

export const Search = ({ className }: SearchProps) => {
  const handleSearch = useMemo(() => debounce(event => {
    // ...update the URL with the typed value...
  }, 500), []);

  return <TextField onChange={handleSearch} /* ... */ />;
};
```

</small>

- `'use client'` doesn't mean "only runs in the browser" — it means "this
  component is **allowed** to run in the browser," and ships the JavaScript
  needed to do so.
- It's a one-line opt-in, not a rewrite: same component syntax, same props,
  just one string at the top of the file, before any imports.
- You've been using this exact `Search` component since module 02 — now you
  know why it's the one piece of the employees page that needed the
  directive.

Notes:

Confirm this is the same Search they've clicked into many times already. Naming the mechanism after they've already used the outcome tends to stick better than introducing it cold.
