import 'server-only';

import qs from 'query-string';

import { PaginationAttributes, Expense } from '@/types';

import { fetchJson } from './common';

const baseUrl = process.env.API_BASE_URL || 'http://localhost:3001';

export const Tags = {
  EXPENSE_COMMON: 'expense-common',
  EXPENSE_LIST: 'expense-list',
  EXPENSE_LIST_EMPLOYEE: 'expense-list-employee',
  EXPENSE_SINGLE: 'expense-single',
};

export const findAll = async (query: {
  page?: number;
  perPage?: number;
  sortBy?: string;
  order?: string;
}): Promise<{ data: Array<Expense>; pagination: PaginationAttributes }> => {
  const url = qs.stringifyUrl({
    url: `${baseUrl}/api/expenses`,
    query: {
      per_page: query.perPage || 10,
      page: query.page || 1,
      order: query.order,
      sort_by: query.sortBy,
    },
  });
  const expensesData = await fetchJson<{
    data: Array<Expense>;
    pagination: PaginationAttributes;
  }>(url, { next: { tags: [Tags.EXPENSE_COMMON, Tags.EXPENSE_LIST] } });

  return {
    pagination: expensesData.pagination,
    data: expensesData.data,
  };
};

export const findLatestOfEmployee = async (id: string, count?: number): Promise<Array<Expense>> => {
  const url = qs.stringifyUrl({
    url: `${baseUrl}/api/expenses`,
    query: {
      employee: id,
      per_page: count || 20,
      page: 1,
      sort_by: 'updateDate',
      order: 'desc',
    },
  });
  const expensesData = await fetchJson<{
    data: Array<Expense>;
    pagination: PaginationAttributes;
  }>(url, { next: { tags: [Tags.EXPENSE_COMMON, Tags.EXPENSE_LIST_EMPLOYEE, `expense-list-employee-${id}`] } });
  return expensesData.data;
};

export const findOne = async (id: string): Promise<Expense> => {
  const url = `${baseUrl}/api/expenses/${id}`;
  return fetchJson<Expense>(url, {
    next: { tags: [Tags.EXPENSE_COMMON, Tags.EXPENSE_SINGLE, `expense-single-${id}`] },
  });
};
