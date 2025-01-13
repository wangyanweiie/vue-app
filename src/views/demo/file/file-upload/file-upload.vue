<template>
    <div>
        <el-card shadow="never" class="component">
            <div class="upload-container">
                <input type="file" class="upload" @change="handleFileChange" />

                <div class="button">
                    <el-button type="primary" :disabled="!container.file" @click="handleUpload"> 上传 </el-button>
                    <el-button :disabled="!container.file" @click="handlePause"> 暂停 </el-button>
                    <el-button type="success" :disabled="!container.file" @click="handleResume"> 恢复 </el-button>
                    <el-button type="danger" :disabled="!container.file" @click="handleDelete"> 删除 </el-button>
                </div>
            </div>
        </el-card>

        <!-- <el-card header="切片上传进度" shadow="never" class="component">
            <el-table :data="fileChunkList" border>
                <el-table-column label="chunk_hash" align="center" prop="hash" />
                <el-table-column label="chunk_size（kb）" align="center" prop="chunk.size" />
                <el-table-column label="percentage（%）" align="center" prop="percentage">
                    <template #default="{ row }">
                        <el-progress :percentage="row.percentage" />
                    </template>
                </el-table-column>
            </el-table>
        </el-card> -->

        <el-card header="切片上传进度" shadow="never" class="component">
            <div class="cube-container" :style="{ width: cubeWidth + 'px' }">
                <div v-for="chunk in fileChunkList" :key="chunk.hash" class="cube">
                    <div
                        :class="[
                            chunk.percentage > 0 && chunk.percentage < 100 ? 'uploading' : '',
                            chunk.percentage == 100 ? 'success' : '',
                        ]"
                        :style="{ height: chunk.percentage + '%' }"
                    >
                        <div v-if="chunk.percentage > 0 && chunk.percentage < 100" class="text">
                            {{ chunk.percentage }}
                        </div>
                    </div>
                </div>
            </div>
        </el-card>

        <el-card header="文件上传进度" shadow="never" class="component">
            <el-progress type="circle" color="#67C23A" :percentage="fakeUploadPercentage" />
        </el-card>

        <el-card header="文件列表" shadow="never" class="component">
            <ul>
                <li v-for="file in fileList" :key="file">{{ file }}</li>
            </ul>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import pLimit from 'p-limit';

interface Container {
    file: File | undefined;
    worker: Worker | undefined;
    hash: string | undefined;
}

interface FileChunk {
    chunk: Blob;
    hash: string;
    index: number;
    percentage: number;
}

/**
 * 切片大小：1mb
 */
const CHUNK_SIZE = 50 * 1024 * 1024;

/**
 * 文件
 */
const container = ref<Container>({
    file: undefined,
    worker: undefined,
    hash: undefined,
});

/**
 * 文件切片列表
 */
const fileChunkList = ref<Array<FileChunk>>([]);

/**
 * 切片上传请求列表
 */
const fileChunkRequestList = ref<Array<XMLHttpRequest>>([]);

/**
 * 已上传文件列表
 */
const fileList = ref<Array<string>>([]);

/**
 * 请求
 * @param {string} url 请求地址
 * @param {string} method 请求方式
 * @param {FormData} data FormData
 * @param {Record<string, string>} headers 请求头
 * @param {(e) => void} onProgress 进度回调
 * @returns {Promise}
 */
function request<T>({
    url,
    method = 'post',
    data,
    headers = {},
    onProgress = e => e,
    requestList = [],
}: {
    url: string;
    method?: string;
    data?: any;
    headers?: Record<string, string>;
    onProgress?: (e: ProgressEvent) => void;
    requestList?: XMLHttpRequest[];
}): Promise<{ data: T }> {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = onProgress;

        // 建立请求
        xhr.open(method, url);

        // 设置请求头
        Object.keys(headers).forEach(key => xhr.setRequestHeader(key, headers[key]));

        // 发送请求
        xhr.send(data);

        // 监听上传完成
        // xhr.onload = (e) => {
        //     resolve({
        //         data: e.target?.response,
        //     });
        // };

        // 监听上传完成
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                // 将请求成功的 xhr 从列表中删除
                if (requestList) {
                    const xhrIndex = requestList.findIndex(item => item === xhr);
                    requestList.splice(xhrIndex, 1);
                }

                resolve({
                    data: xhr.response,
                });
            } else {
                reject(new Error(`Request failed with status ${xhr.status}`));
            }
        };

        // 监听请求错误
        xhr.onerror = () => {
            reject(new Error('Request failed'));
        };

        // 暴露当前 xhr 给外部
        requestList?.push(xhr);
    });
}

