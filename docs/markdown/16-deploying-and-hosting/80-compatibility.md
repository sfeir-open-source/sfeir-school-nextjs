<!-- .slide: class="with-code" -->

# Checked against what you actually built this week

- **A Node.js server and Docker** run the exact same Next.js production
  server underneath — the docs' own comparison table marks both simply
  **"All"** for feature support. **Vercel** isn't a different code path
  either: it's a verified adapter that runs that same compatibility test
  suite end to end. All three carry every module's lab, unmodified:
  module 08's Server Actions, module 13's Proxy, module 07's `'use
  cache'`, module 14's `connection()`-forced live widget, module 15's
  streaming — all of it, as written.
- **Static export is the one that can't come along.** Module 08's Server
  Actions and module 13's Proxy are both on the docs' unsupported list by
  name. The homepage's "latest employees" widget forces itself live with
  `connection()` — precisely the kind of per-request logic static export
  has no server left to run. Three separate modules' worth of code would
  need to change, not just a config flag.
- That's not a flaw in this app, or in static export — it's what the
  trade-off from the last slide predicted. An app whose entire point is
  "logged-in people editing live data" was never the app static export
  was built for. Choosing Vercel, a Node.js server, or Docker here isn't
  settling — it's the deployment target this app was built toward, module
  by module, since 08.

Notes:

If pressed for the exact source: the "All / All / Limited" split is the Next.js docs' own deploying page comparison table. Good closing beat before wrapping up — the takeaway is that "which deployment option" was actually being decided all week, one module at a time, not today for the first time.
