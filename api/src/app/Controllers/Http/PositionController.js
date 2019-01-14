'use strict';

const Position = use('App/Models/Position');
const {validate} = use('Validator');

class PositionController {

    /**
     * Get product positions
     *
     * GET positions
     */
    async index({request}) {

        const positions = await Position
            .query()
            .where('user_id', request.input('user_id'))
            .fetch();

        return positions;
    }

    /**
     * Create a new position.
     * POST orders
     */
    async store({auth, request, response}) {

        await auth.check();

        const validation = await validate(request.all(), {
            title: 'required',
        });

        if (validation.fails()) {
            return response.status(422).json({
                errors: validation.messages(),
            });
        }

        await Position.create({
            title: request.input('title'),
            user_id: auth.user.id,
        });

        return {};
    }
}

module.exports = PositionController;
