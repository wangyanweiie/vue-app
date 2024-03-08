<template>
    <div id="mapContainer"></div>
</template>

<script lang="ts" setup>
import { defaults, FullScreen, ScaleLine } from 'ol/control';
import { Tile } from 'ol/layer';
import Map from 'ol/Map';
import { fromLonLat } from 'ol/proj';
import { OSM, XYZ } from 'ol/source';
import View from 'ol/View';

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
    });
}

onMounted(() => {
    init();
});

defineExpose({
    map,
});
</script>

<style lang="scss">
@import '/node_modules/ol/ol.css';

#mapContainer {
    padding: 0px;
    margin: 0px;
    width: 100%;
    height: 100%;
}
</style>
