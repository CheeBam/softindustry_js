import { mapGettersFromStates } from 'schepotin-vuex-helpers';
import states from './state';

export default {
    /**
     * Generates {@link https://vuex.vuejs.org/en/getters.html | getters} from
     * {@link https://vuex.vuejs.org/en/state.html | states}
     *
     * Documentation
     * {@link https://www.npmjs.com/package/schepotin-vuex-helpers#mapgettersfromstates | mapGettersFromStates}
     */
    ...mapGettersFromStates({
        states,
    }),
    customerEmail: state => state.customer.email,
    customerName: state => state.customer.name,
    customerSurname: state => state.customer.surname,
    customerPhone: state => state.customer.phone,
};
