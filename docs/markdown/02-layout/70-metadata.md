<!-- .slide: class="with-code" -->

# Naming the tab: the `Metadata` API

Every `layout.tsx` or `page.tsx` can export a `metadata` object — Next.js
reads it and generates the right `<head>` tags for you, no manual `<title>`
JSX required:

```tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SFEIR People | Dashboard',
};

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  /* ... */
};
```

- Set it on a layout, and it applies to every page nested underneath — our
  dashboard's browser tab reads **"SFEIR People | Dashboard"** on every page
  inside `(dashboard)/`.
- A page can export its own `metadata` too, and it overrides the layout's for
  that one route.
- `Metadata` covers more than `title` — `description`, Open Graph images,
  icons... this app only sets the field it actually needs, but the next
  slide shows the rest.

Notes:

Keep this scoped to the static object form for now — the next slide adds description, openGraph and the dynamic generateMetadata function. Don't rush ahead to it yet, let this static form land first.
