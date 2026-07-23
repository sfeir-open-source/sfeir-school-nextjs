<!-- .slide: class="with-code" -->

# Server validation is the source of truth — a client check is a complement

Everything so far runs a full round-trip before an invalid email shows up
red: submit, `postEmployee` fails, `state.errors` comes back. Nothing wrong
with that — but it's worth naming what it *isn't*:

```tsx
// a lightweight, client-side complement — not a replacement
<input type="email" name="email" required />
```

- Plain HTML attributes (`required`, `type="email"`, `pattern`, `minLength`)
  or a `'use client'` field-level check catch obvious typos *before* the
  network round-trip — nicer for the person typing, but they run in the
  browser and a browser can be bypassed entirely (dev tools, `curl`, a bot).
- The server check from the previous slides — Fastify's Valibot validation,
  surfaced through `ApiError` and `state.errors` — is what actually decides
  whether an employee gets created. It has to stay, no matter how much
  client-side polish gets added on top.
- This app deliberately keeps that split narrow: server validation via
  `ApiError` is the one pattern to learn well; a `required` attribute here
  and there is a nice-to-have, not something this course builds out further.

Notes:

Keep this short — one slide, no new component. The point to land: client-side validation is UX polish, never the security or correctness boundary. If someone asks "why not Zod/Valibot in the browser too" — fair, plenty of apps do exactly that, it's just out of scope for this app's pattern, which leans entirely on the server's ApiError shape.
