<!-- .slide: class="with-code" -->

# One per segment, exactly like `error.tsx`

`notFound()` throws upward until the nearest `not-found.tsx` catches it —
so a `not-found.tsx` sitting right next to the `page.tsx` that called it
wins over the generic root one:

<small>

```
app/
  not-found.tsx                    ← catches unmatched URLs + any segment below
  (dashboard)/
    employees/
      [id]/
        not-found.tsx               ← "this employee doesn't exist" — closer, more specific
        page.tsx
        edit/
          not-found.tsx             ← same idea, on the edit route
    expenses/
      [id]/
        not-found.tsx               ← "this expense doesn't exist"
        page.tsx
```

</small>

- All four files exist in `10-expected-errors-solution` today: one root
  `not-found.tsx`, and three closer to where the lookup actually happens —
  `employees/[id]`, `employees/[id]/edit`, `expenses/[id]`.
- Same payoff as module 10's nested `error.tsx`: the message next to the
  employee page can say *this employee*, instead of the root's generic
  "the page requested is not found."
- The sidebar and page title above still come from `(dashboard)/layout.tsx`
  and keep rendering normally — only the segment where the lookup failed
  gets swapped out.

Notes:

Direct parallel to module 10's nesting slide — same "closer to the problem, smaller and more specific the UI" rule, just applied to not-found.tsx instead of error.tsx. No need to re-explain the layout-skipping subtlety unless asked; that lives in module 10.
