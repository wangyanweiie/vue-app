<template>
    <div>
        <div id="webgl"></div>

        <el-button class="button" @click="download">download</el-button>
    </div>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

/**
 * gltf
 */
const gltfLoader = new GLTFLoader();

/**
 * 场景
 */
const scene = new THREE.Scene();

/**
 * 相机
 */
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 100);
camera.position.set(0, 0, 5);
camera.lookAt(0, 0, 0);

/**
 * 渲染器
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
// document.body.appendChild(renderer.domElement);

/**
 * 光源
 */
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(50, 50, 50);
scene.add(light);

/**
 * 动画渲染
 */
function animate() {
    // 执行渲染操作
    renderer.render(scene, camera);

    // 请求再次执行渲染函数 animate，渲染下一帧
    requestAnimationFrame(animate);
}

/**
 * 设置相机控件轨道控制器
 */
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();
controls.addEventListener('change', function () {
    renderer.render(scene, camera);
    // console.log('相机位置', camera.position);
});

/**
 * loader
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
 * download
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
