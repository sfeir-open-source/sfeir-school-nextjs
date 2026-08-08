import { API_BASE_URL, API_KEY } from '@/app/shared/env';
import { fetchData } from '@sfeir/helpers';
import { Expense, Paginated } from '@sfeir/types';

export async function getExpensesByEmployee(employeeId: string) {
  const url = `${API_BASE_URL}/expenses?employeeId=${employeeId}`;
  const headers = {
    'x-api-key': API_KEY ?? '',
  };
  return await fetchData<Paginated<Expense>>(url, { headers });
}

export async function getExpenses() {
  const url = `${API_BASE_URL}/expenses`;
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
