/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    root: true,
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-config-typescript',
        '@vue/eslint-config-prettier/skip-formatting',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        'prettier/prettier': 'error',
        'no-var': ['error'],
        // 不要重复引入一个模块
        'no-duplicate-imports': ['warn'],
        // 组件名称以驼峰格式命名
        'vue/multi-word-component-names': ['off'],
        // 组件名在模板中的命名方式的规则
        'vue/component-name-in-template-casing': ['error', 'kebab-case'],
        // 声明但未使用的变量
        '@typescript-eslint/no-unused-vars': ['warn'],
        // any
        '@typescript-eslint/no-explicit-any': ['warn'],
        // 箭头函数
        'arrow-parens': [
            'error',
            'as-needed',
            {
                requireForBlockBody: false,
            },
        ],
    },
};
