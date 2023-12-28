<template>
    <div>
        <!-- 查询条件 -->
        <x-search-form
            v-if="showSearch && searchFormSchemas.length > 0"
            ref="searchFormRef"
            v-model="searchData"
            :schemas="searchFormSchemas"
            :el-form-props="searchFormProps"
            :loading="searchLoading"
            @search="handleSearch"
            @reset="handleReset"
        ></x-search-form>

        <!-- 表格列 -->
        <x-table
            ref="tableRef"
            :title="tableTitle"
            :show-index="showIndex"
            :selectable="selectable"
            :divide-page="dividePage"
            :columns="columns"
            :data="data"
            :row-key="rowKey"
            :el-table-props="elTableProps"
            :api="api"
            :default-params="params"
            :actions="actionConfig"
        >
            <template #operation="{ checkedRows }">
                <template v-for="button in operationConfig(checkedRows)" :key="button.label">
                    <component
                        :is="button.isUpload ? ElUpload : ElButton"
                        v-permission="getPermission(button.label)"
                        :type="button.type"
                        :icon="button.icon"
                        :loading="button.loading"
                        :disabled="button.disabled"
                        :action="uploadUrl"
                        :file-list="fileList"
                        :show-file-list="false"
                        :class="uploadClass(!!button.isUpload)"
                        @change="handleUpload"
                        @click="button.onClick.call(undefined, checkedRows)"
                    >
                        <el-button
                            v-if="button.isUpload"
                            :type="button.type"
                            :icon="button.icon"
                            :disabled="button.disabled || button.loading"
                            @click="button.onClick"
                        >
                            {{ button.label }}
                        </el-button>
                        {{ button.isUpload ? undefined : button.label }}
                    </component>
                </template>
            </template>
        </x-table>

        <!-- 新增表单 -->
        <x-dialog-form
            ref="createRef"
            v-model:data="createData"
            v-model="createVisible"
            :el-type="elType"
            :title="createTitle"
            :schemas="createSchemas"
            :el-form-props="elFormProps"
            :loading="createLoading"
            :show-confirm="showConfirm"
            @submit="handleCreate"
        >
            <!-- 表单附加区域插槽 -->
            <template #form-append>
                <slot name="create-append" :form="createData"></slot>
            </template>

            <!-- 操作区域插槽 -->
            <template #action>
                <el-button v-if="createSaveApi" :loading="createLoading" type="primary" @click="handleSave">
                    保存
                </el-button>
            </template>
        </x-dialog-form>

        <!-- 编辑表单 -->
        <x-dialog-form
            ref="editRef"
            v-model:data="editData"
            v-model="editVisible"
            :title="editTitle"
            :el-type="elType"
            :schemas="editSchemas"
            :el-form-props="elFormProps"
            :loading="editLoading"
            :show-confirm="showConfirm"
            @submit="handleEdit"
        >
            <template #form-append>
                <slot name="edit-append" :form="editData"></slot>
            </template>

            <template #action>
                <el-button v-if="editSaveApi" :loading="editLoading" type="primary" @click="handleSave">
                    保存
                </el-button>
            </template>
        </x-dialog-form>

        <!-- 插槽，用于新增/编辑时触发其他联动操作，比如再打开一个弹窗进行选择所需信息 -->
        <slot name="create" :form="createData"></slot>
        <slot name="edit" :form="editData"></slot>
    </div>
</template>

<script lang="ts" setup>
import { type FormProps, type TableProps, ElButton, ElUpload } from 'element-plus';
import type { XTableColumn } from '@/components/Table/interface';
import type { XFormItemSchema } from '@/components/Form/interface';
import { UPLOAD_URL } from '@/constant/global';
import type { CrudAction, CrudInstance, FormOperationType, XTableOperationButton } from './interface';
import useIndex from './useIndex';

/**
 * props
 */
