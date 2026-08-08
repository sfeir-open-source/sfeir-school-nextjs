<!-- .slide: class="with-code" -->

# One page down. Now add nine more.

Our SFEIR School app needs a homepage, an employee directory, an expenses
table... each is its own `page.tsx`. But they all need the **same** header,
logo, and sidebar navigation around them.

Without a shared mechanism, every single page would have to:

<div>

- Re-import and re-render the `<header>`, the logo, and the navigation menu —
  by hand, in every `page.tsx`.
- Stay in sync by hand: forget to update one page's header, and it silently
  drifts from the rest.
- Rebuild that entire header from scratch on every navigation — wasteful, and
  it can even cause a visible flicker as the browser reloads and re-mounts it.

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->

Notes:

Let this land before revealing the fix — same beat as module 01's "let's build in plain React" slide, don't rush past the pain. Ask if anyone has had a header or nav drift out of sync across pages in a hand-rolled app before.
