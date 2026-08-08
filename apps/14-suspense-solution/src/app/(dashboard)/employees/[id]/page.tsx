import { getEmployee, getEmployeeIds } from '@/app/providers/employees';
import { getExpenses } from '@/app/providers/expensees';
import { ApiError } from '@sfeir/helpers';
import { Button, ExpensesTable, PageTitle, Paper, PersonCard, TableLoading } from '@sfeir/ui-solution/server';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';

const EmployeeExpenses = async ({ employeeId }: { employeeId: string }) => {
  const { items: expenses } = await getExpenses({ employeeId });
  return <ExpensesTable expenses={expenses} />;
};

export async function generateStaticParams() {
  const ids = await getEmployeeIds();
  return ids.map(id => ({ id }));
}

const EmployeeDetailContent = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const validIds = await getEmployeeIds();
  if (!validIds.includes(id)) {
    notFound();
  }

  try {
    const employee = await getEmployee(id);
    return (
      <>
        <PageTitle backHref="/employees">
          {employee.firstname} {employee.lastname}
        </PageTitle>

        <div className="flex gap-4 mt-4">
          <div className="w-3/5">
            <PersonCard
              person={employee}
              actions={
                <>
                  <Button variant="secondary" component={Link} href={`/employees/${employee.id}/edit`}>
                    Edit
                  </Button>
                </>
              }
            />
          </div>
          <Paper className="w-2/5">
            <h2 className="text-xl font-bold p-4">Last expenses</h2>
            <Suspense fallback={<TableLoading rows={5} cols={5} />}>
              <EmployeeExpenses employeeId={id} />
            </Suspense>
          </Paper>
        </div>
      </>
    );
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    throw error;
  }
};

const EmployeeDetail = (props: { params: Promise<{ id: string }> }) => (
  <Suspense fallback={<div>Loading...</div>}>
    <EmployeeDetailContent params={props.params} />
  </Suspense>
);

export default EmployeeDetail;
