<!-- .slide: class="exercice" -->

<h1 id="rendering-methods" style="margin-bottom: 30px;">14.01 - Rendering Methods</h1>

## Lab

Use `generateStaticParams` to prerender employee and expense detail pages
at build time, then force the homepage's "latest employees" widget to stay
dynamic with `connection()`.

📖 See `apps/13-rendering-methods/README.md` for full step-by-step
instructions.

<br/>

**ℹ️ Running the lab**<br/>
`13-rendering-methods`'s `dev` target starts the `server` backend for you —
just run `npm run dev -- 13-rendering-methods` (same for
`13-rendering-methods-solution`)

Notes:

Step 2's guard is the one worth lingering on: it's what makes an id created after the build genuinely 404 instead of silently rendering on demand, which is a deliberate teaching choice, not the only correct one — say so explicitly if asked. If a group finishes early, have them run npx nx build 13-rendering-methods and grep the output for the prerendered /employees/<id> routes versus the handful of /expenses/<id> ones, to see generateStaticParams' effect made concrete in the build log.
