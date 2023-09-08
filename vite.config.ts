import path from 'path';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Icons from 'unplugin-icons/vite';
import dts from 'vite-plugin-dts';
import Inspect from 'vite-plugin-inspect';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import IconsResolver from 'unplugin-icons/resolver';
import ElementPlus from 'unplugin-element-plus/vite';
import DefineOptions from 'unplugin-vue-define-options/vite';
import VueDevTools from 'vite-plugin-vue-devtools';

const pathSrc = path.resolve(__dirname, 'src');

export default defineConfig({
    resolve: {
        alias: {
            '@': pathSrc,
        },
    },
    plugins: [
        Vue(),

        Icons({
            autoInstall: true,
            // 编译方式
            // compiler: 'vue3',
            // 默认类名
            // defaultClass: '',
            // 默认样式
            // defaultStyle: '',
        }),

        /**
         * 自动引入 vue 等插件 hooks
         */
        AutoImport({
            imports: ['vue', 'vue-router'],
            resolvers: [ElementPlusResolver()],
            dts: path.resolve('src/types/auto-imports.d.ts'),
        }),

        /**
         * 自动引入自定义组件
         */
        Components({
            // 指定组件位置，默认是src/components
            // dirs: ['src/components'],

            // 组件解析器
            resolvers: [
                ElementPlusResolver(),
                IconsResolver({
                    enabledCollections: ['ep'],
                }),
            ],

            // 配置文件生成位置
            dts: path.resolve('src/types/components.d.ts'),
        }),

        /**
         * 检查插件
         */
        Inspect(),

        /**
         * 生成类型声明文件
         */
        dts(),

        /**
         * 为 Element Plus 按需引入样式
         */
        ElementPlus({
            // options
        }),

        /**
         * 设置组件名称
         */
        DefineOptions(),

        /**
         * 增强 Vue 开发者体验
         */
        VueDevTools(),
    ],
});
