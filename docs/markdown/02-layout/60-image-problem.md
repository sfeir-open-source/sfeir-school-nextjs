<!-- .slide: class="with-code" -->

# What's wrong with `<img>`?

Our employee directory needs a photo for every person in
`src/data/employee.json`. The obvious move is a plain HTML `<img>`:

```tsx
<img src={employee.photo} alt={employee.firstname} />
```

<div>

- **No automatic sizing** — nothing stops a 4000×3000 photo from being
  downloaded in full just to render at 100×100 pixels.
- **No format optimization** — the browser gets whatever format the file was
  saved in, even when a smaller WebP would look identical.
- **No lazy loading** — every image on the page loads immediately, even the
  ones the user hasn't scrolled to yet.
- **Layout shift** — until the image finishes loading, the browser doesn't
  know its size, so surrounding content jumps around as it pops in.

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->

Notes:

These four bullets map 1:1 onto next/image's feature list on the next slide — say them, then flip. If anyone's used a hand-rolled lazy-loading library before, this is exactly the pain it exists to solve.
