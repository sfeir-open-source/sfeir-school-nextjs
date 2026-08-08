<!-- .slide: class="tc-multiple-columns" -->

##++##

<style>
  .intro01-pages-app-img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  }
</style>

# Two routers, one clear default

Next.js actually ships **two** ways to define routes:

- The **App Router** (the `app/` folder) — introduced in 2023, built on
  React Server Components, and the **default for every new project**.
- The **Pages Router** (the `pages/` folder) — the original router.
  Still fully supported and maintained, **not deprecated** — just no
  longer where new features land first.

**This entire training uses the App Router** — it's what you'll meet on
any new Next.js project today.

##++##

##++##

<img src="./assets/images/01-intro/pages-app.png" class="intro01-pages-app-img" />

<small>The official docs still document both, side by side — proof the
Pages Router hasn't gone away, it's just not the front door anymore.</small>

##++##

Notes:

If someone worked with Next.js a few years ago and only knows getServerSideProps/pages, reassure them: same company, same core ideas, new mental model — we'll rebuild it from module 2 onward.
