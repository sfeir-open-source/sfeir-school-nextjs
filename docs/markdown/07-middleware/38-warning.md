<!-- .slide: class="two-column with-code " -->

# Middleware

## Warning

- Middleware is on the critical path :

  - avoid heavy operations & long tasks

<div>

<br/> <br/>

- Middleware does not run on a normal nodejs runtime :
  - Native Node.js APIs are not supported (example : filesystem)
  - only ES Modules node_modules are supported

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->
