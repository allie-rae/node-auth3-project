
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'mashima', password: '111111', department: 'IT' },
        {id: 2, username: 'chance', password: '222222', department: 'Finance' },
        {id: 3, username: 'kavin', password: '333333', department: 'IT' },
        {id: 4, username: 'katrina', password: '444444', department: 'Sales' },
        {id: 5, username: 'walter', password: '555555', department: 'Finance' },
        {id: 6, username: 'anisha', password: '666666', department: 'Sales' }
      ]);
    });
};
