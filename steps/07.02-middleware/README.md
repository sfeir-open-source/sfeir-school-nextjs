# 07.02 - Middleware

## Prerequisites

Running the API server :

```
npm run start -w api
```

## Running the lab

```
npm run dev -w 07.02
```

## Instructions

1. Authentication route protection

   - The connection form is now operational: see how it works in /src/app/(auth)/actions.ts
   - But there are still a few things missing: we need to prevent an unauthenticated user from accessing the dashboard pages.
   - Using the middleware, check the user connection and redirect it to /login if it is not authenticated.

2. Redirection

   - If the user tries to access /login while logged in, redirect them to the home page.

3. Bonus : Logout action

   - Try to implement a "logout" button in the navigation menu

## Informations

- To check for the user authentication, you can read the `access_token` cookie, which is defined by the `login` action (`/src/app/(auth)/actions.ts`)
- You can validate this token using the `verifyToken` function (`/src/functions/auth.ts`)
