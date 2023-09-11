'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PeopleSchema extends Schema {
  up () {
    this.create('people', (table) => {
      table.increments()

      table.string('crisp_id', 40).notNullable().unique()
      table.string('email', 40).notNullable()
      table.string('nickname', 60)
      table.string('country', 60)
      table.string('region', 60)
      table.string('city', 60)
      table.float('latitude', 20)
      table.float('longitude', 20)
      table.date('created')

      table.timestamps()
    })
  }

  down () {
    this.drop('people')
  }
}

module.exports = PeopleSchema
