<!-- .slide: class="two-column with-code " -->

# Navigating

## Shallow routing

**using `window.history` native API** :

- window.history.pushState
- window.history.replaceState

##--##

<br/>
<br/>
<br/>

Example :

```jsx
'use client';

const Component = () => {
  const handleClick = () => {
    window.history.pushState(null, '', `?allResults=true`);
  };
  return <button onClick={handleClick}>Show all results</button>;
};
```

Notes:

Le shallow routing, cela permet de mettre à jour l'URL, et donc d'ajouter une entrée dans l'historique de navigation

Sans causer un re-render de la page

Donc on ne touche pas à l'arbre de composants, mais on change l'URL

Utile par exemple si on veut gérer du scroll infini :

- On change l'URL manuellement
- On se charge de render nous même les éléments suivants, plutôt que de le faire via un changement de page
