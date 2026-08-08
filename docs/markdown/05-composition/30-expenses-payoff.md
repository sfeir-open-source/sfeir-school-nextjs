<!-- .slide: class="with-code" -->

# The promise from last module, paid off

Module 04 promised: "this is the pattern behind `ExpensesTable` /
`ExpensesTableRow`, full depth is module 05's topic." Here it is:

<small>

```tsx
// libs/ui-solution/src/lib/ExpensesTable.tsx — no 'use client' here
export const ExpensesTable = memo(({ expenses }: ExpensesTableProps) => (
  <table>
    {/* ...thead... */}
    <tbody>
      {expenses.map(expense => (
        <ExpensesTableRow key={expense.id} expense={expense} className={/* ... */}>
          <td>{expense.label}</td>
          <td>{new Date(expense.creationDate).toLocaleDateString('en-GB')}</td>
          <td>{expense.category}</td>
          <td>{expense.price.priceIncludingTax} {expense.price.currency}</td>
        </ExpensesTableRow>
      ))}
    </tbody>
  </table>
));
```

</small>

- `ExpensesTable` is back to being a plain Server Component. It `import`s
  `ExpensesTableRow` directly — fine, Server → Client always is — and hands
  it the fully-formatted `<td>`s as `children`.
- `ExpensesTableRow` — a tiny `'use client'` file, just `onClick` and
  `useRouter` — never has to know how to format a label, a date, or a price.
  It just renders whatever `children` it's handed.
- Only that one `'use client'` leaf ships to the browser. All the row markup
  and formatting logic stays server-rendered — the "smaller JS bundle" win
  from module 04, now with the mechanics to explain it.

Notes:

Point out this is the same shape as Theme/DashboardLayout, just smaller: a Server Component parent decides what markup to hand a Client Component leaf as children, and that leaf's own module graph never has to include it.
