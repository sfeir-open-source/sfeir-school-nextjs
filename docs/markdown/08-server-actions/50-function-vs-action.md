<!-- .slide: class="with-code" -->

# "Server Function" vs "Server Action" — same thing, different hat

Both words are showing up in the same breath, so it's worth being precise
about what each one means, straight from the React/Next.js docs:

> A **Server Function** is an `async` function that runs on the server and
> can be called from the client. A **Server Action** is a Server Function
> used in a specific way — for handling form submissions and mutations.
> Server Function is the broader term.

- `createEmployee` and `updateEmployee` are both Server Functions the moment
  they're written with `'use server'` — that part is true no matter how
  they end up being called.
- They *become* Server Actions the instant one gets passed to a `<form>`'s
  `action` prop (or a `<button>`'s `formAction`) — that's the "specific
  way" the definition is pointing at.
- Don't stress over picking the exact word in conversation — even the
  official docs use them almost interchangeably once the distinction is
  understood. What matters is recognizing the shape when you see it.

Notes:

This is a vocabulary checkpoint, not a new concept — keep it brief. The one thing worth landing precisely: Server Function is the umbrella term, Server Action is what you call one specifically wired to a form.
