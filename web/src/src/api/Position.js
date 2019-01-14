import BaseProxy from './BaseProxy';

class Position extends BaseProxy {
    constructor(parameters = {}) {
        super('/api/v1/positions', parameters);
    }

    async index(params = {}) {
        return this.submit('get', '/', params);
    }

    async store(params = {}) {
        return this.submit('post', '/', params);
    }
}

export default Position;
