<!-- .slide: class="with-code" -->

# The smallest possible route

A route in Next.js starts with two things: a **folder**, and a `page.tsx` file
inside it.

```tsx
// app/page.tsx
export default function Page() {
  return <h1>Hello Next.js!</h1>;
}
```

- The folder path **is** the URL — `app/` → `/`, `app/employees/` → `/employees`.
  No router to configure, nothing to import.
- Add a `page.tsx` inside a folder, and that folder becomes **public** — it now
  renders at its URL.
- No `page.tsx`? The folder stays private. You can drop components, styles, or
  data in there without ever exposing an accidental route.

Notes:

This is the entire mental model for App Router routing: folders map to URL segments, page.tsx is the file that makes a segment public. The full file-convention list (loading, error, route, template) is out of scope here — save it for a later module. If the room did module 01's lab, they've already opened this exact file; this slide just names the rule out loud.
