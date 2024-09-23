import 'server-only';

import qs from 'query-string';

import { PaginationAttributes, Person } from '@/types';

import { fetchJson } from './common';

const baseUrl = process.env.API_BASE_URL;

const formatPersonObject = (apiPerson: Person): Person => ({
  ...apiPerson,
  photo: apiPerson.photo ? baseUrl + apiPerson.photo : undefined,
});

export const Tags = {
  EMPLOYEE_COMMON: 'employee-common',
  EMPLOYEE_LIST: 'employee-list',
  EMPLOYEE_SINGLE: 'employee-single',
};

export const findAll = async (
  query: {
    search?: string;
    page?: number;
    perPage?: number;
    sortBy?: string;
    order?: string;
  } = {}
): Promise<{ data: Array<Person>; pagination: PaginationAttributes }> => {
  const url = qs.stringifyUrl({
    url: `${baseUrl}/api/people`,
    query: {
      search: query.search,
      per_page: query.perPage || 8,
      page: query.page || 1,
      sort_by: query.sortBy,
      order: query.order,
    },
  });
  const peopleData = await fetchJson<{
    data: Array<Person>;
    pagination: PaginationAttributes;
  }>(url, { next: { tags: [Tags.EMPLOYEE_COMMON, Tags.EMPLOYEE_LIST] } });

  return {
    pagination: peopleData.pagination,
    data: peopleData.data?.map(formatPersonObject),
  };
};

export const findOne = async (id: string): Promise<Person> => {
  const url = `${baseUrl}/api/people/${id}`;
  const data = await fetchJson<Person>(url, {
    next: { tags: [Tags.EMPLOYEE_COMMON, Tags.EMPLOYEE_SINGLE, `employee-${id}`] },
  });
  return formatPersonObject(data);
};

export const create = async (personData: {
  photo?: string;
  firstname: string;
  lastname: string;
  position: string;
  entryDate: string;
  birthDate: string;
  gender?: string;
  email: string;
  phone: string;
  isManager?: boolean;
  manager?: string;
  managerId?: string;
}): Promise<Person> => {
  const url = `${baseUrl}/api/people`;
  const data = await fetchJson<Person>(url, { method: 'POST', body: JSON.stringify(personData) });
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
