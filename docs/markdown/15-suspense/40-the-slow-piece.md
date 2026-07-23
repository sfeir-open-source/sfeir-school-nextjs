<!-- .slide: class="with-code" -->

# One page, one slow piece buried inside it

```tsx
// libs/ui — the EmployeeExpenses this app's employee detail page uses today
export const EmployeeExpenses = ({ employeeId }: { employeeId: string }) => {
  const [status, setStatus] = useState('IDLE');
  // ...
  if (status === 'IDLE') return <Button onClick={handleOpen}>Load expenses</Button>;
  if (status === 'LOADING') return 'Loading...';
  // fetches /api/expenses, but only once the button is clicked
};
```

<div>

- `/employees/[id]` is mostly fast: the person's name, photo, and role come
  from `getEmployee`, which is `'use cache'` — a photocopy, module 07's
  mental model, essentially instant after the first visit.
- That page also shows the employee's recent expenses — and `getExpenses`
  is never cached, the same real round-trip the home page's expenses widget
  always pays. Rather than solve that, `EmployeeExpenses` dodges it: it's a
  `'use client'` component that only fetches after a visitor clicks
  "Load expenses," hidden behind a button instead of streamed on its own.
- That's a workaround, not the pattern this course has built toward since
  module 07. The data is knowable the instant the page renders — it should
  stream in on its own, the same way `@expensesSlot`'s widget already does.

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->

Notes:

This is real code in this app's libs/ui, not a hypothetical — worth opening the actual file if there's time. Frame it plainly as "a shortcut that was fine before you knew Suspense, and isn't fine anymore now that you do."
