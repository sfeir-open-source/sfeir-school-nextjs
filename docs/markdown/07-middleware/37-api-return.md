<!-- .slide: class="two-column with-code " -->

# API

You can also produce a response early

```js
export function middleware(request) {
  if (request.nextUrl.pathname.startsWith('/employee')) {
    if (!checkRequest(request)) {
      return Response.json({ success: false, message: 'bad request' }, { status: 400 });
    }
  }
}
```
