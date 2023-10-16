<template>
    <div class="wrap">
        <div id="webgl"></div>

        <!-- 渲染文字 -->
        <div class="text">My first threejs app</div>

        <!-- 下载按钮 -->
        <el-button class="button" @click="download">download</el-button>

        <!-- 加载进度 -->
        <!-- <div id="container">
            <div id="per"></div>
        </div> -->
    </div>
</template>

<script setup lang="ts">
/**
 * @description threejs-demo
 * @link http://www.webgl3d.cn/
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

/**
 ** gui
 * 实例化一个 gui 对象
 * 改变交互界面 style 属性
 */
const gui = new GUI();
gui.domElement.style.right = '0px';
gui.domElement.style.width = '250px';

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
 * camera.position => 相机位置 xyz 坐标
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
    // alpha: true,
    // 要想把 canvas 画布上内容下载到本地，需要设置为 true
    preserveDrawingBuffer: true,
    // 设置对数深度缓冲区，优化深度冲突问题，就是当两个面间距较小时，让 threejs 更容易区分两个面，谁在前，谁在后
    logarithmicDepthBuffer: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x262626, 1);
// document.body.appendChild(renderer.domElement);

/**
 ** 几何体
 *********************************************************
 * 类型
 *  - BoxGeometry：长方体
 *  - SphereGeometry：球体
 *  - CylinderGeometry：圆柱
 *  - ConeGeometry：圆锥
 *  - PlaneGeometry：矩形平面
 *  - CircleGeometry：圆形平面
 *
 * 细分数：对于曲面而言，细分数越大，表面越光滑，但是三角形和顶点数量越多；三角形和顶点数量直接影响 Three.js 的渲染性能，在不影响渲染效果的情况下，越少越好
 *  - 矩形平面 PlaneGeometry 的参数 3,4 表示细分数，默认是 1,1
 *  - 球体 SphereGeometry 参数 2、3 分别代表宽、高度两个方向上的细分数，默认是 32,16
 *
 * geometry.scale(x,y,z) => 缩放
 * geometry.translate(x,y,z) => 平移
 * geometry.center() => 居中
 * geometry.rotateX(n) => 绕 x 轴旋转 n 度
 */
// const geometry = new THREE.BoxGeometry(1, 1, 1);
const geometry = new THREE.SphereGeometry(1, 48, 24);
// const geometry = new THREE.CylinderGeometry(1, 1, 1);
// const geometry = new THREE.ConeGeometry(1,1,1);
// const geometry = new THREE.PlaneGeometry(2, 2);
// const geometry = new THREE.CircleGeometry(1);
// geometry.scale(2, 2, 2);
// geometry.translate(2, 0, 0);
// geometry.rotateX(Math.PI / 2);

/**
 ** 纹理贴图器
 *********************************************************
 * texLoader.load() => 加载图像，返回一个纹理对象 Texture
 * texture.wrapS/T => 设置阵列模式
 * texture.repeat.set(m,n) => uv两个方向纹理重复数量（瓷砖效果）
 */
const texLoader = new THREE.TextureLoader();
const texture = texLoader.load('../../public/logo.png');
// texture.name = '唐僧';
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(5, 5);

/**
 ** 材质
 *********************************************************
 */
/**
 * 点材质
 */
// const pointMaterial = new THREE.PointsMaterial({
//     color: 0x004bfa,
//     size: 1,
// });

/**
 * 线材质
 */
// const lineMaterial = new THREE.LineBasicMaterial({
//     color: 0x004bfa,
// });

/**
 * 网格材质
 * 可以通过类（构造函数）的参数设置属性或者访问对象属性改变属性的值
 *  - MeshBasicMaterial：基础材质（不受光源影响）
 *  - MeshLambertMaterial：漫反射材质
 *  - MeshPhongMaterial：高光材质
 *  - MeshStandardMaterial：物理材质
 *  - MeshPhysicalMaterial：物理材质
 *
 * 占用资源和渲染表现能力：渲染表现能力越强，占用的计算机硬件资源更多
 * MeshBasicMaterial < MeshLambertMaterial < MeshPhongMaterial < MeshStandardMaterial < MeshPhysicalMaterial
 */
