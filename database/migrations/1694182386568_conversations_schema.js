'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ConversationsSchema extends Schema {
  up () {
    this.table('conversations', (table) => {
      // alter table
      table.datetime('created').alter()
      table.datetime('updated').alter()
      table.datetime('last_active').alter()
    })
  }

  down () {
    this.table('conversations', (table) => {
      // reverse alternations
    })
  }
}

module.exports = ConversationsSchema
