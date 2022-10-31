'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MatchesSchema extends Schema {
  up () {
    this.create('matches', (table) => {
      table.increments()
      table.date('date').notNullable()

      // league
      table.integer('id_league').notNullable()
      table.string('name_league', 64)
      table.string('country_league', 64)
      table.text('flag_league')
      table.integer('season_league').notNullable()
      table.string('round_league', 64)

      //home team
      table.integer('id_home').notNullable()
      table.integer('score_home')
      table.string('name_home', 64)
      table.text('logo_home')

      //away team
      table.integer('id_away').notNullable()
      table.integer('score_away')
      table.string('name_away', 64)
      table.text('logo_away')

      table.timestamps()

    })
  }

  down () {
    this.drop('matches')
  }
}

module.exports = MatchesSchema
