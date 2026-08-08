<!-- .slide: class="with-code" -->

# `loading.tsx`: writing that `<Suspense>` without writing it

<small>

```tsx
// Before — app/(dashboard)/expenses/page.tsx, hand-written since module 07
const ExpensesList = async () => {
  const expenses = await getExpenses();
  return <ExpensesTable expenses={expenses.items} />;
};

const Expenses = () => (
  <>
    <PageTitle>Expenses</PageTitle>
    <Suspense fallback={<div>Loading...</div>}>
      <ExpensesList />
    </Suspense>
  </>
);
```

```tsx
// After — app/(dashboard)/expenses/loading.tsx, a sibling of page.tsx
import { PageTitle, TableLoading } from '@sfeir/ui/server';

const LoadingExpenses = () => (
  <>
    <PageTitle>Expenses</PageTitle>
    <TableLoading rows={10} cols={4} />
  </>
);

export default LoadingExpenses; // page.tsx no longer imports Suspense at all
```

</small>

<div>

- `loading.tsx` is a Next.js file convention, not a React API — the name
  alone is the whole trigger. Drop one next to a `page.tsx`, and Next.js
  wraps that `page.tsx` in a `<Suspense>` boundary automatically, using
  `loading.tsx`'s default export as the `fallback`.
- The mechanism underneath is the exact same `<Suspense>` from module 12,
  generated for you instead of typed by hand. The "content component" /
  "wrapper component" split disappears — `page.tsx` goes back to being one
  plain `async` component again.
- Reach for it when the answer to "is this whole page slow to start?" is
  yes. `/expenses` fits precisely: nothing on that route resolves quickly,
  so wrapping the entire segment is exactly the right grain.

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->

Notes:

TableLoading is the same skeleton component already used elsewhere in this app — nothing new visually, just relocated. Good moment to reconnect to module 12's lab step 3: since page.tsx's async component now fetches directly with no Suspense of its own, temporarily renaming loading.tsx away makes cacheComponents refuse to render — same guardrail, surfacing through a missing file instead of missing JSX this time.
