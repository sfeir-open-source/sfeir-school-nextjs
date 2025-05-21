import EmployeeForm from '@/components/EmployeeForm';
import PageTitle from '@/components/PageTitle';

import employeesData from '@/data/employees.json';

const EmployeeDetail = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const employee = employeesData.find((employee) => employee.id === params.id);

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
