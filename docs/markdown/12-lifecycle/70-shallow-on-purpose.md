<!-- .slide: class="with-code" -->

# Enough to read a page, not enough to master one yet

That's the whole shape: wrap the slow part, give it a `fallback`, and the
rest of the page stops waiting on it. On purpose, this module stops there:

- Not covered today: nesting `<Suspense>` boundaries inside each other for a
  progressive, multi-stage reveal, the `loading.tsx` file convention that
  wraps a whole route segment automatically, and the finer rules about what
  does or doesn't trigger a boundary. Module 15 is entirely dedicated to all
  of that.
- What today *does* buy you: every `<Suspense>` you've been typing without
  asking why, since module 07's lab, now has an actual reason behind it —
  and you can look at any page in this app and predict what a visitor sees,
  and roughly when.
- Same habit as every "not today" slide this course has used — module 10's
  `error.tsx`, module 11's `notFound()`: recognize the shape now, get the
  full depth later.

Notes:

Explicit expectation-setting, mirror the tone of module 10's "whats-next" slide. The room should leave knowing exactly what's deferred and why, not feeling like something was glossed over accidentally.
