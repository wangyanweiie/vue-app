import type { RouteRecordRaw } from 'vue-router';

import i18n from '@/locale';

const { t } = i18n.global;

export const componentRoutes = computed<RouteRecordRaw[]>(() => [
    {
        path: '/demo/components/description',
        name: 'demo-components-description',
        component: () => import('@/views/demo/components/description.vue'),
        meta: {
            title: t('16Egj6Vr1l9HmCaeDuKzy'),
            icon: 'Tickets',
            permission: ['login:log:select'],
        },
    },
    {
        path: '/demo/components/table',
        name: 'demo-components-table',
        component: () => import('@/views/demo/components/table.vue'),
        meta: {
            title: t('a42ztkHel2fc9gO5iuhCc'),
            icon: 'Tickets',
            permission: ['login:log:select'],
        },
    },
    {
        path: '/demo/components/form',
        name: 'demo-components-form',
        component: () => import('@/views/demo/components/form.vue'),
        meta: {
            title: t('nbvW17gm2nTxwwRdOj9Z'),
            icon: 'Tickets',
            permission: ['login:log:select'],
        },
    },
    {
        path: '/demo/components/select',
        name: 'demo-components-select',
        component: () => import('@/views/demo/components/select.vue'),
        meta: {
            title: t('ie5cDkag4HaOo6AMuo9a'),
            icon: 'Tickets',
            permission: ['login:log:select'],
        },
    },
    {
        path: '/demo/components/text-editor',
        name: 'demo-components-text-editor',
        component: () => import('@/views/demo/components/text-editor.vue'),
        meta: {
            title: t('f8bHnwHMh7iUPpn5W1fjK'),
            icon: 'Tickets',
            permission: ['login:log:select'],
        },
    },
]);
