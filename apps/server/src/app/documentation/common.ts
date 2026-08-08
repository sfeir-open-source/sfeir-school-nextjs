export const COMMON_HEADER = {
  'x-api-key': {
    type: 'string',
    description: 'the api key',
  },
};

export const COMMON_RESPONSE = {
  401: {
    description: 'Unauthorized',
    type: 'object',
    properties: {
      message: { type: 'string' },
    },
  },
  500: {
    description: 'Internal server error',
    type: 'object',
    properties: {
      message: { type: 'string' },
    },
  },
};
