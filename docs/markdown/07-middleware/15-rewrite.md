<!-- .slide: class="two-column with-code " -->

# next.config.js

## rewrites

```js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/about',
        destination: '/',
      },
    ];
  },
};
```
