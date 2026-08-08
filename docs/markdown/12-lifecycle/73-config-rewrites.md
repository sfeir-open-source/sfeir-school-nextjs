<!-- .slide: class="with-code" -->

# `rewrites()`: same URL shown, different page served

A redirect changes the URL the browser shows. A rewrite doesn't — the
address bar stays put, but Next.js serves a different route's content
underneath. `rewrites()` returns three separately-timed buckets:

<small>

```js
// next.config.js — the shape rewrites() actually returns
async rewrites() {
  return {
    beforeFiles: [
      { source: '/e_:employeeId', destination: '/employees/:employeeId' },
      { source: '/e_:employeeId/edit', destination: '/employees/:employeeId/edit' },
    ],
    afterFiles: [],
    fallback: [],
  };
},
```

</small>

<div>

- **`beforeFiles`**: checked before Next.js even looks at `public/` files
  or any `page.tsx`. It can override a real route. This app's two entries
  are the missing half of the redirect mask: a visitor sent to `/e_42` by
  the last slide's redirect gets silently rewritten *back* to
  `/employees/42`'s real page — same component, same data, a different URL
  shown the whole time.
- **`afterFiles`**: checked only once static files and real pages already
  failed to match — a fallback for paths that don't correspond to anything
  on disk.
- **`fallback`**: the last resort, checked after even dynamic routes have
  been tried — useful for proxying an entire path prefix to a legacy site
  during an incremental migration. This app uses none of the two.

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->

Notes:

The mental model worth landing: beforeFiles can hide a real page behind a different URL (what's happening here), afterFiles and fallback catch requests that would otherwise 404. Order matters and is fixed by Next.js, not by array position across the three buckets. Where a request-scoped file called proxy.ts would fit into this order isn't covered yet — next module.
