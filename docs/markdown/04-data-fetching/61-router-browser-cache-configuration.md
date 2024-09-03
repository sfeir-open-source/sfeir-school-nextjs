<!-- .slide: class="two-column with-code" -->

# Caching

## 4/4 Router caching

**Behavior**

The behavior depends on two factors : <br/><br/>

1. Browser session <br/><br/>
2. Automatic TTL, depending on prefetching :
   - default : dynamic pages are not cached / static pages are cached for 5 minutes
   - full prefetching (prefetch={true}) 5 minutes

##--##
<br/> <br/>

<div>

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

</div>

<!-- .element: class="fragment" data-fragment-index="1"-->
