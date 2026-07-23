<!-- .slide: class="with-code" -->

# Each slot orders its own dish

Back to the real home page: `@employeesSlot` and `@expensesSlot` each wrap
their own data-fetching component in their own `<Suspense>` — two separate
waiting rooms, not one shared one:

<small>

```tsx
// app/(dashboard)/(home)/@employeesSlot/page.tsx
const EmployeesSlot = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <EmployeesList /> {/* cached — usually resolves immediately */}
  </Suspense>
);

// app/(dashboard)/(home)/@expensesSlot/page.tsx
const ExpensesSlot = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ExpensesList /> {/* uncached — always pays the round-trip */}
  </Suspense>
);
```

</small>

- `HomeLayout` — the sidebar, the page title, both slot wrappers — has
  nothing left to `await`, so it's sent to the browser immediately, exactly
  like the table getting its cutlery and bread before any dish arrives.
- `@employeesSlot`'s fallback rarely gets a chance to show — the cached data
  is usually already there. `@expensesSlot`'s fallback is the one you'll
  actually see flash on screen, for roughly the half-second its fetch takes.
- Neither slot knows or cares about the other's boundary. One resolving
  slowly never holds the other one back — that's the entire point of giving
  each its own `<Suspense>` instead of one wrapping both.

Notes:

Demo this live if you can: reload / and narrate what's on screen at each moment — shell first, employees widget almost immediately, then a visible beat of "Loading..." before the expenses table pops in. That lived sequence is worth more than any bullet point here.
