import type { url } from 'inspector';
<template>
    <div id="luckysheetId" class="luckysheet"></div>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { transformExcelToLuckyByUrl } from 'luckyexcel';
import { downloadFileFromURL } from '@/utils/common-methods';

const props = withDefaults(
    defineProps<{
        url: string;
    }>(),
    {
        url: '',
    },
);

function preview() {
    transformExcelToLuckyByUrl(props.url, '', (exportJson: any) => {
        if (exportJson.sheets == null || exportJson.sheets.length == 0) {
            ElMessage.error('文件读取失败!');
            return;
        }

        // 销毁原来的表格
        window.luckysheet.destroy();

        // 重新创建新表格
        window.luckysheet.create({
            // 设定 DOM 容器的 ID
            container: 'luckysheetId',
            // 表格内容
            data: exportJson.sheets,
            // 表格标题
            title: exportJson.info.name,
            // 语言
            lang: 'zh',
            // 是否显示工具栏
            showtoolbar: false,
            // 是否显示公式栏
            sheetFormulaBar: false,
            // 是否显示顶部信息栏
            showinfobar: false,
            // 是否显示底部计数栏
            showstatisticBar: false,
            // 是否允许前台编辑
            allowEdit: false,
            // 是否允许复制
            allowCopy: false,
            // 是否允许增加行
            enableAddRow: false,
            // 是否允许增加列
            enableAddCol: false,
        });
    });
}

function download() {
    downloadFileFromURL(props.url);
}

onMounted(() => {
    preview();
});

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
