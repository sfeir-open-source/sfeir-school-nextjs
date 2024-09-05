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
  const per_page = Number(request.query?.per_page) || 100;
  const employee = request.query?.employee;
  const sortBy = request.query?.sort_by;
  const order = request.query?.order?.toLowerCase() === 'desc' ? 'desc' : 'asc';

  let data = [...DATA.expenses];

  if (employee) {
    data = data.filter((expense) => expense.employeeId === employee);
  }

  if (sortBy && data[0].hasOwnProperty(sortBy)) {
    data.sort((a, b) => {
      let valueA = a[sortBy];
      let valueB = b[sortBy];

      if (sortBy === 'updateDate' || sortBy === 'creationDate') {
        valueA = new Date(valueA.split('/').reverse().join('-'));
        valueB = new Date(valueB.split('/').reverse().join('-'));
      }

      if (valueA < valueB) return order === 'asc' ? -1 : 1;
      if (valueA > valueB) return order === 'asc' ? 1 : -1;
      return 0;
    });
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

export const findOne = (request, reply) => {
  reply.send(DATA.expenses[request.resourceIndex]);
};
