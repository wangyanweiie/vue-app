import type { RouteRecordRaw } from 'vue-router';

export const subRoutes: RouteRecordRaw[] = [
    {
        path: '/demo/sub/sub1',
        name: 'demo-sub1',
        component: () => import('@/views/demo/sub/sub1.vue'),
        meta: {
            title: 'demo-sub1',
            icon: '',
            hidden: true,
            keepAlive: true,
        },
    },
    {
        path: '/demo/sub/sub2',
        name: 'demo-sub2',
        component: () => import('@/views/demo/sub/sub2.vue'),
        meta: {
            title: 'demo-sub2',
            icon: '',
            hidden: true,
            keepAlive: true,
        },
    },
];
