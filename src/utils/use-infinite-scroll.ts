import { nextTick, ref } from 'vue';

/**
 * @description 无限滚动
 * @param loadFn 获取数据的函数
 */
export default function useInfiniteScroll(loadFn: () => Promise<any[]>) {
    const list = ref<any[]>([]);

    /**
     * @description 加载更多
     * @returns Promise<void>
     */
    async function load(): Promise<void> {
        const res = await loadFn();

        if (!res || !Array.isArray(res)) {
            return;
        }

        list.value.push(...res);
    }

    /**
     * @description 初始化
     * @param containerEl 容器
     * @returns void
     */
    async function init(containerEl: HTMLElement) {
        // 默认填充第一页数据
        await load();

        if (!containerEl) return;

        await nextTick(() => {
            // 创建一个垫底元素（页尾栏）
            const dom = document.createElement('div');
            dom.setAttribute('id', 'loadmore');
            dom.style.height = '1px';
            dom.textContent = '';

            // 将垫底元素（页尾栏）添加到容器
            containerEl.appendChild(dom);

            /**
             * 创建观察者实例
             * IntersectionObserver 是浏览器原生提供的构造函数，接受两个参数：
             *  1. callback 是可见性变化时的回调函数；
             *  2. option 是配置对象（可选）
             *      - time：可见性发生变化的时间，是一个高精度时间戳，单位为毫秒；
             *      - target：被观察的目标元素，是一个 DOM 节点对象；
             *      - rootBounds：根元素的矩形区域的信息，getBoundingClientRect()方法的返回值，如果没有根元素（即直接相对于视口滚动），则返回 null；
             *      - boundingClientRect：目标元素的矩形区域的信息；
             *      - intersectionRect：目标元素与视口（或根元素）的交叉区域的信息；
             *      - intersectionRatio：目标元素的可见比例，即 intersectionRect 占 boundingClientRect 的比例，完全可见时为 1，完全不可见时小于等于 0；
             * 注意点：
             * IntersectionObserver API 是异步的，不随着目标元素的滚动同步触发；
             * 规格写明，IntersectionObserver的实现，应该采用 requestIdleCallback()，即只有线程空闲下来，才会执行观察器；
             * 这意味着，这个观察器的优先级非常低，只在其他任务执行完，浏览器有了空闲才会执行。
             */
            const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
                // 目标元素的可见比例
                if (entries[0].intersectionRatio === 1) {
                    load();
                }
            });

            // 开始观察垫底元素（页尾栏）
            observer.observe(dom);
        });
    }

    return {
        list,
        init,
    };
}
