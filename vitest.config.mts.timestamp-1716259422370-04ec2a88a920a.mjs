// vitest.config.mts
import { defineConfig as defineConfig2, mergeConfig } from "file:///E:/Project/vue-app/node_modules/.pnpm/vitest@1.4.0_@types+node@20.11.30_@vitest+ui@1.4.0_jsdom@24.0.0_sass@1.72.0_terser@5.30.0/node_modules/vitest/dist/config.js";

// vite.config.mts
import Legacy from "file:///E:/Project/vue-app/node_modules/.pnpm/@vitejs+plugin-legacy@5.3.2_terser@5.30.0_vite@5.2.6/node_modules/@vitejs/plugin-legacy/dist/index.mjs";
import Vue from "file:///E:/Project/vue-app/node_modules/.pnpm/@vitejs+plugin-vue@5.0.4_vite@5.2.6_vue@3.4.21/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import { visualizer } from "file:///E:/Project/vue-app/node_modules/.pnpm/rollup-plugin-visualizer@5.12.0/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import AutoImport from "file:///E:/Project/vue-app/node_modules/.pnpm/unplugin-auto-import@0.17.5_@vueuse+core@10.9.0/node_modules/unplugin-auto-import/dist/vite.js";
import ElementPlus from "file:///E:/Project/vue-app/node_modules/.pnpm/unplugin-element-plus@0.8.0/node_modules/unplugin-element-plus/dist/vite.mjs";
import IconsResolver from "file:///E:/Project/vue-app/node_modules/.pnpm/unplugin-icons@0.18.5/node_modules/unplugin-icons/dist/resolver.js";
import Icons from "file:///E:/Project/vue-app/node_modules/.pnpm/unplugin-icons@0.18.5/node_modules/unplugin-icons/dist/vite.js";
import { ElementPlusResolver } from "file:///E:/Project/vue-app/node_modules/.pnpm/unplugin-vue-components@0.26.0_vue@3.4.21/node_modules/unplugin-vue-components/dist/resolvers.js";
import Components from "file:///E:/Project/vue-app/node_modules/.pnpm/unplugin-vue-components@0.26.0_vue@3.4.21/node_modules/unplugin-vue-components/dist/vite.js";
import { defineConfig } from "file:///E:/Project/vue-app/node_modules/.pnpm/vite@5.2.6_@types+node@20.11.30_sass@1.72.0_terser@5.30.0/node_modules/vite/dist/node/index.js";
import Compression from "file:///E:/Project/vue-app/node_modules/.pnpm/vite-plugin-compression@0.5.1_vite@5.2.6/node_modules/vite-plugin-compression/dist/index.mjs";
import Dts from "file:///E:/Project/vue-app/node_modules/.pnpm/vite-plugin-dts@3.8.1_@types+node@20.11.30_typescript@5.4.3_vite@5.2.6/node_modules/vite-plugin-dts/dist/index.mjs";
import Inspect from "file:///E:/Project/vue-app/node_modules/.pnpm/vite-plugin-inspect@0.8.3_vite@5.2.6/node_modules/vite-plugin-inspect/dist/index.mjs";
import VueDevTools from "file:///E:/Project/vue-app/node_modules/.pnpm/vite-plugin-vue-devtools@7.0.25_vite@5.2.6_vue@3.4.21/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
var __vite_injected_original_dirname = "E:\\Project\\vue-app";
var pathSrc = path.resolve(__vite_injected_original_dirname, "src");
var vite_config_default = defineConfig({
  resolve: {
    /**
     * 当使用文件系统路径的别名时，请使用绝对路径
     */
    alias: {
      "@": pathSrc
    }
  },
  build: {
    /**
     * 混淆器
     *  - boolean：设置为 false 可以禁用最小化混淆
     *  - esbuild：默认为 Esbuild，它比 terser 快 20-40 倍，压缩率只差 1%-2%（打包速度最快）
     *  - terser：当设置为 'terser' 时必须先安装 Terser（打包体积最小）
     */
    minify: "esbuild",
    /**
     * chunk 大小警告的限制
     * 默认 500（单位：kbs）
     */
    chunkSizeWarningLimit: 1e3,
    /**
     * rollup 打包后的静态资源名称格式
     * vite 基于 rollup 打包，打包后的 chunk（代码块）后静态资源名称比较简单，
     * 使用命名规则可以确保在每次构建应用程序时，文件的名称都会随着内容的更改而变化，
     * 可以避免浏览器缓存旧版本文件的问题，并确保每次部署新的构建版本时，浏览器可以正确加载更新的文件
     */
    rollupOptions: {
      output: {
        chunkFileNames: "static/js/[name]-[hash].js",
        // 引入文件
        entryFileNames: "static/js/[name]-[hash].js",
        // 包的入口文件
        assetFileNames: "static/[ext]/[name]-[hash].[ext]",
        // 资源文件
        // 自动合并小 chunk（单位：b）
        experimentalMinChunkSize: 1024 * 10,
        // 通过 () => import() 形式加载的组件会自动分包，部分第三方插件手动分包
        manualChunks: {
          vue: ["vue", "vue-router", "pinia"],
          "element-plus-icons": ["@element-plus/icons-vue"],
          "element-plus": ["element-plus"],
          "lodash-es": ["lodash-es"],
          "docx-preview": ["docx-preview"],
          html2canvas: ["html2canvas"],
          luckyexcel: ["luckyexcel"],
          exceljs: ["exceljs"],
          jspdf: ["jspdf"],
          three: ["three"],
          echarts: ["echarts"],
          sortablejs: ["sortablejs"],
          ol: ["ol"]
        }
      }
    }
  },
  esbuild: {
    // minify: 'esbuild' 模式下，生产环境删除 console & debugger
    // drop: ['console', 'debugger'],
  },
  plugins: [
    Vue(),
    Icons({
      autoInstall: true
      // 编译方式
      // compiler: 'vue3',
    }),
    /**
     * 自动引入 vue 等插件 hooks
     */
    AutoImport({
      imports: ["vue", "vue-router", "vitest"],
      // 配置文件生成位置
      dts: path.resolve("src/types/auto-imports.d.ts"),
      // 自定义组件解析器
      resolvers: [ElementPlusResolver(), IconsResolver()]
    }),
    /**
     * 自动引入自定义组件
     */
    Components({
      // 指定组件位置，默认是 src/components
      dirs: ["src/components"],
      // 组件的有效文件扩展名。
      extensions: ["vue"],
      // 配置文件生成位置
      dts: path.resolve("src/types/components.d.ts"),
      // 自动导入指令
      // 默认值：Vue 3 的 `true`，Vue 2 的 `false`
      // 需要 Babel 来为 Vue 2 进行转换，出于性能考虑，它默认处于禁用状态。
      // directives: true,
      // 自定义组件解析器
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          enabledCollections: ["ep"]
        })
      ]
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
    ElementPlus({}),
    /**
     * 增强 Vue 开发者体验
     */
    VueDevTools(),
    /**
     * 兼容旧版浏览器
     */
    Legacy({
      targets: ["defaults", "not IE 11"]
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
      verbose: true,
      // 是否在控制台中输出压缩结果
      disable: false,
      threshold: 1024 * 10,
      // 如果体积大于阈值，将被压缩（单位：b）；体积过小时不要压缩，以免适得其反
      algorithm: "gzip",
      // 压缩算法
      ext: ".gz",
      deleteOriginFile: false
      // 压缩后是否删除源文件
    }),
    /**
     * 可以展示构建时长、chunk 数量及大小
     * PS：需要将 visualizer 插件放到最后的位置
     */
    visualizer({
      gzipSize: true,
      brotliSize: true,
      emitFile: false,
      filename: "stats.html",
      // 分析图生成的文件名
      open: false
      // 如果存在本地服务端口，将在打包后自动展示
    })
  ]
});

