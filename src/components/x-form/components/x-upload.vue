<template>
    <div>
        <el-upload
            v-model:file-list="fileList"
            class="avatar-uploader"
            :action="action"
            :on-success="handleUploadSuccess"
            :on-error="handleUploadError"
            :on-exceed="handleUploadExceed"
            :on-remove="handleUploadRemove"
            :on-preview="handlePreview"
            :on-progress="handleUploadProgress"
            :list-type="listType"
            :limit="limit"
            :accept="accept"
            :multiple="multiple"
            :before-upload="beforeUpload"
            :disabled="disabled"
        >
            <el-button v-if="fileShow" :icon="Upload" :disabled="disabled">
                {{ uploadText }}
            </el-button>

            <div>
                <img v-if="!fileShow && imageUrl" :src="imageUrl" class="avatar" />
                <el-icon v-if="!fileShow" :disabled="disabled" class="avatar-uploader-icon">
                    <plus />
                </el-icon>
            </div>
        </el-upload>

        <!-- 文件预览 -->
        <x-file-preview v-model="previewVisible" :title="previewTitle" :text="previewText" :src="previewFileUrl" />
    </div>
</template>

<script setup lang="ts">
import { Plus, Upload } from '@element-plus/icons-vue';
import { ElMessage, ElNotification, type UploadProps, type UploadStatus, type UploadUserFile } from 'element-plus';

const imageUrl = ref('');

const props = withDefaults(
    defineProps<
        {
            /** 值类型 */
            valueType?: 'array' | 'string';
            /** 值 */
            modelValue: string | string[];
            /** listType */
            listType?: 'text' | 'picture' | 'picture-card';
            /** 是否展示文件 */
            fileShow?: boolean;
            /** 禁用 */
            disabled?: boolean;
            /** 文件上传状态 */
            uploadStatus?: UploadStatus;
            /** 上传按钮文字 */
            uploadText?: string;
            /** 预览组件 - 弹窗标题 */
            previewTitle?: string;
            /** 预览组件 - 下载文字 */
            previewText?: string;
            /** beforeUpload */
            beforeUpload?: UploadProps['beforeUpload'];
        } & Partial<UploadProps>
    >(),
    {
        valueType: 'array',
        modelValue: undefined,
        listType: undefined,
        fileShow: true,
        disabled: false,
        uploadStatus: undefined,
        uploadText: '上传文件',
        previewTitle: '文件预览',
        previewText: '下载',
        beforeUpload: undefined,
    },
);

const emits = defineEmits<{
    (e: 'update:modelValue', value?: string | string[]): void;
    (e: 'update:uploadStatus', status?: UploadStatus): void;
}>();

/**
 * 上传文件列表
 */
const fileList = ref<UploadUserFile[]>();

const status = ref<UploadStatus>('ready');

/**
 * 上传成功
 */
function handleUploadSuccess(response: { data: string }): void {
    if (!response) {
        return;
    }

    // 配了对应的可上传文件类型，但是我们在选文件的时候依然可以去更改选择的文件属性，筛选所有
    // 选文件的时候强行筛选所有，组件不会校验文件类型，需要我们再加一层校验
    const suffix = response.data.split('.').pop();
    let suffixValid = true;

    if (props.accept) {
        suffixValid = props.accept.split(',').some(item => item.trim() === `.${suffix}`);
    }

    if (!suffixValid) {
        fileList.value?.pop();
        ElMessage.error('上传文件格式不正确');
        return;
    }

    const file = fileList.value?.pop();

    if (file) {
        fileList.value?.push({
            ...file,
            url: response.data,
            percentage: 100,
        });
    }

    if (props.valueType === 'array') {
        emits(
            'update:modelValue',
            fileList.value?.map(item => item.url ?? ''),
        );
    } else {
        emits(
            'update:modelValue',
            fileList.value?.map(item => item.url ?? (item.response as Record<string, unknown>)?.data).toString(),
        );
    }
}

/**
 * 上传失败
 */
function handleUploadError(error: Error): void {
    ElNotification.error({
        title: '上传失败',
        message: error.message,
    });
}

/**
 * 超过限制
 */
function handleUploadExceed(): void {
    ElNotification.warning({
        title: '超出限制',
    });
}

/**
 * 删除
 */
function handleUploadRemove(): void {
    if (props.valueType === 'array') {
        emits(
            'update:modelValue',
            fileList.value?.map(item => item.url ?? ''),
        );
    } else {
        emits('update:modelValue', fileList.value?.map(item => item.url ?? '').join(','));
    }
}

/**
 * 初始化
 * 用于 v-model 携带值得情况
 */
function init(): void {
    if (!props.modelValue) {
        fileList.value = [];
        return;
    }

    if (Array.isArray(props.modelValue)) {
        fileList.value = props.modelValue?.map(url => ({
            name: url.split('/').pop() ?? '',
            url,
            status: 'success',
        }));
    }

    if (typeof props.modelValue === 'string') {
        fileList.value = props.modelValue?.split(',').map(url => ({
            name: url.split('/').pop() ?? '',
            url,
            status: 'success',
        }));
    }
}

/**
 * 文件上传
 */
const handleUploadProgress: UploadProps['onProgress'] = uploadFile => {
    if (uploadFile.percent > 0) {
        status.value = 'uploading';
        emits('update:uploadStatus', status.value);
    }

    if (uploadFile.percent === 100) {
        status.value = 'success';
        emits('update:uploadStatus', status.value);
    }
};

/**
 * 文件预览
 */
const previewVisible = ref<boolean>(false);
const previewFileUrl = ref<string>('');

const handlePreview: UploadProps['onPreview'] = uploadFile => {
    previewFileUrl.value = uploadFile.url ?? '';
    previewVisible.value = true;
};

watch(
    () => props.modelValue,
    () => {
        init();
    },
);

onMounted(() => {
    init();
});
</script>
