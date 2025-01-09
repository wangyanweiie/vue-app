/**
 * 文件上传
 * @link https://juejin.cn/post/6844904046436843527#heading-23
 * @description
 * * 1.大文件上传
 * - 前端上传大文件时使用 Blob.prototype.slice 将文件切片，并发上传多个切片，最后发送一个合并的请求通知服务端合并切片；
 * - 服务端接收切片并存储，收到合并请求后使用流将切片合并到最终文件；
 * - 原生 XMLHttpRequest 的 upload.onprogress 对切片上传进度的监听；
 * - 使用 Vue 计算属性根据每个切片的进度算出整个文件的上传进度；
 *
 * * 2.断点续传
 * - 使用 spark-md5 根据文件内容算出文件 hash；
 * - 通过 hash 可以判断服务端是否已经上传该文件，从而直接提示用户上传成功（秒传）；
 * - 通过 XMLHttpRequest 的 abort 方法暂停切片的上传；
 * - 上传前服务端返回已经上传的切片名，前端跳过这些切片的上传；
 */
const http = require('http');
const Controller = require('./controller');

const server = http.createServer();
const controller = new Controller();

server.on('request', async (request, respone) => {
    respone.setHeader('Access-Control-Allow-Origin', '*');
    respone.setHeader('Access-Control-Allow-Headers', '*');

    if (request.method === 'OPTIONS') {
        respone.status = 200;
        respone.end();
        return;
    }

    // 切片上传
    if (request.url === '/') {
        await controller.handleChunk(request, respone);
    }

    // 合并切片
    if (request.url === '/merge') {
        await controller.handleMergeChunk(request, respone);
        return;
    }

    // 验证上传
    if (request.url === '/verify') {
        await controller.handleVerifyUpload(request, respone);
        return;
    }

    // 删除文件
    if (request.url === '/delete') {
        await controller.handleDeleteFile(request, respone);
    }
});

server.listen(8000, () => console.log('listening port 8000'));
