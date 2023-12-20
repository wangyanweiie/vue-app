<template>
    <el-dialog v-model="dialogVisible" :title="title" fullscreen :show-close="true" destroy-on-close>
        <!-- <template #header="{ close }">
            <div class="dialog-header">
                <el-button type="success" @click="download()">下载</el-button>
                <el-button @click="close"> 关闭 </el-button>
            </div>
        </template> -->

        <component :is="currentComponent" :ref="componentRef" :url="url"></component>
    </el-dialog>
</template>

<script lang="ts" setup>
import word from './components/word.vue';
import excel from './components/excel.vue';
import pdf from './components/pdf.vue';

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
 * 是否展示弹窗
 */
const dialogVisible = computed<boolean>({
    get: () => props.visible,
    set: visible => {
        emits('update:visible', visible);

        if (!visible) {
            emits('close');
        }
    },
});

/**
 * 组件类型
 */
const componentRef = ref();
const currentComponent = computed(() => {
    if (props.url.indexOf('.docx') !== -1) {
        return word;
    } else if (props.url.indexOf('.xlsx') !== -1) {
        return excel;
    } else if (props.url.indexOf('.pdf') !== -1) {
        return pdf;
    } else {
        return word;
    }
});
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
