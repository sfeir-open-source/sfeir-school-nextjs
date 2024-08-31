<!-- .slide: class="two-column with-code title-margin-sm " -->

<style>
  .incremental-34 {
    width: 1350px;
    height: auto;
  }
</style>

# Incremental Static Rendering

What if a page params are not known at build time ?

<img src="./assets/images/08-rendering/incremental-runtime.png" class="incremental-34" />

This behavior can be disabled definig dynamicParams :

```js
export const dynamicParams = false;
```
