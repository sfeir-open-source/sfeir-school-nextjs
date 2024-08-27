import vine from '@vinejs/vine';

import { API_KEY } from './config.js';

export const validateBodySchema = (schema) => async (request, reply) => {
  try {
    await vine.validate({ schema, data: request.body });
  } catch (err) {
    const errors = err.messages.reduce((messages, value) => {
      if (!messages[value.field]) messages[value.field] = [];
      messages[value.field].push(value.message);
      return messages;
    }, {});
    reply.status(400).send({ error: 'Validation error', code: 'VALIDATION_ERROR', validationErrors: errors });
  }
};

export const protectRequest = (request, reply, done) => {
  const apiKey = request.headers['x-api-key'];
  if (apiKey !== API_KEY) reply.code(401).send({ error: 'Unauthorized', code: 'UNAUTHORIZED' });
  done();
};

export const addDelay =
  (delay = 500) =>
  async () => {
    const pause = () => new Promise((resolve) => setTimeout(() => resolve('done'), delay));
    await pause();
  };
