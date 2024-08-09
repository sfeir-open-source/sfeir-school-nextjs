import { PaginationAttributes, Person } from '@/types';
import qs from 'query-string';

import { ApiError } from './error';

const baseUrl = process.env.API_BASE_URL;

const formatPersonObject = (apiPerson: Person): Person => ({
  ...apiPerson,
  photo: apiPerson.photo ? baseUrl + apiPerson.photo : undefined,
});

export async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const response: Response = await fetch(url, options);
  const data: T | unknown = await response.json();
  if (response.ok) return data as T;

  throw new ApiError(response.statusText, data as unknown);
}

export const findAll = async (query: {
  search?: string;
  page?: number;
  perPage?: number;
}): Promise<{ data: Array<Person>; pagination: PaginationAttributes }> => {
  const url = qs.stringifyUrl({
    url: `${baseUrl}/api/people`,
    query: {
      search: query.search,
      per_page: query.perPage || 8,
      page: query.page || 1,
    },
  });
  const peopleData = await fetchJson<{
    data: Array<Person>;
    pagination: PaginationAttributes;
  }>(url, { next: { tags: ['employee-list'] } });

  return {
    pagination: peopleData.pagination,
    data: peopleData.data?.map(formatPersonObject),
  };
};

export const findOne = async (id: string): Promise<Person> => {
  const url = `${baseUrl}/api/people/${id}`;
  const data = await fetchJson<Person>(url, { next: { tags: [`employee-${id}`], revalidate: 3600 } });
  return formatPersonObject(data);
};

export const updateOne = async (personData: {
  id: string;
  photo?: string;
  firstname?: string;
  lastname?: string;
  position?: string;
  entryDate?: string;
  birthDate?: string;
  gender?: string;
  email?: string;
  phone?: string;
  isManager?: boolean;
  manager?: string;
  managerId?: string;
}): Promise<Person> => {
  const url = `${baseUrl}/api/people/${personData.id}`;
  const data = await fetchJson<Person>(url, { method: 'PATCH', body: JSON.stringify(personData) });
  return formatPersonObject(data);
};
