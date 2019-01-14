import Order from '../../../api/Order';
import * as types from './mutation-types';

export const store = async (context, { params }) => {
    return await new Order().store(params);
};

export const update = async (context, { id, params }) => {
    return await new Order().update(id, params);
};

export const show = async ({ commit }, id) => {
    const json = await new Order().show(id);

    commit(types.ITEM, json);
    commit(types.CUSTOMER, json.customer);
};

export const status = async (context, { params }) => {
    await new Order().status(params);
};

export const downloadJson = async (context, { params }) => {
    await new Order().downloadJson(params);
};

export const clear = async ({ commit }) => {
    commit(types.CLEAR);
};

export default {
    store,
    update,
    show,
    status,
    downloadJson,
    clear,
};
