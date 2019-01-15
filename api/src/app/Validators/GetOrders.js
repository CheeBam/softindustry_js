'use strict';

class GetOrders {
    get rules() {
        return {
            page: 'required',
        }
    }
}

module.exports = GetOrders;
