<!-- .slide: class="tc-multiple-columns" -->

##++##

<style>
  .layout02-schema-img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  }
</style>

# Folders in, URLs out

<img src="./assets/images/02-layout/naming-page.png" class="layout02-schema-img" />

A single `page.tsx` at the root of `app/` is enough to serve `/`.

##++##

##++##

<img src="./assets/images/02-layout/page-1.png" class="layout02-schema-img" />

Nest folders, and the URL nests with them — `app/about/contact/page.tsx` becomes
`/about/contact`. That's exactly how `01-layout`'s `/employees` and `/expenses`
pages will come together later in this module.

##++##

Notes:

Keep this visual and quick — it's confirming what the code slide just said, not introducing new rules. The right-hand diagram previews nesting, which we'll need again once we get to nested layouts.
