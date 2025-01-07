/**
 * 下载文件流
 * @param res 文件流
 * @param type 文件类型
 * @param filename 文件名称
 */
export const downloadFileStream = (res: any, type: string, filename?: string) => {
    // 创建 blob 对象，解析流数据
    const blob = new Blob([res], {
        /**
         * 设置返回的文件类型
         * @see https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types
         * pdf：'application/pdf; charset=UTF-8'
         * word：'msword'
         * excel：'excel'
         * zip：'application/zip'
         */
        type: type,
    });

    // 这里就是创建一个 a 标签，等下用来模拟点击事件
    const a = document.createElement('a');

    // 兼容 webkix 浏览器，处理 webkit 浏览器中 href 自动添加 blob 前缀，默认在浏览器打开而不是下载
    const URL = window.URL || window.webkitURL;

    // 根据解析后的 blob 对象创建 URL 对象
    const href = URL.createObjectURL(blob);

    // 下载链接
    a.href = href;

    // 下载文件名，如果后端没有返回，可以自己写 a.download = '文件.pdf'
    if (filename) {
        a.download = filename;
    }

    document.body.appendChild(a);

    // 点击 a 标签，进行下载
    a.click();

    // 在内存中移除 URL 对象
    document.body.removeChild(a);

    window.URL.revokeObjectURL(href);
};
