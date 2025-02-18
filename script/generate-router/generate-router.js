"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var fs_1 = require("fs");
var path = require("path");
var hooks_1 = require("./hooks");
/**
 * 递归生成路由
 * @param nodes 节点列表
 * @param parentPath 父路径
 * @returns 路由列表
 */
function generateRoutes(data, parentPath, parentName) {
    if (parentPath === void 0) { parentPath = ''; }
    if (parentName === void 0) { parentName = ''; }
    return data.map(function (item) {
        // const route: RouteRecordRaw = {
        var route = {
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
        var translatedText = (0, hooks_1.translateToEnglish)(item.pageName);
        var fullPath = parentPath ? "".concat(parentPath, "/").concat(translatedText) : "/".concat(translatedText);
        var fullName = parentName ? "".concat(parentName, "/").concat(translatedText) : translatedText;
        // 设置路由属性
        route.path = fullPath;
        route.name = fullName;
        // TODO: 箭头函数转为 JSON 会被忽略，使用字符串代替，怎么转换？
        route.component =
            item.type === 'Wireframe' ? "() => import('@/pages".concat(fullPath, "/").concat(translatedText, ".vue')") : undefined;
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
function generateFiles(config, basePath) {
    if (basePath === void 0) { basePath = 'src/pages'; }
    config.forEach(function (route) {
        var _a;
        if (route.component) {
            // 解析组件路径
            var componentPath = String(route.component).replace("() => import('@/pages/", '').replace("')", '');
            // 构建完整的文件路径
            var fullPath = path.join(process.cwd(), basePath, componentPath);
            var dirPath = path.dirname(fullPath);
            // 创建目录
            if (!(0, fs_1.existsSync)(dirPath)) {
                (0, fs_1.mkdirSync)(dirPath, { recursive: true });
            }
            // 如果文件不存在，创建 Vue 文件
            if (!(0, fs_1.existsSync)(fullPath)) {
                var template = "\n<template>\n    <div>\n        <h1>".concat(((_a = route === null || route === void 0 ? void 0 : route.meta) === null || _a === void 0 ? void 0 : _a.title) || '', "</h1>\n    </div>\n</template>\n\n<script lang=\"ts\" setup>\n</script>\n\n<style scoped>\n</style>");
                (0, fs_1.writeFileSync)(fullPath, template, 'utf-8');
                console.log("\u2705 Created: ".concat(fullPath));
            }
            else {
                console.log("\u26A0\uFE0F Exists: ".concat(fullPath));
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
function generateRouteFile(routes) {
    // 将对象数组转换为 TypeScript 代码
    var code = "\nimport { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';\n\nimport appLayout from '@/layout/index.vue';\n\nimport { FORBIDDEN_ROUTE, HOME_ROUTE, LOGIN_ROUTE, SCREEN_ROUTE } from './base';\n\n\nconst menuRoutes: RouteRecordRaw[] = [HOME_ROUTE.value, ...".concat(JSON.stringify(routes, null, 2), "];\n\nconst routes: RouteRecordRaw[] = [\n    {\n        path: '/',\n        name: '/',\n        component: markRaw(appLayout),\n        redirect: '/home',\n        meta: {\n            icon: 'HomeFilled',\n            title: 'index',\n        },\n        children: menuRoutes,\n    },\n\n    LOGIN_ROUTE,\n    FORBIDDEN_ROUTE,\n    SCREEN_ROUTE,\n];\n\nconst router = createRouter({\n    history: createWebHistory(),\n    routes: routes,\n});\n\nexport default router;\nexport { menuRoutes, routes };");
    return code;
}
/**
 * 获取对象列表
 */
function getRouter() {
    return __awaiter(this, void 0, void 0, function () {
        var res, objs, routes, content;
        var _a, _b, _c, _d, _e, _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0: return [4 /*yield*/, axios_1.default.get(
                    // 中科瑞景
                    'https://axure-file.lanhuapp.com/md588e80976-0395-4254-9f66-ee823a75b126__de973a4aa4f24bc781c757312aae8dfa.json')];
                case 1:
                    res = _h.sent();
                    if (!res || !((_b = (_a = res.data) === null || _a === void 0 ? void 0 : _a.sitemap) === null || _b === void 0 ? void 0 : _b.rootNodes) || ((_d = (_c = res.data) === null || _c === void 0 ? void 0 : _c.sitemap) === null || _d === void 0 ? void 0 : _d.rootNodes.length) === 0) {
                        return [2 /*return*/];
                    }
                    objs = (_g = (_f = (_e = res.data) === null || _e === void 0 ? void 0 : _e.sitemap) === null || _f === void 0 ? void 0 : _f.rootNodes[1]) === null || _g === void 0 ? void 0 : _g.children;
                    routes = generateRoutes(objs).filter(function (item) { var _a; return ((_a = item === null || item === void 0 ? void 0 : item.meta) === null || _a === void 0 ? void 0 : _a.title) !== '首页'; });
                    content = generateRouteFile(routes);
                    (0, fs_1.writeFileSync)('./src/router/router.ts', content);
                    // 遍历路由列表，生成对应的文件夹与文件
                    generateFiles(routes);
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * 调用方法
 */
getRouter();
