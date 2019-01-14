import { DateTime } from 'luxon';
import { mapMutationsFromTypes } from 'schepotin-vuex-helpers';
import * as types from './mutation-types';

export default {
    /**
     * Generates {@link https://vuex.vuejs.org/en/mutations.html | mutations} from
     * {@link https://vuex.vuejs.org/en/mutations.html#using-constants-for-mutation-types | mutation types}
     *
     * Documentation
     * {@link https://www.npmjs.com/package/schepotin-vuex-helpers#mapmutationsfromtypes | mapMutationsFromTypes}
     */
    ...mapMutationsFromTypes({
        types,
        excludes: [
            types.ITEM,
            types.CUSTOMER,
            types.CUSTOMER_EMAIL,
            types.CUSTOMER_NAME,
            types.CUSTOMER_SURNAME,
            types.CUSTOMER_PHONE,
            types.CLEAR,
        ],
    }),
    [types.ITEM](state, payload) {
        state.id = payload.id;
        state.sysId = payload.sys_id;
        state.provider = payload.provider;
        state.position = payload.position;
        state.type = payload.type;
        state.dueDate = DateTime.fromFormat(payload.due_date, 'dd-MM-yyyy');
        state.comment = payload.comment;
    },
    [types.CUSTOMER](state, payload) {
        state.customer.email = payload.email;
        state.customer.name = payload.name;
        state.customer.surname = payload.surname;
        state.customer.phone = payload.phone;
    },
    [types.CUSTOMER_EMAIL](state, payload) {
        state.customer.email = payload;
    },
    [types.CUSTOMER_NAME](state, payload) {
        state.customer.name = payload;
    },
    [types.CUSTOMER_SURNAME](state, payload) {
        state.customer.surname = payload;
    },
    [types.CUSTOMER_PHONE](state, payload) {
        state.customer.phone = payload;
    },
    [types.CLEAR](state) {
        state.id = null;
        state.sysId = null;
        state.provider = null;
        state.position = null;
        state.type = null;
        state.dueDate = null;
        state.comment = null;

        state.customer.email = null;
        state.customer.name = null;
        state.customer.surname = null;
        state.customer.phone = null;
    },
};
