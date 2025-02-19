"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRouteFileContent = exports.handleInitPageTemplate = exports.PATH_MAP_FILE_PATH = exports.BASE_PATH = exports.HOME_NAME = exports.PageTypeEnum = void 0;
/**
 * 页面类型枚举
 */
var PageTypeEnum;
(function (PageTypeEnum) {
    PageTypeEnum["\u6587\u4EF6\u5939"] = "Folder";
    PageTypeEnum["\u6587\u4EF6"] = "Wireframe";
})(PageTypeEnum || (exports.PageTypeEnum = PageTypeEnum = {}));
/**
 * 首页名称常量
 */
exports.HOME_NAME = '首页';
/**
 * 基础路径常量
 */
exports.BASE_PATH = 'src/pages';
/**
 * pathMap.json 文件路径
 */
exports.PATH_MAP_FILE_PATH = './script/generate-router/pathMap.json';
/**
 * 初始化页面模板
 */
function handleInitPageTemplate(title) {
    return "\n<template>\n    <div>".concat(title, "</div>\n</template>\n\n<script lang=\"ts\" setup></script>\n\n<style lang=\"scss\" scoped></style>");
}
exports.handleInitPageTemplate = handleInitPageTemplate;
/**
 * 路由文件内容模板
 */
function handleRouteFileContent(routes) {
    return "\nimport { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';\n\nimport appLayout from '@/layout/index.vue';\n\nimport { FORBIDDEN_ROUTE, HOME_ROUTE, LOGIN_ROUTE, SCREEN_ROUTE } from './base';\n\nconst menuRoutes = computed<RouteRecordRaw[]>(() => [HOME_ROUTE.value, ...".concat(JSON.stringify(routes, null, 2), "]);\n\nconst routes = computed<RouteRecordRaw[]>(() => [\n    {\n        path: '/',\n        name: '/',\n        component: markRaw(appLayout),\n        redirect: '/home',\n        meta: {\n            icon: 'HomeFilled',\n            title: 'index',\n        },\n        children: menuRoutes.value,\n    },\n\n    LOGIN_ROUTE,\n    FORBIDDEN_ROUTE,\n    SCREEN_ROUTE,\n]);\n\nconst router = createRouter({\n    history: createWebHistory(),\n    routes: routes.value,\n});\n\nexport default router;\nexport { menuRoutes, routes };");
}
exports.handleRouteFileContent = handleRouteFileContent;
