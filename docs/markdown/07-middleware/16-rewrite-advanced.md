<!-- .slide: class="two-column with-code " -->

# next.config.js

## rewrites

Detailed configuration :

1. headers - next.config.js
2. redirects - next.config.js
3. middleware
4. <strong>rewrites | beforeFiles - next.config.js</strong>
5. <strong>routes (/public, /\_next/..., /app...)</strong>
6. rewrites | afterFiles - next.config.js
7. dynamic routes (/[slug]/page.tsx ...)
8. <strong>rewrites | fallback - next.config.js</strong>

##--##

<br/> <br/>

```js
module.exports = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/some-page',
          destination: '/somewhere-else',
        },
      ],
      afterFiles: [
        {
          source: '/non-existent',
          destination: '/somewhere-else',
        },
      ],
      fallback: [
        {
          source: '/:path*',
          destination: `https://my-old-site.com/:path*`,
        },
      ],
    };
  },
};
```
