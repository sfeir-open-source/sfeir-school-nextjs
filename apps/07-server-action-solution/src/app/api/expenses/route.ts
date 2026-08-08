import { NextRequest } from 'next/server';

import { getExpensesByEmployee } from '@/app/providers/expensees';

export const GET = async (request: NextRequest) => {
  const employeeId = request.nextUrl.searchParams.get('employeeId');
  const data = await getExpensesByEmployee(employeeId || '');
  return Response.json(data);
};
