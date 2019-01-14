import Vue from 'vue';
import VueI18n from 'vue-i18n';
import store from '../store/index';

import en from '../lang/en/en';

Vue.use(VueI18n);

document.querySelector('html').setAttribute('lang', store.getters['auth/currentLang']);
document.querySelector('html').setAttribute('dir', store.getters['auth/currentDirection']);

export default new VueI18n({
    locale: store.getters['auth/currentLang'],
    messages: {
        en,
    },
});
