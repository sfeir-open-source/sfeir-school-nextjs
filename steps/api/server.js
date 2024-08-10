import path from 'path';
import { fileURLToPath } from 'url';
import { ObjectId } from 'mongodb';
import vine from '@vinejs/vine';
import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fastify = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
    },
  },
});

import DATA from './db.json' assert { type: 'json' };
const API_KEY = '441a5b21-f2eb-4cec-8383-ca7a48c526a6';

fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
});

const employeeBaseSchema = {
  photo: vine.string().minLength(1).optional(),
  firstname: vine.string().minLength(2),
  lastname: vine.string().minLength(2),
  position: vine.string().minLength(2),
  entryDate: vine.date({ formats: ['DD/MM/YYYY'] }),
  birthDate: vine.date({ formats: ['DD/MM/YYYY'] }),
  gender: vine.string().optional(),
  email: vine.string().email(),
  phone: vine.string().minLength(6),
  isManager: vine.boolean(),
  manager: vine.string().minLength(2).optional(),
  managerId: vine.string().minLength(2).optional(),
};

const employeeSchema = vine.object(employeeBaseSchema);

const partialEmployeeSchema = vine.object(
  Object.fromEntries(Object.entries(employeeBaseSchema).map(([key, value]) => [key, value.optional()]))
);

const validateBodySchema = (schema) => async (request, reply) => {
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

const verifyResourceExists = (request, reply, done) => {
  const { id } = request.params;
  const index = DATA.people.findIndex((resource) => resource.id === id);
  if (index === -1) {
    reply.code(404).send({ error: 'Resource not found', code: 'RESOURCE_NOT_FOUND' });
    return;
  }
  request.resourceIndex = index;
  done();
};

const protectRequest = (request, reply, done) => {
  const apiKey = request.headers['x-api-key'];
  if (apiKey !== API_KEY) reply.code(401).send({ error: 'Unauthorized', code: 'UNAUTHORIZED' });
  done();
};

const addDelay =
  (delay = 500) =>
  async () => {
    const pause = () => new Promise((resolve) => setTimeout(() => resolve('done'), delay));
    await pause();
  };

fastify.get('/api/people', { preHandler: [protectRequest, addDelay()] }, (request, reply) => {
  const page = Number(request.query?.page) || 1;
  const per_page = Number(request.query?.per_page) || 1;
  const search = request.query?.search;

  let data;

  if (search) {
    data = DATA.people.filter((person) =>
      `${person.firstname} ${person.lastname}`.toLowerCase().includes(search.toLowerCase())
    );
  } else {
    data = DATA.people;
  }

  const total_pages = Math.ceil(data.length / per_page);

  if (per_page) {
    const startIndex = (page - 1) * per_page;
    const endIndex = page * per_page;
    data = data.slice(startIndex, endIndex);
  }

  reply.send({
    pagination: {
      page,
      per_page,
      total_pages,
    },
    data,
  });
});

fastify.post(
  '/api/people',
  { preHandler: [protectRequest, validateBodySchema(employeeSchema), addDelay(1000)] },
  async (request, reply, done) => {
    const id = new ObjectId();
    const newPerson = {
      ...request.body,
      id: id.toString(),
    };

    DATA.people.push(newPerson);
    reply.status(201).send(newPerson);
  }
);

fastify.get('/api/people/:id', { preHandler: [protectRequest, addDelay(), verifyResourceExists] }, (request, reply) => {
  reply.send(DATA.people[request.resourceIndex]);
});

fastify.delete(
  '/api/people/:id',
  { preHandler: [protectRequest, addDelay(), verifyResourceExists] },
  (request, reply) => {
    DATA.people.splice(request.resourceIndex, 1);
    reply.code(204).send();
  }
);

fastify.patch(
  '/api/people/:id',
  { preHandler: [protectRequest, validateBodySchema(partialEmployeeSchema), addDelay(1000), verifyResourceExists] },
  async (request, reply) => {
    const currentPerson = DATA.people[request.resourceIndex];

    const newPerson = {
      ...currentPerson,
      ...request.body,
      id: currentPerson.id,
    };

    DATA.people[request.resourceIndex] = newPerson;
    reply.send(newPerson);
  }
);

fastify.listen({ port: 3001 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
