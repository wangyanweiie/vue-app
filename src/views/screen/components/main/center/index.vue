<template>
    <div class="center">
        <div class="center-chart">
            <geo-chart></geo-chart>
        </div>

        <div class="center-scroll">
            <scroll></scroll>
        </div>
    </div>
</template>

<script setup lang="ts">
import GeoChart from './components/geoChart.vue';
import scroll from './components/scroll.vue';
</script>
<style lang="scss" scoped>
.center {
    width: 1000px;

    &-chart {
        width: 100%;
        height: 800px;
    }

    &-scroll {
        width: 100%;
        height: calc(var(--screen-height) - var(--screen-pd) * 2 - var(--header-height) - 800px);
    }
}
</style>
