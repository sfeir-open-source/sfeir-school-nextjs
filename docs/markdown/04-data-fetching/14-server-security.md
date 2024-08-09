<!-- .slide: class="two-column with-code " -->

# Fetching from the server

## security

Use `server-only` package to prevent sensitive data from being exposed to the client

```js
import 'server-only';

const username = 'root';
const password = 'passw0rd';

export const findAll = () => {
  const link = db.connect('localhost', 'root', 'passw0rd');
  return db.query(link, 'SELECT * FROM employees');
};
```
