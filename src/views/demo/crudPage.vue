<template>
    <x-crud-page
        el-type="el-drawer"
        :search-form-schemas="searchSchemas"
        :create-schemas="schemas"
        :edit-schemas="schemas"
        :columns="columns"
        :data="data"
        search-text="查询"
        reset-text="重置"
        table-title="数据列表"
        create-title="新增"
        edit-title="编辑"
        save-text="保存"
        confirm-text="确认"
        cancel-text="取消"
    ></x-crud-page>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { type ColProps } from 'element-plus';

import type { XFormItemSchema } from '@/components/x-form/interface';
import type { XTableColumn } from '@/components/x-table/interface';

/**
 * 查询表单配置
 */
const searchSchemas = computed<XFormItemSchema[]>(() => [
    {
        label: '日期范围',
        prop: 'daterange',
        components: 'el-date-picker',
        elProps: {
            type: 'daterange',
            format: 'YYYY-MM-DD',
            valueFormat: 'YYYY-MM-DD',
        },
    },
    {
        label: '文本',
        prop: 'text',
        components: 'el-input',
    },
    {
        label: '文本',
        prop: 'text',
        components: 'el-input',
    },
    {
        label: '下拉',
        prop: 'select',
        components: 'el-select-v2',
        elProps: {
            options: [
                { label: 'label1', value: 'value1' },
                { label: 'label2', value: 'value2' },
            ],
        },
    },
    {
        label: '下拉',
        prop: 'select',
        components: 'el-select-v2',
        elProps: {
            options: [
                { label: 'label1', value: 'value1' },
                { label: 'label2', value: 'value2' },
            ],
        },
    },
]);

/**
 * 表单配置
 */
const colProps: Partial<ColProps> = {
    span: 12,
};
const schemas = computed<XFormItemSchema[]>(() => [
    {
        label: '文本',
        prop: 'text',
        components: 'el-input',
        colProps,
        elFormItemProps: {
            rules: [
                {
                    required: true,
                    message: '文本不能为空',
                },
            ],
        },
    },
    {
        label: '数字',
        prop: 'number',
        components: 'el-input-number',
        colProps,
        elProps: {
            controlsPosition: 'right',
        },
        elFormItemProps: {
            rules: [
                {
                    required: true,
                    message: '数字不能为空',
                },
            ],
        },
    },
    {
        label: '单选',
        prop: 'radio',
        components: 'x-radio',
        colProps,
        elProps: {
            options: [
                { labelName: '是', label: 1 },
                { labelName: '否', label: 2 },
            ],
        },
        elFormItemProps: {
            rules: [
                {
                    required: true,
                    message: '单选不能为空',
                },
            ],
        },
    },
    {
        label: '下拉',
        prop: 'select',
        components: 'el-select-v2',
        colProps,
        elProps: (form: Record<string, string | number | boolean>) => ({
            labelSchema: 'selectLabel',
            options: [
                { label: 'label1', value: 'value1' },
                { label: 'label2', value: 'value2' },
            ],
            onChange: (value: string | number) => {
                if (value === 'value1') {
                    form.switch = true;
                } else {
                    form.switch = false;
                }
            },
        }),
        elFormItemProps: {
            rules: [
                {
                    required: true,
                    message: '下拉不能为空',
                },
            ],
        },
    },
    {
        label: '日期',
        prop: 'date',
        components: 'el-date-picker',
        colProps,
        elProps: (form: Record<string, string | number | boolean>) => ({
            type: 'date',
            format: 'YYYY-MM-DD',
            valueFormat: 'YYYY-MM-DD',
            onChange: (value: string) => {
                form.datetime = dayjs(value).format('YYYY-MM-DD HH:mm:ss');
            },
        }),
        elFormItemProps: {
            rules: [
                {
                    required: true,
                    message: '日期不能为空',
                },
            ],
        },
    },
    {
        label: '日期时间',
        prop: 'datetime',
        components: 'el-date-picker',
        colProps,
        elProps: {
            type: 'datetime',
            format: 'YYYY-MM-DD HH:mm:ss',
            valueFormat: 'YYYY-MM-DD HH:mm:ss',
        },
        elFormItemProps: {
            rules: [
                {
                    required: true,
                    message: '日期时间不能为空',
                },
            ],
        },
    },
    {
        label: '开关',
        prop: 'switch',
        components: 'el-switch',
        colProps,
    },
]);

/**
 * 表格列配置
 */
const columns = computed<XTableColumn[]>(() => [
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
]);

/**
 * 表格数据
 */
const data = [
    {
        id: '11',
        name: '小明',
        age: '18',
        sex: '男',
        hobby: '跑步',
    },
    {
        id: '22',
        name: '小强',
        age: '18',
        sex: '男',
        hobby: '骑行',
    },
    {
        id: '33',
        name: '小红',
        age: '20',
        sex: '女',
        hobby: '跳舞',
    },
];
</script>
<style lang="scss" scoped>
.component {
    margin-bottom: 10px;
}
</style>
