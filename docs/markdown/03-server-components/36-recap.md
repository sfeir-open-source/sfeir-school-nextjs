<!-- .slide: class="two-column with-code " -->

<style>
  .tree-34{
    width: 500px;
    height: auto;
  }
</style>

# Let's summarise

- server components don't replace regular components
- server components is not SSR
- client-component and server-component are both rendered on the server
- only client-component are re-rendered on the client
- only client-components can use hooks and context
- server components can import components and pass props
- server components can import client-components
- client components can't import server-components (async / Node.js api / data loading etc ...)
