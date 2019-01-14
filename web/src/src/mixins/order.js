import { mapTwoWayState } from 'schepotin-vuex-helpers';
import * as orderTypes from '../store/modules/order/mutation-types';

export default {
    computed: {
        /**
         * Generates two way {@link https://vuejs.org/v2/guide/computed.html#Computed-Setter | computed properties}
         *
         * Documentation {@link https://www.npmjs.com/package/schepotin-vuex-helpers#maptwowaystate | mapTwoWayState}
         */
        ...mapTwoWayState({
            namespace: 'order',
            prefix: true,
        }, [
            'id',
            'sysId',
            'provider',
            'position',
            'type',
            'dueDate',
            'comment',
        ]),
        orderCustomerEmail: {
            get() {
                return this.$store.getters[`order/customerEmail`];
            },
            set(value) {
                this.$store.commit(`order/${orderTypes.CUSTOMER_EMAIL}`, value);
            },
        },
        orderCustomerName: {
            get() {
                return this.$store.getters[`order/customerName`];
            },
            set(value) {
                this.$store.commit(`order/${orderTypes.CUSTOMER_NAME}`, value);
            },
        },
        orderCustomerSurname: {
            get() {
                return this.$store.getters[`order/customerSurname`];
            },
            set(value) {
                this.$store.commit(`order/${orderTypes.CUSTOMER_SURNAME}`, value);
            },
        },
        orderCustomerPhone: {
            get() {
                return this.$store.getters[`order/customerPhone`];
            },
            set(value) {
                this.$store.commit(`order/${orderTypes.CUSTOMER_PHONE}`, value);
            },
        },
    },
};
