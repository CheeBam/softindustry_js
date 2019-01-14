/**
 * Will initialize the application.
 */

import Vue from 'vue';

/**
 * Import and bootstrap the plugins.
 */

import './bootstrap';
import './sass/style.scss';
import router from './router';
import store from './store';
import i18n from './plugins/lang';
import './plugins/validator';
import './plugins/meta';

/**
 * Main App.
 *
 * Last but not least, we import the main application.
 */

import App from './pages/App.vue';

store.dispatch('auth/checkLogged');

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
}).$mount('#app');

