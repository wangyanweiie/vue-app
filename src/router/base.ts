import type { RouteRecordRaw } from 'vue-router';

import i18n from '@/locale';

const { t } = i18n.global;

/**
 * home
 */
export const HOME_ROUTE = computed<RouteRecordRaw>(() => ({
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
    meta: {
        title: t('pZAw6rgPAsWmFf5mfvhI'),
        icon: 'FolderOpened',
    },
}));

/**
 * login
 */
export const LOGIN_ROUTE: RouteRecordRaw = {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
        title: '登录',
    },
};

/**
 * 404
 */
export const FORBIDDEN_ROUTE: RouteRecordRaw = {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/not-found/404.vue'),
    meta: {
        title: '404',
    },
};

/**
 * screen
 */
export const SCREEN_ROUTE: RouteRecordRaw = {
    path: '/screen',
    component: () => import('@/views/screen/index.vue'),
    meta: {
        title: 'screen',
    },
};
