import fastifyEnv from '@fastify/env';
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

const schema = {
  type: 'object',
  required: ['API_KEY'],
  properties: {
    API_KEY: { type: 'string' },
  },
};

const options = {
  confKey: 'config',
  schema,
  dotenv: true,
};

export default fp(async function (fastify: FastifyInstance) {
  fastify.register(fastifyEnv, options);
});
