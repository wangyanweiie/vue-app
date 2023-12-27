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
            :actions="actionConf"
        >
            <template #operation="{ checkedRows }">
                <template v-for="(btn, index) in operationConf(checkedRows)" :key="index">
                    <component
                        :is="btn.isUpload ? 'el-upload' : 'el-button'"
                        v-permission="getPermission(btn.label)"
                        :type="btn.type"
                        :icon="btn.icon"
                        :loading="btn.loading"
                        :disabled="btn.disabled"
                        :action="uploadUrl"
                        :file-list="fileList"
                        :show-file-list="false"
                        :class="uploadClass(!!btn.isUpload)"
                        @change="handleUpload"
                        @click="btn.onClick.call(undefined, checkedRows)"
                    >
                        <el-button
                            v-if="btn.isUpload"
                            :type="btn.type"
                            :icon="btn.icon"
                            :disabled="btn.disabled || btn.loading"
                            @click="btn.onClick"
                        >
                            {{ btn.label }}
                        </el-button>
                        {{ btn.isUpload ? undefined : btn.label }}
                    </component>
                </template>
            </template>
        </x-table>

        <!-- 新增表单 -->
        <x-dialog-form
            ref="createRef"
            v-model:data="createData"
            v-model="createVisible"
            :el-type="formType"
            :title="createTitle"
            :schemas="createSchemas"
            :el-form-props="elFormProps"
            :loading="createLoading"
            :show-confirm="showConfirm"
            @submit="handleCreate"
        >
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
            :el-type="formType"
            :schemas="editSchemas"
            :el-form-props="elFormProps"
            :loading="editLoading"
            :show-confirm="showConfirm"
            @submit="handleEdit"
        >
            <template #form-append>
                <slot name="edit-append" :form="editData"></slot>
            </template>

            <!-- 操作区域插槽 -->
            <template #action>
                <el-button v-if="editSaveApi" :loading="editLoading" type="primary" @click="handleSave">
                    保存
                </el-button>
            </template>
        </x-dialog-form>

        <slot name="create" :form="createData"></slot>
        <slot name="edit" :form="editData"></slot>
    </div>
</template>

