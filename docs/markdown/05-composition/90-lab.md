<!-- .slide: class="exercice" -->

<h1 id="composition" style="margin-bottom: 30px;">05.01 - Composition</h1>

## Lab

Extract `ExpensesTableRow` and `NavigationItem` as small `'use client'`
components, keeping their parent components (`ExpensesTable`,
`NavigationMenu`) as Server Components that just pass `children` through.

📖 See `apps/04-composition/README.md` for full step-by-step instructions.

<br/>

**ℹ️ Running the lab**<br/>
`npm run dev -- 04-composition`

Notes:

If a group finishes early, point them at Theme.tsx and (dashboard)/layout.tsx and ask them to explain out loud why Theme never needs to import anything from the pages it wraps — good check that the resolution slide actually landed.
