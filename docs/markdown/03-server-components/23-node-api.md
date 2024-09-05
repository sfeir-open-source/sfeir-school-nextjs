<!-- .slide: class="two-column with-code " -->

# Server components

## Node API

Provides access to server files and Node.js API

##--##

<br/>

<br/>

LogViewer.tsx :

```jsx
import fs from 'fs/promises';
import path from 'path';

const LogViewer = async () => {
  const logFilePath = path.join(process.cwd(), 'logs', 'logs.txt');
  const content = await fs.readFile(logFilePath, 'utf-8');
  const lines = content.split('\n');

  return (
    <div>
      <h1>Logs</h1>
      <div>
        {lines.map((log) => {
          const [timestamp, level, message] = line.split(' - ');
          return (
            <div key={log.timestamp}>
              <div>{log.timestamp}</div>
              <div>{log.level}</div>
              <div>{log.message}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
```

Notes:

Vu qu'ils ne sont joués qu'une seule fois et sur le serveur, ils permettent d'accéder aux apis nodejs

On peut faire la comparaison avec PHP : le langage a accès à toutes les ressources du serveur

Il n'y a que dans certains cas bien particuliers qu'on décide d'insérer du code "client" via un "script"
