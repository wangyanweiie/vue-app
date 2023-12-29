import { type App, defineAsyncComponent } from 'vue';

/**
 * @description 导入组件
 */
const components = import.meta.glob('./**/*.vue');

/**
 * @description 注册组件
 * @param app vue 实例
 */
export default {
    install: (app: App) => {
        for (const [key, value] of Object.entries(components)) {
            const name = key.match(/\w+\.vue$/)?.[0].replace(/.vue/, '');
            const component = defineAsyncComponent(value as any);
            app.component(name as string, component);
        }
    },
};
