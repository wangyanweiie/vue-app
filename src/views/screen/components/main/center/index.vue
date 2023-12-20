<template>
    <div>
        <div class="container">
            <geo-chart></geo-chart>
        </div>

        <div class="scroll">
            <scroll></scroll>
        </div>
    </div>
</template>

<script setup lang="ts">
import GeoChart from './geoChart.vue';
import scroll from './scroll.vue';
</script>
<style lang="scss" scoped>
.container {
    width: 1000px;
    height: 800px;
}

.scroll {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
