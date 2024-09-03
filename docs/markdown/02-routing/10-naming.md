<!-- .slide: class="with-code" -->

# Routing

## Conventions

(.tsx | .js | .jsx)

- **layout** : shared UI for a segment (and its children)
- **template** : shared UI for a segment with re-render (and its children)
- **page** : public route UI
- **loading** : loading UI for a segment (and its children)
- **not-found** : page not found UI for a segment (and its children)
- **error** : Unexpected error UI for a segment (and its children)
- **route** : Server API endpoint definitions

<div>
<br/>

**Special files**

- **/error** (root level) : Unexpected global error
- **default** : (advanced) Fallback UI for parallel routes
</div>
<!-- .element: class="fragment" data-fragment-index="1"-->
