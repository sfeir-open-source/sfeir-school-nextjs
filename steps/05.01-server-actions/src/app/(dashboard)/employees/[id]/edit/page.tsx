import EmployeeForm from '@/components/EmployeeForm';
import PageTitle from '@/components/PageTitle';

import * as peopleApi from '@/api/people';

const EmployeeDetail = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const employee = await peopleApi.findOne(params.id);

  if (!employee) return <PageTitle>Single Employee - Not found</PageTitle>;

  return (
    <>
      <PageTitle backHref={`/employees/${params.id}`}>
        Single Employee - {employee.firstname} {employee.lastname} <span className="font-normal">| Edit</span>
      </PageTitle>

      <div className="flex gap-4 bg-white p-4 rounded-lg dark:bg-slate-900">
        <EmployeeForm className="w-full" employee={employee} />
      </div>
    </>
  );
};

export default EmployeeDetail;
