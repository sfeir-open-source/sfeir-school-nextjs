import { NextRequest } from 'next/server';

import { getExpenses } from '@/app/providers/expensees';

export const GET = async (request: NextRequest) => {
  const employeeId = request.nextUrl.searchParams.get('employeeId');
  const data = await getExpenses({ employeeId: employeeId ?? '' });
  return Response.json(data);
};
