<template>
    <div>
        <x-search-form
            v-model="searchForm"
            :schemas="searchSchemas"
            :el-form-props="elFromProps"
            header="x-search-form"
            class="component"
            @search="handleSearch"
        >
        </x-search-form>

        <!-- <el-card header="x-form" shadow="hover" class="component">
            <x-form ref="formRef" v-model="form" :el-form-props="elFromProps" :schemas="schemas"> </x-form>
            <el-button @click="handleDefault"> DEFAULT </el-button>
            <el-button @click="handleRest"> REST </el-button>
            <el-button type="primary" @click="handleConfirm"> CONFIRM </el-button>
        </el-card> -->

        <el-card header="x-dialog-form" shadow="hover" class="component">
            <el-button @click="openDialog">新增</el-button>

            <x-dialog-form
                ref="dialogFormRef"
                v-model="dialogVisible"
                v-model:data="form"
                title="新增"
                :schemas="schemas"
                :loading="loading"
                @submit="handleSubmit"
            ></x-dialog-form>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { type ColProps, type FormProps } from 'element-plus';

import type { XFormItemSchema } from '@/components/x-form/interface';

/**
 * search-form 表单类型
 */
interface SearchForm {
    text: string;
    select: string | number;
    daterange: string[];
}

/**
 * form 表单类型
 */
interface Form {
    text: string;
    number: number | undefined;
    radio: string | number | undefined;
    select: string | number;
    selectLabel: string;
    switch: boolean;
    date: string;
    datetime: string;
}

/**
 * form props
 */
const elFromProps: Partial<FormProps> = {
    labelWidth: '100px',
};

/**
 * 查询表单配置
 */
const searchProps: Partial<ColProps> = {
    span: 6,
};
const searchSchemas: XFormItemSchema[] = [
    {
        label: '日期范围',
        prop: 'daterange',
        components: 'el-date-picker',
        colProps: {
            span: 6,
        },
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
        colProps: searchProps,
    },
    {
        label: '下拉',
        prop: 'select',
        components: 'el-select-v2',
        colProps: searchProps,
        elProps: {
            options: [
                { label: 'label1', value: 'value1' },
                { label: 'label2', value: 'value2' },
            ],
        },
    },
];

/**
 * 表单配置
 */
const colProps: Partial<ColProps> = {
    span: 12,
};
const schemas: XFormItemSchema[] = [
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
                { label: '是', value: 1 },
                { label: '否', value: 2 },
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
];

/**
 * searchForm 查询表单
 */
const searchForm = ref<SearchForm>({
    text: '',
    select: '',
    daterange: [],
});

/**
 * 查询
 */
function handleSearch(form: any) {
    console.log('searchForm', form);
}

/**
 * form 表单
 */
const form = ref<Form>({
    text: '',
    number: undefined,
    radio: undefined,
    select: '',
    selectLabel: '',
    switch: false,
    date: '',
    datetime: '',
});

// /**
//  * form-ref
//  */
// const formRef = ref();

// /**
//  * 默认值
//  */
// function handleDefault() {
//     button.value = {
//         text: '哈哈',
//         number: 18,
//         radio: 1,
//         select: 'value1',
//         selectLabel: 'label1',
//         switch: true,
//         date: '2023-08-31',
//         datetime: '2023-08-31 12:00:00',
//     };
// }

// /**
//  * 清空
//  */
// function handleRest() {
//     button.value = {
//         text: '',
//         number: undefined,
//         radio: undefined,
//         select: '',
//         selectLabel: '',
//         switch: false,
//         date: '',
//         datetime: '',
//     };
// }

// /**
//  * 确认
//  */
// async function handleConfirm() {
//     // 表单校验
//     const valid = await formRef.value.validate();

//     if (!valid) {
//         return;
//     }

//     console.log('form', button.value);
// }

/**
 * 弹窗是否展示
 */
const dialogVisible = ref<boolean>(false);

/**
 * loading
 */
const loading = ref<boolean>(false);

/**
 * 打开弹窗
 */
function openDialog() {
    dialogVisible.value = true;
}

/**
 * dialog-form-ref
 */
const dialogFormRef = ref();

/**
 * 提交
 */
async function handleSubmit(form: any) {
    // 表单校验
    const valid = await dialogFormRef.value.validate();

    if (!valid) {
        return;
    }

    console.log('dialogForm', form);
}
</script>
<style lang="scss" scoped>
.component {
    margin-bottom: 10px;
}
</style>