const meshMaterial = new THREE.MeshPhongMaterial({
    // 设置材质颜色
    // color: 0x004bfa,
    // 开启透明
    transparent: true,
    // 设置透明度
    // opacity: 1,
    // 线条模式渲染 mesh 对应的三角形数据
    // wireframe: true,

    // 平面：对于矩形平面和圆形平面默认只有正面可见
    // side: THREE.FrontSide,
    // 平面：两面可见
    side: THREE.DoubleSide,

    // 高光材质：高光部分的亮度，默认 30
    shininess: 20,
    // 高光材质：高光部分的颜色
    specular: 0xff0000,

    // 设置纹理贴图：map 表示材质的颜色贴图属性，Texture 对象作为材质 map 属性的属性值
    map: texture,

    // 金属度属性：表示材质像金属的程度，非金属材料使用 0，金属使用 1，默认 0.5
    metalness: 0,
    // 表面粗糙度：0 表示平滑的镜面反射，1 表示完全漫反射，默认 0.5
    roughness: 0,
});

/**
 ** 模型
 *********************************************************
 */
/**
 * 点模型
 */
// const point = new THREE.Points(geometry, pointMaterial);
// point.position.set(0, 0, 0);
// scene.add(point);

/**
 * 线模型
 * - Line
 * - LineLoop
 * - LineSegments
 */
// const line = new THREE.Line(geometry, lineMaterial);
// line.position.set(0, 0, 0);
// scene.add(line);

/**
 * 网格模型
 * mesh.position.set(x,y,z) => 设置模型 mesh 的 xyz 坐标
 * mesh.scale.set(x,y,z) => 模型对象的 xyz 三个方向上的缩放比例
 * scene.add() => 把网格模型 mesh 添加到三维场景 scene 中
 *  - 默认情况下，当我们调用 scene.add() 的时候，物体将会被添加到（0,0,0）坐标，但将使得摄像机和立方体彼此在一起；
 *  - 为了防止这种情况的发生，我们需要将摄像机稍微向外移动一些：camera.position.set(0, 0, 5)；
 * 几何体 geometry 作为点模型的参数，会把几何体渲染为点，而几何体作为网格模型的参数会把几何体渲染为面
 */
const mesh = new THREE.Mesh(geometry, meshMaterial);
// mesh.position.set(0, 0, 0);
// mesh.scale.set(2, 2, 2);
// scene.add(mesh);

/**
 ** 组对象
 *********************************************************
 * group.add() => 添加子对象
 * 父对象旋转缩放平移变换，子对象跟着变化
 */
const group = new THREE.Group();
// group.add(point);
// group.add(line);
group.add(mesh);
scene.add(group);

/**
 ** 光源
 *********************************************************
 */
/**
 * 点光源
 * PointLight()
 *  - 0xffffff：光源颜色
 *  - 1：光照强度
 * pointLight.position.set() => 设置光源的方向
 */
// const pointLight = new THREE.PointLight(0xffffff, 1, 0, 0);
// pointLight.position.set(50, 50, 50);
// scene.add(pointLight);

/**
 * 环境光
 * 没有特定方向，整体改变场景的光照明暗
 */
// const ambient = new THREE.AmbientLight(0xffffff, 1);
// scene.add(ambient);

/**
 * 平行光
 * target => 方向光指向对象网格模型 mesh，可以不设置，默认的位置是（0,0,0）
 */
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(50, 50, 50);
directionalLight.target = mesh;
scene.add(directionalLight);

/**
 ** 动画渲染
 *********************************************************
 * 在这里我们了一个使渲染器能够在每次屏幕刷新时对场景进行绘制的循环（在大多数屏幕上，刷新率一般默认是 60次/秒）
 * requestAnimationFrame => 当用户切换到其它的标签页时，它会暂停，因此不会浪费用户宝贵的处理器资源，也不会损耗电池的使用寿命
 */
function animate() {
    // 执行渲染操作
    renderer.render(scene, camera);

    // 设置网格模型动画：每次绕 x,y,z 轴旋转 0.01 弧度
    // mesh.rotateX(0.01);
    // mesh.rotateY(0.01);
    // mesh.rotateZ(0.01);

    // 设置纹理动画
    // texture.offset.x += 0.01;
    // texture.offset.y += 0.01;

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
 ** 辅助观察
 *********************************************************
 */
// 网格地面辅助观察
const gridHelper = new THREE.GridHelper(5, 20, 0x838383, 0x838383);
scene.add(gridHelper);

// 坐标系辅助观察：AxesHelper(n) => 设置坐标系坐标轴线段尺寸大小
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 平行光辅助观察
const dirLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1, 0xffffff);
scene.add(dirLightHelper);

