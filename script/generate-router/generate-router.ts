import axios from 'axios';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import * as path from 'path';
import { type RouteRecordRaw } from 'vue-router';

import { translateToEnglish, translateToPinyin } from './hooks';

/**
 * 递归生成路由
 * @param nodes 节点列表
 * @param parentPath 父路径
 * @returns 路由列表
 */
function generateRoutes(data: any[], parentPath = '', parentName = ''): RouteRecordRaw[] {
    return data.map(item => {
        // const route: RouteRecordRaw = {
        const route: any = {
            path: '',
            name: '',
            redirect: '',
            component: undefined,
            meta: {
                title: item.pageName,
                icon: item.type === 'Folder' ? 'Folder' : 'Tickets',
            },
            children: [],
        };

        // 生成路径和组件映射（使用翻译后的路径）
        // const translatedText = translateToPinyin(item.pageName);
        const translatedText = translateToEnglish(item.pageName);
        const fullPath = parentPath ? `${parentPath}/${translatedText}` : `/${translatedText}`;
        const fullName = parentName ? `${parentName}/${translatedText}` : translatedText;

        // 设置路由属性
        route.path = fullPath;
        route.name = fullName;

        // TODO: 箭头函数转为 JSON 会被忽略，使用字符串代替，怎么转换？
        route.component =
            item.type === 'Wireframe' ? `() => import('@/pages${fullPath}/${translatedText}.vue')` : undefined;

        if (item.children && item.type === 'Folder') {
            // 递归处理子节点
            route.children = generateRoutes(item.children, fullPath, fullName);
            route.redirect = fullPath;
        }

        return route;
    });
}

/**
 * 递归生成页面目录与文件
 * @param config 路由配置
 * @param basePath 基础路径
 */
function generateFiles(config: RouteRecordRaw[], basePath: string = 'src/pages') {
    config.forEach(route => {
        if (route.component) {
            // 解析组件路径
            const componentPath = String(route.component).replace("() => import('@/pages/", '').replace("')", '');

            // 构建完整的文件路径
            const fullPath = path.join(process.cwd(), basePath, componentPath);
            const dirPath = path.dirname(fullPath);

            // 创建目录
            if (!existsSync(dirPath)) {
                mkdirSync(dirPath, { recursive: true });
            }

            // 如果文件不存在，创建 Vue 文件
            if (!existsSync(fullPath)) {
                const template = `
<template>
    <div>
        <h1>${route?.meta?.title || ''}</h1>
    </div>
</template>

<script lang="ts" setup>
</script>

<style scoped>
</style>`;

                writeFileSync(fullPath, template, 'utf-8');
                console.log(`✅ Created: ${fullPath}`);
            } else {
                console.log(`⚠️ Exists: ${fullPath}`);
            }
        }

        // 递归处理子路由
        if (route.children && route.children.length > 0) {
            generateFiles(route.children, basePath);
        }
    });
}

/**
 * 生成文件内容
 */
function generateRouteFile(routes: RouteRecordRaw[]) {
    // 将对象数组转换为 TypeScript 代码
    const code = `
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';\n
import appLayout from '@/layout/index.vue';\n
import { FORBIDDEN_ROUTE, HOME_ROUTE, LOGIN_ROUTE, SCREEN_ROUTE } from './base';\n

const menuRoutes: RouteRecordRaw[] = [HOME_ROUTE.value, ...${JSON.stringify(routes, null, 2)}];

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: '/',
        component: markRaw(appLayout),
        redirect: '/home',
        meta: {
            icon: 'HomeFilled',
            title: 'index',
        },
        children: menuRoutes,
    },\n
    LOGIN_ROUTE,
    FORBIDDEN_ROUTE,
    SCREEN_ROUTE,
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export default router;
export { menuRoutes, routes };`;

    return code;
}

/**
 * 获取对象列表
 */
async function getRouter() {
    // 获取
    const res = await axios.get(
        // 中科瑞景
        'https://axure-file.lanhuapp.com/md588e80976-0395-4254-9f66-ee823a75b126__de973a4aa4f24bc781c757312aae8dfa.json',
        // 台湾东升
        // 'https://axure-file.lanhuapp.com/md50898c760-7be0-4e1a-9b85-c452efd3a584__89ea65a5aa286d1cfdf08df57a067cdc.json',
    );

    if (!res || !res.data?.sitemap?.rootNodes || res.data?.sitemap?.rootNodes.length === 0) {
        return;
    }

    // 获取需要生成路由的节点列表
    const objs = res.data?.sitemap?.rootNodes[1]?.children;

    // 生成路由列表
    const routes = generateRoutes(objs).filter(item => item?.meta?.title !== '首页');

    // 1.将生成的文件内容写入到指定文件
    const content = generateRouteFile(routes);
    writeFileSync('./src/router/router.ts', content);

    // 2.遍历路由列表，生成对应的文件夹与文件
    // generateFiles(routes);
}

/**
 * 调用方法
 */
getRouter();
