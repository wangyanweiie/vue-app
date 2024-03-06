<template>
    <div>
        <!-- 使用 pdfjs + iframe 可以直接渲染 PDF -->
        <iframe class="iframe-style" :src="`/pdfjs/web/viewer.html?file=${url}`"></iframe>
    </div>
</template>

<script lang="ts" setup>
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

function download() {
    downloadFileFromURL(props.url);
}

defineExpose({
    download,
});
</script>
<style lang="scss" scoped>
.iframe-style {
    width: 100%;
    height: 85vh;
}
</style>
