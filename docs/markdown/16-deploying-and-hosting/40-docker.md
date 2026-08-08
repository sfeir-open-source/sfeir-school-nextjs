<!-- .slide: class="with-code" -->

# Docker: the same Node.js server, shipped as one image

"A Node.js server" is exactly what a container orchestrator (Kubernetes,
Cloud Run, ECS...) wants to run. But a naive `Dockerfile` — copy the whole
project, `npm install`, `next build`, `next start` — drags every
`node_modules` package, dev dependency included, into the final image.

```js
// next.config.js
module.exports = {
  output: 'standalone',
};
```

<div>

- `output: 'standalone'` turns on Next.js's own dependency tracer: at
  build time, it walks every `import` your app actually reaches and
  writes only *those* files — app code plus the handful of `node_modules`
  packages really used at runtime — into `.next/standalone`.
- That folder ships with its own minimal `server.js`, a drop-in
  replacement for `next start` that needs **no `npm install` step at
  all** in the final image. Per the Next.js docs, this is exactly what
  "reduces the size of deployments drastically" means in practice.
- One deliberate gap: `.next/standalone` does **not** include the
  `public/` folder or `.next/static` — those are meant to be served by a
  CDN instead. Self-hosting without one just means an extra `COPY` line in
  the Dockerfile so `server.js` finds them locally:
  `cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/`

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->

Notes:

If someone asks for a full multi-stage Dockerfile, the shape is: a deps stage that only installs node_modules, a builder stage that runs next build, and a runner stage that copies .next/standalone (+ the two folders above) and runs `node server.js` as a non-root user. Not worth typing live unless there's real time left — the standalone config is the one idea worth landing.
