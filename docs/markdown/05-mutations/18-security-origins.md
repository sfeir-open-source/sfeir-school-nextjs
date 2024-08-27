<!-- .slide: class="two-column with-code title-margin-sm" -->

# Security considerations

**Restrict origins**

Server Actions can only be invoked on the same host as the page that hosts it (Internal checks by the framework)<br/><br/>
But when using reverse proxy or multiple backend architecture, it's possible to restrict the allowed origins for server actions :

```jsx
// next.config.js
module.exports = {
  experimental: {
    serverActions: {
      allowedOrigins: ['my-proxy.com', '*.my-proxy.com'],
    },
  },
};
```
