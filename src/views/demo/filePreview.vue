<template>
    <div>
        <div v-if="showDom" id="domId" class="component">
            <el-card shadow="hover" header="x-file-preview" class="whole-node">
                <el-button @click="preview({ url: wordUrl })"> WORD </el-button>
                <el-button @click="preview({ url: excelUrl })"> EXCEl </el-button>
                <el-button @click="preview({ url: pdfUrl })"> PDF </el-button>
                <el-button @click="previewImage({ urlList: imageUrlList, initialIndex: 0 })"> IMAGE </el-button>
            </el-card>
        </div>

        <el-button @click="generatePDF"> PDF </el-button>
    </div>
</template>

<script setup lang="ts">
import { useCommandComponent } from '@/components/hooks/command-dialog-helper';
import { previewImage } from '@/components/hooks/image-preview-helper';
import XFilePreview from '@/components/x-file-preview/XFilePreview.vue';
import useJsPDF from '@/utils/use-jspdf';

/**
 * file-preview-dialog
 */
const preview = useCommandComponent(XFilePreview);

/**
 * file-url
 */
const wordUrl = ref<string>('http://121.41.28.31:9000/lvling/电脑添加打印机.docx');
const excelUrl = ref<string>('http://121.41.28.31:9000/ruilian/原材料COA报告.xlsx');
const pdfUrl = ref<string>('http://121.41.28.31:9000/lvling/掼蛋.pdf');
const imageUrlList = ref<string[]>([
    'http://121.41.28.31:9000/lvling/Fuck.png',
    'http://121.41.28.31:9000/lvling/mhgg.jpg',
]);

/**
 * use-jspdf
 */
const { showDom, generatePDF } = useJsPDF('domId', 'whole-node', 'ignore-node');
</script>
<style lang="scss" scoped>
.component {
    margin-bottom: 10px;
}
</style>
