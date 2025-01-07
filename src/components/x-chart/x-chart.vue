<template>
    <div ref="chartRef" class="chart"></div>
</template>

<script setup lang="ts">
import type { ECharts, EChartsCoreOption } from 'echarts';
import * as echarts from 'echarts';
import { onMounted, shallowRef } from 'vue';

/**
 * props
 */
const props = withDefaults(
    defineProps<{
        /** 地图名称 */
        mapName: string | undefined;
        /** 地图 json */
        mapJson: string | undefined;
        /** 图表配置 */
        option: EChartsCoreOption;
        /** 加载状态 */
        loading?: boolean;
        /** 回调函数 */
        callback?: (data: any, mapName: string, mapJson: string, option: EChartsCoreOption) => void;
    }>(),
    {
        mapName: 'mapName',
        mapJson: '',
        option: () => ({}),
        loading: false,
        callback: () => {},
    },
);

const chart = shallowRef<ECharts | null>(null);
const chartRef = shallowRef<HTMLElement | null>(null);

/**
 * @description 初始化
 * @param mapName 地图名称
 * @param mapJson 地图 json
 * @param option 图表配置
 * @param loading 加载状态
 * @param callback 点击回调
 */
function init(
    mapName: string = 'mapName',
    mapJson: string,
    option: EChartsCoreOption,
    loading?: boolean,
    callback?: (data: any, mapName: string, mapJson: string, option: EChartsCoreOption) => void,
) {
    chart.value = echarts.init(chartRef.value);

    mapJson && registerMap(mapName, mapJson);
    option && setOption(option, true);
    loading && setLoading(loading);

    callback &&
        chart.value.on('click', function (params) {
            if (!params.data) {
                return;
            }

            console.log(params.data);
            callback(params.data, mapName, mapJson, option);
        });
}

/**
 * @description 注册地图
 * @param name 地图名称
 * @param json 地图 json
 */
function registerMap(name: string, json: string) {
    echarts.registerMap(name, json);
}

/**
 * @description 设置 e-charts 配置
 * @param option e-charts 配置
 * @param notMerge 是否合并配置
 * @param lazyUpdate 是否懒加载
 */
function setOption(option: EChartsCoreOption, notMerge?: boolean, lazyUpdate?: boolean) {
    chart.value!.setOption(option, notMerge, lazyUpdate);
}

/**
 * @description 显示加载动画
 * @param loading 是否显示加载动画
 */
function setLoading(loading: boolean) {
    if (!chart.value) {
        return;
    }

    if (loading) {
        chart.value!.showLoading();
    } else {
        chart.value!.hideLoading();
    }
}

/**
 * @description 清空图表
 */
function clear() {
    if (!chart.value) {
        return;
    }

    chart.value!.clear();
}

/**
 * @description 销毁图表
 */
function destroy() {
    if (!chart.value) {
        return;
    }

    chart.value.dispose();
    chart.value = null;
}

/**
 * @description 重新渲染
 */
function resize() {
    chart.value!.resize();
}

onMounted(() => {
    init(props.mapName, props.mapJson, props.option, props.loading, props.callback);
});

defineExpose({
    chart,
    init,
    registerMap,
    setOption,
    clear,
    destroy,
    resize,
});
</script>

<style lang="scss" scoped>
.chart {
    width: 100%;
    height: 100%;
}
</style>
