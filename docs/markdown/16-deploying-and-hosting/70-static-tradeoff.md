<!-- .slide: class="with-code" -->

# Know the trade-off exists — most apps like this one won't take it

- Where it genuinely shines: a marketing site, documentation, a blog, a
  portfolio — content that's the same for every visitor and changes only
  when someone redeploys. Host it on S3, GitHub Pages, Nginx, any web
  server that can hand out files, no Node.js process to run or pay for at
  all.
- Where it can't follow: anything this course spent a week building past
  module 06. An employee tracker with logins, editable records, and a
  "latest expenses" widget that's supposed to be live isn't "the same
  page for everyone" — it's the opposite, by design.
- The honest read isn't "static export is worse" — it's a different
  question entirely. It asks "is this whole app the same for every
  visitor?" First. **Then** offers a deployment target. Most real
  products answer "no" somewhere on the homepage alone.

Notes:

Land this as a decision framework, not a verdict — some teams do successfully run a fully static Next.js site, and that's a legitimate, good choice for the right content. The point is recognizing which category an app falls into before reaching for output: 'export', not defaulting to it or avoiding it out of habit.
