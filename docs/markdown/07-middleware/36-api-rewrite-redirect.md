<!-- .slide: class="two-column with-code " -->

# Middleware

## API

**Rewrite** response to display another URL :

```js
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/employees')) {
    return NextResponse.rewrite(new URL('/employees-internal', request.url));
  }
}
```

##--##

<br/> <br/> <br/>

<div>

**Redirect** the incoming request to a different URL :

```js
import { NextResponse } from 'next/server';

export function middleware(request) {
  if (request.nextUrl.pathname.startsWith('/employees')) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}
```

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->