/**
 ** gui 界面元素
 *********************************************************
 * gui.addFolder => 创建子菜单
 * meshMaterialFolder => 改变 meshMaterial 对象的属性
 *  - .addColor() 生成颜色值改变的交互界面
 *  - .add() 创建的交互界面，会默认显示所改变属性的名字
 *    - .name() 改变 gui 生成交互界面显示的内容
 *    - .step() 可以设置交互界面每次改变属性值间隔是多少
 */
// 网格材质子菜单
const meshMaterialFolder = gui.addFolder('网格材质');
meshMaterialFolder.addColor(meshMaterial, 'color').name('颜色');
meshMaterialFolder.addColor(meshMaterial, 'specular').name('高光颜色');
meshMaterialFolder
    .add(meshMaterial, 'opacity', {
        全透明: 0,
        半透明: 0.5,
        不透明: 1,
    })
    .name('透明度');

// 网格模型子菜单
const meshFolder = gui.addFolder('网格模型');
meshFolder.add(mesh.position, 'x', -5, 5).name('x 坐标').step(0.5);
meshFolder.add(mesh.position, 'y', -5, 5).name('y 坐标').step(0.5);
meshFolder.add(mesh.position, 'z', -5, 5).name('z 坐标').step(0.5);

// 平行光子菜单
const dirLightFolder = gui.addFolder('平行光');
dirLightFolder.add(directionalLight.position, 'x', 0, 100).name('x 坐标').step(5);
dirLightFolder.add(directionalLight.position, 'y', 0, 100).name('y 坐标').step(5);
dirLightFolder.add(directionalLight.position, 'z', 0, 100).name('z 坐标').step(5);
dirLightFolder
    .add(directionalLight, 'intensity', [0, 0.5, 1])
    .name('强度')
    .onChange(function (value: number) {
        console.log('强度', value);
    });

/**
 ** 窗口大小调整
 *********************************************************
 */
window.onresize = function () {
    // 重置渲染器输出画布 canvas 尺寸
    renderer.setSize(window.innerWidth, window.innerHeight);

    // 全屏情况下：设置观察范围长宽比 aspect 为窗口宽高比
    camera.aspect = window.innerWidth / window.innerHeight;

    // 渲染器执行 render 方法的时候会读取相机对象的投影矩阵属性 projectionMatrix
    // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
    // 如果相机的一些属性发生了变化，需要执行 updateProjectionMatrix() 方法更新相机的投影矩阵
    camera.updateProjectionMatrix();
};

/**
 ** loader
 * gltfLoader.load() => 就可以加载外部的 gltf 模型，会返回一个 gltf 对象
 *  - 参数一：模型路径
 *  - 参数二：加载完成函数
 *  - 参数三：加载过程函数
 *********************************************************
 */
// 加载进度
// const percent = document.getElementById('per');
// percent.style.width = 0.5 * 400 + 'px';
// percent.style.textIndent = 0.5 * 400 + 5 + 'px';
// percent.innerHTML = '50%';

// gltfLoader.load(
//     '../工厂.glb',
//     function (gltf) {
//         model.add(gltf.scene);
//         // 加载完成，隐藏进度条即可
//         // document.getElementById("container").style.visibility ='hidden';
//         document.getElementById('container').style.display = 'none';
//     },
//     function (xhr) {
//         const percent = xhr.loaded / xhr.total;

//         percent.style.width = percent * 400 + 'px';
//         percent.style.textIndent = percent * 400 + 5 + 'px';
//         percent.innerHTML = Math.floor(percent * 100) + '%';
//     },
// );

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
.text {
    width: 100%;
    color: aliceblue;
    position: absolute;
    top: 30px;
    left: 30px;
}

.button {
    position: absolute;
    top: 60px;
    left: 30px;
}

#container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 16px;
    border-radius: 8px;
    border: 1px solid #8e71c7;
    overflow: hidden;
}

#per {
    height: 100%;
    width: 0px;
    background: #8e71c7;
    color: #8e71c7;
    line-height: 15px;
}
</style>
