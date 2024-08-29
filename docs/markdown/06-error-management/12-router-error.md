<!-- .slide: class="two-column with-code " -->

<style>
  .boundary-12 {
    width: 600px;
    height: auto;
  }
</style>

# 1. Error boundaries

## Nested errors

Convention : **/app/error.tsx** - **/app/\*\*/error.tsx**

- Error.tsx files creates error boundaries that catch errors in child components.
- Nested error boundaries must not include the HTML markup because it's nested in layouts

##--##

<br/> <br/>
<img src="./assets/images/06-error/error-boundary.png" class="boundary-12" />
