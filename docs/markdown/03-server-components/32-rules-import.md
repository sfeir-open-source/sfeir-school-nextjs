<!-- .slide: class="two-column with-code title-margin-sm" -->

<style>
  .tree-32{
    width: 500px;
    height: auto;
  }
</style>

# Composition

**Can a server-component receive props ? <br/>**

Imagine this component :

```jsx
const Pagination = ({ pagesCount }) => {
  return <div>Number of pages : {pagesCount}</div>;
};
```

##--##

<br/> <br/>

<div>
If all the components are Server Components, the property will never change because they are never re-rendered.

<img src="./assets/images/03-server-components/tree-0.png" class="tree-32" />
</div>
<!-- .element: class="fragment" data-fragment-index="1"-->

Notes:

On peut faire de la composition avec des server components, et donc passer des props

Est-ce qu'un changement de props causera un re-render ? Non !

Mais si toute l'arbo de composant est des RSC, alors il n'y aura jamais de changement de props car rien ne peut le causer

Le rendu côté serveur est fait en one-shot, pas de re-render possible
