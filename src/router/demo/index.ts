import type { RouteRecordRaw } from 'vue-router';
import { subRoutes } from './sub';
// import ParentMenuView from '@/components/Layout/ParentMenuView.vue';
// import ParentView from '@/components/Layout/ParentView.vue';

export const demoRoutes: RouteRecordRaw = {
    path: '/demo',
    name: 'demo',
    // 等价写法
    component: () => import('@/views/demo/index.vue'),
    // component: h(ParentView, {
    //     matchedIndex: 2,
    // }),
    redirect: '/demo/sub',
    meta: {
        title: 'demo',
        icon: 'FolderOpened',
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
                title: 'demo-sub',
                icon: '',
                keepAlive: true,
            },
            children: subRoutes,
        },
        {
            path: '/demo/description',
            name: 'demo-description',
            component: () => import('@/views/demo/description.vue'),
            meta: {
                title: 'description',
                icon: '',
            },
        },
        {
            path: '/demo/table',
            name: 'demo-table',
            component: () => import('@/views/demo/table.vue'),
            meta: {
                title: 'table',
                icon: '',
            },
        },
        {
            path: '/demo/select',
            name: 'demo-select',
            component: () => import('@/views/demo/select.vue'),
            meta: {
                title: 'select',
                icon: '',
            },
        },
        {
            path: '/demo/form',
            name: 'demo-form',
            component: () => import('@/views/demo/form.vue'),
            meta: {
                title: 'form',
                icon: '',
            },
        },
        {
            path: '/demo/richText',
            name: 'demo-richText',
            component: () => import('@/views/demo/richText.vue'),
            meta: {
                title: 'richText',
                icon: '',
            },
        },
        {
            path: '/demo/threeJs',
            name: 'demo-threeJs',
            component: () => import('@/views/demo/threeJs.vue'),
            meta: {
                title: 'threeJs',
                icon: '',
            },
        },
        {
            path: '/demo/echarts',
            name: 'demo-echarts',
            component: () => import('@/views/demo/echarts.vue'),
            meta: {
                title: 'echarts',
                icon: '',
            },
        },
    ],
};
