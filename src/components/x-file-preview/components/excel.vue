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
        };

        // 销毁原来的表格
        window.luckysheet.destroy();

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
async function loadResource() {
    await loadCSS('https://cdn.jsdelivr.net/npm/luckysheet/dist/plugins/css/pluginsCss.css');
    await loadCSS('https://cdn.jsdelivr.net/npm/luckysheet/dist/plugins/plugins.css');
    await loadCSS('https://cdn.jsdelivr.net/npm/luckysheet/dist/css/luckysheet.css');
    await loadCSS('https://cdn.jsdelivr.net/npm/luckysheet/dist/assets/iconfont/iconfont.css');
    await loadJS('https://cdn.jsdelivr.net/npm/luckysheet/dist/plugins/js/plugin.js');
    await loadJS('https://cdn.jsdelivr.net/npm/luckysheet/dist/luckysheet.umd.js');
}

/**
 * 页面渲染
 */
onMounted(async () => {
    loadResource();

    setTimeout(() => {
        preview();
    }, 500);
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
