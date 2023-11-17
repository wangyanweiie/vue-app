<template>
    <el-dialog v-model="dialogVisible" :title="title" fullscreen :show-close="false" destroy-on-close>
        <template #header="{ close }">
            <div class="dialog-header">
                <el-button type="success" @click="download()">下载</el-button>
                <el-button @click="close"> 关闭 </el-button>
            </div>
        </template>

        <!-- 容器 -->
        <div v-if="fileType === FileType['word']" ref="wordRef"></div>
        <div v-if="fileType === FileType['excel']" id="luckysheetId" class="luckysheet"></div>
        <div v-if="fileType === FileType['pdf']" class="pdf-style">
            <vue-pdf-embed
                :source="pdfState.source"
                :page="pdfState.currentPage"
                :style="pdfState.scale"
                :rotate="pdfState.rotate"
            />

            <div class="pdf-style__operate">
                <el-button size="small" :disabled="pdfState.currentPage === 1" @click="prePage()">上一页</el-button>
                <el-button size="small" :disabled="pdfState.currentPage === pdfState.totalPages" @click="nextPage()">
                    下一页
                </el-button>
                <el-button size="small" disabled>{{ `${pdfState.currentPage} / ${pdfState.totalPages}` }}</el-button>
            </div>

            <!-- 使用 pdfjs + iframe 可以直接渲染 PDF -->
            <!-- <iframe class="iframe-style" :src="`/pdfjs/web/viewer.html?file=${url}`"></iframe> -->
        </div>
    </el-dialog>
</template>

<script lang="ts" setup>
import VuePdfEmbed from 'vue-pdf-embed';
import useIndex from './useIndex';

/**
 * 定义组件选项
 */
defineOptions({
    name: 'XFilePreview',
});

/**
 * props
 */
const props = withDefaults(
    defineProps<{
        /** 是否展示 */
        visible: boolean;
        /** 弹窗标题 */
        title?: string;
        /** 文档路径 */
        url: string;
    }>(),
    {
        visible: false,
        title: '弹窗标题',
        url: '',
    },
);

/**
 * emits
 */
const emits = defineEmits<{
    (event: 'update:visible', visible: boolean): void;
    (event: 'close'): void;
}>();

/**
 * use-index
 */
const { FileType, fileType, dialogVisible, wordRef, pdfState, prePage, nextPage, download } = useIndex(props, emits);
</script>
<style lang="scss" scoped>
.dialog-header {
    display: flex;
    justify-content: end;
}

// FIXME: class 不用 luckysheet 不生效？
.luckysheet {
    width: 100%;
    height: 100%;
}

.pdf-style {
    position: relative;

    &__operate {
        position: sticky;
        bottom: 0;
        padding: 15px;
        text-align: center;
    }
}

.iframe-style {
    width: 100%;
    height: 100%;
}
</style>
