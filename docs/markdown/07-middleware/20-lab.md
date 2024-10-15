<!-- .slide: class="exercice" -->

<h1 id="lifecycles" style="margin-bottom: 30px;">07.01 - next.config.js lifecycles</h1>

## Lab

<small>

**1. Complex URL management (Rewrites)**

- For SEO purposes, we need to modify the URLs of employee detail pages
- For example, we now want to access the page `/employees/1234` via `/e_1234`

**2. A/B Testing (Rewrites)**

- A new page has been created : `/expenses/variation/page.tsx`
- When the `abtest=true` cookie is present, display this page rather than the default page `/expenses/page.tsx`

**3. Redirects**

- Make sure the `/employees/[id]` pathname is not reachable directly
- Make sure the `/expenses/variation` pathname is not reachable directly

**ℹ️ Running the lab**<br/>
`npm run dev -w 07.01`

</small>
