import * as google from '@vitalets/google-translate-api';
import { existsSync, unlinkSync, writeFileSync } from 'fs';
import * as tunnel from 'tunnel';

import simplifiedChinese from '../../src/locale/language/zh-cn';

const flattenObject = (obj: Record<string, any>, prefix = ''): Record<string, string> => {
    let result = {};

    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const nestedKey = prefix.length > 0 ? `${prefix}/${key}` : key;

            if (typeof obj[key] === 'object' && obj[key] !== null) {
                const nestedObj = flattenObject(obj[key], nestedKey);

                result = {
                    ...result,
                    ...nestedObj,
                };
            } else {
                result[nestedKey] = obj[key];
            }
        }
    }

    return result;
};

const unFlattenObject = (obj: Record<string, string>) => {
    const result = {};

    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const nestedKeys = key.split('/');

            let nestedObj = result;

            for (let i = 0; i < nestedKeys.length; i++) {
                const nestedKey = nestedKeys[i];

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

const translateEn = (text: string) =>
    (google as any)(
        text,
        {
            from: 'zh-cn',
            to: 'en',
        },
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

const translatorZhTw = (text: string) =>
    (google as any)(
        text,
        {
            from: 'zh-cn',
            to: 'zh-tw',
        },
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

/**
 * 定义翻译方法
 */
const translateRun = async (inputJson: Record<string, any>) => {
    const flatInputJson = flattenObject(inputJson);
    const sourceKeyValues = Object.entries(flatInputJson);

    let chunk: Record<string, string>[] = [];
    let chunkLength: number = 0;

    const chunks: Record<string, string>[][] = [];

    sourceKeyValues.forEach(([key, value]: string[]) => {
        // Google 翻译单次最大字符长度 5000 字, 5 为占位分隔符长度
        if (chunkLength + value.length + 5 < 5000) {
            chunk.push({ key, value });
            chunkLength += value.length + 5;
        } else {
            chunks.push(chunk);
            chunk = [];
            chunkLength = 0;
        }
    });

    // 遍历完后检查不满 5000 字符的遗留
    if (chunk.length > 0) {
        chunks.push(chunk);
        chunk = [];
        chunkLength = 0;
    }

    // 英文翻译结果
    const enJson: Record<string, string> = {};

    for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];

        // 合并文案
        const mergeText = chunk.map((item: Record<string, string>) => item.value).join('\n###\n');

        const { text } = await translateEn(mergeText);

        // 拆分文案
        const resultValues = text.split(/\n *# *# *# *\n/).map((item: string) => item.trim());

        if (chunk.length !== resultValues.length) {
            throw new Error('翻译前文案碎片长度和翻译后的不一致');
        }

        chunk.forEach(({ key }: Record<string, string>, index: number) => {
            enJson[key] = resultValues[index];
        });
    }

    // 中文繁体翻译结果
    const zhTwJson: Record<string, string> = {};

    for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];

        // 合并文案
        const mergeText = chunk.map((item: Record<string, string>) => item.value).join('###');

        const { text } = await translatorZhTw(mergeText);

        // 拆分文案
        const resultValues = text.split(/ *# *# *# */).map((item: string) => item.trim());

        if (chunk.length !== resultValues.length) {
            throw new Error('翻译前文案碎片长度和翻译后的不一致');
        }

        chunk.forEach(({ key }: Record<string, string>, index: number) => {
            zhTwJson[key] = resultValues[index];
        });
    }

    return {
        en: unFlattenObject(enJson),
        tradition: unFlattenObject(zhTwJson),
    };
};

/**
 * 将翻译结果写入硬盘
 */
translateRun(JSON.parse(JSON.stringify(simplifiedChinese))).then(({ en: enJson, tradition: zhTwJson }) => {
    if (existsSync('./src/locale/language/zh-cn.js')) {
        unlinkSync('./src/locale/language/zh-cn.js');
    }

    writeFileSync('./src/locale/language/en.ts', `export default ${JSON.stringify(enJson)}`);
    writeFileSync('./src/locale/language/zh-tw.ts', `export default ${JSON.stringify(zhTwJson)}`);
});
