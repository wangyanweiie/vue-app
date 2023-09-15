<template>
    <div>
        <el-card shadow="hover" header="x-file-preview">
            <el-button @click="previewDialog({ url: wordUrl })"> WORD_PREVIEW </el-button>
            <el-button @click="previewDialog({ url: excelUrl })"> EXCEl_PREVIEW </el-button>
            <el-button @click="previewDialog({ url: pdfUrl })"> PDF_PREVIEW </el-button>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { useCommandComponent } from '@/components/hooks/command-dialog-helper';
import PreviewDialog from '@/components/FilePreview/index.vue';

const previewDialog = useCommandComponent(PreviewDialog);
const wordUrl = ref<string>('http://192.168.3.38:9000/lvling/1694743570966电脑添加打印机.docx');
const excelUrl = ref<string>('http://192.168.3.38:9000/lvling/1694743598502绿菱条码模板.xlsx');
const pdfUrl = ref<string>('http://192.168.3.38:9000/lvling/1694770849198掼蛋.pdf');
</script>
