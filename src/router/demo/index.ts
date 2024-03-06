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
            title: t('router.示例页面'),
            icon: 'FolderOpened',
            permission: ['dict:item:select'],
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
                    permission: ['dict:item:select'],
                },
                children: subRoutes.value,
            },
            {
                path: '/demo/description',
                name: 'demo-description',
                component: () => import('@/views/demo/description.vue'),
                meta: {
                    title: t('router.描述列'),
                    icon: '',
                    permission: ['dict:item:select'],
                },
            },
            {
                path: '/demo/table',
                name: 'demo-table',
                component: () => import('@/views/demo/table.vue'),
                meta: {
                    title: t('router.表格'),
                    icon: '',
                    permission: ['dict:item:select'],
                },
            },
            {
                path: '/demo/select',
                name: 'demo-select',
                component: () => import('@/views/demo/select.vue'),
                meta: {
                    title: t('router.下拉'),
                    icon: '',
                    permission: ['dict:item:select'],
                },
            },
            {
                path: '/demo/form',
                name: 'demo-form',
                component: () => import('@/views/demo/form.vue'),
                meta: {
                    title: t('router.表单'),
                    icon: '',
                    permission: ['dict:item:select'],
                },
            },
            {
                path: '/demo/textEditor',
                name: 'demo-text-editor',
                component: () => import('@/views/demo/textEditor.vue'),
                meta: {
                    title: t('router.富文本编辑器'),
                    icon: '',
                    permission: ['dict:item:select'],
                },
            },
            {
                path: '/demo/filePreview',
                name: 'demo-file-preview',
                component: () => import('@/views/demo/filePreview.vue'),
                meta: {
                    title: t('router.文件预览'),
                    icon: '',
                    permission: ['dict:item:select'],
                },
            },
            {
                path: '/demo/crudPage',
                name: 'demo-crudPage',
                component: () => import('@/views/demo/crudPage.vue'),
                meta: {
                    title: t('router.增删改查'),
                    icon: '',
                    permission: ['dict:item:select'],
                },
            },
            {
                path: '/demo/threeJs',
                name: 'demo-threeJs',
                component: () => import('@/views/demo/threeJs.vue'),
                meta: {
                    title: t('router.3D建模'),
                    icon: '',
                    permission: ['dict:item:select'],
                },
            },
            {
                path: '/demo/map',
                name: 'demo-map',
                component: () => import('@/views/demo/map.vue'),
                meta: {
                    title: t('router.地图'),
                    icon: '',
                    permission: ['dict:item:select'],
                },
            },
        ],
    };
});