// vitest.config.mts
var vitest_config_default = mergeConfig(
  vite_config_default,
  defineConfig2({
    test: {
      // 匹配包含测试文件的 glob 规则
      include: ["**/*.{test,spec}.?(c|m)[jt]s?(x)"],
      // 匹配排除测试文件的 glob 规则
      exclude: [
        "**/node_modules/**",
        "**/dist/**",
        "**/cypress/**",
        "**/.{idea,git,cache,output,temp}/**",
        "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*"
      ],
      // 生成 html 文件夹
      reporters: ["default", "html"],
      // 显式提供全局 API
      globals: true,
      // 类型检查
      typecheck: {
        allowJs: true
      }
    }
  })
);
export {
  vitest_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZXN0LmNvbmZpZy5tdHMiLCAidml0ZS5jb25maWcubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcUHJvamVjdFxcXFx2dWUtYXBwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxQcm9qZWN0XFxcXHZ1ZS1hcHBcXFxcdml0ZXN0LmNvbmZpZy5tdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L1Byb2plY3QvdnVlLWFwcC92aXRlc3QuY29uZmlnLm10c1wiOy8vLyA8cmVmZXJlbmNlIHR5cGVzPVwidml0ZXN0XCIgLz5cbmltcG9ydCB7IGRlZmluZUNvbmZpZywgbWVyZ2VDb25maWcgfSBmcm9tICd2aXRlc3QvY29uZmlnJztcblxuaW1wb3J0IHZpdGVDb25maWcgZnJvbSAnLi92aXRlLmNvbmZpZy5tanMnO1xuXG4vKipcbiAqIFx1NTk4Mlx1Njc5Q1x1NEY2MFx1NTFCM1x1NUI5QVx1NEUzQSBWaXRlIFx1NTQ4QyBWaXRlc3QgXHU0RjdGXHU3NTI4XHU0RTI0XHU0RTJBXHU1MzU1XHU3MkVDXHU3Njg0XHU5MTREXHU3RjZFXHU2NTg3XHU0RUY2XHVGRjBDXG4gKiBcdThCRjdcdTc4NkVcdTRGRERcdTU3MjggVml0ZXN0IFx1OTE0RFx1N0Y2RVx1NjU4N1x1NEVGNlx1NEUyRFx1NUI5QVx1NEU0OVx1NzZGOFx1NTQwQ1x1NzY4NCBWaXRlIFx1OTAwOVx1OTg3OVx1RkYwQ1x1NTZFMFx1NEUzQVx1NUI4M1x1NUMwNlx1ODk4Nlx1NzZENlx1NEY2MFx1NzY4NCBWaXRlIFx1NjU4N1x1NEVGNlx1RkYwQ1x1ODAwQ1x1NEUwRFx1NjYyRlx1NjI2OVx1NUM1NVx1NUI4M1x1RkYxQlxuICogXHU0RjYwXHU4RkQ4XHU1M0VGXHU0RUU1XHU0RjdGXHU3NTI4IHZpdGUgXHU2MjE2IHZpdGVzdC9jb25maWcgXHU2NzYxXHU3NkVFXHU0RTJEXHU3Njg0IG1lcmdlQ29uZmlnIFx1NjVCOVx1NkNENVx1NUMwNiBWaXRlIFx1OTE0RFx1N0Y2RVx1NEUwRSBWaXRlc3QgXHU5MTREXHU3RjZFXHU1NDA4XHU1RTc2XHUzMDAyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IG1lcmdlQ29uZmlnKFxuICAgIHZpdGVDb25maWcsXG4gICAgZGVmaW5lQ29uZmlnKHtcbiAgICAgICAgdGVzdDoge1xuICAgICAgICAgICAgLy8gXHU1MzM5XHU5MTREXHU1MzA1XHU1NDJCXHU2RDRCXHU4QkQ1XHU2NTg3XHU0RUY2XHU3Njg0IGdsb2IgXHU4OUM0XHU1MjE5XG4gICAgICAgICAgICBpbmNsdWRlOiBbJyoqLyoue3Rlc3Qsc3BlY30uPyhjfG0pW2p0XXM/KHgpJ10sXG4gICAgICAgICAgICAvLyBcdTUzMzlcdTkxNERcdTYzOTJcdTk2NjRcdTZENEJcdThCRDVcdTY1ODdcdTRFRjZcdTc2ODQgZ2xvYiBcdTg5QzRcdTUyMTlcbiAgICAgICAgICAgIGV4Y2x1ZGU6IFtcbiAgICAgICAgICAgICAgICAnKiovbm9kZV9tb2R1bGVzLyoqJyxcbiAgICAgICAgICAgICAgICAnKiovZGlzdC8qKicsXG4gICAgICAgICAgICAgICAgJyoqL2N5cHJlc3MvKionLFxuICAgICAgICAgICAgICAgICcqKi8ue2lkZWEsZ2l0LGNhY2hlLG91dHB1dCx0ZW1wfS8qKicsXG4gICAgICAgICAgICAgICAgJyoqL3trYXJtYSxyb2xsdXAsd2VicGFjayx2aXRlLHZpdGVzdCxqZXN0LGF2YSxiYWJlbCxueWMsY3lwcmVzcyx0c3VwLGJ1aWxkfS5jb25maWcuKicsXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgLy8gXHU3NTFGXHU2MjEwIGh0bWwgXHU2NTg3XHU0RUY2XHU1OTM5XG4gICAgICAgICAgICByZXBvcnRlcnM6IFsnZGVmYXVsdCcsICdodG1sJ10sXG4gICAgICAgICAgICAvLyBcdTY2M0VcdTVGMEZcdTYzRDBcdTRGOUJcdTUxNjhcdTVDNDAgQVBJXG4gICAgICAgICAgICBnbG9iYWxzOiB0cnVlLFxuICAgICAgICAgICAgLy8gXHU3QzdCXHU1NzhCXHU2OEMwXHU2N0U1XG4gICAgICAgICAgICB0eXBlY2hlY2s6IHtcbiAgICAgICAgICAgICAgICBhbGxvd0pzOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICB9KSxcbik7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXFByb2plY3RcXFxcdnVlLWFwcFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcUHJvamVjdFxcXFx2dWUtYXBwXFxcXHZpdGUuY29uZmlnLm10c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovUHJvamVjdC92dWUtYXBwL3ZpdGUuY29uZmlnLm10c1wiOy8vLyA8cmVmZXJlbmNlIHR5cGVzPVwidml0ZXN0XCIgLz5cbmltcG9ydCBMZWdhY3kgZnJvbSAnQHZpdGVqcy9wbHVnaW4tbGVnYWN5JztcbmltcG9ydCBWdWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgdmlzdWFsaXplciB9IGZyb20gJ3JvbGx1cC1wbHVnaW4tdmlzdWFsaXplcic7XG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJztcbmltcG9ydCBFbGVtZW50UGx1cyBmcm9tICd1bnBsdWdpbi1lbGVtZW50LXBsdXMvdml0ZSc7XG5pbXBvcnQgSWNvbnNSZXNvbHZlciBmcm9tICd1bnBsdWdpbi1pY29ucy9yZXNvbHZlcic7XG5pbXBvcnQgSWNvbnMgZnJvbSAndW5wbHVnaW4taWNvbnMvdml0ZSc7XG5pbXBvcnQgeyBFbGVtZW50UGx1c1Jlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJztcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgQ29tcHJlc3Npb24gZnJvbSAndml0ZS1wbHVnaW4tY29tcHJlc3Npb24nO1xuaW1wb3J0IER0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnO1xuaW1wb3J0IEluc3BlY3QgZnJvbSAndml0ZS1wbHVnaW4taW5zcGVjdCc7XG5pbXBvcnQgVnVlRGV2VG9vbHMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWRldnRvb2xzJztcblxuLyoqXG4gKiBcdTVCOThcdTY1QjlcdTY1ODdcdTY4NjNcdUZGMUFodHRwczovL2NuLnZpdGVqcy5kZXYvZ3VpZGUvdHJvdWJsZXNob290aW5nXG4gKiBWaXRlIENKUyBOb2RlIEFQSSBkZXByZWNhdGVkXG4gKiBWaXRlIFx1NzY4NCBDSlMgTm9kZSBBUEkgXHU2Nzg0XHU1RUZBXHU1REYyXHU3RUNGXHU4OEFCXHU1RTlGXHU1RjAzXHVGRjBDXHU1RTc2XHU1QzA2XHU1NzI4IFZpdGUgNiBcdTRFMkRcdTc5RkJcdTk2NjRcdUZGMENcdTRGNjBcdTVFOTRcdThCRTVcdTY2RjRcdTY1QjBcdTRGNjBcdTc2ODRcdTY1ODdcdTRFRjZcdTYyMTZcdTY4NDZcdTY3QjZcdTY3NjVcdTVCRkNcdTUxNjUgVml0ZSBcdTc2ODQgRVNNIFx1Njc4NFx1NUVGQVx1MzAwMlxuICogXHU1NzI4XHU0RTAwXHU0RTJBXHU1N0ZBXHU3ODQwXHU3Njg0IFZpdGUgXHU5ODc5XHU3NkVFXHU0RTJEXHVGRjBDXHU4QkY3XHU3ODZFXHU0RkREXHVGRjFBXG4gKiAgLSAxLnZpdGUuY29uZmlnLmpzIFx1OTE0RFx1N0Y2RVx1NjU4N1x1NEVGNlx1NzY4NFx1NTE4NVx1NUJCOVx1NEY3Rlx1NzUyOCBFU00gXHU4QkVEXHU2Q0Q1XHUzMDAyXG4gKiAgLSAyLlx1NjcwMFx1OEZEMVx1NzY4NCBwYWNrYWdlLmpzb24gXHU2NTg3XHU0RUY2XHU0RTJEXHU2NzA5IFwidHlwZVwiOiBcIm1vZHVsZVwiXHVGRjBDXHU2MjE2XHU4MDA1XHU0RjdGXHU3NTI4IC5tanMvLm10cyBcdTYyNjlcdTVDNTVcdTU0MERcdUZGMENcdTRGOEJcdTU5ODIgdml0ZS5jb25maWcubWpzIFx1NjIxNlx1ODAwNSB2aXRlLmNvbmZpZy5tdHNcdTMwMDJcbiAqL1xuY29uc3QgcGF0aFNyYyA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgICByZXNvbHZlOiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBcdTVGNTNcdTRGN0ZcdTc1MjhcdTY1ODdcdTRFRjZcdTdDRkJcdTdFREZcdThERUZcdTVGODRcdTc2ODRcdTUyMkJcdTU0MERcdTY1RjZcdUZGMENcdThCRjdcdTRGN0ZcdTc1MjhcdTdFRERcdTVCRjlcdThERUZcdTVGODRcbiAgICAgICAgICovXG4gICAgICAgIGFsaWFzOiB7XG4gICAgICAgICAgICAnQCc6IHBhdGhTcmMsXG4gICAgICAgIH0sXG4gICAgfSxcblxuICAgIGJ1aWxkOiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBcdTZERjdcdTZEQzZcdTU2NjhcbiAgICAgICAgICogIC0gYm9vbGVhblx1RkYxQVx1OEJCRVx1N0Y2RVx1NEUzQSBmYWxzZSBcdTUzRUZcdTRFRTVcdTc5ODFcdTc1MjhcdTY3MDBcdTVDMEZcdTUzMTZcdTZERjdcdTZEQzZcbiAgICAgICAgICogIC0gZXNidWlsZFx1RkYxQVx1OUVEOFx1OEJBNFx1NEUzQSBFc2J1aWxkXHVGRjBDXHU1QjgzXHU2QkQ0IHRlcnNlciBcdTVGRUIgMjAtNDAgXHU1MDBEXHVGRjBDXHU1MzhCXHU3RjI5XHU3Mzg3XHU1M0VBXHU1REVFIDElLTIlXHVGRjA4XHU2MjUzXHU1MzA1XHU5MDFGXHU1RUE2XHU2NzAwXHU1RkVCXHVGRjA5XG4gICAgICAgICAqICAtIHRlcnNlclx1RkYxQVx1NUY1M1x1OEJCRVx1N0Y2RVx1NEUzQSAndGVyc2VyJyBcdTY1RjZcdTVGQzVcdTk4N0JcdTUxNDhcdTVCODlcdTg4QzUgVGVyc2VyXHVGRjA4XHU2MjUzXHU1MzA1XHU0RjUzXHU3OUVGXHU2NzAwXHU1QzBGXHVGRjA5XG4gICAgICAgICAqL1xuICAgICAgICBtaW5pZnk6ICdlc2J1aWxkJyxcblxuICAgICAgICAvKipcbiAgICAgICAgICogY2h1bmsgXHU1OTI3XHU1QzBGXHU4QjY2XHU1NDRBXHU3Njg0XHU5NjUwXHU1MjM2XG4gICAgICAgICAqIFx1OUVEOFx1OEJBNCA1MDBcdUZGMDhcdTUzNTVcdTRGNERcdUZGMUFrYnNcdUZGMDlcbiAgICAgICAgICovXG4gICAgICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMTAwMCxcblxuICAgICAgICAvKipcbiAgICAgICAgICogcm9sbHVwIFx1NjI1M1x1NTMwNVx1NTQwRVx1NzY4NFx1OTc1OVx1NjAwMVx1OEQ0NFx1NkU5MFx1NTQwRFx1NzlGMFx1NjgzQ1x1NUYwRlxuICAgICAgICAgKiB2aXRlIFx1NTdGQVx1NEU4RSByb2xsdXAgXHU2MjUzXHU1MzA1XHVGRjBDXHU2MjUzXHU1MzA1XHU1NDBFXHU3Njg0IGNodW5rXHVGRjA4XHU0RUUzXHU3ODAxXHU1NzU3XHVGRjA5XHU1NDBFXHU5NzU5XHU2MDAxXHU4RDQ0XHU2RTkwXHU1NDBEXHU3OUYwXHU2QkQ0XHU4RjgzXHU3QjgwXHU1MzU1XHVGRjBDXG4gICAgICAgICAqIFx1NEY3Rlx1NzUyOFx1NTQ3RFx1NTQwRFx1ODlDNFx1NTIxOVx1NTNFRlx1NEVFNVx1Nzg2RVx1NEZERFx1NTcyOFx1NkJDRlx1NkIyMVx1Njc4NFx1NUVGQVx1NUU5NFx1NzUyOFx1N0EwQlx1NUU4Rlx1NjVGNlx1RkYwQ1x1NjU4N1x1NEVGNlx1NzY4NFx1NTQwRFx1NzlGMFx1OTBGRFx1NEYxQVx1OTY4Rlx1Nzc0MFx1NTE4NVx1NUJCOVx1NzY4NFx1NjZGNFx1NjUzOVx1ODAwQ1x1NTNEOFx1NTMxNlx1RkYwQ1xuICAgICAgICAgKiBcdTUzRUZcdTRFRTVcdTkwN0ZcdTUxNERcdTZENEZcdTg5QzhcdTU2NjhcdTdGMTNcdTVCNThcdTY1RTdcdTcyNDhcdTY3MkNcdTY1ODdcdTRFRjZcdTc2ODRcdTk1RUVcdTk4OThcdUZGMENcdTVFNzZcdTc4NkVcdTRGRERcdTZCQ0ZcdTZCMjFcdTkwRThcdTdGNzJcdTY1QjBcdTc2ODRcdTY3ODRcdTVFRkFcdTcyNDhcdTY3MkNcdTY1RjZcdUZGMENcdTZENEZcdTg5QzhcdTU2NjhcdTUzRUZcdTRFRTVcdTZCNjNcdTc4NkVcdTUyQTBcdThGN0RcdTY2RjRcdTY1QjBcdTc2ODRcdTY1ODdcdTRFRjZcbiAgICAgICAgICovXG4gICAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgICAgIG91dHB1dDoge1xuICAgICAgICAgICAgICAgIGNodW5rRmlsZU5hbWVzOiAnc3RhdGljL2pzL1tuYW1lXS1baGFzaF0uanMnLCAvLyBcdTVGMTVcdTUxNjVcdTY1ODdcdTRFRjZcbiAgICAgICAgICAgICAgICBlbnRyeUZpbGVOYW1lczogJ3N0YXRpYy9qcy9bbmFtZV0tW2hhc2hdLmpzJywgLy8gXHU1MzA1XHU3Njg0XHU1MTY1XHU1M0UzXHU2NTg3XHU0RUY2XG4gICAgICAgICAgICAgICAgYXNzZXRGaWxlTmFtZXM6ICdzdGF0aWMvW2V4dF0vW25hbWVdLVtoYXNoXS5bZXh0XScsIC8vIFx1OEQ0NFx1NkU5MFx1NjU4N1x1NEVGNlxuXG4gICAgICAgICAgICAgICAgLy8gXHU4MUVBXHU1MkE4XHU1NDA4XHU1RTc2XHU1QzBGIGNodW5rXHVGRjA4XHU1MzU1XHU0RjREXHVGRjFBYlx1RkYwOVxuICAgICAgICAgICAgICAgIGV4cGVyaW1lbnRhbE1pbkNodW5rU2l6ZTogMTAyNCAqIDEwLFxuXG4gICAgICAgICAgICAgICAgLy8gXHU5MDFBXHU4RkM3ICgpID0+IGltcG9ydCgpIFx1NUY2Mlx1NUYwRlx1NTJBMFx1OEY3RFx1NzY4NFx1N0VDNFx1NEVGNlx1NEYxQVx1ODFFQVx1NTJBOFx1NTIwNlx1NTMwNVx1RkYwQ1x1OTBFOFx1NTIwNlx1N0IyQ1x1NEUwOVx1NjVCOVx1NjNEMlx1NEVGNlx1NjI0Qlx1NTJBOFx1NTIwNlx1NTMwNVxuICAgICAgICAgICAgICAgIG1hbnVhbENodW5rczoge1xuICAgICAgICAgICAgICAgICAgICB2dWU6IFsndnVlJywgJ3Z1ZS1yb3V0ZXInLCAncGluaWEnXSxcbiAgICAgICAgICAgICAgICAgICAgJ2VsZW1lbnQtcGx1cy1pY29ucyc6IFsnQGVsZW1lbnQtcGx1cy9pY29ucy12dWUnXSxcbiAgICAgICAgICAgICAgICAgICAgJ2VsZW1lbnQtcGx1cyc6IFsnZWxlbWVudC1wbHVzJ10sXG4gICAgICAgICAgICAgICAgICAgICdsb2Rhc2gtZXMnOiBbJ2xvZGFzaC1lcyddLFxuICAgICAgICAgICAgICAgICAgICAnZG9jeC1wcmV2aWV3JzogWydkb2N4LXByZXZpZXcnXSxcbiAgICAgICAgICAgICAgICAgICAgaHRtbDJjYW52YXM6IFsnaHRtbDJjYW52YXMnXSxcbiAgICAgICAgICAgICAgICAgICAgbHVja3lleGNlbDogWydsdWNreWV4Y2VsJ10sXG4gICAgICAgICAgICAgICAgICAgIGV4Y2VsanM6IFsnZXhjZWxqcyddLFxuICAgICAgICAgICAgICAgICAgICBqc3BkZjogWydqc3BkZiddLFxuICAgICAgICAgICAgICAgICAgICB0aHJlZTogWyd0aHJlZSddLFxuICAgICAgICAgICAgICAgICAgICBlY2hhcnRzOiBbJ2VjaGFydHMnXSxcbiAgICAgICAgICAgICAgICAgICAgc29ydGFibGVqczogWydzb3J0YWJsZWpzJ10sXG4gICAgICAgICAgICAgICAgICAgIG9sOiBbJ29sJ10sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgfSxcblxuICAgIGVzYnVpbGQ6IHtcbiAgICAgICAgLy8gbWluaWZ5OiAnZXNidWlsZCcgXHU2QTIxXHU1RjBGXHU0RTBCXHVGRjBDXHU3NTFGXHU0RUE3XHU3M0FGXHU1ODgzXHU1MjIwXHU5NjY0IGNvbnNvbGUgJiBkZWJ1Z2dlclxuICAgICAgICAvLyBkcm9wOiBbJ2NvbnNvbGUnLCAnZGVidWdnZXInXSxcbiAgICB9LFxuXG4gICAgcGx1Z2luczogW1xuICAgICAgICBWdWUoKSxcblxuICAgICAgICBJY29ucyh7XG4gICAgICAgICAgICBhdXRvSW5zdGFsbDogdHJ1ZSxcbiAgICAgICAgICAgIC8vIFx1N0YxNlx1OEJEMVx1NjVCOVx1NUYwRlxuICAgICAgICAgICAgLy8gY29tcGlsZXI6ICd2dWUzJyxcbiAgICAgICAgfSksXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFx1ODFFQVx1NTJBOFx1NUYxNVx1NTE2NSB2dWUgXHU3QjQ5XHU2M0QyXHU0RUY2IGhvb2tzXG4gICAgICAgICAqL1xuICAgICAgICBBdXRvSW1wb3J0KHtcbiAgICAgICAgICAgIGltcG9ydHM6IFsndnVlJywgJ3Z1ZS1yb3V0ZXInLCAndml0ZXN0J10sXG5cbiAgICAgICAgICAgIC8vIFx1OTE0RFx1N0Y2RVx1NjU4N1x1NEVGNlx1NzUxRlx1NjIxMFx1NEY0RFx1N0Y2RVxuICAgICAgICAgICAgZHRzOiBwYXRoLnJlc29sdmUoJ3NyYy90eXBlcy9hdXRvLWltcG9ydHMuZC50cycpLFxuXG4gICAgICAgICAgICAvLyBcdTgxRUFcdTVCOUFcdTRFNDlcdTdFQzRcdTRFRjZcdTg5RTNcdTY3OTBcdTU2NjhcbiAgICAgICAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKSwgSWNvbnNSZXNvbHZlcigpXSxcbiAgICAgICAgfSksXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFx1ODFFQVx1NTJBOFx1NUYxNVx1NTE2NVx1ODFFQVx1NUI5QVx1NEU0OVx1N0VDNFx1NEVGNlxuICAgICAgICAgKi9cbiAgICAgICAgQ29tcG9uZW50cyh7XG4gICAgICAgICAgICAvLyBcdTYzMDdcdTVCOUFcdTdFQzRcdTRFRjZcdTRGNERcdTdGNkVcdUZGMENcdTlFRDhcdThCQTRcdTY2MkYgc3JjL2NvbXBvbmVudHNcbiAgICAgICAgICAgIGRpcnM6IFsnc3JjL2NvbXBvbmVudHMnXSxcblxuICAgICAgICAgICAgLy8gXHU3RUM0XHU0RUY2XHU3Njg0XHU2NzA5XHU2NTQ4XHU2NTg3XHU0RUY2XHU2MjY5XHU1QzU1XHU1NDBEXHUzMDAyXG4gICAgICAgICAgICBleHRlbnNpb25zOiBbJ3Z1ZSddLFxuXG4gICAgICAgICAgICAvLyBcdTkxNERcdTdGNkVcdTY1ODdcdTRFRjZcdTc1MUZcdTYyMTBcdTRGNERcdTdGNkVcbiAgICAgICAgICAgIGR0czogcGF0aC5yZXNvbHZlKCdzcmMvdHlwZXMvY29tcG9uZW50cy5kLnRzJyksXG5cbiAgICAgICAgICAgIC8vIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NVx1NjMwN1x1NEVFNFxuICAgICAgICAgICAgLy8gXHU5RUQ4XHU4QkE0XHU1MDNDXHVGRjFBVnVlIDMgXHU3Njg0IGB0cnVlYFx1RkYwQ1Z1ZSAyIFx1NzY4NCBgZmFsc2VgXG4gICAgICAgICAgICAvLyBcdTk3MDBcdTg5ODEgQmFiZWwgXHU2NzY1XHU0RTNBIFZ1ZSAyIFx1OEZEQlx1ODg0Q1x1OEY2Q1x1NjM2Mlx1RkYwQ1x1NTFGQVx1NEU4RVx1NjAyN1x1ODBGRFx1ODAwM1x1ODY1MVx1RkYwQ1x1NUI4M1x1OUVEOFx1OEJBNFx1NTkwNFx1NEU4RVx1Nzk4MVx1NzUyOFx1NzJCNlx1NjAwMVx1MzAwMlxuICAgICAgICAgICAgLy8gZGlyZWN0aXZlczogdHJ1ZSxcblxuICAgICAgICAgICAgLy8gXHU4MUVBXHU1QjlBXHU0RTQ5XHU3RUM0XHU0RUY2XHU4OUUzXHU2NzkwXHU1NjY4XG4gICAgICAgICAgICByZXNvbHZlcnM6IFtcbiAgICAgICAgICAgICAgICBFbGVtZW50UGx1c1Jlc29sdmVyKCksXG4gICAgICAgICAgICAgICAgSWNvbnNSZXNvbHZlcih7XG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWRDb2xsZWN0aW9uczogWydlcCddLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgfSksXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFx1NjhDMFx1NjdFNVx1NjNEMlx1NEVGNlxuICAgICAgICAgKi9cbiAgICAgICAgSW5zcGVjdCgpLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBcdTc1MUZcdTYyMTBcdTdDN0JcdTU3OEJcdTU4RjBcdTY2MEVcdTY1ODdcdTRFRjZcbiAgICAgICAgICovXG4gICAgICAgIER0cygpLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBcdTRFM0EgRWxlbWVudCBQbHVzIFx1NjMwOVx1OTcwMFx1NUYxNVx1NTE2NVx1NjgzN1x1NUYwRlxuICAgICAgICAgKi9cbiAgICAgICAgRWxlbWVudFBsdXMoe30pLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBcdTU4OUVcdTVGM0EgVnVlIFx1NUYwMFx1NTNEMVx1ODAwNVx1NEY1M1x1OUE4Q1xuICAgICAgICAgKi9cbiAgICAgICAgVnVlRGV2VG9vbHMoKSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogXHU1MTdDXHU1QkI5XHU2NUU3XHU3MjQ4XHU2RDRGXHU4OUM4XHU1NjY4XG4gICAgICAgICAqL1xuICAgICAgICBMZWdhY3koe1xuICAgICAgICAgICAgdGFyZ2V0czogWydkZWZhdWx0cycsICdub3QgSUUgMTEnXSxcbiAgICAgICAgfSksXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFx1NjVCOVx1NUYwRlx1NEUwMC5cdTYyNTNcdTUzMDVcdTY1RjZcdThGREJcdTg4NEMgZ3ppcCBcdTUzOEJcdTdGMjlcbiAgICAgICAgICogMS52aXN1YWxpemVyKClcbiAgICAgICAgICogMi5cdTY3MERcdTUyQTFcdTU2NjhcdTVCODlcdTg4QzUgbmdpbnggXHU2NUY2XHU5NzAwXHU4OTgxXHU1Qjg5XHU4OEM1ICdodHRwX2d6aXBfc3RhdGljX21vZHVsZSdcbiAgICAgICAgICogICAtIC4vY29uZmlndXJlIC0tcHJlZml4PS91c3IvbG9jYWwvbmdpbnggLS13aXRoLWh0dHBfZ3ppcF9zdGF0aWNfbW9kdWxlXG4gICAgICAgICAqICAgLSBtYWtlICYmIG1ha2UgaW5zdGFsbFxuICAgICAgICAgKiAzLlx1OTE0RFx1N0Y2RSBuZ2lueC5jb25mXG4gICAgICAgICAqICAgLSBzZXJ2ZXIge1xuICAgICAgICAgKiAgIC0gICAgIGxpc3RlbiAgICAgICAzMDAwO1xuICAgICAgICAgKiAgIC0gICAgIHNlcnZlcl9uYW1lICBsb2NhbGhvc3Q7XG4gICAgICAgICAqICAgLSAgICAgbG9jYXRpb24gLyB7XG4gICAgICAgICAqICAgLSAgICAgICAgIHJvb3QgICAvaG9tZS9zdGF0aWMvZGVtby9kaXN0O1xuICAgICAgICAgKiAgIC0gICAgICAgICBpbmRleCAgaW5kZXguaHRtbCBpbmRleC5odG07XG4gICAgICAgICAqICAgLSAgICAgICAgIHRyeV9maWxlcyAkdXJpICR1cmkvIC9pbmRleC5odG1sO1xuICAgICAgICAgKiAgIC0gICAgICAgICBnemlwX3N0YXRpYyBvbjsgIyBcdTk3NTlcdTYwMDFcdTUzOEJcdTdGMjlcbiAgICAgICAgICogICAtICAgICB9XG4gICAgICAgICAqICAgLSB9XG4gICAgICAgICAqXG4gICAgICAgICAqIFx1NjVCOVx1NUYwRlx1NEU4Qy5OZ2lueCBcdTc2RjRcdTYzQTVcdTkxNERcdTdGNkVcdTVGMDBcdTU0MkYgZ3ppcCBcdTUzOEJcdTdGMjlcbiAgICAgICAgICogMS5cdTY3MERcdTUyQTFcdTU2NjhcdTVCODlcdTg4QzUgbmdpbnggXHU2NUY2XHU5NzAwXHU4OTgxXHU1Qjg5XHU4OEM1ICdodHRwX2d6aXBfc3RhdGljX21vZHVsZSdcbiAgICAgICAgICogICAtIC4vY29uZmlndXJlIC0tcHJlZml4PS91c3IvbG9jYWwvbmdpbnggLS13aXRoLWh0dHBfZ3ppcF9zdGF0aWNfbW9kdWxlXG4gICAgICAgICAqICAgLSBtYWtlICYmIG1ha2UgaW5zdGFsbFxuICAgICAgICAgKiAyLlx1OTE0RFx1N0Y2RSBuZ2lueC5jb25mXG4gICAgICAgICAqICAgLSBodHRwIHtcbiAgICAgICAgICogICAtICAgIGd6aXBfc3RhdGljIG9uOyAjIFx1NUYwMFx1NTQyRiBnemlwIFx1NTM4Qlx1N0YyOVxuICAgICAgICAgKiAgIC0gICAgZ3ppcF9jb21wX2xldmVsIDI7ICMgXHU1MzhCXHU3RjI5XHU3RUE3XHU1MjJCXHVGRjBDMS05XHVGRjBDXHU2NTcwXHU1QjU3XHU4RDhBXHU1OTI3XHU1MzhCXHU3RjI5XHU2NTQ4XHU2NzlDXHU4RDhBXHU1OTdEXHVGRjBDXHU0RTVGXHU4RDhBXHU1MzYwXHU3NTI4IGNwdVxuICAgICAgICAgKiAgIC0gICAgZ3ppcF9taW5fbGVuZ3RoIDEwazsgIyBcdTUzOEJcdTdGMjlcdTk2MDhcdTUwM0NcdUZGMENcdTY1ODdcdTRFRjZcdTU5MjdcdTRFOEUgMTBrIFx1NjI0RFx1OEZEQlx1ODg0Q1x1NTM4Qlx1N0YyOVxuICAgICAgICAgKiAgIC0gICAgZ3ppcF92YXJ5IG9uOyAjIFx1NjYyRlx1NTQyNlx1NTcyOCBodHRwIGhlYWRlciBcdTRFMkRcdTZERkJcdTUyQTAgVmFyeTogQWNjZXB0LUVuY29kaW5nXHVGRjBDXHU1RUZBXHU4QkFFXHU1RjAwXHU1NDJGXG4gICAgICAgICAqICAgLSAgICAuLi5cbiAgICAgICAgICogICAtIH1cbiAgICAgICAgICovXG4gICAgICAgIENvbXByZXNzaW9uKHtcbiAgICAgICAgICAgIHZlcmJvc2U6IHRydWUsIC8vIFx1NjYyRlx1NTQyNlx1NTcyOFx1NjNBN1x1NTIzNlx1NTNGMFx1NEUyRFx1OEY5M1x1NTFGQVx1NTM4Qlx1N0YyOVx1N0VEM1x1Njc5Q1xuICAgICAgICAgICAgZGlzYWJsZTogZmFsc2UsXG4gICAgICAgICAgICB0aHJlc2hvbGQ6IDEwMjQgKiAxMCwgLy8gXHU1OTgyXHU2NzlDXHU0RjUzXHU3OUVGXHU1OTI3XHU0RThFXHU5NjA4XHU1MDNDXHVGRjBDXHU1QzA2XHU4OEFCXHU1MzhCXHU3RjI5XHVGRjA4XHU1MzU1XHU0RjREXHVGRjFBYlx1RkYwOVx1RkYxQlx1NEY1M1x1NzlFRlx1OEZDN1x1NUMwRlx1NjVGNlx1NEUwRFx1ODk4MVx1NTM4Qlx1N0YyOVx1RkYwQ1x1NEVFNVx1NTE0RFx1OTAwMlx1NUY5N1x1NTE3Nlx1NTNDRFxuICAgICAgICAgICAgYWxnb3JpdGhtOiAnZ3ppcCcsIC8vIFx1NTM4Qlx1N0YyOVx1N0I5N1x1NkNENVxuICAgICAgICAgICAgZXh0OiAnLmd6JyxcbiAgICAgICAgICAgIGRlbGV0ZU9yaWdpbkZpbGU6IGZhbHNlLCAvLyBcdTUzOEJcdTdGMjlcdTU0MEVcdTY2MkZcdTU0MjZcdTUyMjBcdTk2NjRcdTZFOTBcdTY1ODdcdTRFRjZcbiAgICAgICAgfSksXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFx1NTNFRlx1NEVFNVx1NUM1NVx1NzkzQVx1Njc4NFx1NUVGQVx1NjVGNlx1OTU3Rlx1MzAwMWNodW5rIFx1NjU3MFx1OTFDRlx1NTNDQVx1NTkyN1x1NUMwRlxuICAgICAgICAgKiBQU1x1RkYxQVx1OTcwMFx1ODk4MVx1NUMwNiB2aXN1YWxpemVyIFx1NjNEMlx1NEVGNlx1NjUzRVx1NTIzMFx1NjcwMFx1NTQwRVx1NzY4NFx1NEY0RFx1N0Y2RVxuICAgICAgICAgKi9cbiAgICAgICAgdmlzdWFsaXplcih7XG4gICAgICAgICAgICBnemlwU2l6ZTogdHJ1ZSxcbiAgICAgICAgICAgIGJyb3RsaVNpemU6IHRydWUsXG4gICAgICAgICAgICBlbWl0RmlsZTogZmFsc2UsXG4gICAgICAgICAgICBmaWxlbmFtZTogJ3N0YXRzLmh0bWwnLCAvLyBcdTUyMDZcdTY3OTBcdTU2RkVcdTc1MUZcdTYyMTBcdTc2ODRcdTY1ODdcdTRFRjZcdTU0MERcbiAgICAgICAgICAgIG9wZW46IGZhbHNlLCAvLyBcdTU5ODJcdTY3OUNcdTVCNThcdTU3MjhcdTY3MkNcdTU3MzBcdTY3MERcdTUyQTFcdTdBRUZcdTUzRTNcdUZGMENcdTVDMDZcdTU3MjhcdTYyNTNcdTUzMDVcdTU0MEVcdTgxRUFc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