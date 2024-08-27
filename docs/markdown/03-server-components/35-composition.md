<!-- .slide: class="two-column with-code title-margin-sm " -->

<style>
  .tree-34{
    width: 500px;
    height: auto;
  }
</style>

# Composition

**Do all child-components have to be client-components?**

Imagine this component :

```jsx
'use client';
import EmployeeCard from './EmployeeCard';
import Pagination from './Pagination';

const EmployeesList = ({ employees }) => {
  const [displayMode, setDisplayMode] = useState('list');

  useEffect(() => {
    const eventCallback = () => setDisplayMode((value) => (value === 'list' ? 'grid' : 'list'));
    window.addEventListener('toggle-display-mode', eventCallback);
    return () => window.removeEventListener('toggle-display-mode', eventCallback);
  }, []);

  return (
    <div className={displayMode}>
      {employees.map((employee) => (
        <EmployeeCard key={employee.id} employee={employee} />
      ))}
      <Pagination />
    </div>
  );
};
```

##--##

<br/> <br/> <br/>

And the component tree :

<img src="./assets/images/03-server-components/tree-2.png" class="tree-34" />
