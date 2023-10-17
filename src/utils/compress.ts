import { createReadStream, createWriteStream, rmSync } from 'node:fs';
import { createGzip, createUnzip } from 'node:zlib';
import { pipeline } from 'node:stream';
import { promisify } from 'node:util';
import archiver from 'archiver';

const pipe = promisify(pipeline);

/**
 * 压缩
 * @param input
 * @param output
 */
async function do_gzip(input: string, output: string) {
    const source = createReadStream(input);
    const gzip = createGzip();
    const destination = createWriteStream(output);
    await pipe(source, gzip, destination);
}

/**
 * 解压
 * @param input
 * @param output
 */
async function do_unzip(input: string, output: string) {
    const source = createReadStream(input);
    const unzip = createUnzip();
    const destination = createWriteStream(output);
    await pipe(source, unzip, destination);
}

/**
 * 把目录归档成一个 .tar 文件
 * @param source
 * @param target
 * @param success
 */
function tar(source: string, target: string, success: any) {
    // 创建一个文件以将存档数据流式传输到其中
    const output = createWriteStream(target);
    const archive = archiver('tar', {
        zlib: {
            // 设置压缩等级
            level: 9,
        },
    });

    // 当写入所有归档数据时
    output.on('close', function () {
        success && success();
    });

    // 当数据源被耗尽时
    output.on('end', function () {});

    // 捕获警告
    archive.on('warning', function (err: any) {
        if (err.code === 'ENOENT') {
        } else {
            throw err;
        }
    });

    // 捕获错误
    archive.on('error', function (err: any) {
        throw err;
    });

    // 通过管道将存档数据传输到文件
    archive.pipe(output);

    // 从子目录追加文件并在存档中将其命名为 'source'
    archive.directory(source, source);

    // 完成存档
    archive.finalize();
}

/**
 * 压缩打包目录
 * @param source
 */
export function compress(source: string) {
    // 压缩文件
    const target = `${source}.tar`;
    const gz = `${source}/${source}.tar.gz`;

    // 1. 打包成 tar
    tar(source, target, () => {
        // 2. 打包成 gz
        do_gzip(target, gz)
            .then(() => {
                // 3. 删除 .tar 文件
                rmSync(target);
            })
            .catch(err => {
                console.error('An error occurred:', err);
                process.exitCode = 1;
            });
    });
}
