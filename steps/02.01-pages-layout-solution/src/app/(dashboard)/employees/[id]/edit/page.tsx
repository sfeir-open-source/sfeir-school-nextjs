import EmployeeForm from '@/components/EmployeeForm';

import PageTitle from '@/components/PageTitle';

const EmployeeDetail = async ({ params }: { params: { id: string } }) => {
  return (
    <>
      <PageTitle backHref={`/employees/${params.id}`}>
        Single Employee - {params.id} <span className="font-normal">| Edit</span>
      </PageTitle>

      <div className="flex gap-4 bg-white p-4 rounded-lg dark:bg-slate-900">
        <EmployeeForm className="w-full" />
      </div>
    </>
  );
};

export default EmployeeDetail;
