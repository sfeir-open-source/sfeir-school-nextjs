<!-- .slide: class="with-code" -->

# Naming that "smart" behavior: the `prefetch` prop

`prefetch` controls exactly what "quietly fetches in the background" means —
and it's worth knowing the default before reaching for it:

```tsx
<Link href="/employees/42" prefetch={false}>View detail</Link>
```

- **`"auto"` / not set (the default)** — static routes prefetch in full;
  dynamic ones (like our `[id]` page) prefetch only down to the nearest
  `loading.js` boundary. This is the behavior every `<Link>` in the sidebar
  already uses.
- **`true`** — always prefetch the full route, static or dynamic. Reach for
  it on a link you know the user is very likely to click next.
- **`false`** — never prefetch, on viewport or on hover. Useful for a rarely
  visited link where the extra background request just isn't worth it.
- Prefetching only happens in **production** — in `next dev`, every
  navigation is a live request, which is why the network tab looks "slower"
  locally than it will once deployed.

Notes:

Keep this brief — the point is naming the prop that was already implicitly at work on the previous slide, not a deep dive into partial prefetching internals. If asked about the loading.js boundary detail, park it for module 15.
