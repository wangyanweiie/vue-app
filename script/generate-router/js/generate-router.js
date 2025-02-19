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
var base_1 = require("./base");
var hooks_1 = require("./hooks");
/**
 * 递归提取页面名称
 * @param nodes 节点列表
 * @returns 页面名称列表
 */
function extractPageNames(nodes) {
    var pageNames = [];
    nodes.forEach(function (node) {
        // 去除括号
        var cleaned = node.pageName.replace(/\s*（.*）\s*/, '');
        // 添加当前节点的 pageName
        pageNames.push(cleaned);
        // 如果有子节点，递归处理
        if (node.children && node.type === base_1.PageTypeEnum.文件夹) {
            var list = extractPageNames(node.children);
            pageNames = pageNames.concat(list);
        }
    });
    // 数组去重
    var set = new Set(pageNames);
    // 返回去重后的数组
    return Array.from(set);
}
/**
 * 生成映射字典
 */
function generatePathMap(nodes) {
    return __awaiter(this, void 0, void 0, function () {
        var pageNameList, translatedText, pageNameToEnglishList, map;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pageNameList = extractPageNames(nodes);
                    return [4 /*yield*/, (0, hooks_1.translateText)(pageNameList.join(','))];
                case 1:
                    translatedText = _a.sent();
                    pageNameToEnglishList = translatedText
                        .split(',')
                        .map(function (item) { return item.trim(); })
                        .map(function (item) { return item.replace(/\s+/g, '-'); });
                    map = {};
                    // 遍历页面名称列表，生成映射字典
                    pageNameList.forEach(function (pageName, index) {
                        map[pageName] = pageNameToEnglishList[index];
                    });
                    // 将映射字典写入到 pathMap.json 文件
                    (0, fs_1.writeFileSync)(base_1.PATH_MAP_FILE_PATH, JSON.stringify(map, null, 2));
                    console.log('🔍 PathMap：', map);
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * 递归生成路由
 * @param nodes 节点列表
 * @param parentPath 父路径
 * @returns 路由列表
 */
function generateRoutes(nodes, parentPath, parentName) {
    if (parentPath === void 0) { parentPath = ''; }
    if (parentName === void 0) { parentName = ''; }
    var routes = nodes.map(function (node) {
        // 去除括号
        var cleaned = node.pageName.replace(/\s*（.*）\s*/, '');
        // const route: RouteRecordRaw = {
        var route = {
            path: '',
            name: '',
            redirect: '',
            component: undefined,
            meta: {
                title: cleaned,
                icon: node.type === base_1.PageTypeEnum.文件夹 ? 'Folder' : 'Tickets',
            },
            children: [],
        };
        // 读取 pathMap.json 文件，获取翻译后的路由标题作为路径
        var pathMap = JSON.parse((0, fs_1.readFileSync)(base_1.PATH_MAP_FILE_PATH, 'utf-8'));
        // 使用翻译后的路由标题作为路径
        var translatedText = pathMap[cleaned];
        var fullPath = parentPath ? "".concat(parentPath, "/").concat(translatedText) : "/".concat(translatedText);
        var fullName = parentName ? "".concat(parentName, "/").concat(translatedText) : translatedText;
        // 设置路由属性
        route.path = fullPath;
        route.name = fullName;
        /**
         * TODO: 箭头函数转为 JSON 会被忽略，需要使用字符串代替才能写入文件，后续怎么还原成箭头函数？
         * 目前解决方法：文件生成后，手动替换
         */
        route.component =
            node.type === base_1.PageTypeEnum.文件 ? "() => import('@/pages".concat(fullPath, "/").concat(translatedText, ".vue')") : undefined;
        if (node.children && node.type === base_1.PageTypeEnum.文件夹) {
            // 递归处理子节点
            route.children = generateRoutes(node.children, fullPath, fullName);
            route.redirect = fullPath;
        }
        else {
            // 文件：删除子节点与重定向
            delete route.children;
            delete route.redirect;
        }
        return route;
    });
    var filteredRoutes = routes.filter(function (item) { var _a; return ((_a = item === null || item === void 0 ? void 0 : item.meta) === null || _a === void 0 ? void 0 : _a.title) !== base_1.HOME_NAME; });
    return filteredRoutes;
}
/**
 * 递归生成页面目录与文件
 * @param routes 路由配置
 * @param basePath 基础路径
 */
function generateFiles(routes, basePath) {
    if (basePath === void 0) { basePath = base_1.BASE_PATH; }
    routes.forEach(function (route) {
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
                var template = (0, base_1.handleInitPageTemplate)((_a = route.meta) === null || _a === void 0 ? void 0 : _a.title);
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
 * 获取对象列表
 */
function getRouter() {
    return __awaiter(this, void 0, void 0, function () {
        var res, objs, routes, content;
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0: return [4 /*yield*/, axios_1.default.get(
                    // 中科瑞景
                    'https://axure-file.lanhuapp.com/md588e80976-0395-4254-9f66-ee823a75b126__de973a4aa4f24bc781c757312aae8dfa.json')];
                case 1:
                    res = _e.sent();
                    if (!res) {
                        return [2 /*return*/];
                    }
                    objs = (_d = (_c = (_b = (_a = res.data) === null || _a === void 0 ? void 0 : _a.sitemap) === null || _b === void 0 ? void 0 : _b.rootNodes[1]) === null || _c === void 0 ? void 0 : _c.children) !== null && _d !== void 0 ? _d : [];
                    if (!objs || objs.length === 0) {
                        return [2 /*return*/];
                    }
                    routes = generateRoutes(objs);
                    content = (0, base_1.handleRouteFileContent)(routes);
                    (0, fs_1.writeFileSync)('./src/router/router.ts', content);
                    // * 4.根据路由列表，生成页面所在的文件夹与文件
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
