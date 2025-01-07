const http = require('http');
const path = require('path');
const fse = require('fs-extra');
const multiparty = require('multiparty');

const server = http.createServer();

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
 * 处理 merge 请求参数
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
 * 返回已上传的所有切片名
 * @param {*} fileHash 文件 hash
 * @returns
 */
const getUploadedList = async fileHash =>
    fse.existsSync(path.resolve(UPLOAD_DIR, fileHash)) ? await fse.readdir(path.resolve(UPLOAD_DIR, fileHash)) : [];

/**
 * 写入文件流
 * @param {*} path 目标文件路径
 * @param {*} writeStream 可写流
 * @returns
 */
const pipeStream = (path, writeStream) =>
    new Promise((resolve, reject) => {
        // 创建可读流
        const readStream = fse.createReadStream(path);

        // 文件读取完成，删除源文件
        // readStream.on('end', () => {
        //     fse.unlinkSync(path);
        //     resolve();
        // });

        // 文件读取完成，删除源文件
        readStream.on('end', () => {
            fse.unlink(path, err => {
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
        const chunkDir = path.resolve(UPLOAD_DIR, `chunkDir_${fileHash}`);

        // 读取切片目录下的所有文件
        const chunkPaths = await fse.readdir(chunkDir);

        if (chunkPaths.length === 0) {
            console.warn('No chunks found in the directory.');
            return;
        }

        // 根据切片下标进行排序，否则直接读取目录的获得的顺序会错乱
        chunkPaths.sort((a, b) => a.split('-')[1] - b.split('-')[1]);

        // 并发写入文件
        // await Promise.all(
        //     chunkPaths.map((chunkPath, index) =>
        //         pipeStream(
        //             path.resolve(chunkDir, chunkPath),

        //             fse.createWriteStream(filePath, {
        //                 start: index * size,
        //             })
        //         )
        //     )
        // );

        // 顺序写入文件
        for (let i = 0; i < chunkPaths.length; i++) {
            const chunkPath = chunkPaths[i];

            await pipeStream(
                path.join(chunkDir, chunkPath),

                // 根据 size 在指定位置创建可写流
                fse.createWriteStream(filePath, {
                    start: i * size,
                }),
            );
        }

        // 合并后删除切片目录
        fse.rmdirSync(chunkDir, { recursive: true });
    } catch (error) {
        console.error('Error during file chunk merging:', error);
        throw error;
    }
};

server.on('request', async (request, respone) => {
    respone.setHeader('Access-Control-Allow-Origin', '*');
    respone.setHeader('Access-Control-Allow-Headers', '*');

    if (request.method === 'OPTIONS') {
        respone.status = 200;
        respone.end();
        return;
    }

    // 解析请求
    const multipart = new multiparty.Form();

    multipart.parse(request, async (err, fields, files) => {
        if (err) {
            return;
        }

        const [chunk] = files.chunk;
        const [hash] = fields.hash;
        const [fileHash] = fields.fileHash;

        // 创建临时文件夹用于临时存储 chunk，添加 chunkDir 前缀与文件名做区分
        const chunkDir = path.resolve(UPLOAD_DIR, `chunkDir_${fileHash}`);

        if (!fse.existsSync(chunkDir)) {
            await fse.mkdirs(chunkDir);
        }

        // fs-extra 的 rename 方法 windows 平台会有权限问题
        // @see https://github.com/meteor/meteor/issues/7852#issuecomment-255767835

        // 移动 chunk 到临时文件夹，覆盖写
        await fse.move(chunk.path, `${chunkDir}/${hash}`, { overwrite: true });

        respone.end(
            JSON.stringify({
                code: 200,
                message: 'received file chunk',
            }),
        );
    });

    // 合并请求
    if (request.url === '/merge') {
        // 处理 merge 请求参数
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

    // 验证请求：文件秒传（障眼法，实质上根本没有上传）
    if (request.url === '/verify') {
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
});

server.listen(8000, () => console.log('listening port 8000'));
