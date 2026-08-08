<!-- .slide: class="with-code" -->

# `<Suspense>`: a waiting room around the slow part

`<Suspense>` is a React component, not a Next.js one — it wraps a piece of
the tree and gives it a `fallback`, an alternate UI to show while that piece
isn't ready yet:

```tsx
<Suspense fallback={<div>Loading...</div>}>
  <ExpensesList />
</Suspense>
```

<div>

- Think of a restaurant kitchen: a good server doesn't hold your whole
  table's order back until every dish is plated. The salad that's ready
  goes out first; the slow-cooked main follows a minute later. Nobody stares
  at an empty table waiting for the slowest dish to be ready.
- `<Suspense>` is that server's discipline, applied to a page: whatever sits
  **outside** the boundary is sent to the browser as soon as it's ready —
  whatever sits **inside** shows the `fallback` until its `await`s settle,
  then gets swapped in.
- Nothing about the component being wrapped changes. `ExpensesList` still
  just `await`s `getExpenses()` like any other Server Component — `<Suspense>`
  is entirely about what happens *around* it while it waits.

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->

Notes:

Keep the restaurant analogy concrete and reusable — it'll carry all the way through this slide and the next one. Resist the urge to explain the underlying mechanism (React reading a thrown Promise) — that's more detail than this pass needs.
