<!-- .slide: class="exercice" -->

<h1 id="navigation" style="margin-bottom: 30px;">03.01 - Navigation</h1>

## Lab

Build employee and expense detail pages with dynamic `[id]` routes, then
link to them from the list pages with `<Link>` from `next/link`.

📖 See `apps/02-navigation/README.md` for full step-by-step instructions.

<br/>

**ℹ️ Running the lab**<br/>
`npm run dev -- 02-navigation`

Notes:

If a group finishes early, have them try navigating to a bad id like /employees/999 and notice the "Not found" fallback branch — good segue into error handling later in the course, no need to explain it now. Keep them from over-building the expense row click handler themselves; that needs a client hook they haven't met yet, next-directly-in-the-URL is a fine stopping point today.