/**
 * 重置数据
 */
function handleReset() {
    container.value = {
        file: undefined,
        worker: undefined,
        hash: undefined,
    };

    fileChunkList.value = [];
    fileChunkRequestList.value = [];
    fileList.value = [];
    fakeUploadPercentage.value = 0;
}

/**
 * 选择文件
 */
function handleFileChange(e: Event) {
    handleReset();

    const target = e.target as HTMLInputElement;

    const [file] = target.files ?? [];

    if (!file) return;

    container.value.file = file;
}

/**
 * 生成文件切片
 * @param {File} file File
 * @param {number} size 切片大小
 * @returns {Array}
 */
function generateFileChunks(file: File, size = CHUNK_SIZE) {
    const chunkList = [];

    let cur = 0;

    while (cur < file.size) {
        chunkList.push({
            file: file.slice(cur, cur + size),
        });

        cur += size;
    }

    return chunkList;
}

/**
 * 计算文件 hash（web-worker）
 * @param chunkList 文件切片列表
 */
async function calculateFileHash(chunkList: Array<{ file: Blob }>): Promise<string> {
    return new Promise(resolve => {
        // 添加 worker 属性
        container.value.worker = new Worker('/worker/hash.js');

        // 发送消息给 worker
        container.value.worker.postMessage({ chunkList });

        // 监听 worker 消息
        container.value.worker.onmessage = e => {
            const { hash } = e.data;

            if (hash) {
                resolve(hash);
            }
        };
    });
}

/**
 * 验证是否已上传
 */
async function verifyUpload(filename: string, fileHash: string) {
    const { data } = await request({
        url: 'http://localhost:8000/verify',
        headers: {
            'content-type': 'application/json',
        },
        data: JSON.stringify({
            filename,
            fileHash,
        }),
    });

    return JSON.parse(data as string);
}

/**
 * 单个切片上传进度回调
 * @param {FileChunk} item FileChunk
 * @returns {FileChunk}
 */
function createProgressHandler(item: FileChunk) {
    return (e: ProgressEvent) => {
        item.percentage = parseInt(String((e.loaded / e.total) * 100));
    };
}

/**
 * 上传总进度
 * @returns {number}
 */
const uploadPercentage = computed(() => {
    if (!container.value.file || fileChunkList.value.length === 0) return 0;

    const loaded = fileChunkList.value
        .map((item: FileChunk) => {
            return item.chunk.size * item.percentage;
        })
        .reduce((acc, cur) => acc + cur);

    const percentage = parseInt((loaded / container.value.file.size).toFixed(2));

    return percentage;
});

/**
 * 问题：当暂停上传时，会由于取消了部分上传请求导致总进度回退
 * 解決方法：创建一个虚假进度条，当上传总进度增加时，虚假进度也增加，一旦上传总进度回退，假的进度条只需停止即可。
 */
const fakeUploadPercentage = ref<number>(0);

watch(
    () => uploadPercentage.value,
    newValue => {
        if (newValue > fakeUploadPercentage.value) {
            fakeUploadPercentage.value = newValue;
        }
    },
);

/**
 * 合并请求
 */
async function mergeRequest() {
    const { data } = await request({
        url: 'http://localhost:8000/merge',
        headers: {
            'content-type': 'application/json',
        },
        data: JSON.stringify({
            size: CHUNK_SIZE,
            filename: container.value.file?.name,
            fileHash: container.value.hash,
        }),
    });

    const { code, message, fileList: list } = JSON.parse(data as string);

    if (code !== 200) {
        ElMessage.error(message);
        return;
    }

    ElMessage.success('合并成功');
    fileList.value = list;
}

/**
 * 上传切片
 * @param {Array} uploadedList 已上传的切片列表
 */
