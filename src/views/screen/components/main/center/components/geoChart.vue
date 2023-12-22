<template>
    <x-chart ref="chartRef" map-name="中华人民共和国" :map-json="china" :option="option" :callback="mapDrillDown" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { EChartsCoreOption } from 'echarts';
import { useScreenStore } from '@/store/screen';
import china from '@/views/screen/json/中华人民共和国.json';
import { mapDataList } from './conf';

const store = useScreenStore();

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
            // 当前视角的缩放比例
            zoom: 1.1,
            // 是否开启鼠标缩放和平移漫游，默认不开启，若想要开启缩放或者平移，可以设置成 'scale' 或者 'move'；设置成 true 为都开启
            roam: 'scale',
            data: mapDataList.value.map(item => {
                return {
                    ...item,
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
 * @param {any} data 数据
 * @param {string} mapName 当前地图名称
 * @param {string} mapJson 当前地图 json
 * @param {EChartsCoreOption} option 当前图表配置
 * @returns {Promise<void>}
 */
async function mapDrillDown(data: any, mapName: string, mapJson: string, option: EChartsCoreOption): Promise<void> {
    if (!data || !data?.name) {
        return;
    }

    // 子级地图 json
    const childJson = mapDataList.value.filter(item => item.name === data.name)[0]?.json;

    if (!childJson) {
        return;
    }

    // 子级地图数据
    const childMapDataList = childJson?.features?.map((item: Record<string, any>) => {
        return {
            name: item.properties.name,
            code: item.properties.adcode,
            value: Math.ceil(Math.random() * 100 - 1),
        };
    });
    // 子级图表配置
    const childOption = {
        tooltip: {
            trigger: 'item',
        },
        series: [
            {
                type: 'map',
                map: data.name,
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
        // 添加返回按钮
        graphic: [
            {
                type: 'text',
                right: '3%',
                top: '3%',
                style: {
                    text: '返回上级',
                    fontSize: 16,
                    fill: store.theme === 'dark' ? '#eee' : '#161522',
                },
                onclick: () => {
                    // 重新渲染当前（上级）地图
                    chartRef.value.init(mapName, mapJson, option, false, mapDrillDown);
                },
            },
        ],
    };

    // 销毁当前渲染的图表并重新渲染
    chartRef.value.destroy();
    chartRef.value.init(data.name, childJson, childOption, false, mapDrillDown);
}
</script>
