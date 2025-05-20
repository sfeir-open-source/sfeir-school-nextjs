import EmployeeForm from '@/components/EmployeeForm';
import PageTitle from '@/components/PageTitle';

import employeesData from '@/data/employees.json';


interface EmployeeDetailPageParams {
  params: Promise<{
    id: string;
  }>;
}

const EmployeeDetail = async ({ params }: EmployeeDetailPageParams) => {
  const { id } = await params;

  const employee = employeesData.find((employee) => employee.id === id);

  if (!employee) return <PageTitle>Single Employee - Not found</PageTitle>;

  return (
    <>
      <PageTitle backHref={`/employees/${id}`}>
        Single Employee - {employee.firstname} {employee.lastname} <span className="font-normal">| Edit</span>
      </PageTitle>

      <div className="flex gap-4 bg-white p-4 rounded-lg dark:bg-slate-900">
        <EmployeeForm className="w-full" employee={employee} />
      </div>
    </>
  );
};

export default EmployeeDetail;
