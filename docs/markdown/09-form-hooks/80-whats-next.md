<!-- .slide: class="with-code" -->

# What this slide isn't showing yet

`createEmployee`'s `catch` block still has one branch that `throw`s: any
error that isn't a `400` `ApiError` — a real `500`, a network failure — goes
straight back up, unhandled, past `useActionState` entirely.

- Right now that means React's default: the nearest error boundary catches
  it, and the visitor sees a generic crash screen instead of a friendly one.
- Module 10 is entirely dedicated to that — `error.tsx`, what it catches, and
  how to design a boundary that doesn't just say "Something went wrong."
- Today's rule stays simple: `useActionState` is for *expected*, structured
  failures (bad input) that the form should recover from in place;
  everything else is an *unexpected* failure, and that's a different tool.

Notes:

Pure forward pointer, mirror module 08's closing slide. Don't teach error.tsx here — one paragraph so the room isn't left wondering what happens on a real 500.
