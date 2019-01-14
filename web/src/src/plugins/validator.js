import Vue from 'vue';
import VeeValidate, { Validator } from 'vee-validate';
import store from '../store/index';

import validationEn from '../lang/en/validator';

Validator.extend('login', {
    async validate(value) {
        return {
            valid: value !== 0,
        };
    },
    getMessage: validationEn.messages.login,
});

Validator.extend('unique', {
    async validate(value) {
        return {
            valid: value !== 0,
        };
    },
    getMessage: validationEn.messages.unique,
});

Vue.use(VeeValidate, {
    fieldsBagName: 'fieldsValidation',
    locale: store.getters['auth/currentLang'],
    dictionary: {
        en: validationEn,
    },
});
