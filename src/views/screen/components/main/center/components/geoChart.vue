<template>
    <x-chart ref="chartRef" map-name="中华人民共和国" :map-json="china" :option="option" :callback="mapDrillDown" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import type { EChartsCoreOption } from 'echarts';
import { useScreenStore } from '@/store/screen';
import china from '@/views/screen/json/中华人民共和国.json';

const store = useScreenStore();
const chartRef = ref(); // echarts 实例
const geoLevel = ref<string>(); // 地图等级

/**
 * @description 中华人民共和国地图数据
 */
const mapDataList = china?.features?.map((item: Record<string, any>) => {
    return {
        name: item.properties.name,
        code: item.properties.adcode,
        value: Math.ceil(Math.random() * 1000 - 1),
    };
});

/**
 * @description 中华人民共和国地图配置
 */
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
            data: mapDataList,
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
 * @description 获取地区 json
 * @param {number} code 地区编码
 * @returns {Promise<any>}
 */
async function getGeoJson(code: number): Promise<any> {
    const res = await axios.get(`https://geo.datav.aliyun.com/areas_v3/bound/${code}_full.json`);

    if (res.status !== 200) {
        return '';
    }

    geoLevel.value = res.data?.features[0]?.properties?.level;
    return res.data;
}

/**
 * @description 地图下钻
 * @param {any} data 数据
 * @param {string} mapName 当前地图名称
 * @param {string} mapJson 当前地图 json
 * @param {EChartsCoreOption} option 当前图表配置
 * @returns {Promise<void>}
 */
async function mapDrillDown(data: any, mapName: string, mapJson: string, option: EChartsCoreOption): Promise<void> {
    // 当前地图级别为县级时，不再继续下钻
    if (geoLevel.value === 'district' || data.name === '台湾省') {
        return;
    }

    // 子级地图名称
    const childName = data?.name;

    // 子级地图 json
    const childJson = await getGeoJson(data?.code);

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
                map: childName,
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
                    // 销毁当前渲染的图表
                    chartRef.value.clear();
                    // 更新为上级地图的等级
                    geoLevel.value = mapJson?.features[0]?.properties?.level;
                    // 渲染上级地图
                    chartRef.value.init(mapName, mapJson, option, false, mapDrillDown);
                },
            },
        ],
    };

    // 销毁当前渲染的图表
    chartRef.value.destroy();
    // 渲染子级地图
    chartRef.value.init(childName, childJson, childOption, false, mapDrillDown);
}
</script>
