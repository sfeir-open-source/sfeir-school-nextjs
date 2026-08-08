<!-- .slide: class="with-code" -->

# `next start`: the same app, minus the dev tooling

Next.js can run on **any** provider that gives you a Node.js process —
your own VM, a colleague's spare server, any cloud VM offering. Two
commands replace `npm run dev`:

```bash
next build   # compile, optimize, prerender everything module 14 decided could be
next start   # boot a production Node.js server from that build
```

<div>

- `next build` is where module 14's decisions actually happen: every page
  `generateStaticParams` covers gets baked into HTML right now, every
  `'use cache'` function with a long `cacheLife` gets its first photocopy
  made, and the build fails outright if a dynamic route forgets its
  static params — exactly as promised.
- `next start` boots the result as a long-running server. Per the Next.js
  docs, this single process handles **every** feature this course has
  built: Server Components, Server Actions, Proxy, streaming, Cache
  Components — nothing gets disabled, nothing needs a workaround.
- What Vercel quietly did for you now falls on your infrastructure: a
  reverse proxy in front of Next.js (rate limiting, TLS, malformed
  requests), a `sharp` install for Image Optimization, and — if you ever
  run more than one instance behind a load balancer — coordinating the
  cache and encryption keys across all of them so they agree on what's
  been revalidated.

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->

Notes:

Multi-instance cache coordination is genuinely advanced (custom cacheHandler, shared Redis, deploymentId) — name it so nobody's surprised later, but don't derail into configuring it live. One Node.js process on one machine works with zero extra setup; the moment you add a second instance for scale, that's when the extra plumbing becomes necessary, not before.
