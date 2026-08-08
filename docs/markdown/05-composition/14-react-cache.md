<!-- .slide: class="with-code" -->

# One more composition tax: repeated fetches

Compose the same small component in several places — `PersonCard` on a list,
a header, a sidebar widget — and each one might independently call
`getEmployee(id)` for the same employee, in the same render:

```tsx
// app/providers/employees.ts
import { cache } from 'react';

export const getEmployee = cache(async (id: string) => {
  return await fetchData<Person>(`${API_BASE_URL}/people/${id}`, { headers });
});
```

- [`React.cache`](https://react.dev/reference/react/cache) memoizes a
  function's result **for the lifetime of one request** — call `getEmployee('42')`
  three times from three different components while rendering the same page,
  and only the first one actually hits the network.
- This is unrelated to composing Server and Client Components — it's about
  composing many small components that each fetch their own data, without
  forcing them to pass props down through every layer just to avoid asking
  twice.
- Don't confuse it with `'use cache'` from module 07: `cache()` only dedupes
  *within* a single request and forgets everything once it's done. Caching a
  result *across* different visitors and requests is `'use cache'`'s job, not
  this one's.

Notes:

Keep this brief — it's a "good to know" bookmark, not a new mental model. The useful mental hook: cache() answers "did anyone already ask this during this exact render", 'use cache' answers "did anyone ask this recently, from anyone". Module 07 is where the second question gets its full answer.
