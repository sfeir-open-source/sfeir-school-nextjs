<!-- .slide: class="with-code" -->

# Why a click was ever necessary in the first place

Last slide's `EmployeeExpenses` isn't just old code — it's built around a
real constraint: `<Suspense>` doesn't watch for "this component is slow,"
it watches for one very specific thing happening *during render*:

```tsx
// What actually suspends a tree — render-time, not event-time
const ServerWidget = async () => {
  const data = await getExpenses(); // suspends: awaited during render
  return <Table data={data} />;
};

// What never suspends, no matter how slow the request is
const ClientWidget = () => {
  const [status, setStatus] = useState('IDLE');
  const handleClick = async () => {
    setStatus('LOADING');       // a state update, not a render-time await
    await fetch('/api/expenses');
    setStatus('DONE');
  };
  // ...
};
```

<div>

- React's rule: a component suspends when it *throws a Promise while
  rendering* — an `async` Server Component `await`-ing data, or a Client
  Component reading one with `use()`. `<Suspense>` catches that thrown
  Promise and shows its `fallback` until it resolves.
- A `useState`/`useEffect`-driven `'use client'` component, like the old
  `EmployeeExpenses`, never throws anything during render — `fetch` runs
  inside an event handler, after a click, and the component just re-renders
  with a different `status` value each time. No boundary can see that.
- That's the real reason the button existed: not a design choice, a
  workaround for a component that structurally couldn't participate in
  Suspense. Rewriting it as an `async` Server Component is what makes the
  nested `<Suspense>` on the next slide actually able to catch it.

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->

Notes:

This is the mechanical "why," one level under the previous slide's "what." If someone asks about use() with promises passed into Client Components — that's the other legitimate way to suspend, worth a one-line mention if it comes up, but this app only needs the async Server Component path, don't introduce use() as new required vocabulary today.
