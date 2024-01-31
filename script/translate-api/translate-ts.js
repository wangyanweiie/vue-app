"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var fs_1 = require("fs");
var tunnel = require("tunnel");
var google = require("@vitalets/google-translate-api");
var zh_CN_1 = require("../../src/locale/language/zh-CN");
var flattenObject = function (obj, prefix) {
    if (prefix === void 0) { prefix = ''; }
    var result = {};
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            var nestedKey = prefix.length > 0 ? "".concat(prefix, "/").concat(key) : key;
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                var nestedObj = flattenObject(obj[key], nestedKey);
                result = __assign(__assign({}, result), nestedObj);
            }
            else {
                result[nestedKey] = obj[key];
            }
        }
    }
    return result;
};
var unFlattenObject = function (obj) {
    var result = {};
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            var nestedKeys = key.split('/');
            var nestedObj = result;
            for (var i = 0; i < nestedKeys.length; i++) {
                var nestedKey = nestedKeys[i];
                if (!Object.prototype.hasOwnProperty.call(nestedObj, nestedKey)) {
                    nestedObj[nestedKey] = {};
                }
                if (i === nestedKeys.length - 1) {
                    nestedObj[nestedKey] = obj[key];
                }
                nestedObj = nestedObj[nestedKey];
            }
        }
    }
    return result;
};
var translateEn = function (text) {
    return google(text, { from: 'zh-CN', to: 'en' }, {
        agent: tunnel.httpsOverHttp({
            proxy: {
                host: '127.0.0.1', // 代理 ip
                port: 7890, // 代理 port
                headers: {
                    'User-Agent': 'Node',
                },
            },
        }),
    });
};
var translatorZhTw = function (text) {
    return google(text, { from: 'zh-CN', to: 'zh-TW' }, {
        agent: tunnel.httpsOverHttp({
            proxy: {
                host: '127.0.0.1', // 代理 ip
                port: 7890, // 代理 port
                headers: {
                    'User-Agent': 'Node',
                },
            },
        }),
    });
};
// 定义翻译方法
var translateRun = function (inputJson) { return __awaiter(void 0, void 0, void 0, function () {
    var chunkValuesLength, chunk, chunks, sourceKeyValues, enJson, _loop_1, i, zhTwJson, _loop_2, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                inputJson = flattenObject(inputJson);
                chunkValuesLength = 0;
                chunk = [];
                chunks = [];
                sourceKeyValues = Object.entries(inputJson);
                sourceKeyValues.forEach(function (_a) {
                    var key = _a[0], value = _a[1];
                    // Google 翻译单次最大字符长度 5000 字, 5 为占位分隔符长度
                    if (chunkValuesLength + value.length + 5 >= 5000) {
                        chunks.push(chunk);
                        chunkValuesLength = 0;
                        chunk = [];
                    }
                    else {
                        chunk.push({ key: key, value: value });
                        chunkValuesLength += value.length + 5;
                    }
                });
                if (chunk.length > 0) {
                    // 遍历完后检查不满 5000 字符的遗留
                    chunks.push(chunk);
                    chunkValuesLength = 0;
                    chunk = [];
                }
                enJson = {};
                _loop_1 = function (i) {
                    var chunk_1, mergeText, text, resultValues;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                chunk_1 = chunks[i];
                                mergeText = chunk_1.map(function (v) { return v.value; }).join('\n###\n');
                                return [4 /*yield*/, translateEn(mergeText)];
                            case 1:
                                text = (_b.sent()).text;
                                resultValues = text.split(/\n *# *# *# *\n/).map(function (v) { return v.trim(); });
                                if (chunk_1.length !== resultValues.length) {
                                    throw new Error('翻译前文案碎片长度和翻译后的不一致');
                                }
                                chunk_1.forEach(function (_a, index) {
                                    var key = _a.key;
                                    enJson[key] = resultValues[index];
                                });
                                return [2 /*return*/];
                        }
                    });
                };
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < chunks.length)) return [3 /*break*/, 4];
                return [5 /*yield**/, _loop_1(i)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4:
                zhTwJson = {};
                _loop_2 = function (i) {
                    var chunk_2, mergeText, text, resultValues;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                chunk_2 = chunks[i];
                                mergeText = chunk_2.map(function (v) { return v.value; }).join('###');
                                return [4 /*yield*/, translatorZhTw(mergeText)];
                            case 1:
                                text = (_c.sent()).text;
                                resultValues = text.split(/ *# *# *# */).map(function (v) { return v.trim(); });
                                if (chunk_2.length !== resultValues.length) {
                                    throw new Error('翻译前文案碎片长度和翻译后的不一致');
                                }
                                chunk_2.forEach(function (_a, index) {
                                    var key = _a.key;
                                    zhTwJson[key] = resultValues[index];
                                });
                                return [2 /*return*/];
                        }
                    });
                };
                i = 0;
                _a.label = 5;
            case 5:
                if (!(i < chunks.length)) return [3 /*break*/, 8];
                return [5 /*yield**/, _loop_2(i)];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7:
                i++;
                return [3 /*break*/, 5];
            case 8: return [2 /*return*/, { en: unFlattenObject(enJson), tradition: unFlattenObject(zhTwJson) }];
        }
    });
}); };
// 将翻译结果写入硬盘
translateRun(JSON.parse(JSON.stringify(zh_CN_1.default))).then(function (_a) {
    var enJson = _a.en, zhTwJson = _a.tradition;
    if ((0, fs_1.existsSync)('./src/locale/language/zh-cn.js')) {
        (0, fs_1.unlinkSync)('./src/locale/language/zh-cn.js');
    }
    (0, fs_1.writeFileSync)('./src/locale/language/en.ts', "export default ".concat(JSON.stringify(enJson)));
    (0, fs_1.writeFileSync)('./src/locale/language/zh-tw.ts', "export default ".concat(JSON.stringify(zhTwJson)));
});
