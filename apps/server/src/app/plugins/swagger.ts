import FastifySwagger from '@fastify/swagger';
import FastifySwaggerUi from '@fastify/swagger-ui';
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

export default fp(async function (fastify: FastifyInstance) {
  await fastify.register(FastifySwagger, {
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'Server API',
        description: 'Swagger API for the Server',
        version: '1.0.0',
      },
      servers: [
        {
          url: 'http://localhost:9000',
          description: 'Development server',
        },
      ],
      tags: [
        { name: 'employees', description: 'Employees related end-points' },
        { name: 'expenses', description: 'Expenses related end-points' },
      ],
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here',
      },
    },
  });

  await fastify.register(FastifySwaggerUi, {
    routePrefix: '/documentation',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false,
    },
    staticCSP: true,
  });
});
