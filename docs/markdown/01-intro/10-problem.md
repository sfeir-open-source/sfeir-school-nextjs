<!-- .slide: class="with-code" -->

# Let's build the SFEIR School app

## In plain React

You add `react` and `react-dom` to a project. You get **components**,
**state**, **props**. That's it. React draws pixels — nothing more.

To actually ship the employee & expense tracker we're building this week,
you'd still have to decide, by yourself:

<div>

- How do I go from `/` to `/employees/42` ? <br/>_(routing)_
- How do I send fast, pre-rendered HTML instead of a blank page ? <br/>_(server rendering)_
- How do I bundle, split and optimize all this JavaScript ? <br/>_(build tooling)_
- Where does my data-fetching code even run ? <br/>_(client vs. server)_
- How do I deploy this thing ? <br/>_(hosting)_

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->

Notes:

Let the room feel the weight of the list before moving on — this is the "why", don't rush it. Ask if anyone has set up react-router + a custom SSR server by hand before.
