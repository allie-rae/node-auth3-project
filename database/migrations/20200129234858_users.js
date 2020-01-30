
exports.up = function(knex) {
  return knex.schema
  .createTable('users', tbl => {
      tbl.increments();

      tbl.varchar('username', 255)
      .unique()
      .notNullable()
      .index();

      tbl.varchar('password', 1000)
      .notNullable();

      tbl.varchar('department', 255)
      .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
