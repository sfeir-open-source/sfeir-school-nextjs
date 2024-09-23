<!-- .slide: class="exercice" -->

<h1 id="rendering-methods" style="margin-bottom: 30px;">08.01 - Rendering methods</h1>

## Lab

<small>

**1. Opt out static rendering on homepage**

- The page should be rendered on every request
- The page should fetch its data on every request

**2. Implement Incremental Static Regeneration for employees**

- Pre-render employee details and edit pages at build time
- Don't accept new employee requests at run-time

**3. Implement Incremental Static Regeneration for expenses**

- Pre-render expenses details pages at build time
- Render new expenses details pages at run-time

**4. Bonus** : <br/>
Implement a `<NoSSR>{children}</NoSSR/>` component : that make sure its children are never rendered on the server

**ℹ️ Running the lab**<br/>
`npm run start -w api`<br/>
`npm run dev -w 08.01`

</small>
