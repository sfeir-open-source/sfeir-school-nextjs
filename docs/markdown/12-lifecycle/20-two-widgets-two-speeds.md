<!-- .slide: class="with-code" -->

# One page, two very different fetches

The home page's two `@slot`s from module 10 — `@employeesSlot` and
`@expensesSlot` — each run their own `await`, but they don't wait the same
amount of time:

<small>

```tsx
// app/providers/employees.ts
export async function getEmployees(filter: Record<string, unknown>) {
  'use cache'; // module 07: a photocopy, handed out instantly once warm
  cacheTag('all-employees');
  return await fetchData<Paginated<Person>>(url, { headers });
}

// app/providers/expensees.ts
export async function getExpenses(filter: Record<string, unknown> = {}) {
  // no "use cache" here — every single call is a real round-trip
  return await fetchData<Paginated<Expense>>(url, { headers });
}
```

</small>

- `getEmployees` is cached: the first visitor pays for the network call,
  everyone after gets the photocopy — practically instant.
- `getExpenses` was left uncached on purpose back in module 07's lab. Every
  visit re-runs the real HTTP call to the shared `server` app — and that
  server adds a deliberate half-second delay to every response, so the wait
  is easy to feel, not just imagine.
- Same page, same layout, two widgets — one essentially free after the
  first visit, one that always costs real time.

Notes:

If you can, open the Network tab and reload / a few times live — the timing difference between the two calls is visible directly in the waterfall, not just asserted on a slide.
