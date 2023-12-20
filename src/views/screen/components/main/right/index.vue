<template>
    <div ref="containerRef">
        <div v-for="item in components" :key="item.name" class="container">
            <component :is="item.component">
                {{ item.name }}
            </component>
        </div>
    </div>
</template>

<script setup lang="ts">
import BarChart from './barChart.vue';
import LineChart from './lineChart.vue';
import PieChart from './pieChart.vue';
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
}
</style>
