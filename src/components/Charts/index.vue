<template>
    <div id="chart"></div>
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
        /** map-json */
        json: string;
        /** e-charts-option */
        option: EChartsCoreOption;
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

/**
 * e-charts 初始化
 */
function init() {
    chart.value = echarts.init(document.getElementById('chart'));

    props.json && registerMap('mapName', props.json);
    props.option && setOption(props.option);
}

/**
 * 注册地图
 */
function registerMap(name: string, json: string) {
    echarts.registerMap(name, json);
}

/**
 * 更新 e-charts-option
 * @param option
 * @param notMerge
 * @param lazyUpdate
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
#chart {
    width: 100%;
    height: 100%;
}
</style>
