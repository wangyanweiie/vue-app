/**
 * 导入脚本
 */
self.importScripts('/public/worker/spark-md5.min.js');

/**
 * 监听 postMessage，计算文件 hash
 * @param {*} e
 */
self.onmessage = e => {
    // 获取文件切片列表
    const { chunkList } = e.data;

    // 创建 SparkMD5 对象
    const spark = new self.SparkMD5.ArrayBuffer();

    let percentage = 0;
    let count = 0;

    // 遍历文件切片，计算 hash
    const loadNext = index => {
        const reader = new FileReader();

        // 读取文件切片
        reader.readAsArrayBuffer(chunkList[index].file);

        // 读取文件切片完成
        reader.onload = e => {
            count++;

            spark.append(e.target.result);

            if (count === chunkList.length) {
                // 发送计算进度和 hash
                self.postMessage({
                    percentage: 100,
                    hash: spark.end(),
                });

                // 关闭线程
                self.close();
            } else {
                // 更新计算进度
                percentage += 100 / chunkList.length;

                self.postMessage({
                    percentage,
                });

                loadNext(count);
            }
        };
    };

    loadNext(0);
};
