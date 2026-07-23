<!-- .slide: class="tc-multiple-columns with-code" -->

##++##

<style>
  .layout02-schema-img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  }
</style>

# Organizing folders without touching the URL

Wrapping a folder's name in parentheses — `(dashboard)` — turns it into a
**route group**. Next.js uses it purely for organization: the folder
disappears from the URL entirely.

```text
app/
├── layout.tsx           ← root layout
├── page.tsx              ← "/"
└── (dashboard)/          ← organizational only, invisible in the URL
    ├── layout.tsx         ← shared sidebar for everything below
    ├── employees/
    │   └── page.tsx        ← "/employees"
    └── expenses/
        └── page.tsx        ← "/expenses"
```

##++##

##++##

<img src="./assets/images/02-layout/group-schema.png" class="layout02-schema-img" />

That's exactly what `(dashboard)` is for here: it lets `/employees` and
`/expenses` **opt into** the sidebar layout, without that folder ever showing
up as `/dashboard/employees` in the address bar.

##++##

Notes:

The parentheses are the whole trick — visually obvious once you've seen it once. If asked "so it's just a folder Next.js ignores for routing", yes, exactly that, and the simplicity is the point. This is also how teams split ownership in bigger apps: a (marketing) group and a (dashboard) group living side by side, each with its own layout.
