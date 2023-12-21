<template>
    <div ref="containerRef">
        <div v-for="item in components" :key="item.name" :name="item.name" class="container">
            <component :is="item.component">
                {{ item.name }}
            </component>
        </div>
    </div>
</template>

<script setup lang="ts">
import BarChart from './components/barChart.vue';
import LineChart from './components/lineChart.vue';
import PieChart from './components/pieChart.vue';
import { useSortable } from './useSortable';

const components = shallowRef([
    { name: 'BarChart', component: BarChart },
    { name: 'LineChart', component: LineChart },
    { name: 'PieChart', component: PieChart },
]);
const { containerRef } = useSortable(components);
</script>
<style lang="scss" scoped>
.container {
    width: 440px;
    height: 300px;
    background: var(--block-bg);
    margin-bottom: 15px;
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
