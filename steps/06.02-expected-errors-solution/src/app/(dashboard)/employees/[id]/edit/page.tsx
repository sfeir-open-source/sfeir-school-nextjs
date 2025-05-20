import EmployeeForm from '@/components/EmployeeForm';
import PageTitle from '@/components/PageTitle';

import * as peopleApi from '@/api/people';

import { update } from '../../actions';
import Alert from '@/components/Alert';

const EmployeeDetail = async ({ params }: { params: { id: string } }) => {
  try {
    const employee = await peopleApi.findOne(params.id);
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
  } catch (err) {
    if (err.message === 'Not Found') {
      return <Alert>Oops, the employee {params.id} does not exist</Alert>;
    }
  }
};

export default EmployeeDetail;
