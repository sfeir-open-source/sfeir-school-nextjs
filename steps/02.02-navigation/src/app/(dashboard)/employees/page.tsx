import PageTitle from '@/components/PageTitle';

// import employeesData from '@/data/employees.json';

const Employees = async () => {
  return (
    <div className="flex flex-col">
      <PageTitle>Employees</PageTitle>

      <div className="grid grid-cols-4 gap-4"></div>
    </div>
  );
};

export default Employees;
