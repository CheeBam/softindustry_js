import BaseProxy from './BaseProxy';

class Order extends BaseProxy {
    constructor(parameters = {}) {
        super('/api/v1/orders', parameters);
    }

    async index(params = {}) {
        return this.submit('get', '/', params);
    }

    async store(params = {}) {
        return this.submit('post', '/', params);
    }

    async update(id, params = {}) {
        return this.submit('put', `/${id}`, params);
    }

    async show(id) {
        return this.submit('get', `/${id}`);
    }

    async status(params = {}) {
        return this.submit('patch', '/status', params);
    }

    async downloadJson(params = {}) {
        return this.submit('post', '/download', params);
    }
}

export default Order;
