<!-- .slide: class="two-column with-code title-margin-sm " -->

<style>
  .tree-34{
    width: 500px;
    height: auto;
  }
</style>

# Composition

**Do all child-components have to be client-components?**

App.tsx :

```jsx
import EmployeesDisplayMode from './EmployeesDisplayMode';
import EmployeesList from './EmployeesList';
import Pagination from './Pagination';

const App = ({ employees }) => {
  return (
    <>
      <EmployeesDisplayMode>
        <EmployeesList employees={employees} />
        <Pagination />
      </EmployeesDisplayMode>
    </>
  );
};
```

##--##

<br/>

<br/>
<br/>

<div>

The component tree now looks like this :

<img src="./assets/images/03-server-components/tree-5.png" class="tree-37" />

Client boundary is much smaller

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->

Notes:

Donc la réponse est non : on est pas condamnés à n'avoir que des client components dans le bas de l'arborescence

Le tout est de visualiser correctement l'arborescence, bien découper les composants et gérer correctement la composition

C'est d'autant plus important avec les Server Components que sur les autres applications React "classiques"
