<!-- .slide: class="with-code" -->

# Then why doesn't this app use Route Handlers to save data?

Module 08 shows another way to mutate data — a **Server Action** — and this
app's forms use that instead of `POST /api/employees`. Both run on the
server; the difference is *who's allowed to call them*:

- A Server Action is only reachable the way React wires it up — a `<form>`'s
  `action`, called from inside this same app. Nothing else can invoke it
  directly.
- A Route Handler is a URL. Anything that can send an HTTP request can call
  it: a public API consumer, a webhook from a third-party service, a mobile
  app that isn't running React at all.
- The rule of thumb: if the caller is a form you wrote, in this app, module
  08's Server Actions are less code for the exact same result. Reach for a
  Route Handler when the caller **isn't** your own form — that's the door
  `EmployeeExpenses` already needed in this module, and it's the same door
  a public API or webhook would need later.

Notes:

Don't teach Server Actions here — one paragraph is enough so "why two ways to write data" doesn't linger as an open question once module 08 introduces the second one. The concrete anchor: EmployeeExpenses already needed a Route Handler for a GET, for exactly this reason — the caller was a Client Component, not a form submission.
