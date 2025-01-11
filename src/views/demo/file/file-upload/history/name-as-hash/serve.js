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
 * 写入文件流
 * @param {*} path 目标文件路径
 * @param {*} writeStream 可写流
 * @returns
 */
const pipeStream = (path, writeStream) =>
    new Promise(resolve => {
        // 创建可读流
        const readStream = fse.createReadStream(path);

        // 文件读取完成，删除源文件
        readStream.on('end', () => {
            fse.unlinkSync(path);
            resolve();
        });

        // 将可读流传输到可写流
        readStream.pipe(writeStream);
    });

/**
 * 合并切片
 * @param {*} filePath 目标文件路径
 * @param {*} filename 文件名
 * @param {*} size 切片大小
 */
const mergeFileChunk = async (filePath, filename, size) => {
    // 获取切片目录
    const chunkDir = path.resolve(UPLOAD_DIR, `chunkDir_${filename}`);

    // 读取切片目录下的所有文件
    const chunkPaths = await fse.readdir(chunkDir);

    // 根据切片下标进行排序，否则直接读取目录的获得的顺序会错乱
    chunkPaths.sort((a, b) => a.split('-')[1] - b.split('-')[1]);

    // 并发写入文件
    await Promise.all(
        chunkPaths.map((chunkPath, index) =>
            pipeStream(
                path.resolve(chunkDir, chunkPath),

                // 根据 size 在指定位置创建可写流
                fse.createWriteStream(filePath, {
                    start: index * size,
                }),
            ),
        ),
    );

    // 合并后删除切片目录
    fse.rmdirSync(chunkDir);
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
        const [filename] = fields.filename;

        // 创建临时文件夹用于临时存储 chunk，添加 chunkDir 前缀与文件名做区分
        const chunkDir = path.resolve(UPLOAD_DIR, `chunkDir_${filename}`);

        if (!fse.existsSync(chunkDir)) {
            await fse.mkdirs(chunkDir);
        }

        // fs-extra 的 rename 方法 windows 平台会有权限问题
        // @see https://github.com/meteor/meteor/issues/7852#issuecomment-255767835

        // 移动 chunk 到临时文件夹
        await fse.move(chunk.path, `${chunkDir}/${hash}`);

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
        const { filename, size } = data;

        // 服务端根据文件名可以找到上一步创建的切片文件夹
        const filePath = path.resolve(UPLOAD_DIR, `${filename}`);

        await mergeFileChunk(filePath, filename, size);

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

        const { filename } = data;

        const filePath = path.resolve(UPLOAD_DIR, `${filename}`);

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
                }),
            );
        }
    }
});

server.listen(8000, () => console.log('listening port 8000'));
