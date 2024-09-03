<!-- .slide: class="two-column with-code " -->

# Rendering methods

## Static rendering

Static rendering can be configured using [route segment configuration](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config)

```js
export const dynamic = 'auto' | 'force-dynamic' | 'error' | 'force-static';
export const revalidate = false | number;
```
