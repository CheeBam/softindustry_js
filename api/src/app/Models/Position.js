'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Position extends Model {

    static get createdAtColumn() {
        return null
    }

    static get updatedAtColumn() {
        return null
    }

    provider() {
        return this.belongsTo('App/Models/User', 'user_id', 'id')
    }
}

module.exports = Position
