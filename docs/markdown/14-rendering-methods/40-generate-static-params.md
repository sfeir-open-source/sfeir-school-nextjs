<!-- .slide: class="with-code" -->

# `generateStaticParams`: tell Next.js the finite list

One exported function next to the page, and Next.js builds one finished
HTML page per id it returns — instead of leaving every `/employees/:id`
to be figured out on the fly:

<small>

```tsx
// app/(dashboard)/employees/[id]/page.tsx
import { getEmployee, getEmployeeIds } from '@/app/providers/employees';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const ids = await getEmployeeIds();
  return ids.map(id => ({ id })); // one object per real employee
}

const EmployeeDetailContent = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const employee = await getEmployee(id); // still 'use cache' — module 07 didn't change
  // ...
};
```

</small>

<div>

- `generateStaticParams` runs at **build time** (or, in `next dev`, the
  first time you navigate to the route) — it returns an array of objects,
  one per dynamic segment value, and Next.js prerenders `/employees/<id>`
  for each one before a single visitor ever asks.
- Nothing about `getEmployee` changes — it's still the same cached function
  from module 07. `generateStaticParams` doesn't replace caching, it decides
  **which ids get run through that caching at build time**, ahead of any
  request.
- With `cacheComponents` on, this isn't optional decoration: `generateStaticParams`
  on a dynamic route now **must return at least one param**, or the build
  fails outright — the empty-array "render everything on demand" escape
  hatch from older Next.js versions doesn't apply here anymore.

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->

Notes:

The "must return at least one param" rule is worth stating plainly if asked why — it's how Cache Components can guarantee every dynamic route actually produces a validated static shell, instead of silently falling back to fully-dynamic. Straight from the generateStaticParams reference page.
