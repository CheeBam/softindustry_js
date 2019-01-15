'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChangeDueDateFieldInOrdersSchema extends Schema {
  up () {
    this.table('orders', (table) => {
        table.timestamp('due_date').nullable().alter();
    })
  }

  down () {
    this.table('orders', (table) => {
        table.timestamp('due_date').notNullable().alter();
    })
  }
}

module.exports = ChangeDueDateFieldInOrdersSchema
