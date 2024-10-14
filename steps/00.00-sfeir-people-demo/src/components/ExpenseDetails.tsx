import * as expensesApi from '@/api/expenses';
import * as peopleApi from '@/api/people';
import PersonCard from './PersonCard';
import { Suspense } from 'react';
import Paper from './Paper';
import Skeleton from './Skeleton';
import ExpenseDetailsStructure from './ExpensesDetailsStructure';

type ExpenseDetailsRowProps = {
  label: string;
  value: string;
};

const ExpenseDetailsRow: React.FC<ExpenseDetailsRowProps> = ({ label, value }) => (
  <div>
    <span className="block text-gray-500 text-sm">{label}</span>
    <span className="block">{value}</span>
  </div>
);

type ExpenseEmployeeProps = {
  employeeId: string;
};

const ExpenseEmployee: React.FC<ExpenseEmployeeProps> = async ({ employeeId, ...restProps }) => {
  const employee = await peopleApi.findOne(employeeId);

  return <PersonCard person={employee} compact {...restProps} />;
};

type ExpenseDetailsProps = {
  expenseId: string;
};

const ExpenseDetails: React.FC<ExpenseDetailsProps> = async ({ expenseId }) => {
  const expense = await expensesApi.findOne(expenseId);

  return (
    <ExpenseDetailsStructure
      information={
        <Paper className="p-4 space-y-4 mb-4">
          <ExpenseDetailsRow label="Label" value={expense.label} />
          <ExpenseDetailsRow label="Category" value={expense.category} />
          <ExpenseDetailsRow label="Description" value={expense.description} />
        </Paper>
      }
      workflow={
        <Paper className="p-4 space-y-4 mb-4">
          <ExpenseDetailsRow label="Creation date" value={new Date(expense.creationDate).toLocaleString('en-GB')} />
          <ExpenseDetailsRow label="Last update" value={new Date(expense.updateDate).toLocaleString('en-GB')} />
          <ExpenseDetailsRow label="Status" value={expense.status} />
        </Paper>
      }
      amount={
        <Paper className="p-4 space-y-4">
          <ExpenseDetailsRow
            label="Without taxes"
            value={`${expense.price.priceExcludingTax} ${expense.price.currency}`}
          />
          <ExpenseDetailsRow label="Tax amount" value={`${expense.price.taxAmount} ${expense.price.currency}`} />
          <ExpenseDetailsRow label="Total" value={`${expense.price.priceIncludingTax} ${expense.price.currency}`} />
        </Paper>
      }
      employee={
        <Suspense fallback={<Skeleton className="min-h-48" />}>
          <ExpenseEmployee employeeId={expense.employeeId} />
        </Suspense>
      }
    />
  );
};

export default ExpenseDetails;
