<!-- .slide: class="two-column with-code " -->

# request matching

There are two ways to filter the requests : <br/>
Exporting the **matcher** configuration :

```js
export const config = {
  matcher: ['/employee/:path*', '/expenses/:path*'],
};
```

##--##

Conditional statements :

```js
export function middleware(request) {
  if (request.nextUrl.pathname.startsWith('/employee')) {
    // do something
  }

  if (request.nextUrl.pathname.startsWith('/expenses')) {
    // do something
  }
}
```
