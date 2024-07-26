import * as peopleApi from '@/api/people';
import PersonCard from '@/components/PersonCard';

const EmployeesCards = async () => {
  const employees = await peopleApi.findAll();

  if (!employees.length) return <p>No result</p>;

  return (
    <div className="employees-cards">
      {employees.map((employee) => (
        <PersonCard key={employee.id} person={employee} />
      ))}
    </div>
  );
};

export default EmployeesCards;
