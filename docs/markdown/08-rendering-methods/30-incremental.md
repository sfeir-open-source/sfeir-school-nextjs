<!-- .slide: class="two-column with-code " -->

# Incremental Static Rendering

By default, dynamic routes (_/[id]/page.tsx_) can't be known at build time <br/>
But there is a way to generate them :

```js
export const generateStaticParams = async () => {
  return [];
};
```
