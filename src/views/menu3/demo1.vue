<template>
    <div>
        <el-card shadow="hover" header="x-file-preview" class="component">
            <el-button @click="previewDialog({ url: wordUrl })"> WORD_PREVIEW </el-button>
            <el-button @click="previewDialog({ url: excelUrl })"> EXCEl_PREVIEW </el-button>
            <el-button @click="previewDialog({ url: pdfUrl })"> PDF_PREVIEW </el-button>
        </el-card>

        <el-card shadow="hover" header="x-rich-text-editor" class="component">
            <x-rich-text-editor ref="editorRef" v-model="editorValue" @change="handleChange"></x-rich-text-editor>
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
import XFilePreviewDialog from '@/components/FilePreview/index.vue';
import XRichTextEditor from '@/components/RichTextEditor/index.vue';

/**
 * file-preview-dialog
 */
const previewDialog = useCommandComponent(XFilePreviewDialog);

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
 * 默认值
 */
const editorValue = ref<string>(
    '<p style="text-align: start; line-height: 1;"><span style="background-color: rgb(255, 173, 210);"><em><strong>工具栏配置 - 插入新菜单，屏蔽某个菜单等</strong></em></span></p><p style="text-align: start; line-height: 1;"><span style="background-color: rgb(255, 173, 210);"><em><strong>编辑器配置 - 兼听各个生命周期，自定义粘贴</strong></em></span></p><p style="text-align: start; line-height: 1;"><span style="background-color: rgb(255, 173, 210);"><em><strong>菜单配置 - 配置颜色、字体、字号、链接校验、上传图片、视频等</strong></em></span></p>',
);

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
