<!-- .slide: class="exercice" -->

<h1 id="server-components" style="margin-bottom: 30px;">04.01 - Server Components</h1>

## Lab

Use a Server Component to write search logs straight to the filesystem, and
read them back on a dedicated page — direct Node.js access with no API
layer needed, because none of this code ever ships to the browser.

📖 See `apps/03-server-components/README.md` for full step-by-step
instructions.

<br/>

**ℹ️ Running the lab**<br/>
`npm run dev -- 03-server-components`

Notes:

If a group finishes early, have them open ExpensesTableRow.tsx and NavigationItem.tsx in libs/ui-solution and find the 'use client' line plus the hook that needed it — useRouter and usePathname respectively. Also worth pointing out ExpensesTable.tsx in the starter lib is marked 'use client' for no real reason — a good "would you leave this as-is?" discussion prompt using today's decision rule.
