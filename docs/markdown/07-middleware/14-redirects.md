<!-- .slide: class="two-column with-code " -->

# next.config.js

## redirects

```js
module.exports = {
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/',
        permanent: true,
      },
    ];
  },
};
```

- permanent **true** : redirects with 308 status code indicating caches to store the redirect permenatly
- permanent **false** : redirects with 307 status code (temporary, not cached)
