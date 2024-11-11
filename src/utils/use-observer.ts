import { useResizeObserver } from '@vueuse/core';
import { ref } from 'vue';

export function useObserver(componentRef?: HTMLElement | any) {
    /**
     * 组件高度
     */
    const componentHeight = ref<number>(0);

    /**
     * 监听组件高度变化
     */
    useResizeObserver(componentRef, entries => {
        const entry = entries[0];
        const { height } = entry.contentRect;

        componentHeight.value = height;
    });

    return {
        componentHeight,
    };
}
