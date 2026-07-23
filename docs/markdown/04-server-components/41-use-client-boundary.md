<!-- .slide: class="tc-multiple-columns" -->

##++##

<img src="./assets/images/04-server-components/tree-2.png" class="sc-tree-img" />

##++##

##++##

<br/> <br/>

# `'use client'` marks a boundary, not just a file

- Once `EmployeesList` says `'use client'`, everything it **imports and
  renders directly** — `EmployeeCard`, `Card`, `Button` — is pulled into the
  client bundle with it.
- `Header`, off to the side, is untouched — it isn't part of that component's
  import graph, so it stays a Server Component.
- The boundary follows the **module graph** (who imports whom), not the
  visual layout of the page.

##++##

Notes:

This is the detail most people trip on: 'use client' isn't scoped to one component, it's scoped to everything that file drags in with it. That's exactly why the SFEIR People Search component stays a small, isolated file — so the boundary it draws is as small as possible.
