import { ParentView, type RouteRecordRawTypes } from '@/components/index';
import { h } from 'vue';

export const menu3Routes: RouteRecordRawTypes = {
    path: '/menu3',
    name: 'menu3',
    component: h(ParentView, { matchedIndex: 2 }),
    redirect: '/menu3/demo1',
    meta: {
        title: 'menu3',
        icon: 'FolderOpened',
    },
    children: [
        {
            path: '/menu3/demo1',
            name: 'menu3-demo1',
            component: () => import('@/views/menu3/demo1.vue'),
            meta: {
                title: 'menu3-demo1',
                icon: '',
            },
        },
        {
            path: '/menu3/demo2',
            name: 'menu3-demo2',
            component: () => import('@/views/menu3/demo2.vue'),
            meta: {
                title: 'menu3-demo2',
                icon: '',
            },
        },
    ],
};