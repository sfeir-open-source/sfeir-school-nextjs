<!-- .slide: class="two-column with-code " -->

# next.config.js

## headers

```js
module.exports = {
  async headers() {
    return [
      {
        source: '/employees',
        headers: [
          {
            key: 'x-some-custom-header',
            value: 'hello im a custom header value',
          },
        ],
      },
    ];
  },
};
```
