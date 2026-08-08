<!-- .slide: class="tc-multiple-columns with-code" -->

##++##

# Real code: `Theme` never imports the app

```tsx
// libs/ui/src/lib/Theme.tsx
'use client';

export const Theme = memo(({ children }: ThemeProps) => {
  const theme = useTheme(); // reads prefers-color-scheme
  return <ThemeContext value={theme}>{children}</ThemeContext>;
});
```

`Theme` needs `useSyncExternalStore` to read the browser's OS color-scheme
setting — a browser API, so it's a Client Component. Its whole job is to
read that value and expose it through context.

##++##

##++##

<br/> <br/>

```tsx
// app/(dashboard)/layout.tsx
const DashboardLayout = async ({ children }) => (
  <Theme>
    <div className="flex ...">
      <header>{/* logo, nav */}</header>
      <main>{children}</main>
    </div>
  </Theme>
);
```

- `DashboardLayout` (a Server Component) decides what lives inside `Theme` —
  the header, the nav, and `{children}`: an entire Server Component subtree,
  whichever `page.tsx` is currently rendering.
- `Theme.tsx` itself never imports `NavigationMenu`, `PersonCard`, or any
  page. It only renders `{children}` — the exact same "accepts `children`,
  renders it" contract as the `layout.tsx` hallway from module 02, except
  this time the component doing the wrapping is a Client Component.

##++##

Notes:

This is Next.js's documented "Context providers" pattern almost verbatim: React context isn't supported in Server Components, so the provider has to be the small Client Component, with everything else — including the rest of the dashboard shell — staying server-rendered around it.
