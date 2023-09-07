import { type RouteRecordRaw } from 'vue-router';

export const subRoutes: RouteRecordRaw[] = [
    {
        path: '/menu1/sub/sub1',
        name: 'menu1-sub1',
        component: () => import('@/views/menu1/sub/sub1.vue'),
        meta: {
            title: 'menu1-sub1',
            icon: 'Setting',
            hidden: true,
            keepAlive: true,
        },
    },
    {
        path: '/menu1/sub/sub2',
        name: 'menu1-sub2',
        component: () => import('@/views/menu1/sub/sub2.vue'),
        meta: {
            title: 'menu1-sub2',
            icon: 'Setting',
            hidden: true,
            keepAlive: false,
        },
    },
];
