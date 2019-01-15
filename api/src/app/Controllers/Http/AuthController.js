'use strict';

const User = use('App/Models/User');
const {validate} = use('Validator');

class AuthController {
    index() {
        return User.all();
    }

    async login({request, auth}) {

        const validation = await validate(request.all(), {
            email: 'required|email',
            password: 'required',
        });

        if (validation.fails()) {
            return response.status(422).json({
                errors: validation.messages(),
            });
        }

        const {email, password} = request.all();
        const token = await auth.attempt(email, password);

        return token;
    }

    async register({request, response}) {

        const validation = await validate(request.all(), {
            email: 'required|email|unique:users,email',
            password: 'required|confirmed',
            name: 'required',
        });

        if (validation.fails()) {
            return response.status(422).json({
                errors: validation.messages(),
            });
        }

        const {email, password, name} = request.all();

        await User.create({
            email,
            password,
            company: name,
        });

        return this.login(...arguments);
    }

    async current({auth}) {
        return auth.user;
    }
}

module.exports = AuthController;
