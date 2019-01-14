'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateCustomersSchema extends Schema {
    up() {
        this.create('customers', (table) => {
            table.increments()
            table.string('email', 250).notNullable()
            table.string('name', 50).notNullable()
            table.string('surname', 50).notNullable()
            table.string('phone', 20).notNullable()
        })
    }

    down() {
        this.drop('customers')
    }
}

module.exports = CreateCustomersSchema
