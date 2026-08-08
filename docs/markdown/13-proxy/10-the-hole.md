<!-- .slide: class="with-code" -->

# `/login` exists — nothing actually requires it

`12-middleware` already has everything *login* needs: a `(auth)/login/page.tsx`
form, a `login` Server Action that checks credentials and sets a cookie, an
`/api/login` route behind it. What it doesn't have yet is anything that
*uses* that cookie to protect the rest of the app:

```tsx
// app/(dashboard)/layout.tsx — the whole file, today
const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  return (
    <Theme>
      <div className="flex bg-blue-50 dark:bg-slate-950 dark:text-white">
        <header>{/* sidebar, logo, nav */}</header>
        <main className="w-full p-4">{children}</main>
      </div>
    </Theme>
  );
};
```

<div>

- Open a private browser tab, no cookie at all, and go straight to
  `/employees` or `/expenses`: the dashboard renders anyway. Nobody ever
  asked "is there a session?".
- The fix looks obvious at first: add that check to `DashboardLayout`, or to
  every `page.tsx` under `(dashboard)`. But that's one check to remember —
  and repeat — on every single route this app has, and every route it will
  ever grow. Forget it once on a new page, and that page is wide open.
- What's needed instead is one place where "is this visitor logged in?"
  gets answered for *every* request, before any of those pages even start
  rendering.

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->

Notes:

Live-demo this if you can: clear cookies, hit /employees directly in 12-middleware (not the solution), and watch the dashboard render with zero friction. That concrete gap is the entire motivation for the module — don't skip straight to the API.
