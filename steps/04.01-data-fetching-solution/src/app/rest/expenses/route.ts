import { NextRequest } from 'next/server';

import * as expensesApi from '@/api/expenses';

export const GET = async (request: NextRequest) => {
  const employeeId = request.nextUrl.searchParams.get('employeeId');
  const data = await expensesApi.findAll({ query: { employee: employeeId || undefined } });
  return Response.json(data);
};
