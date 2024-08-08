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
