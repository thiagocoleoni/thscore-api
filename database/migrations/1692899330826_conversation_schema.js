'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ConversationSchema extends Schema {
  up () {
    this.create('conversations', (table) => {
      table.increments()

      table.string('session_id', 40).notNullable().unique()
      table.date('created')
      table.date('updated')
      table.date('last_active')
      table.string('email', 40).notNullable()
      table.string('nickname', 60)
      table.string('country', 60)
      table.string('region', 60)
      table.string('city', 60)
      table.float('latitude', 20)
      table.float('longitude', 20)
      table.string('ip', 20)
      table.string('os', 20)
      table.string('os_version', 20)
      table.string('browser', 20)
      table.string('browser_version', 20)
      table.string('state', 20)
      table.integer('status', 2)
      table.integer('unread_operator', 3)
      table.integer('unread_visitor', 3)
      table.text('data')
      table.text('segments')
      table.string('website_crisp_id', 40)      
      table.string('people_crisp_id', 40)
      table.string('operator_crisp_id', 40)

      table.integer('people_id', 25).unsigned().references('id').inTable('people')
      table.integer('operator_id', 25).unsigned().references('id').inTable('operators')

      table.timestamps()
    })
  }

  down () {
    this.drop('conversations')
  }
}

module.exports = ConversationSchema
