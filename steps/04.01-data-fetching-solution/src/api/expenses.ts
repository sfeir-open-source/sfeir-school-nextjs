import { Expense } from '@/types';
import { fetchJson } from './common';
import qs from 'query-string';

const baseUrl = process.env.API_BASE_URL + '/api' || 'http://localhost:3001/api';
const apiKey = process.env.API_KEY || '';

export const findAll = ({ query }: { query?: { employee?: string } } = {}): Promise<{ data: Array<Expense> }> => {
  const url = qs.stringifyUrl({
    url: baseUrl + '/expenses',
    query,
  });
  return fetchJson(url, { headers: { ['x-api-key']: apiKey } });
};

export const findOne = (id: string): Promise<Expense> =>
  fetchJson(`${baseUrl}/expenses/${id}`, { headers: { ['x-api-key']: apiKey } });
