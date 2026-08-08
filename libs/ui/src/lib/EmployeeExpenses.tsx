'use client';

import { Expense } from '@sfeir/types';
import { memo, useState } from 'react';
import { Alert } from './Alert';
import { Button } from './Button';
import { ExpensesTable } from './ExpensesTable';

type EmployeeExpensesProps = {
  employeeId: string;
};

export const EmployeeExpenses = memo(({ employeeId }: EmployeeExpensesProps) => {
  const [loadingStatus, setLoadingStatus] = useState('IDLE');
  const [expenses, setExpenses] = useState<null | Array<Expense>>(null);

  const handleOpen = async () => {
    setLoadingStatus('LOADING');
    try {
      const expensesData = (await fetch(`/api/expenses?employeeId=${employeeId}`).then(res => res.json())) as {
        items: Array<Expense>;
        pageNumber: number;
        pageSize: number;
        totalPage: number;
      };
      setExpenses(expensesData.items);
      setLoadingStatus('LOADED');
    } catch (err) {
      console.error(err);
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
});
