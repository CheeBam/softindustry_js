'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateStatusesSchema extends Schema {
    up() {
        this.create('statuses', (table) => {
            table.increments()
            table.string('title', 30).notNullable()
        })
    }

    down() {
        this.drop('statuses')
    }
}

module.exports = CreateStatusesSchema
