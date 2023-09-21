import type { XEditTableColumn } from '@/components/EditTable/interface';
import type { XTableColumn } from '@/components/Table/interface';

/**
 * 表格列配置
 */
export const columns: XTableColumn[] = [
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
];

/**
 * 虚拟表格列配置
 */
export const columnsV2: any[] = [
    {
        title: '姓名',
        key: 'name',
        dataKey: 'name',
    },
    {
        title: '年龄',
        key: 'age',
        dataKey: 'age',
    },
    {
        title: '性别',
        key: 'sex',
        dataKey: 'sex',
    },
    {
        title: '爱好',
        key: 'hobby',
        dataKey: 'hobby',
    },
];

/**
 * 可编辑表格列配置
 */
export const editColumns: XEditTableColumn[] = [
    {
        label: '姓名',
        prop: 'name',
        edit: false,
    },
    {
        label: '年龄',
        prop: 'age',
        required: true,
    },
    {
        label: '性别',
        prop: 'sex',
        required: true,
    },
    {
        label: '爱好',
        prop: 'hobby',
    },
];
