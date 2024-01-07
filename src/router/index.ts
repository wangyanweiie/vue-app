import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import appLayout from '@/layout/index.vue';
import { demoRoutes } from './demo';
import { HOME_ROUTE, LOGIN_ROUTE, FORBIDDEN_ROUTE, SCREEN_ROUTE } from './base';

/**
 * menu-routes
 */
const menuRoutes = computed<RouteRecordRaw[]>(() => [HOME_ROUTE, demoRoutes.value]);

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
