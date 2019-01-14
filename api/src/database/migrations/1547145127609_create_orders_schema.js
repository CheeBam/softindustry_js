'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateOrdersSchema extends Schema {
    up() {
        this.create('orders', (table) => {
            table.increments()
            table.string('sys_id', 30).notNullable()
            table.integer('customer_id').unsigned().notNullable().references('id').inTable('customers')
            table.integer('user_id').unsigned().notNullable().references('id').inTable('users')
            table.integer('position_id').unsigned().notNullable().references('id').inTable('positions')
            table.integer('order_type_id').unsigned().notNullable().references('id').inTable('order_types')
            table.integer('status_id').unsigned().notNullable().references('id').inTable('statuses')
            table.text('comment').nullable()
            table.timestamp('due_date').notNullable()
            table.timestamps()
            table.timestamp('deleted_at').nullable().defaultTo(null).index();
        })
    }

    down() {
        this.drop('orders')
    }
}

module.exports = CreateOrdersSchema
