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
var commander_1 = require("commander"); // commander 负责解析命令行参数
var fs_1 = require("fs");
var inquirer_1 = require("inquirer"); // inquirer 负责与用户进行交互
var ora = require("ora"); // ora 负责显示加载动画
var path = require("path");
var base_1 = require("./base");
var hooks_1 = require("./hooks");
// ============================ 生成方法 ============================
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
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * 递归生成路由
 * @param nodes 节点列表
 * @param parentPath 父级路径
 * @param parentName 父级名称
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
         * TODO: 设置组件路径有问题：
         * 1.箭头函数转为 JSON 会被忽略，需要转为字符串才能写入文件
         * 2.如何还原为箭头函数？
         *
         * 当前解决方法：路由文件内容生成后，手动将字符串还原为箭头函数（全局替换）
         */
        if (node.children && node.type === base_1.PageTypeEnum.文件夹) {
            delete route.component;
            route.redirect = fullPath;
            // 递归处理子节点
            route.children = generateRoutes(node.children, fullPath, fullName);
        }
        else {
            delete route.redirect;
            delete route.children;
            // 设置组件
            route.component = "() => import('@/pages".concat(fullPath, "/").concat(translatedText, ".vue')");
        }
        return route;
    });
    // 过滤首页
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
                (0, fs_1.mkdirSync)(dirPath, {
                    recursive: true,
                });
            }
            // 如果文件不存在，创建 Vue 文件
            if (!(0, fs_1.existsSync)(fullPath)) {
                var template = (0, base_1.handleInitPageTemplate)((_a = route.meta) === null || _a === void 0 ? void 0 : _a.title);
                (0, fs_1.writeFileSync)(fullPath, template, 'utf-8');
                // console.log(`✅ Created: ${fullPath}`);
            }
            else {
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
function getRouter() {
    return __awaiter(this, arguments, void 0, function (translate, generateRouter, generatePages) {
        var spinner, res, objs, routes, content, error_1;
        var _a, _b, _c, _d;
        if (translate === void 0) { translate = false; }
        if (generateRouter === void 0) { generateRouter = true; }
        if (generatePages === void 0) { generatePages = true; }
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 4, , 5]);
                    spinner = ora();
                    // 获取数据
                    spinner.start('正在获取项目数据...');
                    return [4 /*yield*/, axios_1.default.get(base_1.AXURE_PROJECT_URL)];
                case 1:
                    res = _e.sent();
                    if (!((_d = (_c = (_b = (_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.sitemap) === null || _b === void 0 ? void 0 : _b.rootNodes) === null || _c === void 0 ? void 0 : _c[1]) === null || _d === void 0 ? void 0 : _d.children)) {
                        spinner.fail('❌ 获取项目数据失败');
                        return [2 /*return*/];
                    }
                    spinner.succeed('获取项目数据成功');
                    objs = res.data.sitemap.rootNodes[1].children;
                    if (!objs || objs.length === 0) {
                        console.error('⚠️ 没有找到可用的节点列表');
                        return [2 /*return*/];
                    }
                    if (!translate) return [3 /*break*/, 3];
                    spinner.start('正在生成翻译字典...');
                    return [4 /*yield*/, generatePathMap(objs)];
                case 2:
                    _e.sent();
                    spinner.succeed('翻译字典生成完成');
                    _e.label = 3;
                case 3:
                    routes = generateRoutes(objs);
                    // 3.生成路由文件
                    if (generateRouter) {
                        spinner.start('正在生成路由文件...');
                        content = (0, base_1.handleRouteFileContent)(routes);
                        (0, fs_1.writeFileSync)('./src/router/router.ts', content);
                        spinner.succeed('路由文件生成完成');
                    }
                    // 4.生成页面文件
                    if (generatePages) {
                        spinner.start('正在生成页面文件...');
                        generateFiles(routes);
                        spinner.succeed('页面文件生成完成');
                    }
                    console.log('✨ 所有任务执行完成！');
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _e.sent();
                    console.error('❌ 执行过程中发生错误:', error_1);
                    process.exit(1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
/**
 * 调用方法
 */
// getRouter();
// ============================ 添加命令行交互 ============================
/**
 * 创建新的 Command 实例并设置基本信息
 */
var program = new commander_1.Command();
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
    .action(function () { return __awaiter(void 0, void 0, void 0, function () {
    var requiredDirs, _i, requiredDirs_1, dir, _a, translate, generateRouter, generatePages, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                requiredDirs = ['./src/router', './src/pages'];
                for (_i = 0, requiredDirs_1 = requiredDirs; _i < requiredDirs_1.length; _i++) {
                    dir = requiredDirs_1[_i];
                    if (!(0, fs_1.existsSync)(dir)) {
                        (0, fs_1.mkdirSync)(dir, {
                            recursive: true,
                        });
                    }
                }
                return [4 /*yield*/, inquirer_1.default.prompt([
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
                    ])];
            case 1:
                _a = _b.sent(), translate = _a.translate, generateRouter = _a.generateRouter, generatePages = _a.generatePages;
                return [4 /*yield*/, getRouter(translate, generateRouter, generatePages)];
            case 2:
                _b.sent();
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                console.error('命令执行失败:', error_2);
                process.exit(1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
/**
 * 设置命令行名称、描述和版本
 */
program.name('generate-router').description('路由生成工具').version('1.0.0');
/**
 * 解析命令行参数
 */
program.parse(process.argv);
