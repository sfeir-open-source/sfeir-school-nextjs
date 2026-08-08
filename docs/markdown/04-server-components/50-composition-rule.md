<!-- .slide: class="tc-multiple-columns" -->

##++##

<img src="./assets/images/04-server-components/tree-3.png" class="sc-tree-img" />

##++##

##++##

<br/> <br/>

# The rule: Server can import Client, not the other way round

- A Server Component can freely `import` and render a Client Component — you
  just saw `EmployeesList` do exactly that with `Card`/`Button`.
- The reverse doesn't work: once you're inside a Client Component's import
  graph, everything it `import`s is treated as client code too — there's no
  way to "dip back" into a server-only import from there.
- If `Pagination` needed direct database access, importing it from inside
  `EmployeesList` would drag that server-only code into the client bundle —
  and it would break, the same way the `node:fs` import broke earlier.

##++##

Notes:

Keep this rule crisp: the arrow only points one way. Server → Client, always fine. Client → Server via a plain import, never fine. The next slide shows the actual escape hatch for this exact situation.
