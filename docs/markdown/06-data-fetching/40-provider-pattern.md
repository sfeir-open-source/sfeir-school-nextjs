<!-- .slide: class="with-code" -->

# `getEmployees` itself: just a fetch wrapper

Nothing magic lives inside `getEmployees` — it's a small, plain function next
to the pages that use it:

```tsx
// app/providers/employees.ts
import { API_BASE_URL, API_KEY } from '@/app/shared/env';
import { fetchData } from '@sfeir/helpers';
import { Paginated, Person } from '@sfeir/types';

export async function getEmployees(search?: string) {
  const url = `${API_BASE_URL}/people${search ? `?search=${search}` : ''}`;
  return await fetchData<Paginated<Person>>(url, {
    headers: { 'x-api-key': API_KEY ?? '' },
  });
}
```

- `fetchData` is a tiny in-house helper around the Web `fetch` API — it just
  adds the JSON headers and throws on a non-OK response, nothing more exotic.
- One function, one job: build the URL, call the API, return typed data.
  `getEmployee(id)` and the `expenses` providers follow the exact same shape.
- Because this file has no `'use client'` and no browser API, it can only
  ever run on the server — same guarantee as the `node:fs` example, applied
  to `fetch` instead.

Notes:

Point out this lives in app/providers, a new folder for this module — one file per resource (employees, expenses), imported straight into the pages that need them. This is a convention, not a Next.js feature — nothing here is framework magic.
