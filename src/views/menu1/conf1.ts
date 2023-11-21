import type { XDescriptionColumn } from '@/components/Description/interface';

/**
 * 表格列配置
 */
export const columns: XDescriptionColumn[] = [
    {
        label: '姓名',
        prop: 'name',
    },
    {
        label: '年龄',
        prop: 'age',
    },
    {
        label: '性别',
        prop: 'sex',
    },
    {
        label: '爱好',
        prop: 'hobby',
    },
    {
        label: '地址',
        prop: 'address',
    },
    {
        label: '家乡',
        prop: 'home',
        formatter: (data: Record<string, any>, column: XDescriptionColumn, cellValue: any) => {
            return cellValue ?? '/';
        },
    },
];
