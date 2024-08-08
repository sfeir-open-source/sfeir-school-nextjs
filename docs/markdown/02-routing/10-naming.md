<!-- .slide: class="with-code" -->

# Naming convention

(.tsx | .js | .jsx)

- **layout** : shared UI for a segment (and its children)
- **template** : shared UI for a segment with re-render (and its children)
- **page** : public route UI
- **loading** : loading UI for a segment (and its children)
- **not-found** : page not found UI for a segment (and its children)
- **error** : Unexpected error UI for a segment (and its children)
- **route** : Server API endpoint definitions

**Special files**

- **global-error** : Unexpected global error
- **default** : (advanced) Fallback UI for parallel routes
