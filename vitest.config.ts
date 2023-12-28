import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.mjs';

export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            // 匹配包含测试文件的 glob 规则
            include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
            // 匹配排除测试文件的 glob 规则
            exclude: [
                '**/node_modules/**',
                '**/dist/**',
                '**/cypress/**',
                '**/.{idea,git,cache,output,temp}/**',
                '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
            ],
            // 生成 html 文件夹
            reporters: ['default', 'html'],
            // 显式提供全局 API
            globals: true,
            // 类型检查
            typecheck: {
                allowJs: true,
            },
        },
    }),
);
