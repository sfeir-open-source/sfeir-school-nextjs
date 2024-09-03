<!-- .slide: class="two-column with-code " -->

# Rendering methods

## Client-Side applications

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
