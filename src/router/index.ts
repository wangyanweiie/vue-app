import { createRouter, createWebHistory } from 'vue-router';
import appLayout from '@/layout/index.vue';
import { menu1Routes } from './menu1';
import { menu2Routes } from './menu2';
import { menu3Routes } from './menu3';
import { markRaw } from 'vue';
import type { RouteRecordRawTypes } from '@/components/index';

/**
 * menu-routes
 */
const menuRoutes: RouteRecordRawTypes[] = [
    {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
            title: '首页',
            icon: 'Folder',
        },
    },
    menu1Routes,
    menu2Routes,
    menu3Routes,
];

/**
 * routers
 */
const routes: RouteRecordRawTypes[] = [
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
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        meta: {
            title: '登录',
        },
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('@/views/not-found/404.vue'),
        meta: {
            title: '404',
        },
    },
];

/**
 * router
 */
const router = createRouter({
    // 历史模式
    history: createWebHistory(),
    routes,
});

export default router;
export { menuRoutes, routes };
