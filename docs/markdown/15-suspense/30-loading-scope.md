<!-- .slide: class="with-code" -->

# Exactly what gets wrapped

```tsx
// app/(dashboard)/(home)/@employeesSlot/loading.tsx
const LoadingEmployeesSlot = () => (
  <div className="grid grid-cols-3 gap-4">
    {[...Array(6)].map((_, index) => <Skeleton key={index} className="min-h-48" />)}
  </div>
);

// app/(dashboard)/(home)/@expensesSlot/loading.tsx
const LoadingExpensesSlot = () => <TableLoading rows={10} cols={4} />;
```

<div>

- Straight from the Next.js docs: `loading.tsx` wraps `page.tsx`,
  `not-found.tsx`, and any nested `layout.tsx` below it in that
  `<Suspense>` boundary — but it does **not** wrap the `layout.tsx` sitting
  in the *same* folder as itself. `(dashboard)/layout.tsx`'s sidebar never
  waits on any of this; only a segment's own content does.
- Parallel-route slots are route segments too, so each one gets its own
  `loading.tsx`. `@employeesSlot` and `@expensesSlot` each keep theirs —
  same reasoning as module 12's "each slot orders its own dish," just with
  Next.js writing the boundary now instead of a hand-typed `<Suspense>`
  living inside each slot's `page.tsx`.
- Practical result: every slot's `page.tsx` goes back to being one plain
  `async` component, exactly like `/expenses`'s did one slide ago — no
  inner/outer split, no `Suspense` import, anywhere in this app's `page.tsx`
  files.

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->

Notes:

This is literally the first two steps of today's lab, previewed here. If there's time, open the component hierarchy diagram from the Next.js docs (loading.js API reference page) — seeing page.js/not-found.js/nested layout.js drawn inside the Suspense box, with layout.js and error.js drawn outside it, resolves any lingering confusion faster than the bullet alone.
