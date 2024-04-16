<template>
    <el-upload
        :action="uploadUrl"
        :show-file-list="props.showFileList"
        :file-list="reverseList"
        :limit="props.limit"
        :accept="props.accept"
        :before-upload="beforeUpload"
        :on-success="handleSuccess"
        :on-remove="handleRemove"
        :on-exceed="handleExceed"
    >
        <el-button type="primary" :text="text" :disabled="disabled">{{ buttonText }}</el-button>
    </el-upload>
</template>
<script lang="ts" setup>
import { ElMessage } from 'element-plus';

import { UPLOAD_URL } from '@/constant/global';
import { guid } from '@/utils/hooks';

/**
 * props
 */
const props = withDefaults(
    defineProps<{
        /** upload-url */
        uploadUrl: string;
        /** 默认上传文件列表 */
        fileList?: any;
        /** 是否显示已上传文件列表 */
        showFileList?: boolean;
        /** 上传的文件类型 */
        accept?: string;
        /** 是否可一次上传多张 */
        multiple: boolean;
        /** 允许上传文件的最大数量 */
        limit?: number;
        /** 是否禁用上传 */
        disabled: boolean;
        /** 是否显示成文字按钮 */
        text: boolean;
        /** 按钮文字 */
        buttonText: string;
    }>(),
    {
        uploadUrl: UPLOAD_URL,
        fileList: () => [],
        showFileList: true,
        accept: '',
        multiple: false,
        limit: 5,
        disabled: false,
        text: false,
        buttonText: '选择文件',
    },
);

/**
 * emit
 */
const emit = defineEmits<{
    /** 更新上传列表 */
    (e: 'update', reverseList: any[]): void;
    /** 预览 */
    (e: 'preview', url: string): void;
}>();

/**
 * 反显已上传的文件列表
 */
const reverseList = ref<any[]>([]);

function handleReverse() {
    if (props.fileList.length === 0) {
        return;
    }

    // 反显已上传的文件列表
    reverseList.value = props.fileList
        ?.filter((item: string) => !!item)
        .map((_item: string) => {
            return {
                name: _item.split('/')[_item.split('/').length - 1],
                url: _item,
                uid: guid(),
            };
        });
}

/**
 * 上传之前
 * @param file 文件
 */
function beforeUpload(file: Record<string, any>) {
    if (reverseList.value.some((item: any) => item.name === file.name)) {
        ElMessage.warning('该文件已上传');
        return false;
    }
}

/**
 * 上传成功
 * @param file 文件
 */
function handleSuccess(file: Record<string, any>) {
    if (file.code !== 120) {
        return;
    }

    // 后端返回的 data 是 url 路径
    reverseList.value.push({
        name: file?.data?.split('/')[file?.data?.split('/').length - 1],
        url: file?.data,
        uid: guid(),
    });

    emit('update', reverseList.value);
}

/**
 * 删除
 * @param file 文件
 * @param fileList 文件列表
 */
function handleRemove(file: Record<string, any>, fileList: Record<string, any>[]) {
    if (file.status !== 'success') {
        return;
    }

    // 新上传的路径地址为 item?.response?.data , 已上传的路径地址为 item?.url
    reverseList.value = fileList.map(item => {
        return {
            name: item.name,
            url: item?.response?.data ?? item?.url,
            uid: item.uid,
        };
    });

    emit('update', reverseList.value);
}

/**
 * 超出
 */
function handleExceed() {
    ElMessage.warning(`最多可上传 ${props.limit} 个文件`);
}

/**
 * 页面挂载
 */
// onMounted(() => {
//     handleReverse();
// });

/**
 * 监听 fileList
 */
watchEffect(() => {
    handleReverse();
});
</script>
