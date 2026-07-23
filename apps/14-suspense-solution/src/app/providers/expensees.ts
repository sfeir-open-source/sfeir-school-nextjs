import { API_BASE_URL, API_KEY } from '@/app/shared/env';
import { buildQueryParamsToString, fetchData } from '@sfeir/helpers';
import { Expense, Paginated } from '@sfeir/types';
import { cacheTag } from 'next/cache';

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
  'use cache';
  cacheTag('one-expense');
  const url = `${API_BASE_URL}/expenses/${id}`;
  const headers = {
    'x-api-key': API_KEY ?? '',
  };
  return await fetchData<Expense>(url, { headers });
}

export async function getExpenseIds(limit = 5): Promise<string[]> {
  const { items } = await getExpenses({ per_page: limit });
  return items.map(item => item.id);
}
