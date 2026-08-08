<!-- .slide: class="with-code" -->

# You don't have to bake every id

`employees/[id]` prerenders every employee — a few dozen people, cheap to
bake in full. `expenses/[id]` makes a different call, on purpose:

```tsx
// app/providers/expensees.ts
export async function getExpenseIds(limit = 5): Promise<string[]> {
  const { items } = await getExpenses({ per_page: limit });
  return items.map(item => item.id);
}

// app/(dashboard)/expenses/[id]/page.tsx
export async function generateStaticParams() {
  const ids = await getExpenseIds(); // only the 5 most recent, not all of them
  return ids.map(id => ({ id }));
}
```

<div>

- `getEmployeeIds` asked for `per_page: 100` — effectively "all of them."
  `getExpenseIds` defaults to `limit = 5` — a deliberate subset. Same API,
  two different answers to "how much is worth baking at build time?"
- This is exactly the **"subset of paths at build time"** pattern from the
  Next.js docs: prerender the ones you can predict will matter (the newest
  expenses, most likely to be clicked right after a demo or a deploy),
  leave the long tail to be resolved the first time someone actually visits.
- Notice `getExpenseIds` itself has no `'use cache'` — it doesn't need one.
  `generateStaticParams` only ever runs at build time (or on a dev
  navigation), never per visitor, so there's no repeated-request cost to
  save here the way there was for `getEmployee` or `getExpenses`.

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->

Notes:

Good moment to ask the room: why would you ever want fewer, not more, static pages? Answer: build time and deploy size aren't free either — a product catalog with two million ids doesn't want to prerender all two million.
