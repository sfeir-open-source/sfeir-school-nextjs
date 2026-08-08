<!-- .slide: class="tc-multiple-columns with-code" -->

##++##

# What if there's no server at all?

```js
// next.config.js
module.exports = {
  output: 'export',
};
```

`next build` no longer starts a server-shaped output — it runs every
Server Component **once, right now**, and writes plain `.html`, `.css`
and `.js` files to an `out/` folder. No process to keep alive, no `next
start`, nothing listening on a port.

##++##

##++##

<img src="./assets/images/16-deploying-and-hosting/static-build-runtime.png" class="deploy16-static-img" />

<style>
  .deploy16-static-img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
</style>

<small>Everything left of the dashed line happens once, at build time.
Runtime is just a static file server handing out what's already been
written.</small>

##++##

Notes:

The mental shift worth naming out loud: every other option this module covered still has a request arriving at a running Next.js process. Static export has no such thing at runtime — by the time a visitor shows up, Next.js itself is no longer involved, only the files it produced earlier.
