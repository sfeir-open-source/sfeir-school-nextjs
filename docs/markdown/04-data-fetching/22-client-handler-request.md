<!-- .slide: class="two-column with-code " -->

# Route handlers

## Reading request

**Query Parameters**

```js
import { type NextRequest } from 'next/server';

// /users?search=hello
export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get('search');
  // search equals "hello"
}
```

##--##

<br/> <br/>

**Body**

```js
// JSON Content type :
export async function POST(request: Request) {
  const bodyObject = await request.json();
  return Response.json({ body: bodyObject });
}

// Form data content type :
export async function POST(request: Request) {
  const formData = await request.formData();
  return Response.json({ username: formData.get('username') });
}
```
