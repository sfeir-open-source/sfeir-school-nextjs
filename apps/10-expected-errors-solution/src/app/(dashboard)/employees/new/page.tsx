import { EmployeeForm, PageTitle } from '@sfeir/ui-solution/server';
import { createEmployee } from '@/app/(dashboard)/employees/action';

const newEmployeeForm = () => {
  return (
    <>
      <PageTitle backHref="/employees">
        Employees <span className="font-normal">| Create</span>
      </PageTitle>

      <div className="flex gap-4 bg-white p-4 rounded-lg dark:bg-slate-900">
        <EmployeeForm className="w-full" action={createEmployee} />
      </div>
    </>
  );
};

export default newEmployeeForm;
