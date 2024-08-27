<!-- .slide: class="two-column with-code " -->

# Server components

## Heavy operations

Allows heavy libraries to be loaded without increasing the weight of the client JavaScript :

<br/>
<br/>

```jsx
import codeFormatter from 'some-heavy-js-library';

const CodeBlock = async ({ code }) => {
  const formattedCode = await codeFormatter(code);
  return <div>{formattedCode}</div>;
};
```

##--##
