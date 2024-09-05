<!-- .slide: class="two-column with-code " -->

<style>
  .client-server-03{
    width: 700px;
    height: auto;
  }
  </style>

# Client vs Server component

<img src="./assets/images/03-server-components/client-server.png" class="client-server-03" />

##--##

<br/> <br/> <br/>
To declare a client component :

```jsx
'use client';

const MyComponent = () => {
  return <h1>Hello World!</h1>;
};
```

Notes:

Justement, si on veut faire l'équivalent d'un script en PHP, on peut ajouter un "use client" sur un composant

ça signifie alors qu'il sera éxécuté une fois, lors du rendu initial côté serveur

Puis une ou plusieurs fois côté client, selon son cycle de vie
