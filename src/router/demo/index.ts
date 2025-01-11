import type { RouteRecordRaw } from 'vue-router';

import ParentMenuView from '@/components/x-layout/parent-menu-view.vue';
import ParentView from '@/components/x-layout/parent-view.vue';
import i18n from '@/locale';

import { componentRoutes } from './components';
import { fileRoutes } from './file';
import { subRoutes } from './sub';

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
                redirect: '/demo/sub/sub1',
                // 等价写法
                component: () => import('@/views/demo/sub/sub.vue'),
                // component: h(ParentMenuView, {
                //     matchedIndex: 3,
                //     menus: subRoutes,
                // }),
                meta: {
                    title: t('532slvgU3F9qhxfZ2yVfw'),
                    icon: 'Tickets',
                    keepAlive: true,
                    permission: ['login:log:select'],
                },
                children: subRoutes.value,
            },
            {
                path: '/demo/components',
                name: 'demo-components',
                redirect: '/demo/components/description',
                meta: {
                    title: t('s1XCyh11Qjakv1Da2VpA'),
                    icon: 'Folder',
                    permission: ['login:log:select'],
                },
                children: componentRoutes.value,
            },
            {
                path: '/demo/file',
                name: 'demo-file',
                redirect: '/demo/file/file-preview',
                meta: {
                    title: t('odG0s1WbIlAy3mWqdT1ad'),
                    icon: 'Folder',
                    permission: ['login:log:select'],
                },
                children: fileRoutes.value,
            },
            {
                path: '/demo/curdPage',
                name: 'demo-curdPage',
                component: () => import('@/views/demo/curd-page/curd-page.vue'),
                meta: {
                    title: t('v7EtGnHupCoJ9cvAafy'),
                    icon: 'Tickets',
                    permission: ['login:log:select'],
                },
            },
            {
                path: '/demo/three-js',
                name: 'demo-three-js',
                component: () => import('@/views/demo/three-js/three-js.vue'),
                meta: {
                    title: t('x_2IciI93yoEqi4uU0exd'),
                    icon: 'Tickets',
                    permission: ['login:log:select'],
                },
            },
            {
                path: '/demo/map',
                name: 'demo-map',
                component: () => import('@/views/demo/map/map.vue'),
                meta: {
                    title: t('7m_3svGlMlsuBJbhScLz'),
                    icon: 'Tickets',
                    permission: ['login:log:select'],
                },
            },
        ],
    };
});
