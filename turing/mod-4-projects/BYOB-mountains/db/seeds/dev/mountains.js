const mountains = require('mountains.json')
const cleanArray = require('../../helpers/data_cleaner.js')

exports.seed = function (knex, Promise) {
  return knex('mountains').del()
    .then(() => knex('range').del())
    .then(() => Promise.all([
      knex('')
    ]))
}
