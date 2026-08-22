<!-- .slide: class="exercice" -->

<h1 id="error-boundaries" style="margin-bottom: 30px;">10.01 - Error Boundaries</h1>

## Lab

Add a root `error.tsx` safety net plus dedicated `error.tsx` boundaries for
the home page's two parallel route slots, then verify a failure in one
widget stays isolated from the rest of the page.

📖 See `apps/09-error-boundaries/README.md` for full step-by-step
instructions.

<br/>

**ℹ️ Running the lab**<br/>
`09-error-boundaries`'s `dev` target does **not** start the backend for you
— run `npx nx serve server` in one terminal, then `npm run dev -- 09-error-boundaries`
in a second one (same for `09-error-boundaries-solution`)

Notes:

Point out the difference from every previous lab this week: this app's dev target has no dependency on server:serve, so a group that only runs npm run dev -- 09-error-boundaries will just see every page crash — which is actually a free, real demo of the whole module before they've written a single error.tsx. If a group finishes early, have them delete app/error.tsx entirely and reload with the server stopped, to see Next.js's own generic screen from the start of the module one more time.
