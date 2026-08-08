<!-- .slide: class="tc-multiple-columns" -->

##++##

<style>
  .sc-hydration-img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  }
</style>

# Why bother? Three very concrete wins

<img src="./assets/images/04-server-components/partial-hydration.png" class="sc-hydration-img" />

<small>Gray = server-rendered, zero JS shipped. Blue = ships JavaScript to the browser.</small>

##++##

##++##

<br/>

- **Smaller JS bundles** — `PersonCard`'s code, its imports, the logic that
  formats an employee's data, never gets downloaded by the browser at all. It
  only ever runs on the server.
- **Direct backend access, no ceremony** — a Server Component can read a
  file, query a database, or call a private API with a secret key, right in
  the component. No separate API route to write and call.
- **The initial page is just HTML** — the browser doesn't have to run
  JavaScript to construct what you first see. It just paints the markup it
  received.

##++##

Notes:

The picture is our own SFEIR People homepage: sidebar and page chrome are gray (server, no JS shipped), the search box is blue (it needs to run in the browser). This is the shape of every page we've built so far, we just didn't have a name for it yet.
