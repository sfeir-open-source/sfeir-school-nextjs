<!-- .slide: class="with-code" -->

# One page doesn't fit that pattern

The employee detail page shows a "Load expenses" button — expenses only fetch
when clicked, not on the initial page load. That's state and an event
handler, so `EmployeeExpenses` is a `'use client'` component:

```tsx
// libs/ui-solution/src/lib/EmployeeExpenses.tsx
'use client';

const handleOpen = async () => {
  setLoadingStatus('LOADING');
  const expensesData = await fetch(`/api/expenses?employeeId=${employeeId}`)
    .then(res => res.json());
  setExpenses(expensesData.items);
  setLoadingStatus('LOADED');
};
```

<div>

- It can't `import { getExpensesByEmployee } from '@/app/providers/expensees'`
  — that provider is server-only code, and the composition rule from module
  04 says a Client Component can't import that.
- Even if it somehow could: `getExpensesByEmployee` sends `API_KEY` in its
  headers. Ship that call to the browser and your API key shows up in every
  visitor's Network tab.
- Notice the URL: `/api/expenses`, not `http://localhost:9000/api/expenses`.
  It's calling a route **inside this same Next.js app** — not the Fastify
  backend directly.

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->

Notes:

This is the motivating problem, worded precisely: it's not "Client Components can't fetch data", it's "this Client Component can't safely reach the real backend directly". Let the room sit with "so what is /api/expenses, then?" for a beat before the next slide answers it.
