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

##--##

Advanced matching :

```js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*', // match everything except home
        has: [
          {
            type: 'header',
            key: 'x-existing-header', // match based on existing header
          },
        ],
        headers: [
          {
            key: 'x-another-header',
            value: 'hello',
          },
        ],
      },
      {
        source: '/employees',
        has: [
          {
            type: 'query',
            key: 'search',
            value: 'some-value',
          },
          {
            type: 'cookie',
            key: 'authorized',
            value: 'true',
          },
        ],
        headers: [
          {
            key: 'x-authorized',
            value: ':authorized', // reference value of cookie
          },
        ],
      },
    ];
  },
};
```
