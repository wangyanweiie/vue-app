/**
 * 导入脚本
 */
self.importScripts('/public/spark-md5.min.js');

/**
 * 生成文件 hash
 * @param {*} e
 */
self.onmessage = (e) => {
    // 获取文件切片列表
    const { chunkList } = e.data;

    const spark = new self.SparkMD5.ArrayBuffer();

    let percentage = 0;
    let count = 0;

    const loadNext = (index) => {
        const reader = new FileReader();

        reader.readAsArrayBuffer(chunkList[index].file);

        reader.onload = (e) => {
            count++;

            spark.append(e.target.result);

            if (count === chunkList.length) {
                self.postMessage({
                    percentage: 100,
                    hash: spark.end(),
                });

                self.close();
            } else {
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
