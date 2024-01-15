import { type App, defineAsyncComponent } from 'vue';

/**
 * @description 导入组件
 * 函数从文件系统导入多个模块，匹配到的文件默认是懒加载的，通过动态导入实现，并会在构建时分离为独立的 chunk；
 * 如果倾向于直接引入所有的模块（例如依赖于这些模块中的副作用首先被应用），可以传入 { eager: true } 作为第二个参数；
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
