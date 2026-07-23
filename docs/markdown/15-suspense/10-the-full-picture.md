<!-- .slide: class="with-code" -->

# We said this was the shallow version — here's the rest

Module 12 closed with an explicit IOU: *"Not covered today: nesting
`<Suspense>` boundaries inside each other for a progressive, multi-stage
reveal, the `loading.tsx` file convention that wraps a whole route segment
automatically, and the finer rules about what does or doesn't trigger a
boundary. Module 15 is entirely dedicated to all of that."* This is that
module.

- Nothing from module 12 gets replaced today. A Server Component's render
  still pauses on `await`, `<Suspense>` still wraps the slow part and gives
  it a `fallback`, whatever sits outside a boundary still ships the moment
  it's ready. The restaurant analogy still holds, word for word.
- What's new is the toolbox around that same idea: a file convention that
  writes an entire route segment's `<Suspense>` for you, and permission to
  nest a second, narrower boundary *below* it — around one slow piece
  buried inside an otherwise-fast page.
- Same habit as every "not today" slide this course has used: recognize the
  shape then, get the full depth now.

Notes:

Bridge slide, should feel like turning a page, not restarting the topic. Worth literally rereading module 12's closing bullet out loud before moving on — the room carried that promise for a few days, land it explicitly.
