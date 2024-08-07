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

import type { XRichTextEditorProps } from './interface';
import useIndex from './useIndex';

/**
 * props
 */
const props = withDefaults(defineProps<XRichTextEditorProps>(), {
    modelValue: '<p>hello</p>',
    url: `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_GLOB_UPLOAD_URL}`,
    fileName: 'file',
    mode: 'simple',
    editorStyle: () => ({
        height: '400px',
        overflowY: 'hidden',
    }),
});

/**
 * emits
 */
const emits = defineEmits<{
    /** 更新弹窗是否显示 */
    (e: 'update:modelValue', value: string): void;
    /** change */
    (event: 'change', value: any): void;
}>();

/**
 * use-index
 */
const {
    editorRef,
    editorValue,
    toolbarConfig,
    editorConfig,
    handleCreated,
    handleChange,
    disable,
    enable,
    clear,
    confirm,
} = useIndex(props, emits);

/**
 * 暴露的属性/方法
 */
defineExpose({
    editorRef,
    editorValue,
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
