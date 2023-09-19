<template>
    <div class="wrap">
        <toolbar :editor="editorRef" :default-config="toolbarConfig" :mode="mode" class="wrap__toolbar" />
        <editor
            v-model="editorValue"
            :default-config="editorConfig"
            :mode="mode"
            :style="editorStyle"
            @on-created="handleCreated"
            @on-change="handleChange"
        />
    </div>
</template>

<script setup lang="ts">
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import useIndex from './useIndex.ts';

/**
 * 定义组件选项
 */
defineOptions({
    name: 'XRichTextEditor',
});

/**
 * props
 */
const props = withDefaults(
    defineProps<{
        /** 上传地址 */
        uploadUrl?: string;
        /** 文件名 */
        fileName?: string;
        /** 编辑器模式 */
        mode?: 'default' | 'simple';
        /** 编辑器样式 */
        editorStyle?: Record<string, string | number>;
        /** 请求接口 */
        api?: any;
        /** 请求接口参数 */
        apiParams?: Record<string, string | number>;
        /** 静态数据 */
        data?: string;
    }>(),
    {
        uploadUrl: `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_GLOB_UPLOAD_URL}`,
        fileName: 'file',
        mode: 'default',
        editorStyle: () => ({
            height: '400px',
            overflowY: 'hidden',
        }),
        api: undefined,
        apiParams: () => ({}),
        data: '',
    },
);

/**
 * emits
 */
const emits = defineEmits<{
    (event: 'change', value: any): void;
}>();

/**
 * use-index
 */
const { editorRef, toolbarConfig, editorConfig, handleCreated, handleChange, disable, enable, clear, confirm } =
    useIndex(props, emits);

/**
 * 暴露的属性/方法
 */
defineExpose({
    editorRef,
    disable,
    enable,
    clear,
    confirm,
});
</script>
<style lang="scss" scoped>
.wrap {
    border: 1px solid #ccc;

    &__toolbar {
        border-bottom: 1px solid #ccc;
    }
}
</style>
