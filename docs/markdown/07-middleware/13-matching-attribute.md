<!-- .slide: class="two-column with-code " -->

# next.config.js

## matching request

Request attribute matching :

- **has** : check if request has a specified attribute / value
- **missing** : check if request is missing attribute / value

Has and missing objects can have the following fields :

- type : header |cookie | host | query
- key
- value

##--##

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
