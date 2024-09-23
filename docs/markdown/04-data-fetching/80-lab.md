<!-- .slide: class="exercice" -->

<h1 id="caching" style="margin-bottom: 30px;">04.02 - Caching</h1>

## Lab

<small>

Currently, the data-cache is activated. If you try to add a new employee using swagger, you won't see any change on the application.

Let's create a mechanism to fix this :

**1. Modify the fetch requests to add `tags`**

**2. Create two new route handlers :**

- a first one to revalidate data cache based on a tag
- second one to revalidate all data cache

**3. Play with cache revalidation**

<br/>

**ℹ️ Running the lab**<br/>
`npm run start -w api`<br/>
`npm run dev -w 04.02`<br/>

</small>
