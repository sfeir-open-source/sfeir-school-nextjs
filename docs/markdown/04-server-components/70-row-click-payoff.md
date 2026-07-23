<!-- .slide: class="with-code" -->

# The rule in action: clickable expense rows

The starter's `ExpensesTable` marks its **entire file** `'use client'`, even
though a plain `<table>` needs none of that — every row, cell and heading
ships to the browser for nothing. The solution instead pushes the boundary
down to just the row:

<small>

```tsx
// libs/ui-solution/src/lib/ExpensesTableRow.tsx
'use client';

import { useRouter } from 'next/navigation';

export const ExpensesTableRow = ({ expense, children, className }: ExpensesTableRowProps) => {
  const router = useRouter();

  return (
    <tr onClick={() => router.push(`/expenses/${expense.id}`)} className={className}>
      {children}
    </tr>
  );
};
```

</small>

- `ExpensesTable` itself goes back to being a plain Server Component — it
  just renders many `ExpensesTableRow`s, exactly like `App` rendering
  `EmployeesList` in the tree diagrams.
- Only the one thing that actually needs the browser — `useRouter`, to
  navigate on click — pays the client-side cost.
- This is the "row-click navigation" module 03 mentioned and deferred:
  `useRouter` is a hook, and hooks only work in Client Components.

Notes:

This is the payoff for the itch left open at the end of module 03 — expense rows now navigate on click, for real. Point out the starter file already has cursor-pointer and role="link" styling with no handler behind it — a deliberate "looks clickable, isn't yet" setup for the lab.
