<!-- .slide: class="with-code" -->

# `Theme` isn't a one-off — it's a named pattern

Next.js's own docs call this exact shape the **"Context providers"** pattern,
and `Theme` is a textbook instance of it:

> "React context is not supported in Server Components... To use context,
> create a Client Component that accepts `children`... Your Server Component
> will now be able to directly render your provider, and all other Client
> Components throughout your app will be able to consume this context." —
> [Next.js docs](https://nextjs.org/docs/app/getting-started/server-and-client-components#context-providers)

- Same shape, different job: an auth session, the current locale, a feature-flag
  set — anything read through React context needs its provider to be a
  Client Component, for the same reason `Theme` does.
- The docs add one precise tip: **render providers as deep as possible in the
  tree** — wrap only `{children}`, never the whole `<html>` document. `Theme`
  already does this, wrapping the dashboard shell, not the root layout.
- Wrapping deeper keeps more of the tree eligible to stay a plain Server
  Component — the smaller the Client Component, the more of the page around
  it can stay server-rendered.

Notes:

This is the "here's the name for what you just built" slide — Theme already does everything this pattern describes, so it's confirmation, not new mechanics. The "as deep as possible" tip is worth calling out explicitly since it's easy to get backwards (wrapping RootLayout's html/body feels natural, but throws away more static rendering than necessary).
