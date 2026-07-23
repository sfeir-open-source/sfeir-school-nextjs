<!-- .slide: class="with-code" -->

# Beyond `width`/`height`: `fill`, `preload`, remote sources

`PersonCard`'s photo has a fixed size, but `next/image` covers cases where it
doesn't:

<small>

```tsx
// A banner-style image that should cover its parent, whatever size that is
<div style={{ position: 'relative', height: '240px' }}>
  <Image src="/team-photo.jpg" alt="The SFEIR People team" fill sizes="100vw" style={{ objectFit: 'cover' }} />
</div>

// Our Logo — rendered above the fold on every single page of the dashboard
<Image src={logoLight} alt="People logo" preload />
```

</small>

- **`fill`** — instead of fixed `width`/`height`, the image stretches to fill
  its parent. The parent needs `position: relative` (or `fixed`/`absolute`),
  and `sizes` tells the browser how wide the image will actually be
  rendered at each breakpoint — skip it and the browser assumes full
  viewport width, downloading a bigger file than needed.
- **`preload`** — hints Next.js to load this image before it's discovered in
  the page, via a `<link>` in `<head>`. Reserve it for the one image that's
  the page's Largest Contentful Paint — our `Logo`, sitting in every layout,
  is a textbook case. _(This replaced the `priority` prop as of Next.js 16.)_
- **Remote images** need their host allow-listed in `next.config.js` via
  `images.remotePatterns` — later workshops in this training (starting with
  `07-server-action`, module 08) switch employee photos to
  `https://randomuser.me/...`, and that's exactly the config change that
  makes it work:

```js
// next.config.js
images: {
  remotePatterns: [new URL('https://randomuser.me/api/portraits/**')],
},
```

Notes:

fill+sizes and preload are the two props people reach for once they leave the "fixed-size avatar" case this module's app needs — good to name them now so they're not a surprise later. The remotePatterns snippet is verbatim from apps/07-server-action/next.config.js, not invented — point that out if asked "do we actually use this anywhere".
