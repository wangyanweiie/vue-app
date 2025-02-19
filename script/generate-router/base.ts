import { RouteRecordRaw } from 'vue-router';

/**
 * 页面类型枚举
 */
export enum PageTypeEnum {
    文件夹 = 'Folder',
    文件 = 'Wireframe',
}

/**
 * 首页名称常量
 */
export const HOME_NAME = '首页';

/**
 * 基础路径常量
 */
export const BASE_PATH = 'src/pages';

/**
 * pathMap.json 文件路径
 */
export const PATH_MAP_FILE_PATH = './script/generate-router/pathMap.json';

/**
 * 初始化页面模板
 */
export function handleInitPageTemplate(title: string) {
    return `
<template>
    <div>${title}</div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped></style>`;
}

/**
 * 路由文件内容模板
 */
export function handleRouteFileContent(routes: RouteRecordRaw[]) {
    return `
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';\n
import appLayout from '@/layout/index.vue';\n
import { FORBIDDEN_ROUTE, HOME_ROUTE, LOGIN_ROUTE, SCREEN_ROUTE } from './base';

const menuRoutes = computed<RouteRecordRaw[]>(() => [HOME_ROUTE.value, ...${JSON.stringify(routes, null, 2)}]);

const routes = computed<RouteRecordRaw[]>(() => [
    {
        path: '/',
        name: '/',
        component: markRaw(appLayout),
        redirect: '/home',
        meta: {
            icon: 'HomeFilled',
            title: 'index',
        },
        children: menuRoutes.value,
    },\n
    LOGIN_ROUTE,
    FORBIDDEN_ROUTE,
    SCREEN_ROUTE,
]);

const router = createRouter({
    history: createWebHistory(),
    routes: routes.value,
});

export default router;
export { menuRoutes, routes };`;
}
