import { debounce } from 'lodash-es';
import { ref, onMounted, onUnmounted } from 'vue';

type ResizeType = {
    w?: number;
    h?: number;
    fullScreen?: boolean;
    delay?: number;
};

/**
 * 默认适配宽高
 */
export const width = 1920;
export const height = 1080;

/**
 * use-resize
 * @description 监听浏览器窗口变化
 * @param options 选项
 * @returns { scale: Ref<number> }
 */
export function useResize(options: ResizeType = {}) {
    const { w = width, h = height, fullScreen = false, delay = 100 } = options;

    const scale = ref(1);
    const screenRef = ref();

    function resize() {
        // 基于视口的宽高比计算缩放比例
        const scaleW = window.innerWidth / w;
        const scaleH = window.innerHeight / h;

        if (window.innerWidth / window.innerHeight > w / h) {
            // 如果浏览器的宽高比大于设计稿的宽高比，就取浏览器高度和设计稿高度之比
            scale.value = scaleH;
        } else {
            // 如果浏览器的宽高比小于设计稿的宽高比，就取浏览器宽度和设计稿宽度之比
            scale.value = scaleW;
        }

        if (fullScreen) {
            // 如果不在乎缩放失真的情况，可以设置全屏
            screenRef.value.style.transform = `scale(${scaleW}, ${scaleH})`;
        } else {
            // 否则选择适配比例缩放
            screenRef.value.style.transform = 'scale(' + scale.value + ')';
        }
    }

    const resizeDelay = debounce(resize, delay);

    onMounted(() => {
        if (screenRef.value) {
            resize();
            window.addEventListener('resize', resizeDelay);
        }
    });

    onUnmounted(() => {
        window.removeEventListener('resize', resizeDelay);
    });

    return {
        scale,
        screenRef,
    };
}
