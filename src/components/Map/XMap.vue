<template>
    <div id="mapContainer"></div>
</template>

<script setup lang="ts">
import { onMounted, shallowRef } from 'vue';
import '@amap/amap-jsapi-types';
import AMapLoader from '@amap/amap-jsapi-loader';

const map = shallowRef<AMap.Map | null>(null);

function init() {
    AMapLoader.load({
        // 申请好的 Web 端开发者 Key，首次调用 load 时必填
        key: '9bb0c23f3ee80c3409b9dd5f8dabfa94',
        // 指定要加载的 JS API 的版本，缺省时默认为 1.4.15
        version: '2.0',
        // 需要使用的的插件列表
        plugins: ['AMap.ToolBar', 'AMap.Scale'],
    })
        .then((MyAMap: typeof AMap) => {
            map.value = new MyAMap.Map('mapContainer', {
                // 设置地图的显示样式
                mapStyle: 'amap://styles/darkblue',
                // 设置地图模式
                viewMode: '2D',
                // 设置地图级别
                // zoom: 11,
                // 设置地图中心点位置
                // center: [116.397428, 39.90923],
            });

            // 创建插件实例
            const toolbar = new MyAMap.ToolBar();
            const scale = new MyAMap.Scale();

            // 将插件添加到页面
            map.value.addControl(toolbar);
            map.value.addControl(scale);
        })
        .catch((e: any) => {
            console.log(e);
        });
}

onMounted(() => {
    init();
});

onUnmounted(() => {
    map.value?.destroy();
});

defineExpose({
    map,
});
</script>

<style lang="scss">
#mapContainer {
    padding: 0px;
    margin: 0px;
    width: 100%;
    height: 100%;
}
</style>
