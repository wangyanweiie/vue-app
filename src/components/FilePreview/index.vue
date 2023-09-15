<template>
    <el-dialog v-model="dialogVisible" :title="title" :width="width" :show-close="false" destroy-on-close fullscreen>
        <template #header="{ close }">
            <div class="dialog-header">
                <el-button type="success" @click="download()">下载</el-button>
                <el-button @click="close"> 关闭 </el-button>
            </div>
        </template>

        <!-- 容器 -->
        <div ref="docsPreviewRef"></div>
        <div id="luckysheetId"></div>
        <canvas id="canvasId"></canvas>
    </el-dialog>
</template>

<script lang="ts" setup>
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
        /** 弹窗宽度 */
        width?: string;
        /** 文档路径 */
        url: string;
    }>(),
    {
        visible: false,
        title: '弹窗标题',
        width: '40%',
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
const { dialogVisible, docsPreviewRef, download } = useIndex(props, emits);
</script>
<style scoped>
.dialog-header {
    display: flex;
    justify-content: end;
}

#luckysheetId {
    width: 100%;
    height: 100%;
}

#canvasId {
    width: 100%;
    height: 100%;
}
</style>
