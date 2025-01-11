const path = require('path');
const fse = require('fs-extra');
const multiparty = require('multiparty');

/**
 * 存储文件的临时文件夹
 */
const UPLOAD_DIR = path.resolve(__dirname, '..', 'target');

/**
 * 提取文件后缀
 * @param {*} filename 文件名
 * @returns 文件后缀
 */
const extractExt = filename => filename.slice(filename.lastIndexOf('.'), filename.length);

/**
 * 处理请求数据
 * @param {*} request
 */
const handleRequest = request =>
    new Promise(resolve => {
        let params = '';

        request.on('data', data => {
            params = data;
        });

        request.on('end', () => {
            resolve(JSON.parse(params));
        });
    });

/**
 * 获取 chunk 存储目录
 * @param {*} fileHash 文件 hash
 * @returns chunk 存储目录
 */
const getChunkDir = fileHash => path.resolve(UPLOAD_DIR, `chunkDir_${fileHash}`);

/**
 * 返回已上传的所有切片名
 * @param {*} fileHash 文件 hash
 * @returns
 */
const getUploadedList = async fileHash =>
    fse.existsSync(getChunkDir(fileHash)) ? await fse.readdir(getChunkDir(fileHash)) : [];

/**
 * 写入文件流
 * @param {*} chunkPath 目标文件路径
 * @param {*} writeStream 可写流
 * @returns
 */
const pipeStream = (chunkPath, writeStream) =>
    new Promise((resolve, reject) => {
        // 创建可读流
        const readStream = fse.createReadStream(chunkPath);

        // 文件读取完成，删除源文件
        readStream.on('end', () => {
            fse.unlink(chunkPath, err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

        // 将可读流传输到可写流
        readStream.pipe(writeStream);
    });

/**
 * 合并切片
 * @param {*} filePath 目标文件路径
 * @param {*} fileHash 文件 hash
 * @param {*} size 切片大小
 */
const mergeFileChunk = async (filePath, fileHash, size) => {
    try {
        // 获取切片目录
        const chunkDir = getChunkDir(fileHash);

        // 读取切片目录下的所有文件
        const chunks = await fse.readdir(chunkDir);

        if (chunks.length === 0) {
            console.warn('No chunks found in the directory.');
            return;
        }

        // 根据切片下标进行排序，否则直接读取目录的获得的顺序会错乱
        chunks.sort((a, b) => a.split('-')[1] - b.split('-')[1]);

        // FIXME: 并发写入文件
        await Promise.all(
            chunks.map((chunk, i) => {
                const chunkPath = path.join(chunkDir, chunk);

                // 根据 size 在指定位置创建可写流
                const writeStream = fse.createWriteStream(filePath, {
                    start: i * size,
                });

                return pipeStream(chunkPath, writeStream);
            }),
        );

        // 合并后删除切片目录
        fse.rmSync(chunkDir, { recursive: true });
    } catch (error) {
        console.error('Error during file chunk merging:', error);
        throw error;
    }
};

/**
 * 导出工具类
 */
module.exports = class {
    /**
     * 处理切片
     * @param {*} request 请求
     * @param {*} respone 响应
     */
    async handleChunk(request, respone) {
        const multipart = new multiparty.Form();

        multipart.parse(request, async (err, fields, files) => {
            if (err) {
                respone.status = 500;
                respone.end('process file chunk failed');
                return;
            }

            const [chunk] = files.chunk;
            const [hash] = fields.hash;
            const [filename] = fields.filename;
            const [fileHash] = fields.fileHash;

            // 文件路径
            const ext = extractExt(filename);
            const filePath = path.resolve(UPLOAD_DIR, `${fileHash}${ext}`);

            // 切片目录路径
            const chunkDir = getChunkDir(fileHash);
            const chunkPath = path.resolve(chunkDir, hash);

            // 文件存在直接返回
            if (fse.existsSync(filePath)) {
                respone.end('file exist');
                return;
            }

            // 切片存在直接返回
            if (fse.existsSync(chunkPath)) {
                respone.end('chunk exist');
                return;
            }

            // 切片目录不存在，创建切片目录
            if (!fse.existsSync(chunkDir)) {
                await fse.mkdirs(chunkDir);
            }

            // fs-extra 的 rename 方法 windows 平台会有权限问题
            // use fs.move instead of fs.rename
            // https://github.com/meteor/meteor/issues/7852#issuecomment-255767835

            // 移动 chunk 到临时文件夹，覆盖写
            await fse.move(chunk.path, path.resolve(chunkDir, hash), { overwrite: true });

            respone.end(
                JSON.stringify({
                    code: 200,
                    message: 'received file chunk',
                }),
            );
        });
    }

    /**
     * 合并切片
     * @param {*} request 请求
     * @param {*} respone 响应
     */
    async handleMergeChunk(request, respone) {
        // 处理请求数据
        const data = await handleRequest(request);

        // 获取文件名与切片大小
        const { size, filename, fileHash } = data;

        // 服务端根据文件名可以找到上一步创建的切片文件夹
        const ext = extractExt(filename);
        const filePath = path.resolve(UPLOAD_DIR, `${fileHash}${ext}`);

        await mergeFileChunk(filePath, fileHash, size);

        respone.end(
            JSON.stringify({
                code: 200,
                message: 'file merged success',
            }),
        );
    }

    /**
     * 验证上传：文件秒传（障眼法，实质上根本没有上传）
     * @param {*} request 请求
     * @param {*} respone 响应
     */
    async handleVerifyUpload(request, respone) {
        // 处理请求数据
        const data = await handleRequest(request);

        const { filename, fileHash } = data;

        const ext = extractExt(filename);
        const filePath = path.resolve(UPLOAD_DIR, `${fileHash}${ext}`);

        if (fse.existsSync(filePath)) {
            respone.end(
                JSON.stringify({
                    code: 200,
                    shouldUpload: false,
                }),
            );
        } else {
            respone.end(
                JSON.stringify({
                    code: 200,
                    shouldUpload: true,
                    uploadedList: await getUploadedList(fileHash),
                }),
            );
        }
    }

    /**
     * 删除文件
     * @param {*} request 请求
     * @param {*} respone 响应
     */
    async handleDeleteFile(request, respone) {
        await fse.remove(path.resolve(UPLOAD_DIR));

        respone.end(
            JSON.stringify({
                code: 200,
                message: 'file delete success',
            }),
        );
    }
};
