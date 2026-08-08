<!-- .slide: class="with-code" -->

# From a click to pixels: the six steps

This module zooms into two of these steps — rendering and streaming — but
they sit inside a longer, fixed sequence every request goes through, start
to finish:

1. **Request arrives** — a browser navigation, or a `fetch`, hits Next.js.
2. **The proxy runs, if this app has one** — a `proxy.ts` can inspect,
   redirect, or rewrite the request before anything else happens. Module 13
   is entirely dedicated to this step; today, treat it as a step that
   *exists*, not one to build.
3. **Routing resolves** — Next.js matches the URL to a segment tree:
   which `layout.tsx`s, which `page.tsx`, from module 02's file conventions.
4. **Server Components render** — the matched tree runs on the server,
   `await`ing whatever data it needs. This is where today's module starts.
5. **The response streams** — finished chunks are sent as they're ready,
   instead of waiting for the slowest one.
6. **The client hydrates** — the browser paints the HTML it received, then
   attaches interactivity to any Client Components in the tree.

Notes:

This is the map for the whole module — say explicitly that steps 4 and 5 are what the rest of today's slides zoom into, and step 6 gets one slide near the end. Step 2 is a pure forward pointer: don't explain proxy.ts here, just name it so the room has the full sequence in their head, not a gap where "something happens before routing" was left unsaid.
