<!-- .slide: class="exercice" -->

<h1 id="data-caching" style="margin-bottom: 30px;">07.01 - Data Caching</h1>

## Lab

Turn on `cacheComponents`, cache the employee providers with `"use cache"`
and `cacheTag`, wrap the now-required `<Suspense>` boundaries, and add an
API route to invalidate the cache.

📖 See `apps/06-data-caching/README.md` for full step-by-step instructions.

<br/>

**ℹ️ Running the lab**<br/>
`npm run dev -- 06-data-caching` — the shared `server` Fastify backend on
port 9000 starts automatically as part of this app's `dev` target (same for
`06-data-caching-solution`), so no extra terminal is needed this time

Notes:

If a group finishes early, have them call `/api/revalidate?tag=one-employee` from the browser address bar, then reload an employee detail page and watch it re-fetch — that's the whole "throw away one photocopy" story made visible. Worth pointing out explicitly that expensees.ts staying uncached is intentional for this lab, not an oversight — one provider at a time is plenty for a first pass.
