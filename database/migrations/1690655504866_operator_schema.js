'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OperatorSchema extends Schema {
  up () {
    this.create('operators', (table) => {
      table.increments()

      table.string('crisp_id', 40).notNullable().unique()
      table.string('email', 40).notNullable()
      table.string('first_name', 60)
      table.string('last_name', 60)
      table.string('role', 40)
      table.string('avatar', 256)
      table.string('type', 20)

      table.timestamps()
    })
  }

  down () {
    this.drop('operators')
  }
}

module.exports = OperatorSchema

