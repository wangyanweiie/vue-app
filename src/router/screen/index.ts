import type { RouteRecordRaw } from 'vue-router';
import ParentView from '@/components/Layout/ParentView.vue';

export const screenRoutes: RouteRecordRaw = {
    path: '/screen',
    name: 'screen',
    component: h(ParentView, {
        matchedIndex: 2,
    }),
    redirect: '/screen/screen',
    meta: {
        title: 'screen',
        icon: 'FolderOpened',
    },
    children: [
        {
            path: '/screen/screen',
            name: 'screen-screen',
            component: () => import('@/views/screen/index.vue'),
            meta: {
                title: 'screen',
                icon: '',
            },
        },
    ],
};
