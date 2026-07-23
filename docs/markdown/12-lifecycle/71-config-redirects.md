<!-- .slide: class="with-code" -->

# One more thing this config does before any component renders

Everything so far in this module happens once Next.js has already picked a
route and started rendering it. `next.config.js` can decide to send a
visitor somewhere else before any of that even starts — no `NextRequest`,
no function body to run, just data the framework's own routing layer
checks first. `11-lifecycle-solution`'s `next.config.js` ships exactly
that, through `redirects()`:

```js
// next.config.js (11-lifecycle-solution)
async redirects() {
  return [
    { source: '/expenses/variation', destination: '/expenses', permanent: false },
    { source: '/employees/:id', destination: '/e_:id', permanent: false },
    { source: '/employees/:id/edit', destination: '/e_:id/edit', permanent: false },
  ];
},
```

<div>

- `permanent: false` sends a `307` — "temporary, don't cache this redirect
  forever." `permanent: true` would send a `308` instead. Both preserve the
  original HTTP method, which is exactly why Next.js uses 307/308 instead
  of the older 301/302 a browser might silently turn into a `GET`.
- The first entry is a plain redirect: anyone who lands on
  `/expenses/variation` directly gets sent back to `/expenses` — that URL
  is never meant to be visited on purpose. The next two slides explain why
  it exists at all.
- The other two are a **route mask**: `:id` in `source` is captured and
  reused in `destination` with `:id`, so `/employees/42` redirects to
  `/e_42` — a shorter, different-looking URL for the exact same employee.
  The address bar changes; nothing about `app/employees/[id]/page.tsx`
  does, yet.

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->

Notes:

`11-lifecycle`, the starter app, doesn't have any of this yet — only `11-lifecycle-solution` does. Today's lab is where you add it for real. Land the route-mask idea as "watch, it's not done yet" — the payoff (why /e_42 still shows the real employee page) is the next slide's rewrite.
