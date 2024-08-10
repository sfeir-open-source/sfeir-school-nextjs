import path from 'path';
import { fileURLToPath } from 'url';
import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';

import { validateBodySchema, addDelay, protectRequest } from './handlers.js';

import * as employeeController from './controllers/employees.js';
import * as expenseController from './controllers/expenses.js';

import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fastify = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
    },
  },
});

await fastify.register(swagger, {
  swagger: {
    info: {
      title: 'SFEIR People API',
      description: 'Backend API for SFEIR People Dashboard',
      version: '1.0.0',
    },
    securityDefinitions: {
      apiKey: {
        type: 'apiKey',
        name: 'x-api-Key',
        in: 'header',
      },
    },
    security: [
      {
        apiKey: [],
      },
    ],
  },
});

await fastify.register(swaggerUi, {
  routePrefix: '/swagger',
  uiConfig: {
    deepLinking: false,
    persistAuthorization: true,
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
});

fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
});

/** ===============================================================
 * Employee
 */

fastify.get(
  '/api/people',
  {
    schema: {
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
        },
      },
    },
    preHandler: [
      protectRequest, //
      addDelay(),
    ],
  },
  employeeController.findAll
);

fastify.post(
  '/api/people',
  {
    schema: {
      body: {
        type: 'object',
        properties: {
          photo: { type: 'string' },
          fistname: { type: 'string' },
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
    },
    preHandler: [
      protectRequest, //
      validateBodySchema(employeeController.employeeSchema),
      addDelay(1000),
    ],
  },
  employeeController.create
);

fastify.get(
  '/api/people/:id',
  {
    preHandler: [
      protectRequest, //
      addDelay(),
      employeeController.verifyExists,
    ],
  },
  employeeController.findOne
);

fastify.delete(
  '/api/people/:id',
  {
    preHandler: [
      protectRequest, //
      addDelay(),
      employeeController.verifyExists,
    ],
  },
  employeeController.deleteOne
);

fastify.patch(
  '/api/people/:id',
  {
    schema: {
      body: {
        type: 'object',
        properties: {
          photo: { type: 'string' },
          fistname: { type: 'string' },
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
    },
    preHandler: [
      protectRequest, //
      validateBodySchema(employeeController.partialEmployeeSchema),
      addDelay(1000),
      employeeController.verifyExists,
    ],
  },
  employeeController.updateOne
);

/** ===============================================================
 * Expenses
 */

fastify.get(
  '/api/expenses',
  {
    schema: {
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
        },
      },
    },
    preHandler: [
      protectRequest, //
      addDelay(),
    ],
  },
  expenseController.findAll
);

fastify.get(
  '/api/expenses/:id',
  { preHandler: [protectRequest, addDelay(), expenseController.verifyExists] },
  expenseController.findOne
);

fastify.listen({ port: 3001 }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
