import DATA from './../db.json' assert { type: 'json' };

export const verifyExists = (request, reply, done) => {
  const { id } = request.params;
  const index = DATA.expenses.findIndex((resource) => resource.id === id);
  if (index === -1) {
    reply.code(404).send({ error: 'Expense not found', code: 'RESOURCE_NOT_FOUND' });
    return;
  }
  request.resourceIndex = index;
  done();
};

export const findAll = async (request, reply) => {
  const page = Number(request.query?.page) || 1;
  const per_page = Number(request.query?.per_page) || 1;

  let data = DATA.expenses;

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

export const findOne = (request, reply) => {
  reply.send(DATA.expenses[request.resourceIndex]);
};
