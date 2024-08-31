import EmployeeForm from '@/components/EmployeeForm';
import PageTitle from '@/components/PageTitle';

const EmployeeDetail = async () => {
  return (
    <>
      <PageTitle backHref="/employees">
        Employees <span className="font-normal">| Create</span>
      </PageTitle>

      <div className="flex gap-4 bg-white p-4 rounded-lg dark:bg-slate-900">
        <EmployeeForm className="w-full" />
      </div>
    </>
  );
};

export default EmployeeDetail;
