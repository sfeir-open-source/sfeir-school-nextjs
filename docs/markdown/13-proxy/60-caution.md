<!-- .slide: class="with-code" -->

# Powerful, and Next.js says: use it sparingly

`proxy()` runs on the network edge, in front of everything — which makes it
tempting to put more and more logic there. Next.js's own docs push back on
that instinct directly:

- *"Proxy should not be your only line of defense in protecting your
  data."* The check in this app's `proxy.ts` is a fast, **optimistic**
  check — a signature and expiry check on a cookie, nothing more. It's a
  good bouncer at the door, not the whole security system.
- The real protection still has to live close to the data: a `getExpenses`
  or `getEmployees` call that a Server Component `await`s, a Server Action
  that mutates something — those should verify the session themselves too,
  the same instinct as module 09's `try`/`catch` around every fetch.
  `proxy()` catching most unauthenticated visitors early doesn't excuse
  skipping that.
- And structurally: `proxy()` isn't the place for business logic either —
  no data fetching, no `'use cache'`, nothing route-specific. Its whole job
  is "redirect, rewrite, or let through," decided from the request alone.
  Anything heavier belongs in a `page.tsx`, a Server Action, or a Route
  Handler, where module 04 through module 09's tools are built for it.

Notes:

The exact quote is from nextjs.org/docs/app/guides/authentication, the "Optimistic checks with Proxy" section — cite it by name if the room asks where "optimistic" comes from. Keep the tone as "here's the guardrail," not "proxy is dangerous, avoid it" — it's the right tool for exactly this login gate, just not a place to grow.
