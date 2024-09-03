<!-- .slide: class="two-column with-code " -->

# Middleware

## Request matching

**There are two ways to filter the requests** <br/>

1. Exporting the **matcher** configuration :

```js
export const config = {
  matcher: ['/employee/:path*', '/expenses/:path*'],
};
```

##--##

<br/> <br/> <br/> <br/><br/>

2. With conditional statements :

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
