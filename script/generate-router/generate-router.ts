import axios from 'axios';
import { Command } from 'commander'; // commander 负责解析命令行参数
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import inquirer from 'inquirer'; // inquirer 负责与用户进行交互
import * as ora from 'ora'; // ora 负责显示加载动画
import * as path from 'path';
import { type RouteRecordRaw } from 'vue-router';

import {
    AXURE_PROJECT_URL,
    BASE_PATH,
    handleInitPageTemplate,
    handleRouteFileContent,
    HOME_NAME,
    PageTypeEnum,
    PATH_MAP_FILE_PATH,
} from './base';
import { translateText } from './hooks';
import { MenuTree } from './interface';

// ============================ 生成方法 ============================
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
     * 比如这里的 "日志管理" 翻译了两遍？所以导致翻译后的数组与原数组长度不一致，无法正确生成字典
     * 当前解决方法：手动排查上述问题，确保翻译前后数组一一对应，并手动替换成唯一的英文
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
    // console.log('🔍 PathMap：', map);
}

/**
 * 递归生成路由
 * @param nodes 节点列表
 * @param parentPath 父级路径
 * @param parentName 父级名称
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
         * TODO: 设置组件路径有问题：
         * 1.箭头函数转为 JSON 会被忽略，需要转为字符串才能写入文件
         * 2.如何还原为箭头函数？
         *
         * 当前解决方法：路由文件内容生成后，手动将字符串还原为箭头函数（全局替换）
         */
        if (node.children && node.type === PageTypeEnum.文件夹) {
            delete route.component;
            route.redirect = fullPath;

            // 递归处理子节点
            route.children = generateRoutes(node.children, fullPath, fullName);
        } else {
            delete route.redirect;
            delete route.children;

            // 设置组件
            route.component = `() => import('@/pages${fullPath}/${translatedText}.vue')`;
        }

        return route;
    });

    // 过滤首页
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
                mkdirSync(dirPath, {
                    recursive: true,
                });
            }

            // 如果文件不存在，创建 Vue 文件
            if (!existsSync(fullPath)) {
                const template = handleInitPageTemplate(route.meta?.title as string);

                writeFileSync(fullPath, template, 'utf-8');
                // console.log(`✅ Created: ${fullPath}`);
            } else {
                // console.log(`⚠️ Exists: ${fullPath}`);
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
 * @param translate 是否需要重新生成翻译字典
 * @param generateRouter 是否需要生成路由文件
 * @param generatePages 是否需要生成页面文件
 */
async function getRouter(translate = false, generateRouter = true, generatePages = true) {
    try {
        const spinner = ora();

        // 获取数据
        spinner.start('正在获取项目数据...');
        const res = await axios.get(AXURE_PROJECT_URL);

        if (!res?.data?.sitemap?.rootNodes?.[1]?.children) {
            spinner.fail('❌ 获取项目数据失败');
            return;
        }

        spinner.succeed('获取项目数据成功');

        // 获取需要生成路由的节点列表
        const objs = res.data.sitemap.rootNodes[1].children;

        if (!objs || objs.length === 0) {
            console.error('⚠️ 没有找到可用的节点列表');
            return;
        }

        // 1.生成翻译字典
        if (translate) {
            spinner.start('正在生成翻译字典...');
            await generatePathMap(objs);
            spinner.succeed('翻译字典生成完成');
        }

        // 2.生成路由列表
        const routes = generateRoutes(objs);

        // 3.生成路由文件
        if (generateRouter) {
            spinner.start('正在生成路由文件...');
            const content = handleRouteFileContent(routes);
            writeFileSync('./src/router/router.ts', content);
            spinner.succeed('路由文件生成完成');
        }

        // 4.生成页面文件
        if (generatePages) {
            spinner.start('正在生成页面文件...');
            generateFiles(routes);
            spinner.succeed('页面文件生成完成');
        }

        console.log('✨ 所有任务执行完成！');
    } catch (error) {
        console.error('❌ 执行过程中发生错误:', error);
        process.exit(1);
    }
}

/**
 * 调用方法
 */
// getRouter();

// ============================ 添加命令行交互 ============================
/**
 * 创建新的 Command 实例并设置基本信息
 */
const program = new Command();

/**
 * 以下代码使用了 commander 库来解析命令行参数，并定义了 cmd 命令；
 * 在 cmd 命令被调用时，会使用 inquirer 库与用户进行交互，获取用户输入的内容；
 * 然后根据用户输入的内容，调用 getRouter 方法生成路由文件；
 *
 * 控制台执行命令：generate-router cmd
 */
program
    .command('cmd')
    .description('生成路由文件和页面')
    .action(async () => {
        try {
            // 检查必要的文件和目录是否存在
            const requiredDirs = ['./src/router', './src/pages'];

            for (const dir of requiredDirs) {
                if (!existsSync(dir)) {
                    mkdirSync(dir, {
                        recursive: true,
                    });
                }
            }

            const { translate, generateRouter, generatePages } = await inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'translate',
                    message: '是否需要生成翻译字典？',
                    default: true,
                },
                {
                    type: 'confirm',
                    name: 'generateRouter',
                    message: '是否需要生成路由文件？',
                    default: true,
                },
                {
                    type: 'confirm',
                    name: 'generatePages',
                    message: '是否需要生成页面文件？',
                    default: true,
                },
            ]);

            await getRouter(translate, generateRouter, generatePages);
        } catch (error) {
            console.error('命令执行失败:', error);
            process.exit(1);
        }
    });

/**
 * 设置命令行名称、描述和版本
 */
program.name('generate-router').description('路由生成工具').version('1.0.0');

/**
 * 解析命令行参数
 */
program.parse(process.argv);
