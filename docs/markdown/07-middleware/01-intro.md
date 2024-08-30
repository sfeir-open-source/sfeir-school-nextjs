<!-- .slide: class="two-column with-code " -->

# http request lifecycle on Next.js

1. headers - next.config.js
2. redirects - next.config.js
3. middleware
4. rewrites | beforeFiles - next.config.js
5. routes (/public, /\_next/..., /app...)
6. rewrites | afterFiles - next.config.js
7. dynamic routes (/[slug]/page.tsx ...)
8. rewrites | fallback - next.config.js
