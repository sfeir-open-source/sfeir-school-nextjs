<!-- .slide: class="two-column with-code " -->

# Server Components

## Node API

Provides access to server files and Node.js API

##--##

<br/>

<br/>

MachineInformation.tsx :

```jsx
import os from 'os';

function MachineInfo() {
  const info = {
    'Operating System': os.platform(),
    Version: os.release(),
    'CPU Architecture': os.arch(),
    'Total Memory (GB)': os.totalmem() / (1024 * 1024 * 1024),
    'Number of CPUs': os.cpus().length,
  };

  return (
    <div>
      <h2>Machine Information</h2>
      <ul>
        {Object.entries(info).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MachineInfo;
```

Notes:

Vu qu'ils ne sont joués qu'une seule fois et sur le serveur, ils permettent d'accéder aux apis nodejs

On peut faire la comparaison avec PHP : le langage a accès à toutes les ressources du serveur

Il n'y a que dans certains cas bien particuliers qu'on décide d'insérer du code "client" via un "script"
