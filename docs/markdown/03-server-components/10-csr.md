<!-- .slide: class="two-column with-code " -->

# Server Components : Why ?

## Client-side applications

index.html

```html [8-9]
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Page title</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="script.js"></script>
  </body>
</html>
```

##--##

<div>

<br/> <br/> <br/>
script.js

```javascript
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(<App />);
```

</div>

<!-- .element: class="fragment" data-fragment-index="1"-->

Notes:

les applications React à l'origine était quasiment toutes des SPA, rendues uniquement côté client

Ce que le navigateur reçoit : une page HTML vide

- un script chargé de booter l'application avec React et React-Dom
