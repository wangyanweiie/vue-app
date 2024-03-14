import type { RouteRecordRaw } from 'vue-router';

import i18n from '@/locale';

const { t } = i18n.global;

export const subRoutes = computed<RouteRecordRaw[]>(() => [
    {
        path: '/demo/sub/sub1',
        name: 'demo-sub1',
        component: () => import('@/views/demo/sub/sub1.vue'),
        meta: {
            title: t('keWbUsAx3G3sQFcc6e60'),
            icon: '',
            hidden: true,
            keepAlive: true,
            permission: ['dict:item:select'],
        },
    },
    {
        path: '/demo/sub/sub2',
        name: 'demo-sub2',
        component: () => import('@/views/demo/sub/sub2.vue'),
        meta: {
            title: t('yLhswHUaHsIk5rmZ1Xy'),
            icon: '',
            hidden: true,
            keepAlive: true,
            permission: ['dict:item:select'],
        },
    },
]);
