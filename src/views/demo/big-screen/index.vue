<template>
    <div ref="screenRef" class="wrap">
        <!-- <div class="map-contain">
            <x-map></x-map>
        </div> -->

        <div ref="containerRef">
            <div v-for="item in components" :key="item.name" class="chart-contain">
                <component :is="item.component">
                    {{ item.name }}
                </component>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Chart from './components/chart.vue';
import GeoChart from './components/geoChart.vue';
import { useResize } from './utils/useResize';
import { useSortable } from './utils/useSortable';

const components = shallowRef([
    { name: 'chart', component: Chart },
    { name: 'geoChart', component: GeoChart },
]);

const { screenRef } = useResize();
const { containerRef } = useSortable(components);
</script>
<style lang="scss" scoped>
.warp {
    display: flex;
}

.map-contain {
    width: 500px;
    height: 350px;
    padding: 10px;
    margin: 10px;
    border: 1px solid #fefefe;
}

.chart-contain {
    width: 500px;
    height: 350px;
    padding: 10px;
    margin: 10px;
    border: 1px solid #fefefe;
}
</style>
