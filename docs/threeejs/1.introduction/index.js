/**
 * @description three.js-demo
 * @link http://www.webgl3d.cn/
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

/**
 ** gui
 * 实例化一个 gui 对象
 * 改变交互界面 style 属性
 */
const gui = new GUI();
gui.domElement.style.right = '0px';
gui.domElement.style.width = '250px';

/**
 ** 场景
 */
const scene = new THREE.Scene();

/**
 ** 相机
 * PerspectiveCamera()
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
 * 可以通过类（构造函数）的参数设置属性或者访问对象属性改变属性的值
 * setSize() => 定义 three.js 输出画布的尺寸（单位: 像素 px）
 * setPixelRatio() => 获取屏幕设备像素比告诉 threejs，以免渲染模糊问题
 * 通过 renderer.domElement 属性可以访问 threejs 的渲染结果，也就是 HTML 的元素 canvas 画布
 */
const renderer = new THREE.WebGLRenderer({
    // 设置渲染器锯齿属性
    antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

/**
 ** 几何体
 *  - BoxGeometry：长方体
 *  - SphereGeometry：球体
 *  - CylinderGeometry：圆柱
 *  - PlaneGeometry：矩形平面
 *  - CircleGeometry：圆形平面
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
// const geometry = new THREE.SphereGeometry(1);
// const geometry = new THREE.CylinderGeometry(1,1,1);
// const geometry = new THREE.PlaneGeometry(1,1);
// const geometry = new THREE.CircleGeometry(1);

/**
 ** 材质
 * 可以通过类（构造函数）的参数设置属性或者访问对象属性改变属性的值
 *  - MeshBasicMaterial：基础材质（不受光源影响）
 *  - MeshLambertMaterial：漫反射材质
 *  - MeshPhongMaterial：高光材质
 *  - MeshStandardMaterial：物理材质
 *  - MeshPhysicalMaterial：物理材质
 */
const material = new THREE.MeshPhongMaterial({
    // 设置材质颜色
    color: 0x004bfa,
    // 开启透明
    transparent: true,
    // 设置透明度
    opacity: 1,
    // 对于矩形平面与圆形平面默认只有正面可见
    // side: THREE.FrontSide,
    // 两面可见
    // side: THREE.DoubleSide,
    // 高光部分的亮度，默认30
    // shininess: 20,
    // 高光部分的颜色
    specular: 0xff0000,
});

/**
 ** 网格模型
 * mesh.position => 设置模型 mesh 的 xyz 坐标
 * scene.add() => 把网格模型 mesh 添加到三维场景 scene 中
 *  - 默认情况下，当我们调用 scene.add() 的时候，物体将会被添加到（0,0,0）坐标，但将使得摄像机和立方体彼此在一起；
 *  - 为了防止这种情况的发生，我们需要将摄像机稍微向外移动一些：camera.position.set(0, 0, 5)；
 */
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 0, 0);
scene.add(mesh);

/**
 ** 坐标系辅助观察
 * AxesHelper() => 设置坐标系坐标轴线段尺寸大小
 */
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

/**
 ** 点光源
 * PointLight()
 *  - 0xffffff：光源颜色
 *  - 1：光照强度
 * position.set() => 设置光源的方向
 */
// const pointLight = new THREE.PointLight(0xffffff, 1, 0, 0);
// pointLight.position.set(100, 100, 100);
// scene.add(pointLight);

/**
 ** 环境光
 * 没有特定方向，整体改变场景的光照明暗
 */
// const ambient = new THREE.AmbientLight(0xffffff, 1);
// scene.add(ambient);

/**
 ** 平行光
 * target => 方向光指向对象网格模型 mesh，可以不设置，默认的位置是（0,0,0）
 */
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(50, 50, 50);
directionalLight.target = mesh;
scene.add(directionalLight);

/**
 ** 平行光辅助观察
 */
const dirLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5, 0xff0000);
scene.add(dirLightHelper);

/**
 ** 动画渲染
 * 在这里我们了一个使渲染器能够在每次屏幕刷新时对场景进行绘制的循环（在大多数屏幕上，刷新率一般默认是 60次/秒）
 * requestAnimationFrame => 当用户切换到其它的标签页时，它会暂停，因此不会浪费用户宝贵的处理器资源，也不会损耗电池的使用寿命
 */
function animate() {
    // 执行渲染操作
    renderer.render(scene, camera);

    // 每次绕 x,y 轴旋转 0.01 弧度
    // mesh.rotation.x += 0.01;
    // mesh.rotation.y += 0.01;
    mesh.rotateX(0.01);
    mesh.rotateY(0.01);

    // 请求再次执行渲染函数 animate，渲染下一帧
    requestAnimationFrame(animate);
}

animate();

/**
 ** 设置相机控件轨道控制器
 * 如果 OrbitControls 改变了相机参数，重新调用渲染器渲染三维场景
 */
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.addEventListener('change', function () {
//     renderer.render(scene, camera);
// });

/**
 ** 窗口大小调整
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
 ** gui
 * gui.addFolder => 创建子菜单
 * materialFolder => 改变 material 对象的属性
 *  - .addColor() 生成颜色值改变的交互界面
 *  - .add() 创建的交互界面，会默认显示所改变属性的名字
 *    - .name() 改变 gui 生成交互界面显示的内容
 *    - .step() 可以设置交互界面每次改变属性值间隔是多少
 */
// ==================================================================
// 材质子菜单
const materialFolder = gui.addFolder('材质');
materialFolder.addColor(material, 'color').name('颜色');
materialFolder.addColor(material, 'specular').name('高光颜色');
materialFolder
    .add(material, 'opacity', {
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
    .onChange(function (value) {
        console.log('强度', value);
    });
// ==================================================================

/**
 ** log
 */
console.log('查看材质对象', material);
console.log('查看网格模型对象', mesh);
console.log('查看当前屏幕设备像素比', window.devicePixelRatio);
