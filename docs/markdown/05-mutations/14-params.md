<!-- .slide: class="two-column with-code " -->

# Server actions

## Arguments (using form)

The server action receives FormData as argument :

```jsx [2-6, 9]
const MyComponent = () => {
  async function createUser(formData) {
    'use server';
    const username = formData.get('username');
    // Mutations & server operations
  }

  return (
    <form action={createUser}>
      <input type="text" name="username" />
      <button type="submit">Submit</button>
    </form>
  );
};
```

##--##

<div>

**Additional arguments**

It's possible to pass additional arguments without the need to render hidden inputs :

```jsx [2, 8, 11]
const MyComponent = ({ userId }) => {
  async function editUser(userId, formData) {
    'use server';
    const username = formData.get('username');
    // Mutations & server operations
  }

  const action = editUser.bind(null, userId);

  return (
    <form action={action}>
      <input type="text" name="username" />
      <button type="submit">Submit</button>
    </form>
  );
};
```

_The first action argument is then the binded variable_

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->
