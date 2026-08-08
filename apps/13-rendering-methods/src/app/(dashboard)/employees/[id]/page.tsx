import { getEmployee } from '@/app/providers/employees';
import { ApiError } from '@sfeir/helpers';
import { EmployeeExpenses } from '@sfeir/ui';
import { PageTitle, PersonCard } from '@sfeir/ui/server';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

const EmployeeDetailContent = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

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
