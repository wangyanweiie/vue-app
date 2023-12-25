import { onMounted, shallowRef, type Ref } from 'vue';
import animejs from 'animejs/lib/anime.es.js';

export type OptionsType = {
    direction?: 'horizontal' | 'vertical';
    gap?: number;
    duration?: number;
};

/**
 * @description 无缝滚动
 * @param listRef 滚动列表的 ref
 * @param options.direction 滚动方向
 * @param options.gap 滚动间隔
 * @param options.duration 动画持续时间
 */
export function useSeamlessScroll(listRef: Ref<HTMLElement | null>, options: OptionsType = {}) {
    const { direction = 'horizontal', gap = 10, duration = 20000 } = options;
    const animation = shallowRef<ReturnType<typeof animejs> | null>(null);

    /**
     * @description 初始化
     */
    function init() {
        const isHorizontal = direction === 'horizontal';
        const translateKey = isHorizontal ? 'translateX' : 'translateY';
        const transKey = isHorizontal ? 'x' : 'y';

        // 获取 list 元素的子元素
        const children = listRef.value?.children || [];

        if (!children.length) {
            return;
        }

        // 获取首个元素的宽度或者高度
        const firstEl = children[0] as HTMLElement;
        const firstDiff = (isHorizontal ? firstEl.offsetWidth : firstEl.offsetHeight) + gap;

        // 默认将 list 元素向左或向上移动一个 item 的距离
        listRef.value!.style.transform = `${translateKey}(-${firstDiff}px)`;

        // 总宽或总高
        let total = 0;
        const transList: Record<string, number>[] = [];

        // 计算每个元素的初始位置
        animejs.set(children, {
            [translateKey]: (el: HTMLElement, i: number) => {
                const distance = (isHorizontal ? el.offsetWidth : el.offsetHeight) + gap;
                total += distance;

                transList[i] = { [transKey]: total - distance };
            },
        });

        // 如果是水平滚动，则设置容器宽度；如果是垂直滚动，则设置容器高度
        listRef.value!.style[isHorizontal ? 'width' : 'height'] = total + 'px';

        // 添加动画
        animation.value = animejs({
            // 动画目标
            targets: transList,
            // 动画持续时间
            duration,
            // 动画缓动
            easing: 'linear',
            // 动画方向
            direction: isHorizontal ? undefined : 'reverse',
            // 动画循环
            loop: true,
            [transKey]: `+=${total}`,
            update: () => {
                // 更新每个元素的位置
                animejs.set(children, {
                    [translateKey]: (el: HTMLElement, i: number) => {
                        return transList[i][transKey] % total;
                    },
                });
            },
        });
    }

    /**
     * @description 开始动画
     */
    function play() {
        animation.value!.play();
    }

    /**
     * @description 暂停动画
     */
    function pause() {
        animation.value!.pause();
    }

    onMounted(() => {
        init();
    });

    return {
        listRef,
        animation,
        play,
        pause,
    };
}
