<template>
    <x-chart ref="chartRef" :map-json="chinaJson" :option="option" :callback="geoChartJson" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import chinaJson from '@/views/screen/json/中华人民共和国.json';
import { dataList } from './conf';

const chartRef = ref();
const option = ref({
    tooltip: {
        trigger: 'item',
    },
    series: [
        {
            type: 'map',
            name: 'china',
            map: 'mapName',
            data: dataList.value.map(item => {
                return {
                    name: item.name,
                    value: Math.ceil(Math.random() * 100 - 1),
                };
            }),
        },
    ],
    visualMap: {
        left: 'right',
        top: 'bottom',
        min: 0,
        max: 100,
        inRange: {
            color: ['#313695', '#e0ffff'],
        },
        text: ['High', 'Low'],
        calculable: true,
    },
});

async function geoChartJson(params: Record<string, string | number>) {
    const json = dataList.value.filter(item => item.name === params.name)[0]?.json;
    chartRef.value.registerMap(params.name, json);
}
</script>
