<!-- .slide: class="with-code" -->

# `description`, `openGraph`, and metadata that depends on data

The static `metadata` object can carry a lot more than `title` — and once a
route needs to compute its own metadata from data, there's a dedicated
function for that:

<small>

```tsx
// app/(dashboard)/employees/layout.tsx
import { Metadata } from 'next';
import employeesData from '@/data/employee.json';

// Option A — static, known ahead of time
export const metadata: Metadata = {
  title: 'Employees',
  description: 'Browse the SFEIR People employee directory.',
  openGraph: {
    title: 'SFEIR People — Employees',
    images: ['/og-employees.png'],
  },
};

// Option B — pick ONE of the two: dynamic, reads real data, so it's async
export async function generateMetadata(): Promise<Metadata> {
  return { description: `${employeesData.length} employees in the directory` };
}
```

</small>

- `description` and `openGraph` follow the same rules as `title` — set on a
  layout, inherited by every nested page unless overridden.
- A route can export **either** the static `metadata` object **or** an async
  `generateMetadata` function — never both from the same `layout.tsx` /
  `page.tsx`.
- `generateMetadata` also receives `params` (and `parent`, the resolved
  metadata from parent segments) — the exact tool for "one title per
  employee" once a route has a dynamic segment like `[id]`, which is where
  module 03 picks this back up.

Notes:

Don't build the params example live here — 03-navigation hasn't introduced [id] yet, this slide only needs to plant that generateMetadata exists and why it's async (real data, not a hardcoded string). The employees.json count is a deliberately tame example that doesn't need dynamic routing to justify itself.
