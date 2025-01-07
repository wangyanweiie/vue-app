import type { RouteRecordRaw } from 'vue-router';

import i18n from '@/locale';

import { subRoutes } from './sub';
// import ParentMenuView from '@/components/Layout/ParentMenuView.vue';
// import ParentView from '@/components/Layout/ParentView.vue';

const { t } = i18n.global;

export const demoRoutes = computed<RouteRecordRaw>(() => {
    return {
        path: '/demo',
        name: 'demo',
        // 等价写法
        component: () => import('@/views/demo/index.vue'),
        // component: h(ParentView, {
        //     matchedIndex: 2,
        // }),
        redirect: '/demo/sub',
        meta: {
            title: t('jaqjpDj0GvRpwNx0Bkdl0'),
            icon: 'FolderOpened',
            permission: ['login:log:select'],
        },
        children: [
            {
                path: '/demo/sub',
                name: 'demo-sub',
                redirect: '/menu/sub/sub1',
                // 等价写法
                component: () => import('@/views/demo/sub/index.vue'),
                // component: h(ParentMenuView, {
                //     matchedIndex: 3,
                //     menus: subRoutes,
                // }),
                meta: {
                    title: t('532slvgU3F9qhxfZ2yVfw'),
                    icon: '',
                    keepAlive: true,
                    permission: ['login:log:select'],
                },
                children: subRoutes.value,
            },
            {
                path: '/demo/description',
                name: 'demo-description',
                component: () => import('@/views/demo/description.vue'),
                meta: {
                    title: t('16Egj6Vr1l9HmCaeDuKzy'),
                    icon: '',
                    permission: ['login:log:select'],
                },
            },
            {
                path: '/demo/table',
                name: 'demo-table',
                component: () => import('@/views/demo/table.vue'),
                meta: {
                    title: t('a42ztkHel2fc9gO5iuhCc'),
                    icon: '',
                    permission: ['login:log:select'],
                },
            },
            {
                path: '/demo/select',
                name: 'demo-select',
                component: () => import('@/views/demo/select.vue'),
                meta: {
                    title: t('ie5cDkag4HaOo6AMuo9a'),
                    icon: '',
                    permission: ['login:log:select'],
                },
            },
            {
                path: '/demo/form',
                name: 'demo-form',
                component: () => import('@/views/demo/form.vue'),
                meta: {
                    title: t('nbvW17gm2nTxwwRdOj9Z'),
                    icon: '',
                    permission: ['login:log:select'],
                },
            },
            {
                path: '/demo/text-editor',
                name: 'demo-text-editor',
                component: () => import('@/views/demo/text-editor.vue'),
                meta: {
                    title: t('f8bHnwHMh7iUPpn5W1fjK'),
                    icon: '',
                    permission: ['login:log:select'],
                },
            },
            {
                path: '/demo/file-preview',
                name: 'demo-file-preview',
                component: () => import('@/views/demo/file-preview.vue'),
                meta: {
                    title: t('jVEkL1PywXko1Bmb6sgC'),
                    icon: '',
                    permission: ['login:log:select'],
                },
            },
            {
                path: '/demo/file-upload',
                name: 'demo-file-upload',
                component: () => import('@/views/demo/file-upload/file-upload.vue'),
                meta: {
                    title: t('sJmD6Q2OiCyJyiOsfxF'),
                    icon: '',
                    permission: ['login:log:select'],
                },
            },
            {
                path: '/demo/curdPage',
                name: 'demo-curdPage',
                component: () => import('@/views/demo/curd-page.vue'),
                meta: {
                    title: t('v7EtGnHupCoJ9cvAafy'),
                    icon: '',
                    permission: ['login:log:select'],
                },
            },
            {
                path: '/demo/three-js',
                name: 'demo-three-js',
                component: () => import('@/views/demo/three-js.vue'),
                meta: {
                    title: t('x_2IciI93yoEqi4uU0exd'),
                    icon: '',
                    permission: ['login:log:select'],
                },
            },
            {
                path: '/demo/map',
                name: 'demo-map',
                component: () => import('@/views/demo/map.vue'),
                meta: {
                    title: t('7m_3svGlMlsuBJbhScLz'),
                    icon: '',
                    permission: ['login:log:select'],
                },
            },
        ],
    };
});
