import { COMMON_HEADER, COMMON_RESPONSE } from './common';

export const GET_ALL_EMPLOYEES_DOCUMENTATION = {
  headers: {
    type: 'object',
    required: ['x-api-key'],
    properties: {
      ...COMMON_HEADER,
    },
  },
  tags: ['employees'],
  querystring: {
    type: 'object',
    properties: {
      search: {
        type: 'string',
        description: 'user name filtering',
      },
      page: {
        type: 'number',
        description: 'pagination page',
      },
      per_page: {
        type: 'number',
        description: 'resources per page',
      },
      sort_by: {
        type: 'string',
        description: 'the object key for sorting results',
      },
      order: {
        type: 'string',
        default: 'asc',
        enum: ['asc', 'desc'],
        description: 'The order for sorting results',
      },
    },
  },
};

export const GET_ONE_EMPLOYEE_DOCUMENTATION = {
  tags: ['employees'],
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
      id: {
        type: 'string',
        description: 'the employee id',
      },
    },
  },
  response: {
    200: {
      description: 'Employee found',
      type: 'object',
      properties: {
        id: { type: 'string' },
        photo: { type: 'string' },
        firstname: { type: 'string' },
        lastname: { type: 'string' },
        position: { type: 'string' },
        entryDate: { type: 'string' },
        birthDate: { type: 'string' },
        gender: { type: 'string' },
        email: { type: 'string' },
        phone: { type: 'string' },
        isManager: { type: 'boolean' },
        manager: { type: 'string' },
        managerId: { type: 'string' },
      },
    },
    404: {
      description: 'Employee not found',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    ...COMMON_RESPONSE,
  },
};

export const DELETE_ONE_EMPLOYEE_DOCUMENTATION = {
  tags: ['employees'],
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
      id: { type: 'string', description: 'the employee id' },
    },
  },
  response: {
    204: { description: 'Employee deleted' },
  },
  ...COMMON_RESPONSE,
};

export const CREATE_ONE_EMPLOYEE_DOCUMENTATION = {
  tags: ['employees'],
  headers: {
    type: 'object',
    required: ['x-api-key'],
    properties: {
      ...COMMON_HEADER,
    },
  },
  body: {
    type: 'object',
    properties: {
      photo: { type: 'string' },
      firstname: { type: 'string' },
      lastname: { type: 'string' },
      position: { type: 'string' },
      entryDate: { type: 'string' },
      birthDate: { type: 'string' },
      gender: { type: 'string' },
      email: { type: 'string' },
      phone: { type: 'string' },
      isManager: { type: 'boolean' },
      manager: { type: 'string' },
      managerId: { type: 'string' },
    },
  },
  response: {
    201: {
      description: 'Employee created',
      type: 'object',
      properties: {
        id: { type: 'string' },
        photo: { type: 'string' },
        firstname: { type: 'string' },
        lastname: { type: 'string' },
        position: { type: 'string' },
        entryDate: { type: 'string' },
        birthDate: { type: 'string' },
        gender: { type: 'string' },
        email: { type: 'string' },
        phone: { type: 'string' },
        isManager: { type: 'boolean' },
        manager: { type: 'string' },
        managerId: { type: 'string' },
      },
    },
    400: {
      description: 'Bad request',
      type: 'object',
      properties: {
        message: { type: 'string' },
        errors: {
          type: 'object',
          additionalProperties: { type: 'string' },
        },
      },
    },
    ...COMMON_RESPONSE,
  },
};

export const UPDATE_ONE_EMPLOYEE_DOCUMENTATION = {
  tags: ['employees'],
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
      id: { type: 'string', description: 'the employee id' },
    },
  },
  body: {
    type: 'object',
    properties: {
      photo: { type: 'string' },
      firstname: { type: 'string' },
      lastname: { type: 'string' },
      position: { type: 'string' },
      entryDate: { type: 'string' },
      birthDate: { type: 'string' },
      gender: { type: 'string' },
      email: { type: 'string' },
      phone: { type: 'string' },
      isManager: { type: 'boolean' },
      manager: { type: 'string' },
      managerId: { type: 'string' },
    },
  },
  response: {
    200: {
      description: 'Employee updated',
      type: 'object',
      properties: {
        id: { type: 'string' },
        photo: { type: 'string' },
        firstname: { type: 'string' },
        lastname: { type: 'string' },
        position: { type: 'string' },
        entryDate: { type: 'string' },
        birthDate: { type: 'string' },
        gender: { type: 'string' },
        email: { type: 'string' },
        phone: { type: 'string' },
        isManager: { type: 'boolean' },
        manager: { type: 'string' },
        managerId: { type: 'string' },
      },
    },
    400: {
      description: 'Bad request',
      type: 'object',
      properties: {
        message: { type: 'string' },
        errors: { type: 'object', additionalProperties: { type: 'string' } },
      },
    },
    ...COMMON_RESPONSE,
  },
};
