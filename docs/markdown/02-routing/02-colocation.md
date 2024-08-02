<!-- .slide: class="two-column with-code" -->

# Colocation

You can collocate files alongside specific files.

They will not be interpreted as routes :

```
src/
  app/
    page.tsx
    header.tsx      <- non routable
    components/
      button.tsx    <- non routable
    admin/
      page.tsx
      db.ts         <- non routable
```
