<!-- .slide: class="two-column with-code " -->

# middleware

What is next.js middleware ? <br/>

allows to catch the incoming request and :

- modify the request / response :
  - rewrite
  - redirect
  - modify request headers
  - modify response headers
  - return early
- produce and return an early response

##--##

<br/> <br/><br/>

Runs before caching content / route matching :

1. headers - next.config.js
2. redirects - next.config.js
3. **middleware**
4. rewrites | beforeFiles - next.config.js
5. routes (/public, /\_next/..., /app...)
6. rewrites | afterFiles - next.config.js
7. dynamic routes (/[slug]/page.tsx ...)
8. rewrites | fallback - next.config.js
