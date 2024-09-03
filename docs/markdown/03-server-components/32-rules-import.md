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
