<template>
    <div ref="containerRef" class="right">
        <div v-for="item in components" :key="item.name" :name="item.name" class="right-item">
            <component :is="item.component">
                {{ item.name }}
            </component>
        </div>
    </div>
</template>

<script setup lang="ts">
import PieChart from './components/pieChart.vue';
import LineChart from './components/lineChart.vue';
import BarChart from './components/barChart.vue';
import { useSortable } from '@/views/screen/hooks/useSortable';

const components = shallowRef([
    { name: 'PieChart', component: PieChart },
    { name: 'LineChart', component: LineChart },
    { name: 'BarChart', component: BarChart },
]);
const { containerRef } = useSortable(components);
</script>
<style lang="scss" scoped>
.right {
    width: calc((var(--screen-width) - 1000px - var(--screen-pd) * 2) / 2);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    &-item {
        width: 100%;
        height: 300px;
        background: var(--block-bg);
        animation-name: slide;

        &[name='BarChart'] {
            animation-duration: 0.5s;
        }

        &[name='LineChart'] {
            animation-duration: 1s;
        }

        &[name='PieChart'] {
            animation-duration: 1.5s;
        }
    }
}

@keyframes slide {
    0% {
        transform: translateX(100%);
    }

    80% {
        transform: translateX(-20px);
    }

    100% {
        transform: translateX(0);
    }
}
</style>
