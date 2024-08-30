<!-- .slide: class="two-column with-code " -->

# middleware

## conventions

Create a **/middleware.ts|js** file in the root directory <br/>
export a **middleware** function :

```js
export const middleware = (request) => {
  // Some server operations on the request
};
```
