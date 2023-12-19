import { createApp } from 'vue';
import mitt from 'mitt';
import { createPinia } from 'pinia';
import App from '@/App.vue';
import router from '@/router/index';
import dataV from '@dataview/datav-vue3';
import registerDirective from '@/directive/register';
import registerComponents from '@/components/register';
import { setPermissionRoute } from '@/store/permission';
import { setupRouterGuard } from '@/router/route-guard';

// 引入组件样式
import 'element-plus/dist/index.css';
import 'nprogress/nprogress.css';
import '@wangeditor/editor/dist/css/style.css';

(() => {
    const app = createApp(App);

    // 全局引入 ==> 按需引入
    // app.use(ElementPlus);

    // 注册状态管理器
    app.use(createPinia());

    // 注册路由
    app.use(router);

    // 注册 dataV
    app.use(dataV);

    // 注册指令
    app.use(registerDirective);

    // 注册组件
    app.use(registerComponents);

    // 赋值路由数组并动态加载路由
    setPermissionRoute();

    // 路由守卫
    setupRouterGuard(router);

    // 事件通讯
    app.config.globalProperties.$bus = mitt();

    // 挂载
    app.mount('#app');
})();
