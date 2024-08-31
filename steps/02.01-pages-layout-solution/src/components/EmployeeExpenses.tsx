import ExpensesTable from '@/components/ExpensesTable';

import * as expensesApi from '@/api/expenses';

type EmployeeExpensesProps = {
  employeeId: string;
};

const EmployeeExpenses: React.FC<EmployeeExpensesProps> = async ({ employeeId }) => {
  const expenses = await expensesApi.findLatestOfEmployee(employeeId, 20);
  if (!expenses.length) return <p>This employee has no expense</p>;
  return <ExpensesTable expenses={expenses} />;
};

export default EmployeeExpenses;
