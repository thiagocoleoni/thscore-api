'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ConversationSchema extends Schema {
  up () {
    this.table('conversations', (table) => {
      // alter table
      table.string('ip', 40).alter()
      table.string('os', 40).alter()
      table.string('os_version', 40).alter()
      table.string('browser', 40).alter()
      table.string('browser_version', 40).alter()
    })
  }

  down () {
    this.table('conversations', (table) => {
      // reverse alternations
    })
  }
}

module.exports = ConversationSchema
