'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ConversationSchema extends Schema {
  up () {
    this.table('conversations', (table) => {
      // alter table
      table.string('session_id', 60).alter()
    })
  }

  down () {
    this.table('conversations', (table) => {
      // reverse alternations
    })
  }
}

module.exports = ConversationSchema
