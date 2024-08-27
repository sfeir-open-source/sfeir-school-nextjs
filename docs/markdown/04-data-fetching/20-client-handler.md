<!-- .slide: class="two-column with-code " -->

<style>
  .routerhandler-20 {
    width: 400px;
    height: auto;
  }
</style>

# Route handlers

## Convention

`route.ts` file in the /app directory

<img src="./assets/images/04-data-fetching/route-handler.png" class="routerhandler-20" />

##--##

<br/> <br/>

Example : /api/employees/route.ts

```ts
export async function GET() {
  const res = await fetch('https://my-api.com/api/employees', {
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY, // We can use sensitive information
    },
  });
  const data = await res.json();
  return Response.json({ data });
}
```

<br/> <br/>
**Supported HTTP methods :**
<br/>
`GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, `OPTIONS`
