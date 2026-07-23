import { COMMON_HEADER, COMMON_RESPONSE } from './common';

const EXPENSE_SCHEMA_PROPERTIES = {
  id: { type: 'string' },
  employeeId: { type: 'string' },
  price: {
    type: 'object',
    properties: {
      priceIncludingTax: { type: 'number' },
      taxAmount: { type: 'number' },
      priceExcludingTax: { type: 'number' },
      currency: { type: 'string' },
    },
  },
  label: { type: 'string' },
  description: { type: 'string' },
  category: { type: 'string' },
  receiptLink: { type: 'string' },
  status: { type: 'string' },
  creationDate: { type: 'string' },
  updateDate: { type: 'string' },
};

export const GET_EXPENSES_DOCUMENTATION = {
  tags: ['expenses'],
  headers: {
    type: 'object',
    required: ['x-api-key'],
    properties: {
      ...COMMON_HEADER,
    },
  },
  querystring: {
    type: 'object',
    properties: {
      page: {
        type: 'number',
        description: 'pagination page',
      },
      per_page: {
        type: 'number',
        description: 'resources per page',
      },
      employeeId: {
        type: 'string',
        description: 'employee id',
      },
      order: {
        type: 'string',
        description: 'order by',
      },
      sort_by: {
        type: 'string',
        description: 'sort by',
      },
    },
  },
  response: {
    200: {
      description: 'Expenses found',
      type: 'object',
      properties: {
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: EXPENSE_SCHEMA_PROPERTIES,
          },
        },
      },
      pageNumber: { type: 'number', description: 'pagination page' },
      pageSize: { type: 'number', description: 'resources per page' },
      totalPage: { type: 'number', description: 'total pages' },
    },
  },
};

export const GET_EXPENSE_BY_ID_DOCUMENTATION = {
  tags: ['expenses'],
  headers: {
    type: 'object',
    required: ['x-api-key'],
    properties: {
      ...COMMON_HEADER,
    },
  },
  params: {
    type: 'object',
    properties: {
      id: { type: 'string', description: 'expense id' },
    },
  },
  response: {
    200: {
      description: 'Expense found',
      type: 'object',
      properties: EXPENSE_SCHEMA_PROPERTIES,
    },
  },
  404: {
    description: 'Expense not found',
    type: 'object',
    properties: {
      message: { type: 'string', description: 'error message' },
    },
  },
  ...COMMON_RESPONSE,
};
