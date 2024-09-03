<!-- .slide: class="two-column with-code title-margin-sm" -->

# Dynamic routing

```
/app/post/[id]/page.tsx                 website.com/post/123
                                        website.com/post/abc
                                        ...

/app/post/[id]/[name]/edit/page.tsx     website.com/post/123/123/edit
                                        ...
```

<div>
Catch all segments :

```
/app/post/[...slug]/page                website.com/a
                                        website.com/a/b
                                        website.com/a/b/c
                                        ...
```

</div>

<!-- .element: class="fragment" data-fragment-index="1"-->

<div>

Optional catch all segments :

```
/app/post/[[...slug]]/page              website.com
                                        website.com/a
                                        website.com/a/b
                                        ...
```

</div>

<!-- .element: class="fragment" data-fragment-index="2"-->
