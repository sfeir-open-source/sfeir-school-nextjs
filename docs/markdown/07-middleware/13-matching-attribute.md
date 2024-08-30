<!-- .slide: class="two-column with-code " -->

# next.config.js

## matching request

Request attribute matching

- **has**
- **missing**

Has and missing objects can have the following fields :

- type : header |cookie | host | query
- key
- value

##--##

<br/> <br/>

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
