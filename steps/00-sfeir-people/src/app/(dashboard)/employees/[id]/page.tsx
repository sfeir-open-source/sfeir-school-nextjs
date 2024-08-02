import * as peopleApi from '@/api/people';
import Link from 'next/link';

import ArrowLeft from '@/components/Icons/ArrowLeft';
import EmployeeForm from '@/components/EmployeeForm';

import { update } from './actions';

const EmployeeDetail = async ({ params }: { params: { id: string } }) => {
  const employee = await peopleApi.findOne(params.id);

  const formAction = update.bind(null, employee.id);

  return (
    <>
      <div className="flex items-center gap-1">
        <Link
          href="/employees"
          className="text-white font-medium  block p-2.5 text-center items-center me-2 hover:bg-blue-100 rounded-full"
        >
          <ArrowLeft className="w-6 h-6 text-gray-800" />
          <span className="sr-only">Icon description</span>
        </Link>
        <h1 className="text-2xl font-bold">
          {employee.firstname} {employee.lastname}
        </h1>
      </div>

      <div className="flex gap-4 mt-4">
        <div className="bg-white p-4 rounded-lg w-3/5">
          <EmployeeForm employee={employee} action={formAction} />
        </div>
        <div className="bg-white p-4 rounded-lg w-2/5"></div>
      </div>
    </>
  );
};

export default EmployeeDetail;
