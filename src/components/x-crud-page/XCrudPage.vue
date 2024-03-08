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
import { ElButton, ElUpload } from 'element-plus';

import { UPLOAD_URL } from '@/constant/global';

import type { CrudAction, CrudInstance, XCrudPageProp, XTableOperationButton } from './interface';
import useIndex from './useIndex';

/**
 * props
 * @version Vue@3.3：https://blog.vuejs.org/posts/vue-3-3
 * 以前 defineProps 与 defineEmits 仅限于本地类型，并且仅支持类型文字和接口；
 * 这是因为 Vue 需要能够分析 props 接口上的属性，以便生成相应的运行时选项；
 * 此限制现已在 Vue@3.3 中得到解决，编译器现在可以解析导入的类型，并支持一组有限的复杂类型；
 */
const props = withDefaults(defineProps<XCrudPageProp>(), {
    showSearch: true,
    searchText: '查询',
    resetText: '重置',
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
    confirmText: '确认',
    cancelText: '取消',
    validate: undefined,
    formatFormData: undefined,
    afterSubmit: undefined,

    permission: () => ({}),
    afterOpen: undefined,
    reset: undefined,
});

/**
 * slots
 * @version Vue@3.3：https://blog.vuejs.org/posts/vue-3-3
 * 新的 defineSlots 宏可用于声明预期的插槽及其各自的预期插槽属性
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
