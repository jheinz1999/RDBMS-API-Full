
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Guy 1', cohort_id: '1'},
        {name: 'Guy 2', cohort_id: '1'},
        {name: 'Guy 3', cohort_id: '3'},
        {name: 'Guy 4', cohort_id: '2'},
        {name: 'Guy 5', cohort_id: '3'},
      ]);
    });
};
