import { getEmployee } from '@/app/providers/employees';
import { EmployeeExpenses } from '@sfeir/ui-solution';
import { PageTitle, PersonCard } from '@sfeir/ui-solution/server';
import { Suspense } from 'react';

const EmployeeDetailContent = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const employee = await getEmployee(params.id);

  if (!employee) return <PageTitle backHref="/employees">Single Employee - Not found</PageTitle>;

  return <PersonCard person={employee} actions={<EmployeeExpenses employeeId={employee.id} />} />;
};

const EmployeeDetail = (props: { params: Promise<{ id: string }> }) => (
  <Suspense fallback={<div>Loading...</div>}>
    <EmployeeDetailContent {...props} />
  </Suspense>
);

export default EmployeeDetail;
