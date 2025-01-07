import { dayjs, ElImage, ElTag } from 'element-plus';
import { isString } from 'lodash-es';
import { h, type VNode } from 'vue';

import XTableFilePreview from '@/components/x-table-file-preview/x-table-file-preview.vue';

/**
 * 时间格式化
 * @param row 行数据
 * @param column column 配置
 * @param cellValue 单元格数据
 */
export function cellTimeFormatter(
    row: any,
    column: any,
    cellValue: string | null,
    index?: number,
    format: 'YYYY-MM-DD HH:mm:ss' | 'YYYY-MM-DD HH:mm' | 'YYYY-MM-DD HH' | 'YYYY-MM-DD' = 'YYYY-MM-DD',
    emptyText: string = '',
) {
    if (!cellValue) {
        return h('span', {}, emptyText);
    }

    return dayjs(cellValue).format(format);
}

/**
 * 渲染枚举
 * @param row 行数据
 * @param column column 配置
 * @param cellValue 单元格数据
 * @param labelEnum 显示内容枚举
 */
export function cellLabelFormatter(row: any, column: any, cellValue: number | undefined, labelEnum: any) {
    if (!cellValue) {
        return h('span', {}, '');
    }

    return labelEnum[cellValue];
}

/**
 * 渲染状态
 * @param row 行数据
 * @param column column 配置
 * @param cellValue 单元格数据
 * @param typeEnum ElTag type 枚举
 * @param label 展示内容
 */
export function cellStatusFormatter(
    row: any,
    column: any,
    cellValue: number | undefined,
    typeEnum: any,
    label: string | null,
) {
    if (!cellValue || !label) {
        return h('span', {}, '');
    }

    return h(
        ElTag,
        {
            type: typeEnum[cellValue],
        },
        {
            default: () => label,
        },
    );
}

/**
 * 渲染图片（多图片可预览）
 */
export function cellImageFormatter(row: any, column: any, cellValue: string | string[]): VNode {
    if (!cellValue) {
        return h('span', {}, '');
    }

    let imgs: string[] = [];

    // 字符串拼接
    if (isString(cellValue)) {
        if (cellValue) {
            imgs = cellValue.split(',').filter(url => !!url);
        }
    }

    // 数组
    if (Array.isArray(cellValue)) {
        imgs = cellValue.filter(item => !!item);
    }

    if (!imgs.length) {
        return h('span', {}, '暂无图片');
    }

    return h(
        'div',
        {
            style: {
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            },
        },
        imgs.map((url: string) =>
            h(
                ElImage,
                {
                    src: url,
                    style: {
                        maxWidth: '25px',
                        maxHeight: '25px',
                        marginRight: '5px',
                    },
                    previewSrcList: [url],
                    previewTeleported: true,
                    zIndex: 9999,
                },
                () => '',
            ),
        ),
    );
}

/**
 * 渲染附件（多文件可预览）
 * @param row 行数据
 * @param column column 配置
 * @param cellValue 单元格数据
 */
export function cellFileFormatter(row: any, column: any, cellValue: string | null): VNode {
    if (!cellValue) {
        return h('span', {}, '');
    }

    return h(
        XTableFilePreview,
        {
            src: cellValue,
            showText: '查看附件',
            previewTitle: '文件预览',
            previewText: '下载',
        },
        {
            default: () => '',
        },
    );
}
