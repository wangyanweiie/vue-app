/// <reference types="vitest" />
import { defineConfig, mergeConfig } from 'vitest/config';

import viteConfig from './vite.config.mjs';

/**
 * 如果你决定为 Vite 和 Vitest 使用两个单独的配置文件，
 * 请确保在 Vitest 配置文件中定义相同的 Vite 选项，因为它将覆盖你的 Vite 文件，而不是扩展它；
 * 你还可以使用 vite 或 vitest/config 条目中的 mergeConfig 方法将 Vite 配置与 Vitest 配置合并。
 */
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
