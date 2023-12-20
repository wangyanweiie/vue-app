<template>
    <div ref="chartRef" class="chart"></div>
</template>

<script setup lang="ts">
import { onMounted, shallowRef, watch } from 'vue';
import * as echarts from 'echarts';
import type { ECharts, EChartsCoreOption } from 'echarts';

/**
 * 定义组件选项
 */
defineOptions({
    name: 'XChart',
});

/**
 * props
 */
const props = withDefaults(
    defineProps<{
        /** e-charts-option */
        option: EChartsCoreOption;
        /** map-json */
        json?: string;
        /** loading */
        loading?: boolean;
    }>(),
    {
        json: '',
        option: () => ({}),
        loading: false,
    },
);

const chart = shallowRef<ECharts | null>(null);
const chartRef = shallowRef<HTMLElement | null>(null);

/**
 * e-charts 初始化
 */
function init() {
    chart.value = echarts.init(chartRef.value);

    props.json && registerMap('mapName', props.json);
    props.option && setOption(props.option);
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
 * 更新 e-charts 尺寸
 */
function resize() {
    chart.value!.resize();
}

watch(
    () => props.json,
    () => {
        registerMap('mapName', props.json);
    },
);

watch(
    () => props.option,
    () => {
        setOption(props.option);
    },
);

watch(
    () => props.loading,
    newValue => {
        if (!chart.value) {
            return;
        }

        if (newValue) {
            chart.value!.showLoading();
        } else {
            chart.value!.hideLoading();
        }
    },
);

onMounted(() => {
    init();
});

defineExpose({
    chart,
    registerMap,
    setOption,
    resize,
});
</script>

<style lang="scss" scoped>
.chart {
    width: 100%;
    height: 100%;
}
</style>
