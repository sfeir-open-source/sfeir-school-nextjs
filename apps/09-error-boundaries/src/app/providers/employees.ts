import { API_BASE_URL, API_KEY } from '@/app/shared/env';
import { buildQueryParamsToString, fetchData } from '@sfeir/helpers';
import { Paginated, Person, UpsertEmployee } from '@sfeir/types';
import { cacheTag } from 'next/cache';

export async function getEmployees(filter: Record<string, unknown>) {
  'use cache';
  cacheTag('all-employees');
  const stringQueryParams = buildQueryParamsToString(filter);
  const url = `${API_BASE_URL}/people${stringQueryParams ? `?${stringQueryParams}` : ''}`;
  const headers = {
    'x-api-key': API_KEY ?? '',
  };
  return await fetchData<Paginated<Person>>(url, { headers });
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
