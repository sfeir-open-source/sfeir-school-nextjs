<!-- .slide: class="two-column with-code title-margin-sm " -->

<style>
  .tree-34{
    width: 500px;
    height: auto;
  }
</style>

# Composition

**Do all child-components have to be client-components?**

We can create a dedicated client component :

```jsx
'use client';

const EmployeesList = ({ children }) => {
  const [displayMode, setDisplayMode] = useState('list');

  useEffect(() => {
    const eventCallback = () => setDisplayMode((value) => (value === 'list' ? 'grid' : 'list'));
    window.addEventListener('toggle-display-mode', eventCallback);
    return () => window.removeEventListener('toggle-display-mode', eventCallback);
  }, []);

  return <div className={displayMode}>{children}</div>;
};
```

##--##

<br/>

<br/>
<br/>

<div>

Then use children composition :

App.tsx :

```jsx
import EmployeesList from './EmployeesList';
import EmployeeCard from './EmployeeCard';
import Pagination from './Pagination';

const App = ({ employees }) => {
  return (
    <>
      <EmployeesList>
        {employees.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
        <Pagination />
      </EmployeesList>
    </>
  );
};
```

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->
