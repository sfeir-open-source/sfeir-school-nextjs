<!-- .slide: class="exercice" -->

<h1 id="data-caching" style="margin-bottom: 30px;">07.01 - Data Caching</h1>

## Lab

<small>

**1. Flip the switch**

- In `06-data-caching/next.config.js`, add `cacheComponents: true` to the
  exported config — nothing is cached yet, but this is what makes
  `"use cache"` mean anything

**2. Cache the employee providers**

- In `app/providers/employees.ts`, add `import { cacheTag } from 'next/cache'`
- Add `'use cache'` as the first line of `getEmployees`, then
  `cacheTag('all-employees')` right after it
- Do the same for `getEmployee`, with `cacheTag('one-employee')` instead —
  leave `app/providers/expensees.ts` untouched, it's out of scope for this
  lab

**3. Wrap the now-required `<Suspense>` boundaries**

- `cacheComponents` expects every per-request part of a page (anything
  reading `params` or `searchParams`) to sit inside `<Suspense>` — split the
  data-fetching JSX into its own inner component and wrap it, in:
  `employees/page.tsx`, `employees/[id]/page.tsx`,
  `employees/[id]/edit/page.tsx`, `employees/logs/page.tsx`,
  `expenses/page.tsx` and `expenses/[id]/page.tsx`
- Don't worry about explaining *why* `<Suspense>` works this way yet —
  module 12 starts covering that, and module 15 goes deep; for now just
  match the shape

**4. Give mutations a way to invalidate the cache**

- Create `app/api/revalidate/route.ts` with an `export const GET` that reads
  `tag` off `request.nextUrl.searchParams`
- If `tag === 'all'`, call `revalidatePath('/', 'layout')`; otherwise call
  `revalidateTag(tag, { expire: 0 })` — both from `next/cache`

**5. Verify against the solution**

- Run `06-data-caching-solution` alongside yours and compare
  `next.config.js`, `app/providers/employees.ts` and
  `app/api/revalidate/route.ts`

</small>

<br/>

**ℹ️ Running the lab**<br/>
`npm run dev -- 06-data-caching` — the shared `server` Fastify backend on
port 9000 starts automatically as part of this app's `dev` target (same for
`06-data-caching-solution`), so no extra terminal is needed this time

Notes:

If a group finishes early, have them call `/api/revalidate?tag=one-employee` from the browser address bar, then reload an employee detail page and watch it re-fetch — that's the whole "throw away one photocopy" story made visible. Worth pointing out explicitly that expensees.ts staying uncached is intentional for this lab, not an oversight — one provider at a time is plenty for a first pass.
