'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const {DateTime} = require('luxon');

class Order extends Model {

    provider() {
        return this.belongsTo('App/Models/User', 'user_id', 'id');
    }

    customer() {
        return this.belongsTo('App/Models/Customer', 'customer_id', 'id');
    }

    type() {
        return this.belongsTo('App/Models/OrderType', 'order_type_id', 'id');
    }

    position() {
        return this.belongsTo('App/Models/Position', 'position_id', 'id');
    }

    status() {
        return this.belongsTo('App/Models/Status', 'status_id', 'id');
    }

    getDueDate(date) {
        return DateTime.fromJSDate(date).toFormat('dd-MM-yyyy');
    }

    getCreatedAt(date) {
        return date.format('DD-MM-YYYY'); // moment.js object
    }
}

module.exports = Order
