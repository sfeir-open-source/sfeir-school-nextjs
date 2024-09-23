import PersonCard from './PersonCard';

import * as peopleApi from '@/api/people';

type ExpenseEmployeeProps = {
  employeeId: string;
};

const ExpenseEmployee: React.FC<ExpenseEmployeeProps> = async ({ employeeId, ...restProps }) => {
  const employee = await peopleApi.findOne(employeeId);

  return <PersonCard person={employee} compact {...restProps} />;
};

export default ExpenseEmployee;
