<!-- .slide: class="two-column with-code" -->

# Router caching

**Behavior**

The behavior depends on two factors :

1. Browser session
2. Automatic TTL, depending on prefetching :

- default : dynamic pages are not cached / static pages are cached for 5 minutes
- full prefetching (prefetch={true}) 5 minutes

##--##
<br/> <br/>

**Configuring**

It's possible to override default TTLs :

```js
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },
};

module.exports = nextConfig;
```
