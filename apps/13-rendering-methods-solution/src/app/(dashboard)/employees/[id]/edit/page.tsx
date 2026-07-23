import { updateEmployee } from '@/app/(dashboard)/employees/action';
import { getEmployee, getEmployeeIds } from '@/app/providers/employees';
import { ApiError } from '@sfeir/helpers';
import { EmployeeForm, PageTitle } from '@sfeir/ui-solution/server';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export async function generateStaticParams() {
  const ids = await getEmployeeIds();
  return ids.map(id => ({ id }));
}

const EmployeeEditContent = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const validIds = await getEmployeeIds();
  if (!validIds.includes(id)) {
    notFound();
  }

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
