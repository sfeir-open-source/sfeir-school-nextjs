<!-- .slide: class="two-column with-code " -->

<style>
  .not-found-32 {
    width: 500px;
    height: auto;
  }
</style>

# 2. Expected errors

## Not found

Convention : export a component from this file : <br/>
**/app/not-found.tsx** <br/>
**/app/\*\*/not-found.tsx**

<img src="./assets/images/06-error/not-found.png" class="not-found-32" />

##--##

<br/> <br/> <br/>

This component is rendered in two cases :

- When a segment is unknown to the router
- When invoking **notFound** method explicitly :

```jsx [1,6]
import { notFound } from 'next/navigation'

export default async function User({ params }) {
  const user = await fetchUser(params.id)

  if (!user) notFound()

  return (...)
}
```
