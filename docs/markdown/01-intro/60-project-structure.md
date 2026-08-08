<!-- .slide: class="with-code" -->

# A first look inside `app/`

Just enough to orient yourself — we'll cover the full conventions in the
next module. Here's a trimmed view of `01-layout`, the app you're about
to run:

```text
01-layout/
├── public/              ← static files, served as-is (/logo.svg, ...)
├── src/
│   ├── data/             ← local JSON fixtures (employees, expenses)
│   └── app/
│       ├── layout.tsx    ← the root layout, required
│       ├── page.tsx      ← the homepage ("/")
│       └── global.css
```

- A folder only becomes a **route** once it contains a `page.tsx` —
  everything else stays private, no accidental URLs.
- `layout.tsx` is **shared UI** that wraps its page (and every nested
  page). The root one is mandatory: it owns the `<html>` and `<body>`
  tags.
- No `pages/`, no router import, no server file to write — the folder
  structure **is** the router.

Notes:

Keep this light — just "folders become URLs, page.tsx makes it public, layout.tsx wraps it". Full file-convention list (loading, error, route, template...) is module 02's job, don't preempt it.
