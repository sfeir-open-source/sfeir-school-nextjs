<!-- .slide: class="two-column with-code " -->

# Deploying

## Static site generation

This deployment mode comes with a lot of limitations<br/>
Unsupported features :

- Dynamic routes (without getStaticParams)
- Route handlers (except GET verb)
- Every server dynamic value :
  - Cookie
  - Headers
  - ...
- Every server dynamic operation :
  - Rewrites
  - Redirects
  - Middleware
  - Incremental Static Generation
  - Server Actions
