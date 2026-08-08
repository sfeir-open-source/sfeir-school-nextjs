<!-- .slide: class="tc-multiple-columns" -->

##++##

<img src="./assets/images/04-server-components/tree-5.png" class="sc-tree-img" />

##++##

##++##

<br/> <br/>

# Good to know: `children` is the exception

- A Client Component **can** receive a Server Component as `children` (or any
  other prop) — it just can't `import` one itself.
- Here, `App` (a Server Component) renders `Pagination` on the server, then
  hands the already-rendered result to `EmployeesList` as `children`.
  `Pagination`'s own code never joins the client bundle.
- This is the pattern behind our own `ExpensesTable` / `ExpensesTableRow`
  split, coming right up — full depth on composing server and client trees is
  module 05's topic, so just recognize the shape for now.

##++##

Notes:

Deliberately light-touch — this is a preview, not the full lesson. If someone pushes for more, say "great question, that's the whole next module" and move on, same deferral pattern module 03 used for active links.
