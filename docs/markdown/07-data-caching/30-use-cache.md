<!-- .slide: class="with-code" -->

# `"use cache"`: make a photocopy of this

One line at the top of a function tells Next.js "the first caller does the
work, everyone after gets the photocopy":

```tsx
// app/providers/employees.ts
import { cacheTag } from 'next/cache';

export async function getEmployees(search?: string) {
  'use cache';
  cacheTag('all-employees');
  const url = `${API_BASE_URL}/people${search ? `?search=${search}` : ''}`;
  return await fetchData<Paginated<Person>>(url, { headers });
}
```

- `'use cache'` goes first, exactly like `'use client'` from module 04 — a
  directive, not an import. It only works on an `async` function.
- It needs one thing turned on first: `cacheComponents: true` in
  `next.config.js`. Without that flag, `'use cache'` does nothing.
- Check the app you've been building: `06-data-caching`'s `next.config.js`
  does **not** have that flag yet. Every fetch you wrote is still running
  uncached — this module is what turns it on.

Notes:

This is the one to slow down on: confirm out loud that their own workshop app currently has caching fully off, so the "cost" slide isn't hypothetical — it's literally what their app is doing right now. cacheComponents is the single switch that makes '"use cache"' mean anything at all.
