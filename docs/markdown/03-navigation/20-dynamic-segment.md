<!-- .slide: class="with-code" -->

# One route, a thousand employees: `[id]`

We can't hand-write a `page.tsx` for every employee — we don't even know how
many there'll be. Instead, we wrap a folder name in square brackets, and that
segment becomes a **placeholder** Next.js fills in from the URL:

```text
app/(dashboard)/employees/
├── page.tsx           ← "/employees"
└── [id]/
    └── page.tsx         ← "/employees/1", "/employees/2", "/employees/anything"
```

- `[id]` isn't a real folder name — it's a stand-in for whatever value shows
  up in that position of the URL.
- One `page.tsx` inside `[id]/` now serves **every** employee, instead of one
  file per person.
- This is called a **dynamic segment** — as opposed to `employees` or
  `expenses`, which are **static** segments that only ever match themselves.

Notes:

The bracket syntax is the whole trick — same "visually obvious once you've seen it" beat as route groups in module 02. Point out this is exactly the same folder-to-URL mental model, just with one flexible segment instead of a fixed name.
