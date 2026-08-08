<!-- .slide: class="with-code" -->

# Where Proxy actually sits in this chain

Last module's lab had you add `redirects()` and `rewrites()` to
`11-lifecycle`'s `next.config.js` — the `/e_:id` mask, the
`abtest`-cookie A/B rewrite. `12-middleware` ships with that same config
already in place. `proxy.ts` doesn't replace any of it — it runs
alongside it, at a fixed point in a chain straight from the Next.js docs'
own "Execution order" section:

<div>

1. `headers` from `next.config.js`
2. `redirects` from `next.config.js` — last module's two plain/mask entries
3. **Proxy** (`proxy.ts`) — this app's login gate, right in the middle
4. `beforeFiles` rewrites from `next.config.js` — the `/e_:id` mask, the
   `abtest` cookie rewrite
5. Filesystem routes (`public/`, `_next/static/`, real `page.tsx` files)
6. `afterFiles` rewrites
7. Dynamic routes (`app/employees/[id]`)
8. `fallback` rewrites

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->

<div>

**The decision, in one line:** a static, pattern-based redirect or rewrite
with no logic — a fixed URL mask, a cookie's *presence or exact value* —
belongs in `next.config.js`, checked by Next.js itself, before Proxy even
runs for `beforeFiles`. The moment the decision needs real logic — verifying
a signature, calling `getSession()`, computing something, or returning a
custom response body — that's `proxy.ts`, sitting at position 3, after
config redirects but before config rewrites.

</div>
<!-- .element: class="fragment" data-fragment-index="2"-->

Notes:

Point back at 40-reading-the-cookie.md explicitly here: getSession() is real logic (signature + expiry check), which is why the login gate had to be proxy.ts and couldn't be a has: cookie rewrite. The abtest cookie, by contrast, is pure equality — no verification — which is why it's happy living as data in next.config.js. Same "cookie on the request" input, two different tools, because the decision made from it is different in kind. No need to re-teach what redirects()/rewrites() do — the room built them last module, this slide is purely about ordering and the decision rule.
