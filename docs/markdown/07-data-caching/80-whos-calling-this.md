<!-- .slide: class="with-code" -->

# Who actually calls `revalidateTag`?

`/api/revalidate` is a Route Handler — reachable by anything outside this
app: a webhook, `curl`, an admin script. It's the right shape for "some
external system just told me data changed."

- But the employee edit form you've seen since module 05 — the one
  submitting through `EmployeeForm` — isn't external. It's a mutation coming
  from inside this same app.
- Module 08 introduces **Server Actions**: a function that runs on the
  server but gets called directly from a form's `action`, no Route Handler,
  no manual `fetch`, in between.
- The pattern to expect: a Server Action saves the edit, then calls
  `revalidateTag('one-employee', ...)` (or `updateTag`, for "the current
  user should see their own edit immediately") right after — same idea as
  this Route Handler, just triggered from inside the mutation itself instead
  of from an external call.

Notes:

Don't teach Server Actions here — one sentence of "what's coming" is enough. The goal is just: when a mutation happens later in the course, "who calls revalidateTag" should feel like an obvious question with an obvious answer, not a mystery.
