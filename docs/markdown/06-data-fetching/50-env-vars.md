<!-- .slide: class="with-code" -->

# Where `API_BASE_URL` comes from

Hardcoding `http://localhost:9000/api` inside every provider would break the
moment this app deploys somewhere else. Instead, it's read from the
environment:

```tsx
// app/shared/env.ts
export const API_BASE_URL = process.env.API_BASE_URL;
export const API_KEY = process.env.API_KEY;
```

```bash
# .env.local
API_BASE_URL=http://localhost:9000/api
API_KEY=''
```

- Next.js loads `.env.local` automatically in development — no extra setup,
  no package to install, just a file at the project root.
- Because `env.ts` is only ever imported by server-only code — providers, and
  nothing marked `'use client'` — these values never leave the server. The
  browser never sees `API_KEY`.
- One small indirection (`env.ts`) instead of `process.env.API_BASE_URL`
  sprinkled everywhere means every provider agrees on where to read it from.

Notes:

Keep this practical, not a security deep-dive — that's for later modules. The one thing worth landing: this only stays server-side because nothing client-side imports env.ts. The next slide is exactly about the component that can't get away with that.
