import { ObjectId } from 'mongodb';
import vine from '@vinejs/vine';

import DATA from './../db.json' assert { type: 'json' };

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

export const employeeSchema = vine.object(employeeBaseSchema);

export const partialEmployeeSchema = vine.object(
  Object.fromEntries(Object.entries(employeeBaseSchema).map(([key, value]) => [key, value.optional()]))
);

export const verifyExists = (request, reply, done) => {
  const { id } = request.params;
  const index = DATA.people.findIndex((resource) => resource.id === id);
  if (index === -1) {
    reply.code(404).send({ error: 'Employee not found', code: 'RESOURCE_NOT_FOUND' });
    return;
  }
  request.resourceIndex = index;
  done();
};

export const findAll = (request, reply) => {
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
};

export const create = async (request, reply) => {
  const id = new ObjectId();
  const newPerson = {
    ...request.body,
    id: id.toString(),
  };

  DATA.people.push(newPerson);
  reply.status(201).send(newPerson);
};

export const findOne = (request, reply) => {
  reply.send(DATA.people[request.resourceIndex]);
};

export const deleteOne = (request, reply) => {
  DATA.people.splice(request.resourceIndex, 1);
  reply.code(204).send();
};

export const updateOne = async (request, reply) => {
  const currentPerson = DATA.people[request.resourceIndex];

  const newPerson = {
    ...currentPerson,
    ...request.body,
    id: currentPerson.id,
  };

  DATA.people[request.resourceIndex] = newPerson;
  reply.send(newPerson);
};
