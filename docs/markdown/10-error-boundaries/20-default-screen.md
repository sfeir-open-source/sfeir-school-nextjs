<!-- .slide: class="with-code" -->

# Right now, this is what "down" looks like

Nothing in `09-error-boundaries` has an `error.tsx` yet, so an uncaught
exception falls straight through to Next.js's own generic crash screen:

- **In development**: the familiar red overlay — full stack trace, the exact
  line that threw. Great for you, the developer.
- **In production**: a plain, unbranded "Something went wrong" page. No
  logo, no navigation, no way back — the visitor's session just ends there.
- Either way, it's Next.js's *built-in* fallback — a page you never wrote,
  showing for every kind of crash, indistinguishable from any other bug.
  That's the gap this module closes.

Notes:

Show both if you can — the dev overlay from the live demo on the previous slide, then describe (or fake, via NODE_ENV) what production would show instead: no sidebar, no "SFEIR People" branding, just a wall of nothing. That contrast is the whole motivation for this module.