<script lang="ts" setup>
import type { FormProps, TableProps } from 'element-plus';
import { Delete, Download, Plus, Upload } from '@element-plus/icons-vue';
import type { XTableActionButton, XTableColumn } from '@/components/Table/interface';
import type { XFormItemSchema } from '@/components/Form/interface';
import { UPLOAD_URL } from '@/constant/global';
import { useCrud, genericAction, genericOperationAction } from './useIndex';
import type {
    genericOperationType,
    genericActionType,
    CrudAction,
    CrudInstance,
    OperationButton,
    ButtonOption,
    FormOperationType,
} from './interface';

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
        operations?: OperationButton[] | ((rows?: Record<string, any>[]) => OperationButton[]);
        /** 操作列配置 */
        actions?: CrudAction | ((data?: any, index?: number) => CrudAction);
        /** 表格查询 API */
        api?: (data?: any) => Promise<any>;
        /** 表格查询 API 入参 */
        params?: Record<string, string | number>;
        /** 表格 API 查询前数据预处理 */
        preQuery?: (data: Record<string, string | number>) => Record<string, string | number>;
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
        formType?: 'el-dialog' | 'el-drawer';
        /** 表单 props */
        elFormProps?: Partial<FormProps>;
        /** 是否显示确认按钮 */
        showConfirm?: boolean;
        /** 表单校验 */
        validate?: () => Promise<boolean>;
        /** 新增/编辑前参数处理 */
        formatFormData?: (data: any, isSave?: boolean) => any;
        /** 新增/编辑提交后处理 */
        afterSubmit?: (data: any, operationType: FormOperationType) => any;

        /** 权限 */
        permission?: Record<string, string[]>;
        /** 弹窗打开后处理 */
        afterOpen?: (data?: any) => any;
        /** 重置 */
        reset?: () => void;
    }>(),
    {
        showSearch: true,
        searchFormProps: () => ({
            labelWidth: '150px',
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
        operations: () => ['新增', '下载模板', '导入', '导出', '批量删除'] as OperationButton[],
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

        formType: 'el-dialog',
        elFormProps: () => ({
            labelWidth: '150px',
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
 * 上传按钮样式
 * @param isUpload 是否上传按钮
 * @returns 样式
 */
function uploadClass(isUpload: boolean): 'upload-btn' | '' {
    if (isUpload) {
        return 'upload-btn';
    }

    return '';
}

/**
 * @description 操作按钮配置
 *  @param rows 表格行数据
 *  @returns 表格操作按钮配置
 */
function operationConf(rows: Record<string, any>[]): ButtonOption[] {
    let buttons = [];

    if (!props.operations) {
        return [];
    }

    if (typeof props.operations === 'function') {
        buttons = props.operations(rows);
    } else {
        buttons = props.operations;
    }

    return buttons.map(item => getOperationConfItem(item));
}

/**
 * @description 获取操作按钮配置
 * @param item 操作项配置
 * @returns 按钮配置
 */
function getOperationConfItem(item: OperationButton | genericOperationType): ButtonOption {
    const obj: { [key in genericOperationType]: ButtonOption } = {
        新增: {
            label: '新增',
            icon: Plus,
            type: 'primary',
            isUpload: false,
            onClick: openCreate,
        },
        下载模板: {
            label: '下载模板',
            onClick: handleDownloadTemplate,
            icon: Download,
            type: '',
        },
        导入: {
            label: '导入',
            onClick: handleUpload,
            icon: Upload,
            type: '',
            isUpload: true,
            loading: importLoading.value,
        },
        导出: {
            label: '导出',
            onClick: handleExport,
            icon: Download,
            type: '',
            loading: exportLoading.value,
        },
        批量删除: {
            label: '批量删除',
            onClick: handleMultiDelete,
            icon: Delete,
            type: 'danger',
        },
    };

    if (typeof item === 'string') {
        return obj[item];
    }

    if (genericOperationAction.includes(item.label)) {
        return {
            ...obj[item.label as genericOperationType],
            ...item,
        };
    }

    return item;
}

/**
 * @description 行操作按钮配置
 * @param row 表格行数据
 * @returns 表格操作按钮配置
 */
function actionConf(row: Record<string, any>, index: number): XTableActionButton[] {
    let buttons = [];

    if (!props.actions) {
        return [];
    }

    if (typeof props.actions === 'function') {
        buttons = props.actions(row, index);
    } else {
        buttons = props.actions;
    }

    return buttons.map(item => getActionConfItem(row, item)) ?? [];
}

/**
 * @description 获取行操作按钮配置
 * @param row 行数据
 * @param item 操作项配置
 * @returns 按钮配置
 */
function getActionConfItem(row: any, item: XTableActionButton | genericActionType): XTableActionButton {
    const obj: { [key in genericActionType | string]: XTableActionButton } = {
        编辑: {
            label: '编辑',
            onClick: (item as XTableActionButton).onClick
                ? (item as XTableActionButton).onClick
                : openEdit.bind(null, row),
        },
        删除: {
            label: '删除',
            type: 'danger',
            onClick: handleDelete.bind(null, [row.id ?? '']),
        },
    };

    if (typeof item === 'string') {
        return obj[item];
    }

    if (genericAction.includes(item.label)) {
        return {
            ...obj[item.label],
            ...item,
        };
    }

    return item;
}

/**
 * @description 获取权限
 * @param label 权限名称
 * @returns 权限
 */
function getPermission(label: string): string[] | undefined {
    if (!props.permission) {
        return undefined;
    }

    return props.permission[label];
}

const {
    searchFormRef,
    searchData,
    searchLoading,
    handleSearch,
    handleReset,

    fileList,
    tableRef,
    importLoading,
    exportLoading,
    handleDownloadTemplate,
    handleUpload,
    handleExport,
    handleDelete,
    handleMultiDelete,

    createRef,
    createVisible,
    createData,
    createLoading,
    openCreate,
    handleCreate,

    editRef,
    editVisible,
    editData,
    editLoading,
    openEdit,
    handleEdit,
    handleSave,

    setFormData,
    getFormData,
} = useCrud({
    rowKey: props.rowKey,
    templateUrl: props.templateUrl,
    params: props.params,
    preQuery: props.preQuery,
    importApi: props.importApi,
    exportApi: props.exportApi,
    deleteApi: props.deleteApi,

    createDefaultData: props.createDefaultData,
    createApi: props.createApi,
    createSaveApi: props.createSaveApi,

    editDefaultData: props.editDefaultData,
    editApi: props.editApi,
    editSaveApi: props.editSaveApi,

    validate: props.validate,
    formatFormData: props.formatFormData,
    afterSubmit: props.afterSubmit,

    afterOpen: props.afterOpen,
    reset: props.reset,
});

/**
 * 重新加载
 */
function reload(): void {
    tableRef.value?.loadData(searchData.value);
}

/**
 * 清除选中
 */
function clearSelection(): void {
    tableRef.value?.clearSelection();
}

/**
 * 获取表格数据
 */
function getTableData(): any[] {
    return tableRef.value?.getTableData();
}

/**
 * 校验
 */
async function clearValidate() {
    if (props.createApi) {
        const valid = await createRef.value?.validate();

        if (!valid) {
            return;
        }
    } else if (props.editApi) {
        const valid = await editRef.value?.validate();

        if (!valid) {
            return;
        }
    }
}

/**
 * 实例方法
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
.upload-btn {
    margin-left: 12px;
    margin-right: 12px;
}
</style>
