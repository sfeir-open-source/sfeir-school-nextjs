<!-- .slide: class="with-code" -->

# What actually makes the spectrum possible

Module 14 described a spectrum — pure static HTML, cached photocopies, and
genuinely live-per-request data, all inside the same page — and said
`<Suspense>` was "what makes that safe." Streaming is that safety
mechanism, made concrete:

- **Chunk 1**, sent instantly: the static shell — everything outside every
  boundary, plus every boundary's `fallback`. On `/employees/[id]`, that's
  the layout chrome, and, in the moment right before it resolves, the
  page's own `fallback`.
- **Chunk 2 onward**, sent as each boundary resolves: `PersonCard`'s
  cached details swap in first, `EmployeeExpenses`'s live data follows a
  beat later — each piece arriving exactly when its own `await` settles,
  never sooner, never later than it has to.
- `loading.tsx` and nested `<Suspense>` aren't a feature separate from
  module 14's spectrum — they're literally how one response can carry a
  build-time-static sidebar, a cached-photocopy person card, and a live
  expenses table, all at once, each streamed in on its own schedule.

Notes:

Closing conceptual tie-together — connect module 14's vocabulary to today's mechanism explicitly before the lab, so the two modules read as one continuous idea rather than two separate topics that happen to be adjacent.
