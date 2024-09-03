<!-- .slide: class="two-column with-code " -->

# 2. Fetching from the client

## Reading request

**Headers**

```js
// First solution : read the headers directly from the request :
import { type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
}

// Another solution : use the "headers" method from next/headers :
import { headers } from 'next/headers';

export async function GET(request: Request) {
  const headersList = headers();
  const referer = headersList.get('referer');

  return new Response('Hello, Next.js!', {
    status: 200,
    headers: { referer: referer },
  });
}
```

##--##

<br/> <br/>

**Cookies**

```js
// First solution : read the cookies directly from the request :
export async function POST(request: Request) {
  const token = request.cookies.get('token');

  return new Response('Hello, Next.js!', {
    status: 200,
    headers: { 'Set-Cookie': `token=${token.value}` },
  });
}

// Another solution : use the "cookies" method from next/headers :
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get('token');

  return new Response('Hello, Next.js!', {
    status: 200,
    headers: { 'Set-Cookie': `token=${token.value}` },
  });
}
```
