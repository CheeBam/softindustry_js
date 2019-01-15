'use strict';

class StoreOrder {
    get rules() {
        return {
            sys_id: 'required',
            'customer.email': 'required',
            'customer.name': 'required',
            'customer.surname': 'required',
            'customer.phone': 'required',
            order_type_id: 'required',
            position_id: 'required',
            due_date: 'required',
        }
    }
}

module.exports = StoreOrder;
