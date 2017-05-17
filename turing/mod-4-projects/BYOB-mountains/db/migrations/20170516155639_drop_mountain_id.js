
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('range', function (table) {
      table.dropColumn('mountain_id')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('range', function (table) {
      table.integer('mountain_id').unsigned()
           .references('mountain.id')
    })
  ]);
};
