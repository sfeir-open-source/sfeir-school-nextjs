'use client';

import { useState } from 'react';
import Button from './Button';
import { Expense } from '@/types';
import ExpensesTable from './ExpensesTable';
import Alert from './Alert';

type EmployeeExpensesProps = {
  employeeId: string;
};

const EmployeeExpenses: React.FC<EmployeeExpensesProps> = ({ employeeId }) => {
  const [loadingStatus, setLoadingStatus] = useState('IDLE');
  const [expenses, setExpenses] = useState<null | Array<Expense>>(null);

  const handleOpen = async () => {
    setLoadingStatus('LOADING');
    try {
      const expensesData = (await fetch(`/rest/expenses?employeeId=${employeeId}`).then((res) => res.json())) as {
        data: Array<Expense>;
      };
      setExpenses(expensesData.data);
      setLoadingStatus('LOADED');
    } catch (err) {
      setLoadingStatus('ERROR');
    }
  };

  if (loadingStatus === 'IDLE') {
    return <Button onClick={handleOpen}>Load expenses</Button>;
  }

  if (loadingStatus === 'LOADING') {
    return 'Loading...';
  }

  if (loadingStatus === 'LOADED') {
    if (!expenses?.length) return <Alert>No expenses for this employee</Alert>;
    return <ExpensesTable expenses={expenses} />;
  }

  return <Alert>Oops, something went wrong :/</Alert>;
};

export default EmployeeExpenses;
