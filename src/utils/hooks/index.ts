import type { Options } from './interface';

/**
 * 校验是否为数字类型（正数/负数/整数/小数）
 * @param value 字符串
 */
export function checkNumberFormat(value: string) {
    if (!value) {
        return;
    }

    // 正则表达式
    const reg = /^[+-]?(\d|([1-9]\d+))(\.\d+)?$/;
    const flag = reg.test(value);

    if (flag) {
        return value;
    } else {
        return null;
    }
}

/**
 * 强制保留小数位方法
 * @param value 要处理的数据
 * @param precision 小数位数
 */
export function keepDecimalPrecision(value: number | string, precision: number) {
    if (!value) {
        return;
    }

    // 将数字转换为字符串
    let res = String(value);

    // 小数点的索引值
    let posDecimalIndex = res.indexOf('.');

    // 当整数，即 posDecimalIndex = -1 时，拼接小数点
    if (posDecimalIndex === -1) {
        posDecimalIndex = res.length;
        res += '.';
    }

    // 当数字的长度 < 小数点索引 + precision 时，用 0 补全
    while (res.length <= posDecimalIndex + precision) {
        res += '0';
    }

    return res;
}

/**
 * 将枚举转换为 options
 * @param enumeration 枚举
 */
export function transformEnumToOptions(enumeration: Record<string, string | number>): Options[] {
    // Object.entries 返回给定对象自身可枚举属性的键值对数组
    const list = Object.entries(enumeration);
    const transList = list
        .map(([label, value]) => {
            return {
                label,
                value: value as number,
            };
        })
        .slice(list.length / 2);

    return transList;
}

/**
 * 将 '-' 拼接字符串改为驼峰格式
 * @param str 要转换的字符串
 * @param type 要转换的驼峰格式
 */
export function handleToHumpFormat(str: string, type: 'min' | 'max') {
    switch (type) {
        // 小驼峰格式：x-table ==> xTable
        case 'min': {
            const reg = /[-_](\w)/g;
            return str.replace(reg, (initial, item) => {
                return item.toUpperCase();
            });
        }

        // 大驼峰格式：x-table ==> XTable
        case 'max': {
            const arr = str.split('-');
            const res = arr.map(item => `${item[0].toUpperCase()}${item.slice(1, item.length)}`).join('');
            return res;
        }
    }
}

/**
 * 生成 uuid
 */
export function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
