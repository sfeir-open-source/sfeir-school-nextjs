<!-- .slide: class="two-column with-code " -->

# 2. Expected errors

## In server components

for more granular management, don't hesitate to manage errors directly in server component rendering :

```jsx
export default async function Page() {
  const res = await getUsers().catch((err) => {
    console.error(err);
    return { error: true };
  });

  return (
    <div>
      {res.error && <p>Oops, something wrong happened</p>}
      ...
    </div>
  );
}
```
