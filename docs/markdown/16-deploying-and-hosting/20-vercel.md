<!-- .slide: class="tc-multiple-columns" -->

##++##

<style>
  .deploy16-vercel-img {
    width: 60%;
    height: auto;
  }
</style>

<img src="./assets/images/01-intro/vercel.png" class="deploy16-vercel-img" />

# The "it just works" option

Module 01 promised we'd get here: Vercel is the hosting platform built by
the same team that builds Next.js. Push to a connected Git repo, and it
builds, deploys, and serves your app — no config file to write.

##++##

##++##

<div>

- Every feature this week has a Vercel-native counterpart with zero setup:
  `'use cache'` and ISR get a managed edge cache, Server Actions and Proxy
  run without you touching a server process, streaming and Suspense arrive
  at CDN latency instead of origin latency.
- That closeness isn't a lock-in trick, though. Vercel deploys Next.js
  through the same public **Deployment Adapter API** any platform can use
  — it gets no private hooks the rest of the ecosystem doesn't also have
  access to.
- Being honest about the trade-off: it's a paid product past a generous
  free tier, and it's one opinion about infrastructure among several. The
  rest of this module is about the other options — and what you keep,
  and what you now own yourself, when you pick one of them.

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->

##++##

Notes:

Keep this brief and factual, not a pitch — one slide, then move on to the options students are more likely to actually touch in a job. If asked "so should we use Vercel," the honest answer is "for most teams, yes, unless you have a specific reason not to" — but that's a business call, not a technical one.
