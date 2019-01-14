import Auth from '../../../api/Auth';
import * as types from './mutation-types';

export const register = async ({ dispatch, commit }, payload) => {
    const json = await new Auth().register(payload);

    commit(types.LOGIN, {
        token: json.token,
    });

    await dispatch('getUserCurrent');
};

export const login = async ({ dispatch, commit }, payload) => {
    const json = await new Auth().login(payload);

    commit(types.LOGIN, {
        token: json.token,
    });

    await dispatch('getUserCurrent');
};

export const logout = async ({ commit }) => {
    commit(types.ID, null);
    commit(types.NAME, null);
    commit(types.EMAIL, null);
    commit(types.CREATED_AT, null);
    commit(types.UPDATED_AT, null);
    commit(types.LOGOUT);
};

export const getUserCurrent = async ({ commit }) => {
    const json = await new Auth().getCurrent();

    commit(types.ID, json.id);
    commit(types.NAME, json.company);
    commit(types.EMAIL, json.email);
    commit(types.CREATED_AT, json.created_at);
    commit(types.UPDATED_AT, json.updated_at);
};

export const checkLogged = async ({ dispatch, commit }) => {
    const token = window.Cookies.get('token');

    if (token !== undefined) {
        commit(types.LOGIN, {
            token,
        });

        await dispatch('getUserCurrent');
    }
};

export const providers = async ({ commit }) => {
    const json = await new Auth().providers();

    commit(types.PROVIDERS, json);
};


export default {
    login,
    logout,
    register,
    getUserCurrent,
    checkLogged,
    providers,
};