async function uploadFileChunks(uploadedList: string[] = []) {
    if (!container.value.file || !container.value.hash) {
        console.error('File or hash is missing');
        return;
    }

    const filename = container.value.file.name;
    const fileHash = container.value.hash;

    // 上传单个切片的独立函数
    function uploadChunk({ chunk, hash, index }: FileChunk) {
        const formData = new FormData();

        formData.append('chunk', chunk);
        formData.append('hash', hash);
        formData.append('filename', filename);
        formData.append('fileHash', fileHash);

        return request({
            url: 'http://localhost:8000',
            data: formData,
            onProgress: createProgressHandler(fileChunkList.value[index]),
            requestList: fileChunkRequestList.value,
        });
    }

    const limit = pLimit(5);

    // 限制并发请求数量
    function uploadChunkWithLimit(item: FileChunk) {
        return limit(() => uploadChunk(item));
    }

    // 先过滤出已上传的切片，只上传未上传的切片
    const uploadedSet = new Set(uploadedList);
    const needUploadList = fileChunkList.value.filter(item => !uploadedSet.has(item.hash));

    const requestList = needUploadList.map(item => uploadChunkWithLimit(item));

    try {
        // FIXME: 并发请求
        await Promise.all(requestList);

        // 合并请求：已经上传的切片数量 + 本次上传的切片数量 = 所有切片数量时合并切片
        if (uploadedList.length + requestList.length === fileChunkList.value.length) {
            await mergeRequest();
        }
    } catch (error) {
        console.error('Error during file chunk upload:', error);
    }
}

/**
 * 点击上传
 */
async function handleUpload() {
    if (!container.value.file) return;

    // 获取文件切片
    const chunkList: Array<{ file: Blob }> = generateFileChunks(container.value.file);

    // 计算文件哈希值
    container.value.hash = (await calculateFileHash(chunkList)) as string;

    // 验证文件是否需要上传
    const { code, message, shouldUpload, uploadedList } = await verifyUpload(
        container.value.file?.name,
        container.value.hash,
    );

    if (code !== 200) {
        ElMessage.error(message);
        return;
    }

    if (!shouldUpload) {
        ElMessage.warning('文件存在');
        console.log('skip upload：file upload success');
        return;
    }

    fileChunkList.value = chunkList.map(({ file }, index) => ({
        // 文件切片
        chunk: file,
        // 切片 hash 值：文件 hash + 数组下标
        hash: `${container.value.hash}-${index}`,
        // 数组下标
        index,
        // 初始化进度
        percentage: uploadedList.includes(index) ? 100 : 0,
    }));

    // 上传
    await uploadFileChunks(uploadedList);
}

/**
 * 点击暂停
 */
function handlePause() {
    if (fileChunkRequestList.value.length === 0) {
        ElMessage.warning('没有上传任务');
        return;
    }

    fileChunkRequestList.value.forEach(xhr => xhr?.abort());
    fileChunkRequestList.value = [];
}

/**
 * 点击恢复
 */
async function handleResume() {
    // 验证文件是否需要上传
    const { code, message, shouldUpload, uploadedList } = await verifyUpload(
        container.value.file?.name as string,
        container.value.hash as string,
    );

    if (code !== 200) {
        ElMessage.error(message);
        return;
    }

    if (!shouldUpload) {
        ElMessage.warning('文件存在');
        console.log('skip upload：file upload success');
        return;
    }

    // 上传
    await uploadFileChunks(uploadedList);
}

/**
 * 点击删除
 */
async function handleDelete() {
    const { data } = await request({
        url: 'http://localhost:8000/delete',
        headers: {
            'content-type': 'application/json',
        },
        data: JSON.stringify({}),
    });

    const { code, message } = JSON.parse(data as string);

    if (code !== 200) {
        ElMessage.error(message);
        return;
    }

    ElMessage.success('删除成功');
    handleReset();
}

/**
 * 上传进度区域宽度
 */
const cubeWidth = computed(() => {
    return Math.ceil(Math.sqrt(fileChunkList.value.length)) * 20;
});
</script>
<style lang="scss" scoped>
.component {
    margin-bottom: 10px;
}

.upload-container {
    .upload {
        padding: 5px;
        border: 1px solid #eee;
    }

    .button {
        float: right;
    }
}

.cube-container {
    width: 100px;
    overflow: hidden;

    .cube {
        width: 20px;
        height: 20px;
        line-height: 20px;
        border: 1px solid black;
        background: #eee;
        float: left;

        .success {
            background: #67c23a;
        }

        .uploading {
            background: #409eff;
        }

        .text {
            font-size: 10px;
            text-align: center;
        }
    }
}
</style>
