<!-- .slide: class="two-column with-code" -->

# Dynamic routing

```
/app/post/[id]/page.tsx                 website.com/post/123
                                        website.com/post/abc
                                        ...

/app/post/[id]/[name]/edit/page.tsx     website.com/post/123/123/edit
                                        ...
```

Catch all segments :

```
/app/post/[...slug]/page                website.com/a
                                        website.com/a/b
                                        website.com/a/b/c
                                        ...
```

Optional catch all segments :

```
/app/post/[[...slug]]/page              website.com
                                        website.com/a
                                        website.com/a/b
                                        ...
```
