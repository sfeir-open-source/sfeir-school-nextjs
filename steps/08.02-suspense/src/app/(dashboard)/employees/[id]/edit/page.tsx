import EmployeeForm from '@/components/EmployeeForm';
import PageTitle from '@/components/PageTitle';

import * as peopleApi from '@/api/people';

import { update } from '../../actions';

const EmployeeDetail = async ({ params }: { params: { id: string } }) => {
  const employee = await peopleApi.findOne(params.id);

  if (!employee) return <PageTitle>Single Employee - Not found</PageTitle>;

  const action = update.bind(null, params.id);

  return (
    <>
      <PageTitle backHref={`/employees/${params.id}`}>
        Single Employee - {employee.firstname} {employee.lastname} <span className="font-normal">| Edit</span>
      </PageTitle>

      <div className="flex gap-4 bg-white p-4 rounded-lg dark:bg-slate-900">
        <EmployeeForm className="w-full" employee={employee} action={action} />
      </div>
    </>
  );
};

export default EmployeeDetail;
