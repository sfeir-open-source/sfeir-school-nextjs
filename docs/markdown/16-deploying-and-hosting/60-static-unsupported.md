<!-- .slide: class="with-code" -->

# The price of "no server at runtime"

The Next.js docs are explicit and specific about what stops working —
anything that needs a live request to answer, or logic that genuinely
can't be settled at build time:

- **Nothing that reads *this* request** — `cookies()`, a Route Handler
  that reads its incoming `Request`, and Proxy (module 13's entire lab —
  it needs a live request to intercept, full stop). The `rewrites` /
  `redirects` / `headers` options in `next.config.js` are unsupported
  outright too, not only the request-aware variants.
- **Nothing that writes** — Server Actions (module 08 and 09's whole
  mutation flow) require a server to receive the POST and run the
  mutation. A static file can't do that.
- **Nothing that regenerates after the build** — Incremental Static
  Regeneration is unsupported outright, and Draft Mode with it. Once
  `out/` is written, it's frozen until the next `next build`.
- **Dynamic routes need a complete, known list** — exactly module 14's
  `generateStaticParams`, except now it's not optional: no
  `dynamicParams: true` escape hatch, no falling back to render an
  unknown `/employees/<id>` on demand. Every valid id must be in the list
  *before* the build.

Notes:

This is the exhaustive list from the docs, trimmed to the phrasing that maps onto modules this room already sat through — resist reading it as a dry spec sheet, each bullet should land as "yes, that thing from three days ago." Image Optimization and Intercepting Routes are also on the official unsupported list; mention only if asked, they haven't come up by name this week.
