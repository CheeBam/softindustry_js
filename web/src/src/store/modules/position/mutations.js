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
        excludes: [],
    }),
};
