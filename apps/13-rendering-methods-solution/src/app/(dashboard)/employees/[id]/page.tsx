import { getEmployee, getEmployeeIds } from '@/app/providers/employees';
import { ApiError } from '@sfeir/helpers';
import { EmployeeExpenses } from '@sfeir/ui-solution';
import { PageTitle, PersonCard } from '@sfeir/ui-solution/server';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

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
          Single Employee - {employee.firstname} {employee.lastname}
        </PageTitle>
        <PersonCard person={employee} actions={<EmployeeExpenses employeeId={employee.id} />} />
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
