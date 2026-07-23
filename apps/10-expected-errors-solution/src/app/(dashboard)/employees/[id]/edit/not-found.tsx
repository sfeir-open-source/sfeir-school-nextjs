'use client';

import { useParams } from 'next/navigation';
import { Alert } from '@sfeir/ui-solution/server';

const EmployeeNotFound = () => {
  const params = useParams();

  return <Alert>Oops, the employee {params.id} does not exist</Alert>;
};

export default EmployeeNotFound;
