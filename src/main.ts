import { createApp } from 'vue';
import mitt from 'mitt';
import { createPinia } from 'pinia';
import App from '@/App.vue';
import router from '@/router/index';
import { setupRouterGuard } from '@/router/route-guard';
import { usePermission } from '@/store/permission';
import permission from '@/directive/permission';
import { registerComponents } from '@/components/register';

import 'element-plus/dist/index.css';

(() => {
    const app = createApp(App);

    // 注册状态管理器
    app.use(createPinia());

    // 注册路由
    app.use(router);

    // 注册权限指令
    app.use(permission);

    // 注册 UI
    // app.use(ElementPlus);

    // 统一注册组件
    registerComponents(app);

    // 设置路由权限
    usePermission();

    // 路由守卫
    setupRouterGuard(router);

    // 事件通讯
    app.config.globalProperties.$bus = mitt();

    // 挂载
    app.mount('#app');
})();
