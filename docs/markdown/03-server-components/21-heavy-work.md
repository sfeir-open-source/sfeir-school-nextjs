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

Notes:

Avantage : permet d'éviter d'envoyer de grosses librairies côté client

On peut éxécuter du code uniquement côté serveur et n'envoyer que le RSC payload

Ce n'était pas possible avant avec le pages routes, même pour des composants non interactifs
