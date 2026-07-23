<!-- .slide: class="with-code" -->

# A second, narrower `<Suspense>`, nested inside the first

<small>

```tsx
// app/(dashboard)/employees/[id]/page.tsx
const EmployeeExpenses = async ({ employeeId }: { employeeId: string }) => {
  const { items: expenses } = await getExpenses({ employeeId });
  return <ExpensesTable expenses={expenses} />;
};

// ...
<div className="w-3/5">
  <PersonCard person={employee} actions={/* Edit button */} />
</div>
<Paper className="w-2/5">
  <h2 className="text-xl font-bold p-4">Last expenses</h2>
  <Suspense fallback={<TableLoading rows={5} cols={5} />}>
    <EmployeeExpenses employeeId={id} />
  </Suspense>
</Paper>
```

</small>

<div>

- The whole page already sits behind one `<Suspense>` — `EmployeeDetail`,
  the outer wrapper from module 12, guarding the `notFound()` check and the
  cached `getEmployee` call. That boundary resolves fast, `'use cache'`
  usually makes it a photocopy.
- Nesting a second, narrower `<Suspense>` around only `EmployeeExpenses`
  lets `PersonCard`'s photo, name, and Edit button appear the instant the
  outer boundary resolves — the expenses `Paper` next to it shows its own
  `TableLoading` skeleton independently, then swaps in once `getExpenses`
  actually returns.
- React's rule for nested boundaries: whichever `<Suspense>` is *closest*
  to a suspending component is the one whose `fallback` shows. The outer
  boundary never notices `EmployeeExpenses` suspending — it already
  resolved and moved on. That's what makes "most of this page is fast, one
  piece is slow" actually work, instead of the slow piece dragging
  everything back down with it.

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->

Notes:

Demo live if possible: reload an employee's page and narrate the two arrival times — PersonCard and the Edit button first, TableLoading skeleton briefly on the right, then the real expenses table. No more click required, which is the entire point versus the previous slide.
