<!-- .slide: class="two-column with-code " -->

<style>
  .tree-34{
    width: 500px;
    height: auto;
  }
</style>

# Composition

**What if I import a server-component from a client-component ?**

Imagine this component :

```jsx
const Pagination = async () => {
  const data = await fetch('/api/employees/pagination');
  return <div>Total pages : {data.pageCount}</div>;
};
```

##--##

<div>
<br/> <br/>

It's impossible to import it from a client-component :

<img src="./assets/images/03-server-components/tree-3.png" class="tree-34" />
</div>
<!-- .element: class="fragment" data-fragment-index="1"-->

Notes:

Exemple d'import impossible à faire
