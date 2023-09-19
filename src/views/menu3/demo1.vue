<template>
    <div>
        <el-card shadow="hover" header="x-file-preview" class="component">
            <el-button @click="previewDialog({ url: wordUrl })"> WORD_PREVIEW </el-button>
            <el-button @click="previewDialog({ url: excelUrl })"> EXCEl_PREVIEW </el-button>
            <el-button @click="previewDialog({ url: pdfUrl })"> PDF_PREVIEW </el-button>
        </el-card>

        <el-card shadow="hover" header="x-rich-text-editor" class="component">
            <rich-text-editor ref="editorRef" @change="handleChange"></rich-text-editor>
            <br />

            <el-button @click="handleDisabled"> DISABLED </el-button>
            <el-button @click="handleEnabled"> CANCEL_DISABLED </el-button>
            <el-button @click="handleConfirm"> CONFIRM </el-button>
            <el-button @click="handleClear"> CLEAR </el-button>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { useCommandComponent } from '@/components/hooks/command-dialog-helper';
import FilePreviewDialog from '@/components/FilePreview/index.vue';
import RichTextEditor from '@/components/RichTextEditor/index.vue';

/**
 * file-preview-dialog
 */
const previewDialog = useCommandComponent(FilePreviewDialog);

/**
 * file-url
 */
const wordUrl = ref<string>('http://192.168.3.38:9000/lvling/1694743570966电脑添加打印机.docx');
const excelUrl = ref<string>('http://192.168.3.38:9000/lvling/1694743598502绿菱条码模板.xlsx');
const pdfUrl = ref<string>('http://192.168.3.38:9000/lvling/1694770849198掼蛋.pdf');

/**
 * 编辑器实例
 */
const editorRef = shallowRef();

/**
 * 编辑器内容、选区变化的回调
 */
function handleChange(content: any) {
    console.log('change', content);
}

/**
 * 禁用
 */
function handleDisabled() {
    editorRef.value.disable();
}

/**
 * 使用
 */
function handleEnabled() {
    editorRef.value.enable();
}

/**
 * 确认
 */
function handleConfirm() {
    const content = editorRef.value.confirm();
    console.log('confirm', content);
}

/**
 * 清空
 */
function handleClear() {
    editorRef.value.clear();
}
</script>
<style lang="scss" scoped>
.component {
    margin-bottom: 10px;
}
</style>
