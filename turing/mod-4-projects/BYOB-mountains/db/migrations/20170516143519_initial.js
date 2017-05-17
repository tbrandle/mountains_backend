
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('mountains', (table) => {
      table.increments('id').primary();
      table.integer('rank');
      table.string('mountain');
      table.integer('height(m)');
      table.integer('height(ft)');
      table.integer('prominence(m)');
      table.integer('range_id').unsigned();
      table.foreign('range_id')
           .references('range.id');
      table.string('coordinates');
      table.string('first_ascent');
      table.string('ascents_bef_2004');
      table.string('failed_attempts_bef_2004');
    }),
    knex.schema.createTable('range', (table) => {
      table.increments('id').primary();
      table.string('range');
      table.integer('mountain_id').unsigned()
      table.foreign('mountain_id')
           .references('mountains.id')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('range'),
    knex.schema.dropTable('mountains')
  ]);
};
