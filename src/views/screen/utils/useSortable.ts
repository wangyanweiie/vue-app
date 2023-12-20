import { ref, onMounted, type Ref } from 'vue';
import Sortable from 'sortablejs';

/**
 * @description 初始化排序
 * @param listRef 列表容器
 * @returns 排序容器
 */
export function useSortable(listRef: Ref<any[]>) {
    const containerRef = ref();

    function init() {
        Sortable.create(containerRef.value!, {
            swapThreshold: 1,
            animation: 150,
            onUpdate: (e: { oldIndex: number; newIndex: number }) => {
                const item = listRef.value[e.oldIndex];

                listRef.value.splice(e.oldIndex, 1);
                listRef.value.splice(e.newIndex, 0, item);
            },
        });
    }

    onMounted(() => {
        init();
    });

    return {
        containerRef,
    };
}
