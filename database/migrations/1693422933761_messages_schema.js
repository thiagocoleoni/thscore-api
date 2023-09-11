'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MessagesSchema extends Schema {
  up () {
    this.create('messages', (table) => {
      table.increments()

      table.string('session_id', 60).notNullable()
      table.string('type', 40)
      table.string('from', 40)
      table.string('origin', 40)
      table.text('text')
      table.text('content')
      table.string('user_nickname', 40)
      table.string('delivered', 40)
      table.string('read', 40)
      table.date('datetime')

      table.timestamps()
    })
  }

  down () {
    this.drop('messages')
  }
}

module.exports = MessagesSchema
