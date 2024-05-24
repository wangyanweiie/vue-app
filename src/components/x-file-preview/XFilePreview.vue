<template>
    <el-dialog v-model="dialogVisible" :title="title" fullscreen :show-close="true" destroy-on-close>
        <component :is="currentComponent" :ref="componentRef" :url="url" class="component"></component>
    </el-dialog>
</template>

<script lang="ts" setup>
import excel from './components/excel.vue';
import pdf from './components/pdf.vue';
import word from './components/word.vue';

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
.component {
    height: calc(100vh - 80px);
    overflow-y: auto;
}
</style>
