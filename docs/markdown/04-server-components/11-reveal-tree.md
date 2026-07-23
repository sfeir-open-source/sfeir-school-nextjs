<!-- .slide: class="tc-multiple-columns" -->

##++##

<style>
  .sc-tree-img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  }
</style>

# Server by default — the whole tree

<img src="./assets/images/04-server-components/tree-0.png" class="sc-tree-img" />

##++##

##++##

<br/> <br/>

- This isn't one file being special — it's the default for **every**
  component under `app/`.
- Nothing here opted into anything. This is just what happens when you write
  a `page.tsx` and import components into it, exactly like `EmployeesList`,
  `PersonCard` and `PageTitle` in our own app.
- React calls these **Server Components**. In the App Router, that's not an
  advanced feature you switch on — it's the starting point.

##++##

Notes:

Point at the tree and connect each box to something real: App is layout.tsx, EmployeesList is the employees page.tsx, EmployeeCard is PersonCard. The whole tree renders on the server before a single byte reaches the browser.
