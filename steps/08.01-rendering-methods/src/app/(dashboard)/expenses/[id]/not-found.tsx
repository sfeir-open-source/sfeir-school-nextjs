'use client';

import Alert from '@/components/Alert';
import { useParams } from 'next/navigation';

const ExpenseNotFound = () => {
  const params = useParams();

  return <Alert>Oops, the expense {params.id} does not exist</Alert>;
};

export default ExpenseNotFound;
