import * as peopleApi from '@/api/people';
import PersonCard from '@/components/PersonCard';

const EmployeesSlot = async () => {
  const latestEmployees = await peopleApi.findAll({ perPage: 6, sortBy: 'entryDate', order: 'desc' }, [
    'latest-employees',
  ]);
  return (
    <div className="grid grid-cols-3 gap-4">
      {latestEmployees.data.map((employee) => (
        <PersonCard key={employee.id} person={employee} compact />
      ))}
    </div>
  );
};

export default EmployeesSlot;
