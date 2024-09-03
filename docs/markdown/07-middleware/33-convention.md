<!-- .slide: class="two-column with-code " -->

# Middleware

## Conventions

Create a **/middleware.ts | js** file in the root directory <br/> <br/>
Export a **middleware** function :

```js
export const middleware = (request) => {
  // Some server operations on the request
};
```
