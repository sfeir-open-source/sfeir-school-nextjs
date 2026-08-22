<!-- .slide: class="exercice" -->

<h1 id="proxy" style="margin-bottom: 30px;">13.01 - Proxy</h1>

## Lab

Write a `proxy.ts` that gates the app behind a session cookie, add a logout
Server Action, then verify the redirects work in both directions.

📖 See `apps/12-middleware/README.md` for full step-by-step instructions.

<br/>

**ℹ️ Running the lab**<br/>
`12-middleware`'s `dev` target starts the `server` backend for you — just
run `npm run dev -- 12-middleware` (same for `12-middleware-solution`)

Notes:

12-middleware ships with a working login form, action, and /api/login route, but nothing reads the cookie back — that's the entire gap this lab closes. If a group finishes early, have them temporarily narrow the matcher to just '/employees' and reload /expenses without a session, to feel firsthand why the app's real matcher is a broad exclude-list rather than an allow-list of protected routes. This app's next.config.js already ships the redirects()/rewrites() the room built by hand in module 12's lab — no need to touch it here, proxy.ts is the only file this lab is about.
