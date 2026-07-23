import { API_BASE_URL, API_KEY } from '@/app/shared/env';
import { buildQueryParamsToString, fetchData } from '@sfeir/helpers';
import { Paginated, Person, UpsertEmployee } from '@sfeir/types';
import { cacheLife, cacheTag } from 'next/cache';

async function fetchEmployees(filter: Record<string, unknown>) {
  const stringQueryParams = buildQueryParamsToString(filter);
  const url = `${API_BASE_URL}/people${stringQueryParams ? `?${stringQueryParams}` : ''}`;
  const headers = {
    'x-api-key': API_KEY ?? '',
  };
  return await fetchData<Paginated<Person>>(url, { headers });
}

export async function getEmployees(filter: Record<string, unknown>) {
  'use cache';
  cacheTag('all-employees');
  return fetchEmployees(filter);
}

// Deliberately uncached variant for the always-dynamic homepage
export async function getEmployeesUncached(filter: Record<string, unknown>) {
  return fetchEmployees(filter);
}

// Frozen at build time so ids created after the build never pass the runtime guard
// in employees/[id]/(edit)/page.tsx. Nothing revalidates this tag - it only changes
// on a fresh build/deploy.
export async function getEmployeeIds(): Promise<string[]> {
  'use cache';
  cacheTag('employee-ids');
  cacheLife('max');
  const { items } = await fetchEmployees({ per_page: 100 });
  return items.map(item => item.id);
}

export async function getEmployee(id: string) {
  'use cache';
  cacheTag('one-employee');
  const url = `${API_BASE_URL}/people/${id}`;
  const headers = {
    'x-api-key': API_KEY ?? '',
  };
  return await fetchData<Person>(url, { headers });
}

export async function postEmployee(employee: UpsertEmployee) {
  const url = `${API_BASE_URL}/people`;
  const headers = {
    'x-api-key': API_KEY ?? '',
  };
  return await fetchData<Person>(url, { headers, method: 'POST', body: JSON.stringify(employee) });
}

export async function putEmployee(id: string, employee: UpsertEmployee) {
  const url = `${API_BASE_URL}/people/${id}`;
  const headers = {
    'x-api-key': API_KEY ?? '',
  };
  return await fetchData<Person>(url, { headers, method: 'PUT', body: JSON.stringify(employee) });
}
