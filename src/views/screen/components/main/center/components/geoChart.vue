<template>
    <x-chart ref="chartRef" map-name="中华人民共和国" :map-json="china" :option="option" :callback="changeMap" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import china from '@/views/screen/json/中华人民共和国.json';
import { mapDataList } from './conf';

const chartRef = ref();
const option = ref({
    tooltip: {
        trigger: 'item',
    },
    series: [
        {
            type: 'map',
            name: 'china',
            map: '中华人民共和国',
            data: mapDataList.value.map(item => {
                return {
                    name: item.name,
                    value: Math.ceil(Math.random() * 1000 - 1),
                };
            }),
        },
    ],
    visualMap: {
        left: 'right',
        top: 'bottom',
        min: 0,
        max: 1000,
        inRange: {
            color: ['#313695', '#e0ffff'],
        },
        text: ['High', 'Low'],
        calculable: true,
    },
});

/**
 * @description 地图下钻
 * @param {Record<string, string | number>} params
 * @returns {Promise<void>}
 */
async function changeMap(params: Record<string, string | number>) {
    if (!params || !params?.name) {
        return;
    }

    // 省级地图 json
    const json = mapDataList.value.filter(item => item.name === params.name)[0]?.json;
    // 省级地图数据
    const childMapDataList = json?.features.map((item: any) => {
        return {
            name: item.properties.name,
            value: Math.ceil(Math.random() * 100 - 1),
        };
    });
    // 省级图表配置
    const childOption = {
        tooltip: {
            trigger: 'item',
        },
        series: [
            {
                type: 'map',
                map: params.name,
                data: childMapDataList,
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
        graphic: [
            {
                type: 'text',
                right: '3%',
                top: '3%',
                style: {
                    text: '返回',
                    fontSize: 16,
                    fill: '#fff',
                },
                onclick: () => {
                    chartRef.value.init('中华人民共和国', china, option.value, false, changeMap);
                },
            },
        ],
    };

    // 销毁当前渲染的图表并重新渲染
    chartRef.value.destroy();
    chartRef.value.init(params.name, json, childOption);
}
</script>
