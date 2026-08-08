<!-- .slide: class="with-code" -->

# A spectrum, not a switch

Three widgets from this same app, three different answers to "when does
this actually get computed?":

<small>

```tsx
// The sidebar, the page title — no data, nothing to await
// → built once, at build time, done. Pure static HTML.

// app/providers/employees.ts
export async function getEmployee(id: string) {
  'use cache';               // module 07 — a photocopy, reused across visitors
  cacheTag('one-employee');
  return await fetchData<Person>(url, { headers });
}

// app/(dashboard)/(home)/@employeesSlot/page.tsx
const EmployeesList = async () => {
  await connection();        // ← "I genuinely need this request, not a copy"
  const latest = await getEmployeesUncached({ sortBy: 'entryDate', order: 'desc' });
  return /* ... */;
};
```

</small>

<div>

- **No per-request data at all** — the sidebar, the layout chrome — has
  nothing to wait on, so it's simply part of the finished HTML from the
  start. Nothing to configure, nothing to think about.
- **Cached, with `'use cache'`** — `getEmployee` sits in the middle: the
  work happens once, the photocopy is reused, and — as long as its lifetime
  isn't too short — it can be baked straight into that finished HTML too.
- **Genuinely per-request** — the homepage's "latest employees" widget calls
  `connection()` on purpose, a signal that says "don't let this join the
  static shell, I need this request, live." `<Suspense>` is what makes that
  safe: the rest of the page ships immediately, this widget streams in
  right after.
- Most real pages are a mix of all three, in the same tree — which is
  exactly what stacking `'use cache'` and `<Suspense>` since modules 07 and
  12 was already setting up, one component at a time.

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->

Notes:

connection() is new vocabulary — keep it to one line: it's how a component opts back into "always live" on purpose, the mirror image of 'use cache'. Don't dwell on it, the point of this slide is the spectrum, not the API surface.
