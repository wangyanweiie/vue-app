import { onMounted, onUnmounted, type Ref, watchEffect } from 'vue';

/**
 * @description 实现拖拽功能
 * @param targetRef 目标元素
 * @param dragRef 拖拽元素
 * @param draggable 是否可拖拽
 */
export const useDraggable = (
    targetRef: Ref<HTMLElement | undefined>,
    dragRef: Ref<HTMLElement | undefined>,
    draggable: Ref<boolean>,
) => {
    // 保存偏移量
    let transform = {
        offsetX: 0,
        offsetY: 0,
    };

    /**
     * @description 鼠标按下事件
     * @param e 鼠标事件
     */
    const onMousedown = (e: MouseEvent) => {
        const downX = e.clientX;
        const downY = e.clientY;
        const { offsetX, offsetY } = transform;

        // 获取拖拽目标的位置和尺寸信息
        const targetRect = targetRef.value!.getBoundingClientRect();
        const targetTop = targetRect.top;
        const targetWidth = targetRect.width;
        const targetHeight = targetRect.height;

        // 计算拖拽目标在页面中的可移动范围
        const clientWidth = document.documentElement.clientWidth;
        const clientHeight = document.documentElement.clientHeight;

        const minLeft = -targetRect.left + offsetX;
        const minTop = -targetTop + offsetY;
        const maxLeft = clientWidth - targetRect.left - targetWidth + offsetX;
        const maxTop = clientHeight - targetTop - targetHeight + offsetY;

        /**
         * @description 鼠标移动事件
         * @param e 鼠标事件
         */
        const onMousemove = (e: MouseEvent) => {
            /**
             * 计算移动后的位置
             * offsetX + e.clientX - downX: 初始偏移量 offsetX 加上 e.clientX - downX 移动的距离得到拖拽元素在水平方向上的新位置。
             * Math.max(offsetX + e.clientX - downX, minLeft) 确保新位置大于等于最小可移动位置 minLeft，即不超出左边界
             * Math.min(..., maxLeft) 确保新位置小于等于最大可移动位置 maxLeft，即不超出右边界。这样做的目的是防止拖拽元素移出指定的范围。
             */
            const moveX = Math.min(Math.max(offsetX + e.clientX - downX, minLeft), maxLeft);
            const moveY = Math.min(Math.max(offsetY + e.clientY - downY, minTop), maxTop);

            // 更新偏移量和元素位置
            transform = {
                offsetX: moveX,
                offsetY: moveY,
            };

            targetRef.value!.style.transform = `translate(${moveX}px, ${moveY}px)`;
        };

        /**
         * @description 鼠标抬起事件
         */
        const onMouseup = () => {
            // 删除事件监听
            document.removeEventListener('mousemove', onMousemove);
            document.removeEventListener('mouseup', onMouseup);
        };

        // 监听鼠标移动和鼠标抬起事件
        document.addEventListener('mousemove', onMousemove);
        document.addEventListener('mouseup', onMouseup);
    };

    /**
     * @description 监听拖拽事件
     */
    const onDraggable = () => {
        if (dragRef.value && targetRef.value) {
            dragRef.value.addEventListener('mousedown', onMousedown);
        }
    };

    /**
     * @description 取消拖拽事件
     */
    const offDraggable = () => {
        if (dragRef.value && targetRef.value) {
            dragRef.value.removeEventListener('mousedown', onMousedown);
        }
    };

    onMounted(() => {
        watchEffect(() => {
            if (draggable.value) {
                onDraggable();
            } else {
                offDraggable();
            }
        });
    });

    onUnmounted(() => {
        offDraggable();
    });
};
