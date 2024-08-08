<!-- .slide: class="two-column with-code " -->

# Rendering methods

## Server-Side Rendering

index.html

```html [8-12]
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Page title</title>
  </head>
  <body>
    <div id="root">
      <img src="/employees/leanne-woodard.png" alt="Picture of Leanne Woodard" />
      <h1>Leanne Woodard</h1>
      <span>Product Manager</span>
    </div>
    <script src="script.js"></script>
  </body>
</html>
```

##--##

<br/> <br/> <br/>
server.js

```javascript
import { renderToString } from 'react-dom/server';
import App from './App.jsx';

app.use('/employees/:id', async (req, res) => {
  const data = await peopleApi.findOne(req.params.id);
  const html = renderToString(<App employee={data} />);
  res.send(html);
});
```
