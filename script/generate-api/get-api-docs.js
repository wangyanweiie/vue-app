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
/**
 * 去除生成的 json 数据中的 extensions
 */
function handleApiData(apiData) {
    var data = apiData;
    data.tags = data.tags.map(function (item) {
        if (item.extensions) {
            delete item.extensions;
        }
        return item;
    });
    Object.keys(data.paths).forEach(function (key) {
        Object.keys(data.paths[key]).forEach(function (childKey) {
            if (data.paths[key][childKey].extensions) {
                delete data.paths[key][childKey].extensions;
            }
        });
    });
    return data;
}
function writeAPI() {
    return __awaiter(this, void 0, void 0, function () {
        var response, json, apiObj, apiInfo, key, funName, method, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if ((0, fs_1.existsSync)('./src/gen-api') && !(0, fs_1.existsSync)('./src/gen-api/.openapi-generator-ignore')) {
                        (0, fs_1.writeFileSync)('./src/gen-api/.openapi-generator-ignore', "\n                common.ts\n                configuration.ts\n                git_push.sh\n                .npmignore\n                .gitignore\n            ");
                    }
                    if (!(0, fs_1.existsSync)('./src/gen-api') && !(0, fs_1.existsSync)('./src/gen-api/.openapi-generator-ignore')) {
                        (0, fs_1.mkdirSync)('./src/gen-api');
                        (0, fs_1.writeFileSync)('./src/gen-api/.openapi-generator-ignore', "\n                common.ts\n                configuration.ts\n                git_push.sh\n                .npmignore\n                .gitignore\n            ");
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1.default.get('http://192.168.4.34:8066/v3/api-docs?group=%E7%B3%BB%E7%BB%9F%E6%9C%8D%E5%8A%A1')];
                case 2:
                    response = _a.sent();
                    json = JSON.stringify(response.data).replace(/\«|»|\s+/g, '_');
                    apiObj = JSON.parse(json);
                    apiInfo = handleApiData(apiObj);
                    for (key in apiInfo.paths) {
                        funName = key
                            .split('/')
                            .filter(function (item) { return item && item !== 'api' && item !== 'v1'; })
                            .map(function (item, index) {
                            if (index === 0) {
                                return item;
                            }
                            else {
                                return "".concat(item[0].toUpperCase()).concat(item.slice(1));
                            }
                        })
                            .join('');
                        method = Object.keys(apiObj.paths[key])[0];
                        apiObj.paths[key][method].operationId = "".concat(funName).concat(method.toUpperCase());
                    }
                    if (!(0, fs_1.existsSync)('./src/json')) {
                        (0, fs_1.mkdirSync)('./src/json');
                    }
                    (0, fs_1.writeFileSync)('./src/json/api.json', JSON.stringify(apiObj));
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.log('出错了');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
writeAPI();
