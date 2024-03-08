import { describe, it } from 'vitest';

import { checkNumberFormat, handleToHumpFormat, keepDecimalPrecision, transformEnumToOptions } from '../hooks';

enum STATUS {
    '在用' = 1,
    '停用' = 2,
}

const statusList = [
    {
        label: '在用',
        value: 1,
    },
    {
        label: '停用',
        value: 2,
    },
];

/**
 * concurrent 并发运行
 * 还可以将 .skip、.only 以及 .todo 用于并发测试套件和测试用例
 */
describe('hooks', () => {
    it.concurrent('是否为数字格式', async ({ expect }) => {
        // expect(checkNumberFormat('3.1415')).toBe(3.1415);
        // expect(checkNumberFormat('3.14.15')).toBe(null);

        /**
         * 测试快照
         * 此测试在第一次运行时，Vitest 会创建一个快照文件，快照文件应该与代码更改一起提交，并作为代码审查过程的一部分进行审查；
         * 在随后的测试运行中，Vitest 会将执行的输出与之前的快照进行比较；若匹配，测试通过；
         * 若不匹配，要么测试运行时在你的代码中发现了应该修复的错误，要么实现已经更改，需要更新快照；
         */
        expect(checkNumberFormat('3.1415')).toMatchSnapshot();
    });

    it.concurrent('强制保留精度', async ({ expect }) => {
        expect(keepDecimalPrecision(1, 5)).toBe('1.00000');
        expect(keepDecimalPrecision(3.1415, 5)).toBe('3.14150');
    });

    it.concurrent('枚举转下拉列表', async ({ expect }) => {
        expect(JSON.stringify(transformEnumToOptions(STATUS))).toBe(JSON.stringify(statusList));
    });

    it.concurrent('字符串"-"拼接转驼峰', async ({ expect }) => {
        expect(handleToHumpFormat('x-table', 'min')).toBe('xTable');
        expect(handleToHumpFormat('x-table', 'max')).toBe('XTable');
    });
});
