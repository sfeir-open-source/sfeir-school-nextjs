<!-- .slide: class="exercice" -->

<h1 id="middleware" style="margin-bottom: 30px;">07.02 - Middleware</h1>

## Lab

<small>

**1. Authentication route protection**

- The connection form is now operational: see how it works in /src/app/(auth)/actions.ts
- But there are still a few things missing: we need to prevent an unauthenticated user from accessing the dashboard pages.
- Using the middleware, check the user connection and redirect it to /login if it is not authenticated.

**2. Redirection**

- If the user tries to access /login while logged in, redirect them to the home page.

**3. Bonus : Logout action**

- Implement a "logout" button in the navigation menu

**ℹ️ Running the lab**<br/>
`npm run dev -w 07.02`

</small>
