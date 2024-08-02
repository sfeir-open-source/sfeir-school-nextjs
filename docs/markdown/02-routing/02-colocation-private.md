<!-- .slide: class="two-column with-code" -->

# Colocation

You can also make an entire subfolder private with an underscore prefix to exclude it from routing :

```
src/
  app/
    _admin/
      page.tsx    <- non routable
    about/
      page.tsx    <- routable
```
