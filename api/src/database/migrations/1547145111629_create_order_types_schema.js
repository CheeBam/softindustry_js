'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateOrderTypesSchema extends Schema {
    up() {
        this.create('order_types', (table) => {
            table.increments()
            table.string('title', 10).notNullable()
        })
    }

    down() {
        this.drop('order_types')
    }
}

module.exports = CreateOrderTypesSchema
