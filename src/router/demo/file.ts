import type { RouteRecordRaw } from 'vue-router';

import i18n from '@/locale';

const { t } = i18n.global;

export const fileRoutes = computed<RouteRecordRaw[]>(() => [
    {
        path: '/demo/file/file-upload',
        name: 'demo-file-file-upload',
        component: () => import('@/views/demo/file/file-upload/file-upload.vue'),
        meta: {
            title: t('sJmD6Q2OiCyJyiOsfxF'),
            icon: 'Tickets',
            permission: ['login:log:select'],
        },
    },
    {
        path: '/demo/file/file-preview',
        name: 'demo-file-file-preview',
        component: () => import('@/views/demo/file/file-preview/file-preview.vue'),
        meta: {
            title: t('jVEkL1PywXko1Bmb6sgC'),
            icon: 'Tickets',
            permission: ['login:log:select'],
        },
    },
]);
