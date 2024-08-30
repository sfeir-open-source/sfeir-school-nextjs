<!-- .slide: class="two-column with-code " -->

# next.config.js

## matching request

Regex based matching :

```js
module.exports = {
  async headers() {
    return [
      // Regex based matching :
      {
        source: '/employees/:id(\\d{1,})', // will match /employees/123 (not /employees/abc)
        headers: [
          {
            key: 'x-custom-regex-header',
            value: 'header value based on regex',
          },
        ],
      },
    ];
  },
};
```
