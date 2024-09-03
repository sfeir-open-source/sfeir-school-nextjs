<!-- .slide: class="two-column with-code " -->

# Middleware

## API

Modify response :

```js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Setting cookies on the response
  const response = NextResponse.next();
  response.cookies.set('sfeir', 'nextjs');
  response.cookies.set({
    name: 'test',
    value: 'hello-world',
    path: '/',
  });

  // Setting headers on the response
  response.headers.set('sfeir', 'nextjs');

  return response;
}
```

##--##

<br/> <br/>

<div>

Modify request :

```js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const cookie = request.cookies.get('nextjs');
  console.log(cookie); // => { name: 'nextjs', value: 'fast', Path: '/' }

  const allCookies = request.cookies.getAll();
  console.log(allCookies); // => [{ name: 'nextjs', value: 'fast' }]

  request.cookies.has('nextjs'); // => true
  request.cookies.delete('nextjs');
  request.cookies.has('nextjs'); // => false

  // Setting headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('sfeir-request', 'nextjs');

  // Setting cookies
  request.cookies.set('sfeir-cookie', 'nextjs');

  return response;
}
```

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->
