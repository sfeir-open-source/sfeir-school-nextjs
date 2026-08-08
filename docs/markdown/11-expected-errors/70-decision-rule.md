<!-- .slide: class="with-code" -->

# The rule for the rest of your career

Two boundaries, two very different jobs — and now you have both:

<div>

- **The server threw an exception nobody planned for** — a real `500`, a
  backend that's down, an actual bug → let it `throw`, `error.tsx` catches
  it. Module 10.
- **Your own code decided something doesn't exist** — a bad id, a lookup
  that came back empty → call `notFound()` yourself, `not-found.tsx`
  renders it. Module 11.
- Same instinct as module 09's `400` vs everything-else split in
  `createEmployee`: check for the outcome you *expected*, handle it
  explicitly and precisely; let anything you didn't expect keep being an
  exception, and keep `error.tsx` as the net that catches it.

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->

Notes:

This is the slide to slow down on — it's the one-sentence summary the room should leave with. Say it out loud once more if there's time: expected outcome, model it as a value / call notFound(); genuinely unexpected, let it throw and land in error.tsx.
