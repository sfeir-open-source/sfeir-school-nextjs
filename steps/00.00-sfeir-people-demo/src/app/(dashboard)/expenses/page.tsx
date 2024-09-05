import ExpensesTable from '@/components/ExpensesTable';
import PageTitle from '@/components/PageTitle';

import * as expensesApi from '@/api/expenses';
import Pagination from '@/components/Pagination';

const Expenses = async ({ searchParams }: { searchParams: { page?: string } }) => {
  const { data: expenses, pagination } = await expensesApi.findAll({
    page: Number(searchParams.page) || 1,
  });

  return (
    <div className="flex flex-col">
      <PageTitle>Expenses</PageTitle>

      <div className="rounded-lg overflow-hidden flex flex-col gap-4">
        <ExpensesTable expenses={expenses} />
        <Pagination totalPages={pagination.total_pages} className="self-center" />
      </div>
    </div>
  );
};

export default Expenses;
