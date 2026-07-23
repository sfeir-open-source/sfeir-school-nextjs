<!-- .slide: class="with-code" -->

# If you see `middleware.ts` somewhere else, it's the same thing

Until Next.js 16.0.0, this exact file was called `middleware.ts`, and its
export was named `middleware`. Every tutorial, blog post, and Stack
Overflow answer written before that still uses those names — and they still
work today, deprecated but functional. This course, on Next.js 16.1.6,
teaches the current name: `proxy.ts` / `proxy`.

```tsx
// what you'll find in older docs and tutorials
export function middleware(request: NextRequest) { /* ... */ }

// what this app, and Next.js 16.1.6, actually use
export function proxy(request: NextRequest) { /* ... */ }
```

<div>

- Why rename it: Next.js's own docs say "middleware" kept getting confused
  with Express.js-style middleware, and the feature is powerful enough that
  its old name quietly encouraged reaching for it more than it should be
  reached for. "Proxy" — code that sits in front of the app and intercepts a
  request before it arrives — describes what it actually does.
- Nothing about the mechanics changed, only the name. If a migration is ever
  needed, Next.js ships a codemod for exactly this:
  `npx @next/codemod@canary middleware-to-proxy .`
- `12-middleware`, this app's folder name, predates the rename — a naming
  fossil from when the workshop was written. The file the lab has you create
  inside it is still `proxy.ts`, matching current Next.js.

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->

Notes:

This is a "so you're not confused later" slide, not new API surface — keep it brief. The one thing worth landing: same feature, same file position, only the exported function's name and the filename changed, in v16.0.0.
