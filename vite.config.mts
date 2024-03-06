/// <reference types="vitest" />
import path from 'path';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Icons from 'unplugin-icons/vite';
import Dts from 'vite-plugin-dts';
import Inspect from 'vite-plugin-inspect';
import AutoImport from 'unplugin-auto-import/vite';
import VueComponents from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import IconsResolver from 'unplugin-icons/resolver';
import ElementPlus from 'unplugin-element-plus/vite';
import VueDevTools from 'vite-plugin-vue-devtools';
import Legacy from '@vitejs/plugin-legacy';
import Compression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';

/**
 * In a basic Vite project, make sure:
 * The vite.config.js(ts) file content is using the ESM syntax.
 * The closest package.json file has "type": "module", or use the .mjs extension, e.g. vite.config.mjs(mts)
 */
const pathSrc = path.resolve(__dirname, 'src');

export default defineConfig({
    resolve: {
        /**
         * 当使用文件系统路径的别名时，请使用绝对路径
         */
        alias: {
            '@': pathSrc,
        },
    },

    build: {
        /**
         * 混淆器
         *  - boolean：设置为 false 可以禁用最小化混淆
         *  - esbuild：默认为 Esbuild，它比 terser 快 20-40 倍，压缩率只差 1%-2%（打包速度最快）
         *  - terser：当设置为 'terser' 时必须先安装 Terser（打包体积最小）
         */
        minify: 'esbuild',

        /**
         * chunk 大小警告的限制
         * 默认 500（单位：kbs）
         */
        chunkSizeWarningLimit: 1000,

        /**
         * rollup 打包后的静态资源名称格式
         * vite 基于 rollup 打包，打包后的 chunk（代码块）后静态资源名称比较简单，
         * 使用命名规则可以确保在每次构建应用程序时，文件的名称都会随着内容的更改而变化，
         * 可以避免浏览器缓存旧版本文件的问题，并确保每次部署新的构建版本时，浏览器可以正确加载更新的文件
         */
        rollupOptions: {
            output: {
                chunkFileNames: 'static/js/[name]-[hash].js', // 引入文件
                entryFileNames: 'static/js/[name]-[hash].js', // 包的入口文件
                assetFileNames: 'static/[ext]/[name]-[hash].[ext]', // 资源文件

                // 自动合并小 chunk（单位：b）
                experimentalMinChunkSize: 1024 * 10,

                // 通过 () => import() 形式加载的组件会自动分包，部分第三方插件手动分包
                manualChunks: {
                    vue: ['vue', 'vue-router', 'pinia'],
                    'element-plus-icons': ['@element-plus/icons-vue'],
                    'element-plus': ['element-plus'],
                    'lodash-es': ['lodash-es'],
                    'docx-preview': ['docx-preview'],
                    html2canvas: ['html2canvas'],
                    luckyexcel: ['luckyexcel'],
                    exceljs: ['exceljs'],
                    jspdf: ['jspdf'],
                    three: ['three'],
                    echarts: ['echarts'],
                    sortablejs: ['sortablejs'],
                    ol: ['ol'],
                },
            },
        },
    },

    esbuild: {
        // minify: 'esbuild' 模式下，生产环境删除 console & debugger
        // drop: ['console', 'debugger'],
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
            imports: ['vue', 'vue-router', 'vitest'],

            // 配置文件生成位置
            dts: path.resolve('src/types/auto-imports.d.ts'),

            // 自定义组件解析器
            resolvers: [ElementPlusResolver(), IconsResolver()],

            // eslint 报错解决
            eslintrc: {
                // 当 enabled 为 true 时，会根据 filepath 生成一个 eslint 的配置文件，需要引入到 eslint 的配置文件中
                enabled: false,
                filepath: './.eslintrc-auto-import.json',
                globalsPropValue: true,
            },
        }),

        /**
         * 自动引入自定义组件
         */
        VueComponents({
            // 指定组件位置，默认是 src/components
            dirs: ['src/components'],

            // 组件的有效文件扩展名。
            extensions: ['vue'],

            // 配置文件生成位置
            dts: path.resolve('src/types/components.d.ts'),

            // 自动导入指令
            // 默认值：Vue 3 的 `true`，Vue 2 的 `false`
            // 需要 Babel 来为 Vue 2 进行转换，出于性能考虑，它默认处于禁用状态。
            // directives: true,

            // 自定义组件解析器
            resolvers: [
                ElementPlusResolver(),
                IconsResolver({
                    enabledCollections: ['ep'],
                }),
            ],
        }),

        /**
         * 检查插件
         */
        Inspect(),

        /**
         * 生成类型声明文件
         */
        Dts(),

        /**
         * 为 Element Plus 按需引入样式
         */
        ElementPlus({
            // options
        }),

        /**
         * 增强 Vue 开发者体验
         */
        VueDevTools(),

        /**
         * 兼容旧版浏览器
         */
        Legacy({
            targets: ['defaults', 'not IE 11'],
        }),

        /**
         * 方式一.打包时进行 gzip 压缩
         * 1.visualizer()
         * 2.服务器安装 nginx 时需要安装 'http_gzip_static_module'
         *   - ./configure --prefix=/usr/local/nginx --with-http_gzip_static_module
         *   - make && make install
         * 3.配置 nginx.conf
         *   - server {
         *   -     listen       3000;
         *   -     server_name  localhost;
         *   -     location / {
         *   -         root   /home/static/demo/dist;
         *   -         index  index.html index.htm;
         *   -         try_files $uri $uri/ /index.html;
         *   -         gzip_static on; # 静态压缩
         *   -     }
         *   - }
         *
         * 方式二.Nginx 直接配置开启 gzip 压缩
         * 1.服务器安装 nginx 时需要安装 'http_gzip_static_module'
         *   - ./configure --prefix=/usr/local/nginx --with-http_gzip_static_module
         *   - make && make install
         * 2.配置 nginx.conf
         *   - http {
         *   -    gzip_static on; # 开启 gzip 压缩
         *   -    gzip_comp_level 2; # 压缩级别，1-9，数字越大压缩效果越好，也越占用 cpu
         *   -    gzip_min_length 10k; # 压缩阈值，文件大于 10k 才进行压缩
         *   -    gzip_vary on; # 是否在 http header 中添加 Vary: Accept-Encoding，建议开启
         *   -    ...
         *   - }
         */
        Compression({
            verbose: true, // 是否在控制台中输出压缩结果
            disable: false,
            threshold: 1024 * 10, // 如果体积大于阈值，将被压缩（单位：b）；体积过小时不要压缩，以免适得其反
            algorithm: 'gzip', // 压缩算法
            ext: '.gz',
            deleteOriginFile: false, // 压缩后是否删除源文件
        }),

        /**
         * 可以展示构建时长、chunk 数量及大小
         * PS：需要将 visualizer 插件放到最后的位置
         */
        visualizer({
            gzipSize: true,
            brotliSize: true,
            emitFile: false,
            filename: 'stats.html', // 分析图生成的文件名
            open: false, // 如果存在本地服务端口，将在打包后自动展示
        }),
    ],
});
