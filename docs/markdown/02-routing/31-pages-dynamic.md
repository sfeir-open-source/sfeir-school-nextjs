<!-- .slide: class="two-column with-code" -->

# Routing

## Page declaration : dynamic routing

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
/app/post/[...slug]/page.tsx            website.com/post/a
                                        website.com/post/a/b
                                        website.com/post/a/b/c
                                        ...
```

</div>

<!-- .element: class="fragment" data-fragment-index="1"-->

<div>

Optional catch all segments :

```
/app/post/[[...slug]]/page              website.com/post
                                        website.com/post/a
                                        website.com/post/a/b
                                        ...
```

</div>

<!-- .element: class="fragment" data-fragment-index="2"-->

Notes:

Illustration des différents dynamic segments

Pour gérer des URLs complexes

Warning : Pas de possibilité de gérer des segments composés d'une partie fixe + une partie dynamique

Il faut le gérer dans tout le segment

Ou via d'autres mécanismes qu'on verra plus tard
