<!-- .slide: class="with-code" -->

# Closer to the crash = smaller the damage

`app/error.tsx` catches *everything* below the root — a crash on
`/employees` or `/expenses` both fall back to the same generic "service
unavailable" screen, sidebar and all. Put an `error.tsx` deeper in the tree
instead, and only that branch goes down:

```
app/
  error.tsx              ← catches any segment below root
  (dashboard)/
    layout.tsx           ← the sidebar + nav — NOT wrapped by a segment's own error.tsx
    employees/
      error.tsx           ← (hypothetical) catches only /employees and below
      page.tsx
    expenses/
      page.tsx
```

<div>

- One precise rule: an `error.tsx` wraps `page.tsx` and any nested
  `layout.tsx` *below* it — it does **not** wrap the `layout.tsx` sitting in
  its own segment. A boundary on `employees/` would leave `(dashboard)`'s
  sidebar standing, replacing only the broken content next to it.
- That's the "don't take the whole dashboard down for one broken widget"
  instinct, applied at the route level: `/expenses` crashing wouldn't touch
  `/employees` at all — they're different URLs, different renders.
- But look at the real home page of this app: employees *and* expenses show
  up **together**, on the same URL. Route-segment nesting can't isolate
  them from each other — they aren't separate routes to begin with.

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->

Notes:

The tree above is illustrative, not a file that exists in 09-error-boundaries — say that explicitly if asked. The point is the general rule (error.tsx skips its own segment's layout), which sets up the real problem on the next slide: two widgets, one URL, one page.tsx can't help.
