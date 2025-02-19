import { translate } from '@vitalets/google-translate-api';
import { pinyin } from 'pinyin-pro';
import * as tunnel from 'tunnel';

/**
 * 翻译英文
 * @param text 文本（格式：...,...,..）
 * @returns 翻译后的文本
 */
export async function translateToEnglish(text: string) {
    // 谷歌翻译
    const result = await translate(text, {
        from: 'zh-CN',
        to: 'en',
        fetchOptions: {
            agent: tunnel.httpsOverHttp({
                proxy: {
                    host: '127.0.0.1',
                    port: 7890,
                    headers: {
                        'User-Agent': 'Node',
                    },
                },
            }),
        },
    });

    const translated = result.text.toLowerCase(); // 转换为小写

    console.log('🔍 English：', translated);
    return translated;
}

/**
 * 翻译拼音
 * @param text 文本（格式：...,...,..）
 * @returns 翻译后的文本
 */
export function translateToPinyin(text: string): string {
    // 拼音转换
    const result = pinyin(text, {
        pattern: 'pinyin', // 完整拼音
        toneType: 'none', // 不带声调
        nonZh: 'consecutive', // 连续非汉字字符无间距
    });

    const translated = result.toLowerCase(); // 转换为小写

    console.log('🔍 Pinyin：', translated);
    return translated;
}

/**
 * 翻译
 */
export async function translateText(text: string) {
    console.log('🔍 Chinese：', text);

    try {
        return translateToEnglish(text);
    } catch (error) {
        return translateToPinyin(text);
    }
}
