import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

import appLayout from '@/layout/index.vue';

import { FORBIDDEN_ROUTE, HOME_ROUTE, LOGIN_ROUTE, SCREEN_ROUTE } from './base';
import { demoRoutes } from './demo';

/**
 * menu-routes
 */
const menuRoutes = computed<RouteRecordRaw[]>(() => [HOME_ROUTE.value, demoRoutes.value]);

/**
 * routers
 */
const routes = computed<RouteRecordRaw[]>(() => [
    {
        path: '/',
        name: '/',
        component: markRaw(appLayout),
        redirect: '/home',
        meta: {
            icon: 'HomeFilled',
            title: 'index',
        },
        children: menuRoutes.value,
    },

    LOGIN_ROUTE,
    FORBIDDEN_ROUTE,
    SCREEN_ROUTE,
]);

/**
 * router
 */
const router = createRouter({
    history: createWebHistory(),
    routes: routes.value,
});

export default router;
export { menuRoutes, routes };
