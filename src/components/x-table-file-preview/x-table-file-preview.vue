<template>
    <div>
        <el-popover placement="top" :width="250" trigger="click">
            <template #reference>
                <div class="text">{{ showText }}</div>
            </template>

            <div class="url-wrap">
                <div v-for="(item, index) in srcList" :key="index" class="url-item">
                    <div @click="handlePreview(item)">
                        {{ handleItemName(item, index) }}
                    </div>
                </div>
            </div>
        </el-popover>

        <x-file-preview v-model="previewVisible" :title="previewTitle" :text="previewText" :src="previewFileUrl" />
    </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { last } from 'lodash-es';

import { OPERATION_NOTICE } from '@/constant/base';

/**
 * props
 */
const props = withDefaults(
    defineProps<{
        /** 文档路径 */
        src: string;
        /** 展示文字 */
        showText?: string;
        /** 预览 - 弹窗标题 */
        previewTitle?: string;
        /** 预览 - 下载文字 */
        previewText?: string;
    }>(),
    {
        src: '',
        showText: '查看附件',
        previewTitle: '文件预览',
        previewText: '下载',
    },
);

const srcList = computed<string[]>(() => props.src.split(','));

const previewVisible = ref<boolean>(false);
const previewFileUrl = ref<string>('');

function handleItemName(item: string, index: number) {
    if (!item) {
        return '';
    }

    return `${index + 1}. ${last(item?.split('/'))}`;
}

function handlePreview(url: string) {
    if (!url) {
        ElMessage.warning(OPERATION_NOTICE.NO_DATA);
        return;
    }

    previewFileUrl.value = url ?? '';
    previewVisible.value = true;
}
</script>

<style lang="scss" scoped>
.text {
    cursor: pointer;
    color: #409eff;
}

.url-wrap {
    max-height: 200px;
    overflow-y: auto;
}

.url-item {
    div {
        width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        cursor: pointer;
        color: #409eff;
    }
}
</style>
