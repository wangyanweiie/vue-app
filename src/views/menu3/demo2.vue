<template>
    <div>
        <div id="webgl"></div>
        <el-button class="button" @click="download">download</el-button>
    </div>
</template>

<script setup lang="ts">
/**
 * @description threejs-demo
 * @link http://www.webgl3d.cn/
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

/**
 ** gltf
 * 实例化 gltf 加载器对象
 */
const gltfLoader = new GLTFLoader();

/**
 ** 场景
 */
const scene = new THREE.Scene();

/**
 ** 相机
 *********************************************************
 * 类型
 *  - OrthographicCamera：正投影
 *  - PerspectiveCamera：透视投影
 *
 * 参数
 *  - 75：相机视锥体竖直方向视野角度
 *  - window.innerWidth / window.innerHeight：相机视锥体水平方向和竖直方向长度比
 *  - 1：相机视锥体近裁截面相对相机距离
 *  - 100：相机视锥体远裁截面相对相机距离
 * camera.position => 设置相机位置 xyz 坐标
 * camera.lookAt(x,y,z) => 相机观察目标指向 Threejs 3D 空间中某个位置，默认的位置是（0,0,0）
 */
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 100);
camera.position.set(0, 0, 5);
camera.lookAt(0, 0, 0);

/**
 ** 渲染器
 *********************************************************
 * 可以通过类（构造函数）的参数设置属性或者访问对象属性改变属性的值
 * setSize(m,n) => 设置 threejs 输出画布的尺寸（单位: 像素 px）
 * setPixelRatio(n) => 设置屏幕设备像素比告诉 threejs，以免渲染模糊问题
 * setClearAlpha(n) => 设置背景透明度值，0 完全透明，1 不透明
 * setClearColor(m,n) => 设置背景颜色和透明度
 * 通过 renderer.domElement 属性可以访问 threejs 的渲染结果，也就是 HTML 的元素 canvas 画布
 */
const renderer = new THREE.WebGLRenderer({
    // 设置渲染器锯齿属性
    // antialias: true,
    // 背景透明
    alpha: true,
    // 要想把 canvas 画布上内容下载到本地，需要设置为 true
    preserveDrawingBuffer: true,
    // 设置对数深度缓冲区，优化深度冲突问题，就是当两个面间距较小时，让 threejs 更容易区分两个面，谁在前，谁在后
    logarithmicDepthBuffer: true,
});

renderer.setSize(800, 400);
// renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setClearColor(0x262626, 1);
// document.body.appendChild(renderer.domElement);

/**
 ** 光源
 *********************************************************
 */
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(50, 50, 50);
scene.add(light);

/**
 ** 动画渲染
 *********************************************************
 * 在这里我们了一个使渲染器能够在每次屏幕刷新时对场景进行绘制的循环（在大多数屏幕上，刷新率一般默认是 60次/秒）
 * requestAnimationFrame => 当用户切换到其它的标签页时，它会暂停，因此不会浪费用户宝贵的处理器资源，也不会损耗电池的使用寿命
 */
function animate() {
    // 执行渲染操作
    renderer.render(scene, camera);

    // 请求再次执行渲染函数 animate，渲染下一帧
    requestAnimationFrame(animate);
}

/**
 ** 设置相机控件轨道控制器
 *********************************************************
 * controls..target.set(x,y,z) => 表示相机目标观察点，默认（0,0,0）
 * controls.update() => 函数内会执行 camera.lookAt(controls.targe)
 * controls.addEventListener('change', () => {}) => 如果 OrbitControls 改变了相机参数，重新调用渲染器渲染三维场景
 */
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();
controls.addEventListener('change', function () {
    renderer.render(scene, camera);
    // console.log('相机位置', camera.position);
});

/**
 ** loader
 * gltfLoader.load() => 就可以加载外部的 gltf 模型，会返回一个 gltf 对象
 *  - 参数一：模型路径
 *  - 参数二：加载完成函数
 *  - 参数三：加载过程函数
 *********************************************************
 */
gltfLoader.load(
    '/gltf/911/scene.gltf',
    function (gltf: any) {
        gltf.scene.traverse(function (item: any) {
            if (item.isMesh) {
                // 模型自发光
                // item.material.emissive = item.material.color;
                item.material.emissiveMap = item.material.map;
            }
        });

        scene.add(gltf.scene);
    },
    function (xhr: any) {
        const percent = xhr.loaded / xhr.total;
        console.log(percent);
    },
);

/**
 ** download
 *********************************************************
 * threejs 渲染结果以图片形式下载到本地
 */
function download() {
    const link = document.createElement('a');
    const canvas = renderer.domElement;

    link.href = canvas.toDataURL('image/png');
    link.download = 'threejs.png';
    link.click();
}

/**
 * 页面渲染
 */
onMounted(() => {
    document?.getElementById('webgl')?.appendChild(renderer.domElement);
    animate();
});
</script>

<style lang="scss" scoped>
.button {
    position: absolute;
    top: 20px;
    left: 20px;
}
</style>
