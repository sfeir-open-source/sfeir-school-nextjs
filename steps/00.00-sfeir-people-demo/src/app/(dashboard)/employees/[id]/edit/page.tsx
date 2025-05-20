import * as peopleApi from '@/api/people';

import EmployeeForm from '@/components/EmployeeForm';

import { update } from '../../actions';
import PageTitle from '@/components/PageTitle';

const EmployeeDetail = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const employee = await peopleApi.findOne(params.id);

  const formAction = update.bind(null, employee.id);

  return (
    <>
      <PageTitle backHref={`/employees/${employee.id}`}>
        {employee.firstname} {employee.lastname} <span className="font-normal">| Edit</span>
      </PageTitle>

      <div className="flex gap-4 bg-white p-4 rounded-lg dark:bg-slate-900">
        <EmployeeForm className="w-full" employee={employee} action={formAction} />
      </div>
    </>
  );
};

export default EmployeeDetail;
