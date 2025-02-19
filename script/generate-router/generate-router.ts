import axios from 'axios';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import * as path from 'path';
// import * as ts from 'typescript';
import { type RouteRecordRaw } from 'vue-router';

import {
    BASE_PATH,
    handleInitPageTemplate,
    handleRouteFileContent,
    HOME_NAME,
    PageTypeEnum,
    PATH_MAP_FILE_PATH,
} from './base';
import { translateText } from './hooks';
import { MenuTree } from './interface';

/**
 * 递归提取页面名称
 * @param nodes 节点列表
 * @returns 页面名称列表
 */
function extractPageNames(nodes: MenuTree): string[] {
    let pageNames: string[] = [];

    nodes.forEach(node => {
        // 去除括号
        const cleaned = node.pageName.replace(/\s*（.*）\s*/, '');

        // 添加当前节点的 pageName
        pageNames.push(cleaned);

        // 如果有子节点，递归处理
        if (node.children && node.type === PageTypeEnum.文件夹) {
            const list = extractPageNames(node.children);
            pageNames = pageNames.concat(list);
        }
    });

    // 数组去重
    const set = new Set(pageNames);

    // 返回去重后的数组
    return Array.from(set);
}

/**
 * 生成映射字典
 */
async function generatePathMap(nodes: MenuTree) {
    const pageNameList = extractPageNames(nodes);

    const translatedText = await translateText(pageNameList.join(','));

    // 字符串转数组，去除空格，并替换空格为连字符
    const pageNameToEnglishList = translatedText
        .split(',')
        .map(item => item.trim())
        .map(item => item.replace(/\s+/g, '-'));

    /**
     * TODO: 翻译存在问题：
     * 1. 不同的中文可能翻译成相同的英文
     * 2. 同一个中文可能连续翻译两遍
     *
     * 例子：这里的 “日志管理” 翻译了两遍？所以导致翻译后的数组与原数组长度不一致，无法正确生成字典
     * 目前解决办法：手动排查上述问题，确保翻译前后数组一一对应，并手动替换成唯一的英文
     */
    // if (pageNameList.length !== pageNameToEnglishList.length) {
    //     console.log('🔍 pageNameList', pageNameList);
    //     console.log('🔍 pageNameToEnglishList', pageNameToEnglishList);
    //     return;
    // }

    const map: {
        [key: string]: string;
    } = {};

    // 遍历页面名称列表，生成映射字典
    pageNameList.forEach((pageName, index) => {
        map[pageName] = pageNameToEnglishList[index];
    });

    // 将映射字典写入到 pathMap.json 文件
    writeFileSync(PATH_MAP_FILE_PATH, JSON.stringify(map, null, 2));
    console.log('🔍 PathMap：', map);
}

/**
 * 递归生成路由
 * @param nodes 节点列表
 * @param parentPath 父路径
 * @returns 路由列表
 */
function generateRoutes(nodes: MenuTree, parentPath = '', parentName = ''): RouteRecordRaw[] {
    const routes = nodes.map(node => {
        // 去除括号
        const cleaned = node.pageName.replace(/\s*（.*）\s*/, '');

        // const route: RouteRecordRaw = {
        const route: any = {
            path: '',
            name: '',
            redirect: '',
            component: undefined,
            meta: {
                title: cleaned,
                icon: node.type === PageTypeEnum.文件夹 ? 'Folder' : 'Tickets',
            },
            children: [],
        };

        // 读取 pathMap.json 文件，获取翻译后的路由标题作为路径
        const pathMap = JSON.parse(readFileSync(PATH_MAP_FILE_PATH, 'utf-8'));

        // 使用翻译后的路由标题作为路径
        const translatedText = pathMap[cleaned];
        const fullPath = parentPath ? `${parentPath}/${translatedText}` : `/${translatedText}`;
        const fullName = parentName ? `${parentName}/${translatedText}` : translatedText;

        // 设置路由属性
        route.path = fullPath;
        route.name = fullName;

        /**
         * TODO: 箭头函数转为 JSON 会被忽略，需要使用字符串代替才能写入文件，后续怎么还原成箭头函数？
         * 目前解决方法：文件生成后，手动替换
         */
        route.component =
            node.type === PageTypeEnum.文件 ? `() => import('@/pages${fullPath}/${translatedText}.vue')` : undefined;

        if (node.children && node.type === PageTypeEnum.文件夹) {
            // 递归处理子节点
            route.children = generateRoutes(node.children, fullPath, fullName);
            route.redirect = fullPath;
        } else {
            // 文件：删除子节点与重定向
            delete route.children;
            delete route.redirect;
        }

        return route;
    });

    const filteredRoutes = routes.filter(item => item?.meta?.title !== HOME_NAME);

    return filteredRoutes;
}

/**
 * 递归生成页面目录与文件
 * @param routes 路由配置
 * @param basePath 基础路径
 */
function generateFiles(routes: RouteRecordRaw[], basePath: string = BASE_PATH) {
    routes.forEach(route => {
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
                const template = handleInitPageTemplate(route.meta?.title as string);

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

    if (!res) {
        return;
    }

    // 获取需要生成路由的节点列表
    const objs = res.data?.sitemap?.rootNodes[1]?.children ?? [];

    if (!objs || objs.length === 0) {
        return;
    }

    // * 1.生成翻译字典，只需要生成一次
    // generatePathMap(objs);

    // * 2.根据翻译字典，生成路由列表
    const routes = generateRoutes(objs);

    // * 3.根据路由列表，生成路由文件
    const content = handleRouteFileContent(routes);
    writeFileSync('./src/router/router.ts', content);

    // * 4.根据路由列表，生成页面所在的文件夹与文件
    generateFiles(routes);
}

/**
 * 调用方法
 */
getRouter();
