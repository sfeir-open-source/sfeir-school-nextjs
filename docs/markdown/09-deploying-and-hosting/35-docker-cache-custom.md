<!-- .slide: class="two-column with-code " -->

# Deploying

## Docker

**Configuring cache**

This default behavior can be changed using a custom cache handler :

```js
// next.config.js
module.exports = {
  cacheHandler: require.resolve('./cache-handler.js'),
  cacheMaxMemorySize: 0, // disable in-memory caching, to use only the custom cache handler
};
```

Custom cache handler must implement this methods :

- get()
- set()
- revalidateTag()

##--##

<br/> <br/> <br/>

Basic example :

```js
// Here the cache will be a map (in memory)
const cache = new Map();

module.exports = class CacheHandler {
  constructor(options) {
    this.options = options;
  }

  async get(key) {
    return cache.get(key);
  }

  async set(key, data, ctx) {
    cache.set(key, {
      value: data,
      lastModified: Date.now(),
      tags: ctx.tags,
    });
  }

  async revalidateTag(tag) {
    for (let [key, value] of cache) {
      if (value.tags.includes(tag)) {
        cache.delete(key);
      }
    }
  }
};
```
