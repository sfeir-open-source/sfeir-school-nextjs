import { getEmployee } from '@/app/providers/employees';
import { EmployeeForm, PageTitle } from '@sfeir/ui-solution/server';
import { Suspense } from 'react';
import { updateEmployee } from '@/app/(dashboard)/employees/action';

const EmployeeEditContent = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const employee = await getEmployee(id);

  if (!employee) return <PageTitle>Single Employee - Not found</PageTitle>;

  return (
    <>
      <PageTitle backHref={`/employees/${id}`}>
        Single Employee - {employee.firstname} {employee.lastname} <span className="font-normal">| Edit</span>
      </PageTitle>

      <div className="flex gap-4 bg-white p-4 rounded-lg dark:bg-slate-900">
        <EmployeeForm className="w-full" employee={employee} action={updateEmployee} />
      </div>
    </>
  );
};

const EmployeeDetail = (props: { params: Promise<{ id: string }> }) => (
  <Suspense fallback={<div>Loading...</div>}>
    <EmployeeEditContent params={props.params} />
  </Suspense>
);

export default EmployeeDetail;
