'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.translateToPinyin = exports.translateToEnglish = exports.pathMap = void 0;
var googleTranslate = require('@vitalets/google-translate-api');
var pinyin_pro_1 = require('pinyin-pro');
var tunnel = require('tunnel');
/**
 * 中文到英文的映射字典
 */
exports.pathMap = {
    // 首页: 'home',
    // 基础数据: 'basic-data',
    // 添加更多映射...
};
/**
 * 翻译英文
 * @param text 文本
 * @returns 翻译后的文本
 */
function translateToEnglish(text) {
    // 清理特殊字符
    var cleaned = text
        .replace(/（.*）/, '') // 删除括号内容
        .replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, ''); // 保留中文、英文和数字
    // 优先使用映射表
    if (exports.pathMap[cleaned]) {
        return exports.pathMap[cleaned];
    }
    // 谷歌翻译
    var result = googleTranslate(
        cleaned,
        { from: 'zh-CN', to: 'en' },
        {
            agent: tunnel.httpsOverHttp({
                proxy: {
                    host: '127.0.0.1', // 代理 ip
                    port: 7890, // 代理 port
                    headers: {
                        'User-Agent': 'Node',
                    },
                },
            }),
        },
    );
    return result.text;
}
exports.translateToEnglish = translateToEnglish;
/**
 * 翻译拼音
 * @param text 文本
 * @returns 翻译后的文本
 */
function translateToPinyin(text) {
    // 清理特殊字符
    var cleaned = text
        .replace(/（.*）/, '') // 删除括号内容
        .replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, ''); // 保留中文、英文和数字
    // 优先使用映射表
    if (exports.pathMap[cleaned]) {
        return exports.pathMap[cleaned];
    }
    // 拼音转换
    var result = (0, pinyin_pro_1.pinyin)(cleaned, {
        pattern: 'pinyin', // 完整拼音
        toneType: 'none', // 不带声调
        nonZh: 'consecutive', // 连续非汉字字符无间距
    });
    return result.replace(/ /g, '-');
}
exports.translateToPinyin = translateToPinyin;
