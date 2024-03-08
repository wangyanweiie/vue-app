<template>
    <div ref="wordRef"></div>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { renderAsync } from 'docx-preview';
import { ElMessage } from 'element-plus';

import { downloadFileFromURL } from '@/utils/common-methods';

const props = withDefaults(
    defineProps<{
        /** 文档路径 */
        url: string;
    }>(),
    {
        url: '',
    },
);

const wordRef = ref<HTMLElement>();

function preview() {
    axios({
        method: 'GET',
        responseType: 'blob',
        url: props.url,
    }).then(res => {
        if (!res.data) {
            ElMessage.error('文件读取失败!');
            return;
        }

        renderAsync(res.data, wordRef.value as unknown as HTMLElement, undefined, {
            // 默认和文档样式类的类名/前缀
            className: 'docx',
            // 启用围绕文档内容渲染包装器
            inWrapper: true,
            // 禁止页面渲染宽度
            ignoreWidth: false,
            // 禁止页面渲染高度
            ignoreHeight: false,
            // 禁止字体渲染
            ignoreFonts: false,
            // 在分页符上启用分页
            breakPages: true,
            // 禁用 lastRenderedPageBreak 元素的分页
            ignoreLastRenderedPageBreak: true,
            // 启用实验性功能（制表符停止计算）
            experimental: false,
            // 如果为真，xml 声明将在解析之前从xml文档中删除
            trimXmlDeclaration: true,
            // 启用额外的日志记录
            debug: true,
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
