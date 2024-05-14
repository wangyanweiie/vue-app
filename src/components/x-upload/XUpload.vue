<template>
    <el-upload
        :action="url"
        :show-file-list="showFileList"
        :file-list="reverseList"
        :limit="limit"
        :accept="accept"
        :before-upload="beforeUpload"
        :on-success="handleSuccess"
        :on-remove="handleRemove"
        :on-exceed="handleExceed"
    >
        <el-button :icon="Upload" :link="link" :disabled="disabled">
            {{ buttonText }}
        </el-button>
    </el-upload>
</template>
<script lang="ts" setup>
import { Upload } from '@element-plus/icons-vue';
import { ElMessage, type UploadFile, type UploadFiles, type UploadRawFile, type UploadUserFile } from 'element-plus';
import { last } from 'lodash-es';
import { ref } from 'vue';

/**
 * props
 */
const props = withDefaults(
    defineProps<{
        /** upload url */
        url: string;
        /** 是否显示已上传文件列表 */
        showFileList?: boolean;
        /** 默认上传文件列表 */
        fileList?: FileListItem[];
        /** 允许上传文件的最大数量 */
        limit?: number;
        /** 上传的文件类型 */
        accept?: string;
        /** 是否可一次上传多张 */
        multiple?: boolean;
        /** 是否显示成文字按钮 */
        link?: boolean;
        /** 按钮文字 */
        buttonText?: string;
        /** 是否禁用上传 */
        disabled?: boolean;
    }>(),
    {
        url: '',
        showFileList: true,
        fileList: () => [],
        limit: 5,
        accept: '',
        multiple: false,
        text: false,
        buttonText: '选择文件',
        disabled: false,
    },
);

/**
 * emit
 */
const emit = defineEmits<{
    /** 更新上传列表 */
    (e: 'update', list: FileListItem[]): void;
}>();

/**
 * 需要保存的列表类型
 */
interface FileListItem {
    sourceFileName: string;
    sourceFilePath: string;
}

/**
 * 回显已上传的文件列表
 */
const reverseList = ref<UploadUserFile[]>([]);

/**
 * 回显方法
 */
function handleReverse() {
    if (props.fileList.length === 0) {
        return;
    }

    // 反显已上传的文件列表
    reverseList.value = props.fileList.map((item: FileListItem) => {
        return {
            name: item.sourceFileName,
            url: item.sourceFilePath,
        };
    });
}

/**
 * 上传之前
 */
function beforeUpload(file: UploadRawFile) {
    if (reverseList.value.some(item => item.name === file.name)) {
        ElMessage.warning('该文件已上传');
        return false;
    }
}

/**
 * 上传成功
 */
function handleSuccess(response: any) {
    if (response.code !== 200) {
        return;
    }

    if (typeof response.data === 'string') {
        // 后端返回的 data 是 url 路径
        reverseList.value.push({
            name: last(response.data?.split('/')) as string,
            url: response.data,
        });
    } else {
        // 后端返回的 data 是 { sourceFileName: 'xx', sourceFilePath: 'xx' }
        reverseList.value.push({
            name: response.data?.sourceFileName,
            url: response.data?.sourceFilePath,
        });
    }

    const list = reverseList.value.map((item: UploadUserFile) => {
        return {
            sourceFileName: item.name,
            sourceFilePath: item.url as string,
        };
    });

    emit('update', list);
}

/**
 * 删除
 */
function handleRemove(file: UploadFile, fileList: UploadFiles) {
    if (file.status !== 'success') {
        return;
    }

    reverseList.value = fileList.map((item: any) => {
        // 新上传的路径地址为 item.response?.data , 已上传的路径地址为 item.url
        if (typeof item.response?.data === 'string') {
            return {
                name: item.name,
                url: item.response?.data ?? item.url,
                uid: item.uid,
            };
        } else {
            // 新上传的路径地址为 item.response?.data.sourceFilePath , 已上传的路径地址为 item.url
            return {
                name: item.name,
                url: item.response?.data.sourceFilePath ?? item.url,
                uid: item.uid,
            };
        }
    });

    const list = reverseList.value.map((item: UploadUserFile) => {
        return {
            sourceFileName: item.name,
            sourceFilePath: item.url as string,
        };
    });

    emit('update', list);
}

/**
 * 超出
 */
function handleExceed() {
    ElMessage.warning(`最多可上传 ${props.limit} 个文件`);
}

/**
 * 监听 fileList
 */
watchEffect(() => {
    handleReverse();
});
</script>
