<template>
    <div>
        <el-card shadow="never" class="component">
            <input type="file" @change="handleFileChange" />

            <div class="upload">
                <el-button type="primary" :disabled="!container.file" @click="handleUpload"> 上传 </el-button>
                <el-button :disabled="!container.file" @click="handlePause"> 暂停 </el-button>
            </div>
        </el-card>

        <el-card shadow="never" class="component">
            <el-table :data="fileChunkList" border>
                <el-table-column label="chunk_hash" align="center" prop="hash" />
                <el-table-column label="chunk_size（kb）" align="center" prop="chunk.size" />
                <el-table-column label="percentage（%）" align="center" prop="percentage">
                    <template #default="{ row }">
                        <el-progress :percentage="row.percentage" />
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <el-card shadow="never" class="component">
            <el-progress :percentage="uploadPercentage" />
        </el-card>
    </div>
</template>

<script lang="ts" setup>
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
const CHUNK_SIZE = 10 * 1024 * 1024;

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
 * 选择文件
 */
function handleFileChange(e: Event) {
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
        container.value.worker = new Worker('/hash.js');
        container.value.worker.postMessage({ chunkList });
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
 * 合并请求
 */
async function mergeRequest() {
    await request({
        url: 'http://localhost:8000/merge',
        headers: {
            'content-type': 'application/json',
        },
        data: JSON.stringify({
            size: CHUNK_SIZE,
            filename: container.value.file?.name,
        }),
    });
}

/**
 * 上传切片
 */
async function uploadFileChunks() {
    const requestList = fileChunkList.value
        .map(({ chunk, hash, index }) => {
            const formData = new FormData();

            formData.append('chunk', chunk);
            formData.append('hash', hash);
            formData.append('filename', container.value.file?.name as string);

            return {
                formData,
                index,
            };
        })
        .map(({ formData, index }) =>
            request({
                url: 'http://localhost:8000',
                data: formData,
                onProgress: createProgressHandler(fileChunkList.value[index]),
                requestList: fileChunkRequestList.value,
            }),
        );

    // 并发请求
    await Promise.all(requestList);

    // 合并请求
    await mergeRequest();
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

    // 验证是否需要上传
    const { shouldUpload } = await verifyUpload(container.value.file?.name, container.value.hash);

    if (!shouldUpload) {
        console.log('skip upload：file upload success');
        return;
    }

    fileChunkList.value = chunkList.map(({ file }, index) => ({
        // 文件切片
        chunk: file,
        // 切片 hash 值：文件名 + 数组下标
        hash: `${container.value.file?.name}-${index}`,
        // 数组下标
        index,
        // 初始化进度
        percentage: 0,
    }));

    await uploadFileChunks();
}

/**
 * 点击暂停
 */
function handlePause() {
    fileChunkRequestList.value.forEach(xhr => xhr?.abort());
    fileChunkRequestList.value = [];
}
</script>
<style lang="scss" scoped>
.component {
    margin-bottom: 10px;
}

.upload {
    float: right;
}
</style>
