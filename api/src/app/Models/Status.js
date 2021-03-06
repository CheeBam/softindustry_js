'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Status extends Model {

    static get createdAtColumn() {
        return null
    }

    static get updatedAtColumn() {
        return null
    }

}

module.exports = Status
