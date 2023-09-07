<template>
    <div>
        <!-- search-form -->
        <x-search-form
            v-model="searchForm"
            :schemas="searchSchemas"
            :el-form-props="elFromProps"
            header="x-search-form"
            class="component"
            @search="handleSearch"
        >
        </x-search-form>

        <!-- form -->
        <el-card header="x-form" shadow="hover" class="component">
            <x-form ref="formRef" v-model="form" :el-form-props="elFromProps" :schemas="schemas"> </x-form>

            <el-button @click="handleDefault"> DEFAULT </el-button>
            <el-button @click="handleRest"> REST </el-button>
            <el-button type="primary" @click="handleTest"> TEST </el-button>
        </el-card>

        <!-- dialog-form -->
        <el-card header="x-dialog-form" shadow="hover" class="component">
            <el-button @click="openDialog">打开弹窗</el-button>

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
import type { ColProps, FormProps } from 'element-plus';
import type { XFormItemSchema } from '@/components/index';
import { ref } from 'vue';

/**
 ***************** search from *****************
 */
interface SearchForm {
    text: string;
    number: number;
    select: string | number;
    daterange: string[];
}

/**
 * searchForm 查询表单
 */
const searchForm = ref<SearchForm>({
    text: '',
    number: NaN,
    select: '',
    daterange: [],
});

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
            span: 12,
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
        label: '数字',
        prop: 'number',
        components: 'el-input-number',
        colProps: searchProps,
        elProps: {
            controlsPosition: 'right',
        },
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
 * 查询
 */
function handleSearch(form: any) {
    console.log('searchForm', form);
}

/**
 ***************** from *****************
 */
interface Form {
    text: string;
    number: number | undefined;
    radio: string | number | undefined;
    select: string | number;
    selectLabel: string;
    switch: boolean;
    date: string;
    dateTime: string;
}

/**
 * form ref
 */
const formRef = ref();

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
    dateTime: '',
});

/**
 * form props
 */
const elFromProps: Partial<FormProps> = {
    labelWidth: '100px',
};

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
        elProps: {
            labelSchema: 'selectLabel',
            options: [
                { label: 'label1', value: 'value1' },
                { label: 'label2', value: 'value2' },
            ],
        },
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
        elProps: {
            type: 'date',
            format: 'YYYY-MM-DD',
            valueFormat: 'YYYY-MM-DD',
        },
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
        prop: 'dateTime',
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
 * 默认值
 */
function handleDefault() {
    form.value = {
        text: '哈哈',
        number: 18,
        radio: 1,
        select: 'value1',
        selectLabel: 'label1',
        switch: true,
        date: '2023-08-31',
        dateTime: '2023-08-31 12:00:00',
    };
}

/**
 * 清空
 */
function handleRest() {
    form.value = {
        text: '',
        number: undefined,
        radio: undefined,
        select: '',
        selectLabel: '',
        switch: false,
        date: '',
        dateTime: '',
    };
}

/**
 * 测试
 */
async function handleTest() {
    // 表单校验
    const valid = await formRef.value.validate();

    if (!valid) {
        return;
    }

    console.log('form', form.value);
}

/**
 ***************** dialog from *****************
 */
/**
 * form ref
 */
const dialogFormRef = ref();

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
