import { API_BASE_URL, API_KEY } from '@/app/shared/env';
import { buildQueryParamsToString, fetchData } from '@sfeir/helpers';
import { Expense, Paginated } from '@sfeir/types';

export async function getExpenses(filter: Record<string, unknown> = {}) {
  const searchParams = buildQueryParamsToString(filter);
  const url = `${API_BASE_URL}/expenses${searchParams ? `?${searchParams}` : ''}`;
  console.log('url', url);
  const headers = {
    'x-api-key': API_KEY ?? '',
  };
  return await fetchData<Paginated<Expense>>(url, { headers });
}

export async function getExpenseById(id: string) {
  const url = `${API_BASE_URL}/expenses/${id}`;
  const headers = {
    'x-api-key': API_KEY ?? '',
  };
  return await fetchData<Expense>(url, { headers });
}
