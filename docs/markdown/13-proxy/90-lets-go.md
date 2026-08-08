<!-- .slide: class="transition bg-blue" -->

# Time to close the door

Notes:

Short beat before the lab. Recap the shape one more time — proxy.ts runs before any route renders, matcher scopes it to real pages and skips assets and /api, it reads the same auth cookie the login action already writes, and it redirects in both directions: no session away from the dashboard, a session away from /login. Then the caution: optimistic check only, not a replacement for checks closer to the data. Straight into writing the real file.
