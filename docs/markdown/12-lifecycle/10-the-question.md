<!-- .slide: class="with-code" -->

# What actually happens between a click and a screen?

Module 04 revealed that a `page.tsx` like this one runs on the server, not
in the browser. Module 06 showed it can `await` a real HTTP call while it's
in there. Put those two facts together and a new question shows up:

```tsx
// app/(dashboard)/expenses/page.tsx
const ExpensesList = async () => {
  const expenses = await getExpenses(); // ← the render is paused, right here
  return <ExpensesTable expenses={expenses.items} />;
};
```

<div>

- Rendering a Server Component means *running its function* on the server.
  If that function `await`s something, rendering that component is paused
  until the `await` settles — there's no way around it, that's what `await`
  means.
- Nothing gets sent to the browser until the render that's in progress
  produces something to send. A paused render is a paused response.
- So: what happens to the *rest* of the page while one `await` is stuck
  waiting on the network? That's the question this module answers.

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->

Notes:

Quick recap beat, not new material — the goal is to have both prior facts (server rendering, awaiting fetches) sitting side by side in the room's head before asking the question that drives the rest of the module.
