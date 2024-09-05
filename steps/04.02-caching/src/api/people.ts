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
  return fetchJson(url, { headers: { ['x-api-key']: apiKey } });
};

export const findOne = (id: string): Promise<Person> =>
  fetchJson(`${baseUrl}/people/${id}`, { headers: { ['x-api-key']: apiKey } });
