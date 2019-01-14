import BaseProxy from './BaseProxy';

class Auth extends BaseProxy {
    constructor(parameters = {}) {
        super('/api/v1', parameters);
    }

    async login(params = {}) {
        return this.submit('post', '/auth/login', params);
    }

    async register(params = {}) {
        return this.submit('post', '/auth/register', params);
    }

    async getCurrent() {
        return this.submit('get', '/auth/current');
    }

    async providers(params = {}) {
        return this.submit('get', '/providers', params);
    }
}

export default Auth;
