<!-- .slide: class="tc-multiple-columns" -->

##++##

<style>
  .layout02-nested-img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
</style>

# Layouts nest too

Add a `layout.tsx` deeper in the tree, and it wraps **only** the pages below
it — while still being wrapped by every layout above it. They stack.

<img src="./assets/images/02-layout/nested-layout-schema.png" class="layout02-nested-img" />

##++##

##++##

<img src="./assets/images/02-layout/nested-layout-schema-2.png" class="layout02-nested-img" />

In `01-layout`, that stack is: the **root** layout (`<html>`/`<body>`) wraps a
**dashboard** layout (logo + sidebar navigation), which wraps `/employees` and
`/expenses` — two pages, one shared shell, zero duplicated markup.

##++##

Notes:

The generic diagram (admin/settings) is straight from the official docs — bridge it immediately to our own app's stack so it doesn't feel abstract. This is the direct payoff of everything since the "one page down, now add nine more" problem slide.
