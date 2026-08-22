<!-- .slide: class="exercice" -->

<h1 id="lifecycle" style="margin-bottom: 30px;">12.01 - Lifecycle</h1>

## Lab

Observe streaming and caching behavior on the home page's two widgets,
break a `<Suspense>` boundary on purpose, then add the `redirects()` and
`rewrites()` still missing from `next.config.js`.

📖 See `apps/11-lifecycle/README.md` for full step-by-step instructions.

<br/>

**ℹ️ Running the lab**<br/>
`11-lifecycle`'s `dev` target starts the `server` backend for you — just run
`npm run dev -- 11-lifecycle` (same for `11-lifecycle-solution`)

Notes:

Steps 1 to 3 are the same "break it on purpose" exercise as before — there's still nothing to write there. Step 4 is the new, real task: 11-lifecycle's next.config.js is missing redirects() and rewrites() entirely, only 11-lifecycle-solution has them. Remind the room next.config.js edits need a dev server restart, unlike everything else in this app. If a group finishes early, have them add a fourth redirect of their own (e.g. a short-link mask for /login) to confirm they understand the source/destination pattern-matching, not just copy-pasted the solution's three entries.
