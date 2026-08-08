<!-- .slide: class="with-code" -->

# One question to ask, every time

Faced with "I need data from the backend", you only need to ask yourself one
thing:

> **Is this a Server Component fetching for its own render — or does
> something running in the browser need to reach it?**

- **Just a Server Component rendering a page** → call the provider directly,
  `await` it in the component. That's `getEmployees`, `getExpenses`,
  `getExpenseById` — every page you've seen today except one.
- **A Client Component, an external client, or a webhook needs to call it** →
  write a Route Handler. It's the only door into your server-only code that a
  browser, `curl`, or a third-party service can knock on.
- Don't reach for a Route Handler by default "just in case" — most pages
  never need one. `EmployeeExpenses` needed `/api/expenses` because it's
  interactive and deferred, not because fetching itself demanded it.

Notes:

This is the slide to point back to whenever "should I write an API route for this" comes up later in the course. Say it plainly: default to fetching straight in the Server Component, and only add a Route Handler when something outside the server-render path needs to call in.
