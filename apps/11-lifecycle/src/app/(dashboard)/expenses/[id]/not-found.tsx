'use client';

import { Alert } from '@sfeir/ui/server';
import { useParams } from 'next/navigation';

const EmployeeNotFound = () => {
  const params = useParams();

  return <Alert>Oops, the expenses {params.id} does not exist</Alert>;
};

export default EmployeeNotFound;
