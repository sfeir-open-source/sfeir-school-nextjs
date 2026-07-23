<!-- .slide: class="with-code" -->

# The route exists. How do we get to it?

The obvious way to link somewhere on the web is a plain HTML anchor tag:

```tsx
<a href={`/employees/${employee.id}`}>View detail</a>
```

It works — the browser navigates. But it works the way the **web** has
always worked, not the way our dashboard has worked so far:

<div>

- **Full page reload** — the browser throws away the current page and
  requests a brand new one from scratch, exactly like typing the URL bar.
- **The layout rebuilds too** — the sidebar and header we spent module 02
  making persist across navigation? Gone. Re-fetched, re-rendered, re-painted.
- **Nothing is prefetched** — the browser has no idea `/employees/42` exists
  until the moment you click it, so there's a visible wait before it loads.

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->

Notes:

This is the same shape of problem slide as "one page down, now add nine more" in module 02 — name the pain precisely before showing the fix. If you have the app open, click a plain <a> link and point out the full white flash / reload in the browser tab.
