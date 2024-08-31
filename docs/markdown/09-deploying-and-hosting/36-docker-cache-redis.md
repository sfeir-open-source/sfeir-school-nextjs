<!-- .slide: class="two-column with-code " -->

# Deploying

## Docker

**Configuring cache**

The advantage is that you can use a shared cache between pods. For example : Redis. But you don't have to implement it yourself, there are libraries for that:

```js
const { PHASE_PRODUCTION_BUILD } = require('next/constants');

const { createClient } = require('redis');
const { CacheHandler } = require('@neshca/cache-handler');
const createRedisHandler = require('@neshca/cache-handler/redis-stack').default;

CacheHandler.onCreation(async () => {
  let client;
  if (PHASE_PRODUCTION_BUILD !== process.env.NEXT_PHASE) {
    try {
      // Create a Redis client.
      client = createClient({
        url: process.env.REDIS_URL ?? 'redis://localhost:6379',
      });

      client.on('error', (e) => {
        console.warn('Redis error', e);
      });
    } catch (error) {
      console.warn('Failed to create Redis client:', error);
    }
  }

  if (client) {
    try {
      console.info('Connecting Redis client...');
      await client.connect();
    } catch (error) {
      console.warn('Failed to connect Redis client:', error);
      client
        .disconnect()
        .then(() => {
          console.info('Redis client disconnected.');
        })
        .catch(() => {
          console.warn('Failed to quit the Redis client after failing to connect.');
        });
    }
  }

  /** @type {import("@neshca/cache-handler").Handler | null} */
  let redisHandler = null;
  if (client?.isReady) {
    // Create the `redis-stack` Handler if the client is available and connected.
    redisHandler = await createRedisHandler({
      client,
      keyPrefix: 'prefix:',
      timeoutMs: 1000,
    });
  }

  return {
    handlers: [redisHandler],
  };
});

module.exports = CacheHandler;
```
