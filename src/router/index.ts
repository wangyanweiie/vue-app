import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import appLayout from '@/layout/index.vue';
import { demoRoutes } from './demo';
import { HOME_ROUTE, LOGIN_ROUTE, FORBIDDEN_ROUTE, SCREEN_ROUTE } from './base';

/**
 * menu-routes
 */
const menuRoutes: RouteRecordRaw[] = [HOME_ROUTE, demoRoutes];

/**
 * routers
 */
const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: '/',
        component: markRaw(appLayout),
        redirect: '/home',
        meta: {
            icon: 'HomeFilled',
            title: 'index',
        },
        children: menuRoutes,
    },

    LOGIN_ROUTE,
    FORBIDDEN_ROUTE,
    SCREEN_ROUTE,
];

/**
 * router
 */
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
export { menuRoutes, routes };
