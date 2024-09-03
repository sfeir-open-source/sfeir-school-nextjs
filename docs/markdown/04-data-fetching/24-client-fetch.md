<!-- .slide: class="two-column with-code " -->

# Fetching from the client

**Using fetch API**

```js
import { useEffect, useState } from 'react';

const MyComponent = ({ employeeId }) => {
  const [employee, setEmployee] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState('LOADING');

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/employees/${employeeId}`);
      const data = await res.json();
      setEmployee(data);
      setLoadingStatus('LOADED');
    };
  }, []);

  if (loadingStatus === 'LOADING') return 'Loading...';

  return (
    <div>
      <h2>
        {employee.firstname} {employee.lastname}
      </h2>
      <p>{employee.position}</p>
    </div>
  );
};
```

##--##

<br/> <br/>

**Using third party libraries**

```js
// Example using tanstack query
import { useQuery } from '@tanstack/react-query';

const MyComponent = ({ employeeId }) => {
  const {
    data: employee,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['employee', employeeId],
    queryFn: () => fetch(`/employees/${employeeId}`).then((res) => res.json()),
  });

  if (isLoading) return 'Loading...';
  if (error) return `An error occurred: ${error.message}`;

  return (
    <div>
      <h2>
        {employee.firstname} {employee.lastname}
      </h2>
      <p>{employee.position}</p>
    </div>
  );
};
```
