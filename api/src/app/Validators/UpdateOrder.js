'use strict';

class UpdateOrder {
    get rules() {
        return {
            'customer.email': 'required',
            'customer.name': 'required',
            'customer.surname': 'required',
            'customer.phone': 'required',
            position_id: 'required',
        }
    }
}

module.exports = UpdateOrder;
