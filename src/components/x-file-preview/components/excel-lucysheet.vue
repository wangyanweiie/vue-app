<template>
    <div id="luckysheetId" class="luckysheet"></div>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { transformExcelToLuckyByUrl } from 'luckyexcel';

import { loadCSS, loadJS } from '@/components/hooks/load-resource';
import { downloadFileFromURL } from '@/utils/common-methods';

/**
 * props
 */
const props = withDefaults(
    defineProps<{
        url: string;
    }>(),
    {
        url: '',
    },
);

/**
 * 创建 luckysheet 实例
 */
function preview() {
    transformExcelToLuckyByUrl(props.url, '', (exportJson: any) => {
        if (exportJson.sheets == null || exportJson.sheets.length == 0) {
            ElMessage.error('文件读取失败!');
            return;
        }

        const options = {
            // 设定 DOM 容器的 ID
            container: 'luckysheetId',
            // 表格内容
            data: exportJson.sheets,
            // 表格标题
            title: exportJson.info.name,
            // 语言
            lang: 'zh',
            // 是否显示工具栏
            showtoolbar: true,
            // 是否显示公式栏
            sheetFormulaBar: false,
            // 是否显示顶部信息栏
            showinfobar: false,
            // 是否显示底部计数栏
            showstatisticBar: false,
            // 是否允许前台编辑
            allowEdit: true,
            // 是否允许复制
            allowCopy: false,
            // 是否允许增加行
            enableAddRow: false,
            // 是否允许增加列
            enableAddCol: false,
            // 钩子
            hook: {
                cellUpdated: function (rowIndex: number, colIndex: number, a: any, b: any, c: any) {
                    console.log('行索引', rowIndex);
                    console.log('列索引', colIndex);
                    console.log('a', a);
                    console.log('b', b);
                    console.log('c', c);
                },
            },
        };

        // 销毁原来的表格
        if (window.luckysheet) {
            window.luckysheet?.destroy();
        }

        // 重新创建表格
        window.luckysheet.create(options);
    });
}

/**
 * 下载文件
 */
function download() {
    downloadFileFromURL(props.url);
}

/**
 * 加载 luckysheet 所需样式与脚本文件
 */
function loadResource() {
    loadCSS('https://cdn.jsdelivr.net/npm/luckysheet/dist/plugins/css/pluginsCss.css');
    loadCSS('https://cdn.jsdelivr.net/npm/luckysheet/dist/plugins/plugins.css');
    loadCSS('https://cdn.jsdelivr.net/npm/luckysheet/dist/css/luckysheet.css');
    loadCSS('https://cdn.jsdelivr.net/npm/luckysheet/dist/assets/iconfont/iconfont.css');

    Promise.all([
        loadJS('https://cdn.jsdelivr.net/npm/luckysheet/dist/plugins/js/plugin.js'),
        loadJS('https://cdn.jsdelivr.net/npm/luckysheet/dist/luckysheet.umd.js'),
    ])
        .then(() => {
            setTimeout(() => {
                preview();
            }, 500);
        })
        .catch(function (error) {
            console.error('Failed to load script:', error);
        });
}

/**
 * 页面渲染
 */
onMounted(async () => {
    loadResource();
});

/**
 * 暴露的属性与方法
 */
defineExpose({
    preview,
    download,
});
</script>
<style lang="scss" scoped>
// FIXME: class 不用 luckysheet 不生效？
.luckysheet {
    width: 100%;
    height: 100%;
}
</style>
