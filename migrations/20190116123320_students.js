
exports.up = function(knex, Promise) {

  return knex.schema.createTable('students', tbl => {

    // Primary key: id, autoincrements

    tbl.increments();

    // Other rows

    tbl.string('name').notNullable();

    // Foreign key

    tbl.integer('cohort_id').unsigned().references('id').inTable('students');

  });

};

exports.down = function(knex, Promise) {

};
