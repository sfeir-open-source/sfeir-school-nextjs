<!-- .slide: class="two-column with-code " -->

<style>
  .incremental-31 {
    width: 1400px;
    height: auto;
  }
</style>

# Rendering methods

## Incremental Static Rendering (ISR)

```js
export const generateStaticParams = async () => {
  return [{ id: 1 }, { id: 2 }, { id: 3 }];
};
```

<img src="./assets/images/08-rendering/incremental.png" class="incremental-31" />
