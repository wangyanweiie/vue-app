/**
 * 异步加载 JavaScript 文件。
 * @param src 要加载的 JavaScript 文件的 URL。
 * @param clearCache 是否在 src 中添加时间戳参数以清除缓存，默认为 false。
 */
export function loadJS(src: string, clearCache = false) {
    // 创建一个新的 Promise，通过动态创建 script 元素并设置其属性来加载 JavaScript 文件
    new Promise<HTMLScriptElement>((resolve, reject) => {
        // 创建 script 元素
        const script = document.createElement('script', {});
        script.type = 'text/javascript';

        // 处理清除缓存逻辑
        if (clearCache) {
            script.src = src + '?t=' + new Date().getTime();
        } else {
            script.src = src;
        }

        // 统一的事件处理函数，以减少代码重复
        const handleEvent = (event: Event) => {
            // 根据事件类型执行相应操作
            if (event.type === 'load') {
                resolve(script);
            } else if (event.type === 'error') {
                const errorMsg = `Failed to load script: ${src}`;
                reject(new Error(errorMsg));
            }
        };

        // 监听脚本加载成功或失败事件
        if (script.addEventListener) {
            script.addEventListener('load', handleEvent);
            script.addEventListener('error', handleEvent);
        }

        // 将 script 元素添加到文档头部
        document.head.appendChild(script);
    });
}

/**
 * 动态加载 CSS 文件到当前页面
 * @param src CSS 文件的 URL 地址
 */
export function loadCSS(src: string) {
    // 创建一个 link 元素
    const file = document.createElement('link');

    // 设置 link 元素的属性为 CSS 样式表
    file.setAttribute('rel', 'stylesheet');
    file.setAttribute('type', 'text/css');

    // 设置 CSS 文件的路径
    file.setAttribute('href', src);

    // 添加错误处理
    file.onerror = () => {
        console.error('Failed to load CSS file:', src);
    };

    // 将 link 元素添加到文档头部
    document.head.appendChild(file);
}
