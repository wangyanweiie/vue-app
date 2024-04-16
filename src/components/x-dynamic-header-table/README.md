# 数据格式

``` typescript
/**
 * 表头数据列表
 */
const columns = ref<any>([
    {
        prop: 'typicalRetentionTime',
        label: '典型保留时间/min',
        child: [
            {
                prop: 'qualitativeStructure',
                label: '定性结构',
            },
        ],
    },
    {
        prop: 'one',
        label: '1.142',
        child: [
            {
                prop: 'first',
                label: '',
            },
        ],
    },
    {
        prop: 'two',
        label: '1.292',
        child: [
            {
                prop: 'first',
                label: 'CA0060-Z1',
            },
        ],
    },
    {
        prop: 'three',
        label: '1.442',
        child: [
            {
                prop: 'first',
                label: 'CA0060-P1',
            },
        ],
    },
    {
        prop: 'four',
        label: '1.575',
        child: [
            {
                prop: 'first',
                label: '',
            },
        ],
    },
    {
        prop: 'five',
        label: '1.642',
        child: [
            {
                prop: 'first',
                label: '主峰',
            },
        ],
    },
    {
        prop: 'six',
        label: '1.800',
        child: [
            {
                prop: 'first',
                label: '',
            },
        ],
    },
    {
        prop: 'seven',
        label: '1.858',
        child: [
            {
                prop: 'first',
                label: '掉一氟',
            },
        ],
    },
    {
        prop: 'eight',
        label: '1.933',
        child: [
            {
                prop: 'first',
                label: '',
            },
        ],
    },
    {
        prop: 'date',
        label: '送检日期',
    },
]);

/**
 * 表格数据列表
 */
const tableData = ref<any>([
    {
        typicalRetentionTime: {
            qualitativeStructure: '批号1',
        },
        one: {
            first: '',
        },
        two: {
            first: '0.0145',
        },
        three: {
            first: '0.0057',
        },
        four: {
            first: '0.0006',
        },
        five: {
            first: '99.9846',
        },
        six: {
            first: '',
        },
        seven: {
            first: '0.0002',
        },
        eight: {
            first: '',
        },
        data: '2024-04-16',
    },
]);
```
