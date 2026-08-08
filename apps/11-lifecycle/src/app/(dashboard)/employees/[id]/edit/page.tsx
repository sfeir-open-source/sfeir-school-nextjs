import { updateEmployee } from '@/app/(dashboard)/employees/action';
import { getEmployee } from '@/app/providers/employees';
import { ApiError } from '@sfeir/helpers';
import { EmployeeForm, PageTitle } from '@sfeir/ui/server';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

const EmployeeEditContent = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  try {
    const employee = await getEmployee(id);
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
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    throw error;
  }
};

const EmployeeDetail = (props: { params: Promise<{ id: string }> }) => (
  <Suspense fallback={<div>Loading...</div>}>
    <EmployeeEditContent params={props.params} />
  </Suspense>
);

export default EmployeeDetail;
