<!-- .slide: class="two-column with-code title-margin-sm" -->

# Security considerations

**Closures**

Server actions inside component is a closure : the action has access to the outer function's scope (like sensitive variables). <br/>

```jsx
// MyComponent.tsx
const MyComponent = () => {
  const sensitiveVariable = getSensitiveVariable();

  async function createUser() {
    'use server';
    if(sensitiveVariable !== getSensitiveVariable()) { ... }
  }
};
```

This is useful to capture snapshot of the data

##--##

<br/> <br/>

- Closure variables are part of the action definition
- It's then send to the client and back to the server when action is triggered
- Next.js automatically encrypts those
- A private key is generated for each action and each build

<br/> <br/>

To define an encryption key explicitly :

```
process.env.NEXT_SERVER_ACTIONS_ENCRYPTION_KEY
```
