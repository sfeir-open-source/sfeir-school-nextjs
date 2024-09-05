<!-- .slide: class="two-column with-code title-margin-sm" -->

# Constraints

As soon as a component needs to use **hooks**, **contexts** or **event handlers**, it must become a client-component

Why ? Because this means it will be re-rendered
**A server-component can never be re-rendered**

##--##

<br/> <br/>

```jsx [1, 6]
"use client"

import { useState, useEffect } from 'react';

const Timer = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setInterval(() => )
  });

  return <span>Seconds : {count}</span>
}
```

Notes:

Maintenant qu'on comprend pourquoi les RSC existent, on va se pencher sur les règles d'utilisation

Quand on sait pourquoi ils existent, normalement ça devrait paraitre assez logique

à partir du moment où un composant a de l'interactivité : hooks, contextes, event handlers

Ils ne peuvent pas être rendus uniquement côté serveur

Sinon toute cette interactivité ne pourrait pas être mise en oeuvre dans le navigateur

Donc pour dire qu'un composant doit être rendu de manière classique, "use client"

ce qui ne l'empêche pas d'être rendu côté serveur. C'est juste que ses éléments interactifs seront ignorés dans le rendu initial
