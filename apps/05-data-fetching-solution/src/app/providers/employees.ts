import { API_BASE_URL, API_KEY } from '@/app/shared/env';
import { fetchData } from '@sfeir/helpers';
import { Paginated, Person } from '@sfeir/types';

export async function getEmployees(search?: string) {
  let stringQueryParams: string | undefined;
  if (search) {
    stringQueryParams = `search=${search}`;
  }
  const url = `${API_BASE_URL}/people${stringQueryParams ? `?${stringQueryParams}` : ''}`;
  const headers = {
    'x-api-key': API_KEY ?? '',
  };
  return await fetchData<Paginated<Person>>(url, { headers });
}

export async function getEmployee(id: string) {
  const url = `${API_BASE_URL}/people/${id}`;
  const headers = {
    'x-api-key': API_KEY ?? '',
  };
  return await fetchData<Person>(url, { headers });
}
