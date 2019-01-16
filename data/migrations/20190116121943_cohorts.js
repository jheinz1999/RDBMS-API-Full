
exports.up = function(knex, Promise) {

  return knex.schema.createTable('cohorts', tbl => {

    // Primary key: id, autoincrements
    tbl.increments();

    // Other rows

    tbl.string('name').notNullable();

  });

};

exports.down = function(knex, Promise) {

  return knex.schema.dropTableIfExists('cohorts');

};
