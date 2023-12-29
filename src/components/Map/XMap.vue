<template>
    <div id="mapContainer"></div>
</template>

<!-- <script setup lang="ts">
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
</script> -->

<script lang="ts" setup>
import Map from 'ol/Map';
import View from 'ol/View';
import Tile from 'ol/layer/Tile';
import { XYZ, OSM } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import Overlay from 'ol/Overlay';
import { defaults, FullScreen, ScaleLine, MousePosition } from 'ol/control';
import { defaults as defaultInteractions, DragRotateAndZoom } from 'ol/interaction';

/**
 * 地图实例
 */
const map = shallowRef();

/**
 * 初始化地图
 */
function init() {
    // 创建地图实例
    map.value = new Map({
        // 指定地图绘制的容器 id
        target: 'mapContainer',
        // 图层
        layers: [
            new Tile({
                // 使用内置的 OSM 图层
                // source: new OSM(),
                // 使用高德地图的图层
                source: new XYZ({
                    // url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                    url: 'https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
                }),
            }),
        ],

        // 可视区域
        view: new View({
            // 默认地图中心点
            center: fromLonLat([120.771441, 30.756433]),
            // 默认缩放级别
            zoom: 4,
            // 最小缩放级别
            minZoom: 0,
            // 最大缩放级别
            maxZoom: 15,
            // 因为存在非整数的缩放级别，所以设置该参数为 true 来让每次缩放结束后自动缩放到距离最近的一个整数级别，这个必须要设置，当缩放在非整数级别时地图会糊
            constrainResolution: true,
        }),

        // 地图控件
        controls: defaults().extend([
            // 全屏
            new FullScreen(),
            // 显示比例尺
            new ScaleLine(),
            // 显示鼠标当前位置的经纬度
            // new MousePosition(),
        ]),

        // 按住 shift 键旋转地图
        // interactions: defaultInteractions().extend([new DragRotateAndZoom()]),
    });

    map.value.on('rendercomplete', () => {
        console.log('渲染完成');
    });

    map.value.on('click', (e: any) => {
        console.log('地图点击', e.coordinate);
        // handleClick(e.coordinate);
    });
}

/**
 * handle-click
 */
function handleClick(coordinate: number[]) {
    // 你可以给元素添加任意的内容或属性或样式，也可以给元素绑定事件
    const el = document.createElement('div');
    const marker = new Overlay({
        // 要显示的元素
        element: el,
        // 地图投影的位置
        position: fromLonLat([coordinate[0], coordinate[1]], 'EPSG:4326'),
        // 元素显示的像素偏移量
        offset: [-17, -17],
        // 自动移动地图以完整的显示元素
        autoPan: true,
    });

    // 添加到地图
    map.value.addOverlay(marker);

    // 从地图上删除
    // map.value.removeOverlay(marker);
}

onMounted(() => {
    init();
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
