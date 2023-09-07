import { type RouteRecordRaw } from 'vue-router';
import { ParentView } from '@/components/index';

export const menu2Routes: RouteRecordRaw = {
    path: '/menu2',
    name: 'menu2',
    component: h(ParentView, { matchedIndex: 2 }),
    redirect: '/menu2/demo1',
    meta: {
        title: 'menu2',
        icon: 'FolderOpened',
    },
    children: [
        {
            path: '/menu2/demo1',
            name: 'menu2-demo1',
            component: () => import('@/views/menu2/demo1.vue'),
            meta: {
                title: 'menu2-demo1',
                icon: '',
            },
        },
        {
            path: '/menu2/demo2',
            name: 'menu2-demo2',
            component: () => import('@/views/menu2/demo2.vue'),
            meta: {
                title: 'menu2-demo2',
                icon: '',
            },
        },
    ],
};
