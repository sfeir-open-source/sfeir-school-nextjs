<!-- .slide: class="two-column with-code " -->

# Deploying

## Docker

**Configuring cache**

Cached objects (data cache & full route cache) will be stored in memory and on disk <br/>
This is OK when hosting on Vercel (managed) and if running a single Node.js instance. <br/> <br/>

But using a container orchestration solution like Kubernetes will duplicate the cache on each pod, reducing the global hit ratio
