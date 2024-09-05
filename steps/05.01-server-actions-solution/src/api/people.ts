import { Person } from '@/types';
import { fetchJson } from './common';
import qs from 'query-string';

const baseUrl = process.env.API_BASE_URL ? process.env.API_BASE_URL + '/api' : 'http://localhost:3001/api';
const apiKey = process.env.API_KEY || '';

export const findAll = ({ search }: { search?: string }): Promise<{ data: Array<Person> }> => {
  const url = qs.stringifyUrl({
    url: baseUrl + '/people',
    query: {
      search,
    },
  });
  return fetchJson(url, { headers: { ['x-api-key']: apiKey }, next: { tags: ['all-employees', 'employees'] } });
};

export const findOne = (id: string): Promise<Person> =>
  fetchJson(`${baseUrl}/people/${id}`, {
    headers: { ['x-api-key']: apiKey },
    next: { tags: ['single-employee', 'employees'] },
  });

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
  isManager: boolean;
  manager?: string;
  managerId?: string;
}): Promise<Person> => {
  const url = `${baseUrl}/people`;
  return fetchJson<Person>(url, { method: 'POST', body: JSON.stringify(personData) });
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
  const url = `${baseUrl}/people/${personData.id}`;
  return fetchJson<Person>(url, { method: 'PATCH', body: JSON.stringify(personData) });
};
