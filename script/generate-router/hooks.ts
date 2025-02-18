import * as google from '@vitalets/google-translate-api';
import { pinyin } from 'pinyin-pro';
import * as tunnel from 'tunnel';

/**
 * 中文到英文的映射字典
 */
export const pathMap: { [key: string]: string } = {
    // 首页: 'home',
    // 基础数据: 'basic-data',
    // 添加更多映射...
};

/**
 * 翻译英文
 * @param text 文本
 * @returns 翻译后的文本
 */
export function translateToEnglish(text: string) {
    // 清理特殊字符
    const cleaned = text
        .replace(/（.*）/, '') // 删除括号内容
        .replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, ''); // 保留中文、英文和数字

    // 优先使用映射表
    if (pathMap[cleaned]) {
        return pathMap[cleaned];
    }

    // 谷歌翻译
    const result = (google as any)(
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

/**
 * 翻译拼音
 * @param text 文本
 * @returns 翻译后的文本
 */
export function translateToPinyin(text: string): string {
    // 清理特殊字符
    const cleaned = text
        .replace(/（.*）/, '') // 删除括号内容
        .replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, ''); // 保留中文、英文和数字

    // 优先使用映射表
    if (pathMap[cleaned]) {
        return pathMap[cleaned];
    }

    // 拼音转换
    const result = pinyin(cleaned, {
        pattern: 'pinyin', // 完整拼音
        toneType: 'none', // 不带声调
        nonZh: 'consecutive', // 连续非汉字字符无间距
    });

    return result.replace(/ /g, '-');
}
