import { getEmployee } from '@/app/providers/employees';
import { EmployeeExpenses } from '@sfeir/ui';
import { PageTitle, PersonCard } from '@sfeir/ui/server';
import { Suspense } from 'react';

const EmployeeDetailContent = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const employee = await getEmployee(id);

  if (!employee) return <PageTitle backHref="/employees">Single Employee - Not found</PageTitle>;

  return <PersonCard person={employee} actions={<EmployeeExpenses employeeId={employee.id} />} />;
};

const EmployeeDetail = (props: { params: Promise<{ id: string }> }) => (
  <Suspense fallback={<div>Loading...</div>}>
    <EmployeeDetailContent params={props.params} />
  </Suspense>
);

export default EmployeeDetail;
