<template>
    <el-dialog v-model="dialogVisible" destroy-on-close append-to-body>
        <template #header>
            <div class="header">
                <div class="header-title">{{ title }}</div>
                <el-button :icon="Download" type="primary" @click="download">
                    {{ text }}
                </el-button>
            </div>
        </template>

        <div class="component">
            <component
                :is="currentComponent"
                v-if="fileType in fileTypeMap"
                :src="fileSrc"
                class="component-item"
            ></component>

            <el-empty v-else description="当前文件类型暂不支持预览" />
        </div>
    </el-dialog>
</template>

<script lang="ts" setup>
import '@vue-office/excel/lib/index.css';
import '@vue-office/docx/lib/index.css';

import { Download } from '@element-plus/icons-vue';
import VueOfficeDocx from '@vue-office/docx';
import VueOfficeExcel from '@vue-office/excel';
import VueOfficePdf from '@vue-office/pdf';

import { downloadFileFromURL } from '@/utils/common-methods';

import Img from './components/img.vue';

/**
 * props
 */
const props = withDefaults(
    defineProps<{
        /** 是否展示 */
        visible: boolean;
        /** 弹窗标题 */
        title?: string;
        /** 下载文字 */
        text?: string;
        /** 文档路径 */
        src: string;
    }>(),
    {
        visible: false,
        title: '文件预览',
        text: '下载',
        src: '',
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
 * 文件地址
 */
const fileSrc = computed(() => {
    return props.src;
});

/**
 * 文件类型
 */
type FileType = 'doc' | 'docx' | 'xls' | 'xlsx' | 'pdf' | 'png' | 'jpg' | 'jpeg';

const fileType = computed<string>(() => {
    return props.src?.split('.')?.pop()?.toLowerCase() ?? '';
});

/**
 * 文件类型与组件对应关系
 */
const fileTypeMap = {
    doc: VueOfficeDocx,
    docx: VueOfficeDocx,
    xls: VueOfficeExcel,
    xlsx: VueOfficeExcel,
    pdf: VueOfficePdf,
    png: Img,
    jpg: Img,
    jpeg: Img,
};

/**
 * 当前组件类型
 */
const currentComponent = computed(() => {
    const type = fileType.value as FileType;

    if (type in fileTypeMap) {
        return fileTypeMap[type];
    }

    throw new Error(`当前文件类型不支持预览: ${type}`);
});

/**
 * 下载
 */
function download() {
    downloadFileFromURL(fileSrc.value);
}
</script>
<style lang="scss" scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .header-title {
        font-size: 16px;
    }
}

.component {
    width: 100%;
    height: 70vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-y: auto;

    .component-item {
        width: 100%;
        height: 100%;
    }
}
</style>
