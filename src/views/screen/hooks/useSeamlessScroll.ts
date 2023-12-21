import { onMounted, shallowRef, type Ref } from 'vue';
import anime from 'animejs/lib/anime.es.js';

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
    const animation = shallowRef<ReturnType<typeof anime> | null>(null);

    /**
     * @description 初始化
     */
    function init() {
        const isHorizontal = direction === 'horizontal';
        const translateKey = isHorizontal ? 'translateX' : 'translateY';
        const transKey = isHorizontal ? 'x' : 'y';

        const children = listRef.value?.children || [];
        if (!children.length) {
            return;
        }

        const firstEl = children[0] as HTMLElement;
        const firstDiff = (isHorizontal ? firstEl.offsetWidth : firstEl.offsetHeight) + gap;

        // 默认将 list 元素向左或向上移动一个 item 的距离
        listRef.value!.style.transform = `${translateKey}(-${firstDiff}px)`;

        let total = 0; // 总宽或总高
        const transList: Record<string, number>[] = [];

        // 设置初始位置
        anime.set(children, {
            [translateKey]: (el: HTMLElement, i: number) => {
                const distance = (isHorizontal ? el.offsetWidth : el.offsetHeight) + gap;
                total += distance;

                transList[i] = { [transKey]: total - distance };
            },
        });

        // 设置 list 容器的宽或高
        listRef.value!.style[isHorizontal ? 'width' : 'height'] = total + 'px';

        // 添加动画
        animation.value = anime({
            targets: transList,
            duration,
            easing: 'linear',
            direction: isHorizontal ? undefined : 'reverse',
            [transKey]: `+=${total}`,
            loop: true,
            update: () => {
                anime.set(children, {
                    [translateKey]: (el: HTMLElement, i: number) => {
                        return transList[i][transKey] % total;
                    },
                });
            },
        });
    }

    /**
     * @description 暂停动画
     */
    function pause() {
        animation.value!.pause();
    }

    /**
     * @description 播放
     */
    function play() {
        animation.value!.play();
    }

    onMounted(() => {
        init();
    });

    return {
        listRef,
        animation,
        pause,
        play,
    };
}
