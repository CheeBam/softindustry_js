import Vue from 'vue';
import VueRouter from 'vue-router';
import { sync } from 'vuex-router-sync';

import store from '../store/index';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../pages/Home.vue'),
    },
    {
        path: '/profile',
        name: 'auth.profile',
        component: () => import('../pages/auth/Profile.vue'),
        meta: {
            auth: true,
        },
    },
    {
        path: '/login',
        name: 'auth.login',
        component: () => import('../pages/auth/Login.vue'),
        meta: {
            guest: true,
        },
    },
    {
        path: '/register',
        name: 'auth.register',
        component: () => import('../pages/auth/Register.vue'),
        meta: {
            guest: true,
        },
    },
    {
        path: '/order/create',
        name: 'order.create',
        component: () => import('../pages/order/Form.vue'),
    },
    {
        path: '/order/list',
        name: 'order.list',
        component: () => import('../pages/order/List.vue'),
    },
    {
        path: '/order/edit/:id',
        name: 'order.edit',
        component: () => import('../pages/order/Form.vue'),
    },
    {
        path: '/order/download',
        name: 'order.download',
        component: () => import('../pages/order/Download.vue'),
    },
    {
        path: '/position/create',
        name: 'position.create',
        component: () => import('../pages/position/Add.vue'),
    },

    /**
     * Must be the last entry in array.
     */
    {
        path: '*',
        component: () => import('../pages/NotFound.vue'),
    },
];

const router = new VueRouter({
    routes,
    mode: 'history',
    linkActiveClass: 'active',
    scrollBehavior() {
        return {
            x: 0,
            y: 0,
        };
    },
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.auth) && !store.getters['auth/logged']) {
        /**
         * If the user is not authenticated and visits
         * a page that requires authentication, redirect to the login page
         */
        next({
            name: 'auth.login',
            query: {
                redirect: to.fullPath,
            },
        });
    } else if (to.matched.some(record => record.meta.guest) && store.getters['auth/logged']) {
        /**
         * If the user is authenticated and visits
         * an guest page, redirect to the homepage
         */
        next({
            name: 'home',
        });
    } else {
        next();
    }
});

sync(store, router);

export default router;
