const { ObjectId } = require('mongodb');
const { S } = require('fluent-json-schema');
const Ajv = require('ajv');

const ajv = new Ajv();

const fastify = require('fastify')({
  logger: {
    transport: {
      target: 'pino-pretty',
    },
  },
});

const DATA = require('./db.json');

const personSchema = S.object()
  .title('Person Schema')
  .prop('id', S.string().required())
  .prop('photo', S.string())
  .prop('firstname', S.string().required().minLength(1))
  .prop('lastname', S.string().required().minLength(1))
  .prop('position', S.string().required().minLength(1))
  .prop(
    'entryDate',
    S.string()
      .pattern(/^\d{2}\/\d{2}\/\d{4}$/)
      .required()
  )
  .prop('birthDate', S.string().pattern(/^\d{2}\/\d{2}\/\d{4}$/))
  .prop('gender', S.string())
  .prop(
    'email',
    S.string()
      .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      .required()
  )
  .prop('phone', S.string().required().minLength(1))
  .prop('isManager', S.boolean())
  .prop('manager', S.string())
  .prop('managerId', S.string())
  .valueOf();

const verifyResourceExists = (request, reply, done) => {
  const { id } = request.params;
  const index = DATA.people.findIndex((resource) => resource.id === id);
  if (index === -1) {
    reply.code(404).send({ error: 'Resource not found' });
    return;
  }
  request.resourceIndex = index;
  done();
};

fastify.get('/api/people', (request, reply) => {
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

fastify.post('/api/people', (request, reply) => {
  const id = new ObjectId();
  const newPerson = {
    ...request.body,
    id: id.toString(),
  };

  const validate = ajv.compile(personSchema);
  const valid = validate(newPerson);

  if (!valid) {
    reply.status(400).send(validate.errors);
    return;
  }

  DATA.people.push(newPerson);
  reply.status(201).send(newPerson);
});

fastify.get('/api/people/:id', { preHandler: [verifyResourceExists] }, (request, reply) => {
  reply.send(DATA.people[request.resourceIndex]);
});

fastify.delete('/api/people/:id', { preHandler: [verifyResourceExists] }, (request, reply) => {
  DATA.people.splice(request.resourceIndex, 1);
  reply.code(204).send();
});

fastify.patch('/api/people/:id', { preHandler: [verifyResourceExists] }, (request, reply) => {
  const currentPerson = DATA.people[request.resourceIndex];
  const newPerson = {
    ...currentPerson,
    ...request.body,
    id: currentPerson.id,
  };

  const validate = ajv.compile(personSchema);
  const valid = validate(newPerson);

  if (!valid) {
    reply.status(400).send(validate.errors);
    return;
  }

  DATA.people[request.resourceIndex] = newPerson;
  reply.send(newPerson);
});

fastify.listen({ port: 3001 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
