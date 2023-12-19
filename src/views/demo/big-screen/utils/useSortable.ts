import { ref, onMounted, type Ref } from 'vue';
import Sortable from 'sortablejs';

export const useSortable = (listRef: Ref<any[]>) => {
    const containerRef = ref();

    function init() {
        Sortable.create(containerRef.value!, {
            swapThreshold: 1,
            animation: 150,
            onUpdate: (e: any) => {
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
};
