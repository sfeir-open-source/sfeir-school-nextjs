# 07.01 - Lifecycles

## Prerequisites

Running the API server :

```
npm run start -w api
```

## Running the lab

```
npm run dev -w 07.01
```

## Instructions

1. Complex URL management (Rewrites)

   - For SEO purposes, we need to modify the URLs of employee detail pages
   - For example, we now want to access the page `/employees/1234` via `/e_1234`

2. A/B Testing (Rewrites)

   - A new page has been created : `/expenses/variation/page.tsx`
   - When the `abtest=true` cookie is present, display this page rather than the default page `/expenses/page.tsx`

3. Redirects

   - Make sure the `/employees/[id]` pathname is not reachable directly
   - Make sure the `/expenses/variation` pathname is not reachable directly
