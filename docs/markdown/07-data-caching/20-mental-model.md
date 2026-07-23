<!-- .slide: class="with-code" -->

# A photocopy, not a re-type

Imagine `getEmployees` is a typist, retyping the entire employee list from
scratch every time someone asks for it — correct, but slow, and wasteful
when the list hasn't changed since the last request.

- **Caching** means: the first time someone asks, do the work and keep a
  copy. The next person who asks gets handed the copy — a photocopy, not a
  fresh re-type of the whole document.
- A photocopy is faster to hand out than retyping the document, but it's only
  correct as long as the original hasn't changed. That tension — speed vs.
  staying correct — is the entire subject of this module.
- Every idea coming up (`"use cache"`, `cacheTag`, `revalidateTag`) is just
  answering one of two questions: **"make a photocopy of what?"** and
  **"when do I throw the old photocopy away?"**

Notes:

Say the two questions out loud, slowly — they're the spine of the whole module. Everything from here on is just "here's the Next.js API that answers this question." Keep coming back to "photocopy" instead of jargon like "memoized" or "cache entry" for as long as it still fits.
