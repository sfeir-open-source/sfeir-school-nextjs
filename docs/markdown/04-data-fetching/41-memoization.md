<!-- .slide: class="two-column with-code title-margin-sm" -->
<style>
  .memoization-41 {
   width: 1400px;
   height: auto;
   margin-top: 2rem!important;
  }


</style>

# Request memoization

- Where ? On the server
- What is cached ? Return value of functions
- How long ? One cache per request
- Why ? Sharing data in React component tree

<br/>

<img src="./assets/images/04-data-fetching/request-memoization.png" class="memoization-41" />

- By default : only for GET requests using fetch