const props = withDefaults(
    defineProps<{
        /** 是否显示查询表单 */
        showSearch?: boolean;
        /** 查询表单 props */
        searchFormProps?: Partial<FormProps>;
        /** 查询表单配置 */
        searchFormSchemas?: XFormItemSchema[];

        /** 表格标题 */
        tableTitle?: string;
        /** 表格行 key */
        rowKey?: string;
        /** 表格配置 */
        columns?: XTableColumn[];
        /** 表格静态数据 */
        data?: Record<string, any>[];
        /** 表格是否显示索引列 */
        showIndex?: boolean;
        /** 表格是否可选 */
        selectable?: boolean;
        /** 表格是否分页 */
        dividePage?: boolean;
        /** 表格是否懒加载 */
        lazy?: boolean;
        /** 表格 props */
        elTableProps?: Partial<TableProps<any>>;
        /** 上传路径 */
        uploadUrl?: string;
        /** 下载模版 URL */
        templateUrl?: string;
        /** 表格操作区按钮 */
        operations?: XTableOperationButton[] | ((rows?: Record<string, any>[]) => XTableOperationButton[]);
        /** 操作列配置 */
        actions?: CrudAction | ((row?: any, index?: number) => CrudAction);
        /** 表格查询 API */
        api?: (data?: any) => Promise<any>;
        /** 表格查询 API 入参 */
        params?: Record<string, string | number>;
        /** 表格 API 查询前数据预处理 */
        preQuery?: <T>(params: T) => T;
        /** 导入 API */
        importApi?: (data?: any) => Promise<any>;
        /** 导出 API */
        exportApi?: (data?: any) => Promise<any>;
        /** 删除 API */
        deleteApi?: (data?: any) => Promise<any>;

        /** 新增弹窗标题 */
        createTitle?: string;
        /** 新增表单配置 */
        createSchemas?: XFormItemSchema[];
        /** 新增表单默认值 */
        createDefaultData?: Record<string, any>;
        /** 新增 API */
        createApi?: (data?: any) => Promise<any>;
        /** 新增保存 API */
        createSaveApi?: (data?: any) => Promise<any>;

        /** 编辑弹窗标题 */
        editTitle?: string;
        /** 编辑表单配置 */
        editSchemas?: XFormItemSchema[];
        /** 编辑表单默认值 */
        editDefaultData?: Record<string, any>;
        /** 编辑 API */
        editApi?: (data?: any) => Promise<any>;
        /** 编辑保存 API */
        editSaveApi?: (data?: any) => Promise<any>;

        /** 弹窗类型 */
        elType?: 'el-dialog' | 'el-drawer';
        /** 表单 props */
        elFormProps?: Partial<FormProps>;
        /** 是否显示确认按钮 */
        showConfirm?: boolean;
        /** 表单校验 */
        validate?: () => Promise<boolean>;
        /** 新增/编辑前参数处理 */
        formatFormData?: <T>(form: T, isSave?: boolean) => T;
        /** 新增/编辑提交后处理 */
        afterSubmit?: (form: Record<string, any>, operationType: FormOperationType) => void;

        /** 权限 */
        permission?: Record<string, string[]>;
        /** 弹窗打开后处理 */
        afterOpen?: <T>(data?: T) => T;
        /** 重置 */
        reset?: () => void;
    }>(),
    {
        showSearch: true,
        searchFormProps: () => ({
            labelWidth: '80px',
        }),
        searchFormSchemas: () => [],

        tableTitle: '数据列表',
        rowKey: 'id',
        columns: () => [],
        data: () => [],
        showIndex: false,
        selectable: true,
        dividePage: true,
        lazy: false,
        elTableProps: () => ({}),
        uploadUrl: UPLOAD_URL,
        templateUrl: '',
        operations: () => ['新增', '下载模板', '导入', '导出', '批量删除'] as XTableOperationButton[],
        actions: () => ['编辑', '删除'] as CrudAction,
        api: undefined,
        params: () => ({}),
        preQuery: undefined,
        importApi: undefined,
        exportApi: undefined,
        deleteApi: undefined,

        createTitle: '新增',
        createSchemas: () => [],
        createDefaultData: () => ({}),
        createApi: undefined,
        createSaveApi: undefined,

        editTitle: '编辑',
        editSchemas: () => [],
        editDefaultData: () => ({}),
        editApi: undefined,
        editSaveApi: undefined,

        elType: 'el-dialog',
        elFormProps: () => ({
            labelWidth: '80px',
        }),
        showConfirm: true,
        validate: undefined,
        formatFormData: undefined,
        afterSubmit: undefined,

        permission: () => ({}),
        afterOpen: undefined,
        reset: undefined,
    },
);

/**
 * slots
 */
defineSlots<{
    create(props: { form: Record<string, any> }): any;
    edit(props: { form: Record<string, any> }): any;
    'create-append'(props: { form: Record<string, any> }): any;
    'edit-append'(props: { form: Record<string, any> }): any;
}>();

/**
 * useIndex
 */
const {
    searchFormRef,
    searchData,
    searchLoading,
    handleSearch,
    handleReset,

    tableRef,
    uploadClass,
    operationConfig,
    actionConfig,
    getPermission,
    getTableData,
    clearSelection,
    reload,

    fileList,
    handleUpload,

    createRef,
    createVisible,
    createData,
    createLoading,
    handleCreate,

    editRef,
    editVisible,
    editData,
    editLoading,
    handleEdit,
    handleSave,

    setFormData,
    getFormData,
    clearValidate,
} = useIndex(props);

/**
 * 暴露的实例方法
 */
defineExpose<CrudInstance>({
    getTableData,
    clearSelection,
    reload,
    getFormData,
    setFormData,
    clearValidate,
});
</script>

<style lang="scss" scoped>
.upload-button {
    margin-left: 12px;
    margin-right: 12px;
}
</style>
