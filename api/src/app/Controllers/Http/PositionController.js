'use strict';

const Position = use('App/Models/Position');

class PositionController {

    /**
     * Get product positions
     *
     * GET positions
     */
    async index({request}) {

        return Position
            .query()
            .where('user_id', request.input('user_id'))
            .fetch();
    }

    /**
     * Create a new position.
     * POST orders
     */
    async store({auth, request}) {

        await auth.check();

        return Position.create({
            title: request.input('title'),
            user_id: auth.user.id,
        });
    }
}

module.exports = PositionController;
