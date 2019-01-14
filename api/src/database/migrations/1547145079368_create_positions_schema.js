'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreatePositionsSchema extends Schema {
    up() {
        this.create('positions', (table) => {
            table.increments()
            table.string('title', 30).notNullable()
            table.integer('user_id').unsigned().notNullable().references('id').inTable('users')
        })
    }

    down() {
        this.drop('positions')
    }
}

module.exports = CreatePositionsSchema
