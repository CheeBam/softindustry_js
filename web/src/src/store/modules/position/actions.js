import Position from '../../../api/Position';
import * as types from './mutation-types';

export const index = async ({ commit }, params) => {
    const json = await new Position().index(params);

    commit(types.LIST, json);
};

export const store = async (context, params) => {
    await new Position().store(params);
};

export default {
    index,
    store,
};
