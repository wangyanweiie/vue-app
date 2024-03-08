import { Delete, Download, Plus, Upload } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

import type { XFormInstance } from '@/components/Form/interface';
import type { XTableActionButton, XTableInstance } from '@/components/Table/interface';
import { OPERATION_NOTICE } from '@/constant/base';
import { downloadFileFromURL } from '@/utils/common-methods';
import { confirmDeleteMessage } from '@/utils/confirm-message';

import type {
    genericActionType,
    genericOperationType,
    UseIndexReturn,
    XCrudPageProp,
    XTableOperationButton,
    XTableOperationButtonOption,
} from './interface';

export const genericAction = ['编辑', '删除'];
export const genericOperationAction = ['新增', '下载模板', '导入', '导出', '批量删除'];

/**
 * @description useIdex
 * @param props props
 * @returns 返回值
 */
export default function useIndex(props: XCrudPageProp): UseIndexReturn {
    /**
     ********************** 查询 **********************
     */
    // 表单实例
    const searchFormRef = ref<XFormInstance>();
    // loading
    const searchLoading = ref<boolean>(false);
    // 表单数据
    const searchData = ref<Record<string, any>>({});

    /**
     * @description 查询
     * @returns {Promise<void>}
     */
    async function handleSearch(): Promise<void> {
        let params = {
            ...searchData.value,
        };

        // 预查询，如果需要对查询数据额外处理的可以使用这个钩子，返回值就是查询条件
        if (props?.preQuery) {
            const res = props.preQuery(searchData.value!);

            if (!res) {
                return;
            }

            params = {
                ...res,
            };
        }

        searchLoading.value = true;
        await tableRef.value?.loadData(params);
        searchLoading.value = false;
    }

    /**
     * 重置
     */
    function handleReset(): void {
        searchFormRef.value?.resetFields();
        tableRef.value?.loadData();

        if (props?.reset) {
            props.reset();
        }
    }

    /**
     ********************** 表格 **********************
     */
    // 表格实例
    const tableRef = ref<XTableInstance>();

    /**
     * 上传按钮样式
     * @param isUpload 是否上传按钮
     * @returns 样式
     */
    function uploadClass(isUpload: boolean): 'upload-button' | '' {
        if (isUpload) {
            return 'upload-button';
        }

        return '';
    }

    /**
     * @description 操作区域按钮配置
     *  @param rows 表格行数据
     *  @returns 表格操作按钮配置
     */
    function operationConfig(rows: Record<string, any>[]): XTableOperationButtonOption[] {
        let buttons = [];

        if (!props.operations) {
            return [];
        }

        if (typeof props.operations === 'function') {
            buttons = props.operations(rows);
        } else {
            buttons = props.operations;
        }

        return buttons.map(item => getOperationConfigItem(item));
    }

    /**
     * @description 获取操作区域按钮配置
     * @param item 操作项配置
     * @returns 按钮配置
     */
    function getOperationConfigItem(item: XTableOperationButton | genericOperationType): XTableOperationButtonOption {
        const obj: { [key in genericOperationType]: XTableOperationButtonOption } = {
            新增: {
                label: '新增',
                icon: Plus,
                type: 'primary',
                isUpload: false,
                onClick: openCreate,
            },
            下载模板: {
                label: '下载模板',
                icon: Download,
                type: '',
                isUpload: false,
                onClick: handleDownloadTemplate,
            },
            导入: {
                label: '导入',
                icon: Upload,
                type: '',
                isUpload: true,
                loading: importLoading.value,
                onClick: handleUpload,
            },
            导出: {
                label: '导出',
                icon: Download,
                type: '',
                isUpload: false,
                loading: exportLoading.value,
                onClick: handleExport,
            },
            批量删除: {
                label: '批量删除',
                icon: Delete,
                type: 'danger',
                isUpload: false,
                onClick: handleMultiDelete,
            },
        };

        // 若子项为字符串类型，直接从 obj 中取
        if (typeof item === 'string') {
            return obj[item];
        }

        // 若子项为对象类型，且 label 存在于 obj 中，则进行合并
        if (genericOperationAction.includes(item.label)) {
            return {
                ...obj[item.label as genericOperationType],
                ...item,
            };
        }

        return item;
    }

    /**
     * @description 操作列按钮配置
     * @param row 表格行数据
     * @returns 表格操作按钮配置
     */
    function actionConfig(row: Record<string, any>, index: number): XTableActionButton[] {
        let buttons = [];

        if (!props.actions) {
            return [];
        }

        if (typeof props.actions === 'function') {
            buttons = props.actions(row, index);
        } else {
            buttons = props.actions;
        }

        return buttons.map(item => getActionConfigItem(row, item)) ?? [];
    }

    /**
     * @description 获取操作列按钮配置
     * @param row 行数据
     * @param item 操作项配置
     * @returns 按钮配置
     */
    function getActionConfigItem(row: any, item: XTableActionButton | genericActionType): XTableActionButton {
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

        // 若子项为字符串类型，直接从 obj 中取
        if (typeof item === 'string') {
            return obj[item];
        }

        // 若子项为对象类型，且 label 存在于 obj 中，则进行合并
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

    /**
     * 获取表格数据
     */
    function getTableData(): Record<string, any>[] {
        return tableRef.value!.getTableData();
    }

    /**
     * 清除选中
     */
    function clearSelection(): void {
        tableRef.value?.clearSelection();
    }

    /**
     * 重新加载
     */
    function reload(): void {
        tableRef.value?.loadData(searchData.value);
    }

    /**
     ********************** 新增表单 **********************
     */
    // 表单实例
    const createRef = ref<XFormInstance>();
    // 表单显示状态
    const createVisible = ref<boolean>(false);
    // loading
    const createLoading = ref<boolean>(false);
    // 表单数据
    const createData = ref<Record<string, any>>({});

    /**
     * @description 打开新增
     * @returns {Promise<void>}
     */
    async function openCreate(): Promise<void> {
        createData.value = {
            ...props?.createDefaultData,
        };

        await nextTick(async (): Promise<void> => {
            if (!props?.afterOpen) {
                return;
            }

            // 获取处理后数据
            const res = await props.afterOpen(createData.value);

            if (!res) {
                return;
            }

            createData.value = res;
        });

        createVisible.value = true;
    }

    /**
     * @description 调用接口前理参数
     * @param data 数据
     * @param isSave 是否保存
     * @returns 处理后的数据
     */
    function beforeHandle<T>(data: T, isSave?: boolean): T {
        if (!props?.formatFormData) {
            return data;
        }

        return props.formatFormData(data, isSave);
    }

    /**
     * @description 新增
     * @returns {Promise<void>}
     */
    async function handleCreate(): Promise<void> {
        if (!props?.createApi) {
            throw new Error(`未配置 'create-api'`);
        }

        const valid = await createRef.value?.validate();

        if (!valid) {
            return;
        }

        // 自定义校验
        if (props.validate) {
            const customValid = await props.validate();

            if (!customValid) {
                return;
            }
        }

        createLoading.value = true;
        const data = beforeHandle(createData.value, false);
        const res = await props.createApi(data);

        if (!res) {
            createLoading.value = false;
            ElMessage.error(OPERATION_NOTICE.CREATE_ERROR);
            return;
        }

        createLoading.value = false;
        createVisible.value = false;
        ElMessage.success(OPERATION_NOTICE.CREATE_SUCCESS);
        tableRef.value?.loadData(searchData.value);

        props.afterSubmit?.(data, '新增');
    }

    /**
     ********************** 编辑表单 **********************
     */
    // 表单实例
    const editRef = ref<XFormInstance>();
    // 表单显示状态
    const editVisible = ref<boolean>(false);
    // loading
    const editLoading = ref<boolean>(false);
    // 表单数据
    const editData = ref<Record<string, any>>({});

    /**
     * @description 打开编辑
     * @param row 行数据
     * @returns {Promise<void>}
     */
    async function openEdit(row: Record<string, any> = {}): Promise<void> {
        editData.value = {
            ...props?.editDefaultData,
            ...row,
        };

        await nextTick(async (): Promise<void> => {
            if (!props?.afterOpen) {
                return;
            }

            // 获取处理后数据
            const res = await props.afterOpen(editData.value);

            if (!res) {
                return;
            }

            editData.value = res;
        });

        editVisible.value = true;
    }

    /**
     * @description 编辑
     * @returns {Promise<void>}
     */
    async function handleEdit(): Promise<void> {
        if (!props?.editApi) {
            throw new Error(`未配置 'edit-api'`);
        }

        const valid = await editRef.value?.validate();

        if (!valid) {
            return;
        }

        // 自定义校验
        if (props.validate) {
            const customValid = await props.validate();

            if (!customValid) {
                return;
            }
        }

        editLoading.value = true;
        const data = beforeHandle(editData.value, false);
        const res = await props.editApi(data);

        if (!res) {
            editLoading.value = false;
            ElMessage.error(OPERATION_NOTICE.EDIT_ERROR);
            return;
        }

        editLoading.value = false;
        editVisible.value = false;
        ElMessage.success(OPERATION_NOTICE.EDIT_SUCCESS);
        tableRef.value?.loadData(searchData.value);

        props.afterSubmit?.(data, '编辑');
    }

    /**
     ********************** 新增/编辑保存 **********************
     */
    // 是否是新增操作
    const isCreate = computed(() => createVisible.value);

    /**
     * @description 保存
     * @returns {Promise<void>}
     */
    async function handleSave(): Promise<void> {
        if (!props?.createSaveApi || !props?.editSaveApi) {
            throw new Error(`未配置保存接口`);
        }

        if (isCreate.value) {
            createLoading.value = true;
        } else {
            editLoading.value = true;
        }

        const params = isCreate.value ? createData.value : editData.value;
        const data = beforeHandle(params, true);
        const res = isCreate.value ? await props.createSaveApi(data) : await props.editSaveApi(data);

        if (!res) {
            if (isCreate.value) {
                createLoading.value = false;
            } else {
                editLoading.value = false;
            }

            ElMessage.error(OPERATION_NOTICE.SAVE_ERROR);
            return;
        }

        if (isCreate.value) {
            createLoading.value = false;
            createVisible.value = false;
        } else {
            editLoading.value = false;
            editVisible.value = false;
        }

        ElMessage.success(OPERATION_NOTICE.SAVE_SUCCESS);
        tableRef.value?.loadData(searchData.value);
    }

    /**
     ********************** 删除 **********************
     */
    /**
     * @description 删除
     * @param ids 主键 id 列表
     * @returns {Promise<void>}
     */
    async function handleDelete(ids: string[]): Promise<void> {
        if (!props?.deleteApi) {
            throw new Error(`未配置 'delete-api'`);
        }

        const confirm = await confirmDeleteMessage();

        if (!confirm) {
            return;
        }

        const res = await props.deleteApi({ ids });

        if (!res) {
            ElMessage.error(OPERATION_NOTICE.DELETE_ERROR);
            return;
        }

        ElMessage.success(OPERATION_NOTICE.DELETE_SUCCESS);
        tableRef.value?.clearSelection();
        tableRef.value?.loadData(searchData.value);
    }

    /**
     * @description 批量删除
     * @param rows 行数据列表
     * @param key 主键 id
     * @returns {void}
     */
    function handleMultiDelete(rows: Record<string, any>[], key = 'id'): void {
        if (rows.length === 0) {
            ElMessage.warning(OPERATION_NOTICE.SELECT_NONE);
            return;
        }

        handleDelete(rows.map(row => row[key] as string));
    }

    /**
     ********************** 导入/导出 **********************
     */
    // 文件列表
    const fileList = ref<any[]>([]);
    // 导入 loading
    const importLoading = ref<boolean>(false);
    // 导出 loading
    const exportLoading = ref<boolean>(false);

    /**
     * @description 下载导入模板
     * @returns {Promise<void>}
     */
    async function handleDownloadTemplate(): Promise<void> {
        if (!props?.templateUrl) {
            throw new Error(`未配置 'template-url'`);
        }

        const res = await downloadFileFromURL(props.templateUrl);

        if (!res) {
            ElMessage.error(OPERATION_NOTICE.DOWNLOAD_ERROR);
            return;
        }

        ElMessage.success(OPERATION_NOTICE.DOWNLOAD_SUCCESS);
    }

    /**
     * @description 导入
     * @param file 文件
     * @returns {Promise<void>}
     */
    async function handleUpload(file: any): Promise<void> {
        if (!props?.importApi) {
            throw new Error(`未配置 'import-api'`);
        }

        if (file.status === 'success') {
            const filePath = file.response?.data;
            const fileInfo = {
                fileName: file.name,
                filePath,
                ...props.params,
            };

            importLoading.value = true;
            const res = await props.importApi(fileInfo);

            if (!res) {
                ElMessage.error(OPERATION_NOTICE.IMPORT_ERROR);
                importLoading.value = false;
                return;
            }

            ElMessage.success(OPERATION_NOTICE.IMPORT_SUCCESS);
            importLoading.value = false;
            tableRef.value?.loadData(searchData.value);
        } else if (file.status === 'error') {
            ElMessage.error(OPERATION_NOTICE.IMPORT_ERROR);
            importLoading.value = false;
        }
    }

    /**
     * @description 导出
     * @param rows 行数据列表
     * @returns {Promise<void>}
     */
    async function handleExport(rows: Record<string, any>[]): Promise<void> {
        if (!props?.exportApi) {
            throw new Error(`未配置 'export-api'`);
        }

        if (!props.rowKey) {
            return;
        }

        exportLoading.value = true;
        const res = await props.exportApi({
            ids: rows.map((item: Record<string, any>) => item[props.rowKey as string]),
            ...props.params,
            ...searchData.value,
        });

        if (!res) {
            ElMessage.error(OPERATION_NOTICE.EXPORT_ERROR);
            exportLoading.value = false;
            return;
        }

        downloadFileFromURL(res);
        exportLoading.value = false;
        ElMessage.success(OPERATION_NOTICE.EXPORT_SUCCESS);
        tableRef.value?.clearSelection();
    }

    /**
     ********************** 获取/设置表单 **********************
     */
    /**
     * @description 获取表单的值
     * @returns {Record<string, any>}
     */
    function getFormData(): Record<string, any> {
        if (isCreate.value) {
            return createData.value;
        }

        return editData.value;
    }

    /**
     * @description 设置表单的值
     * @param formData 表单数据
     * @returns void
     */
    function setFormData(formData: Record<string, any>): void {
        if (isCreate.value) {
            createData.value = {
                ...createData.value,
                ...formData,
            };
        } else {
            editData.value = {
                ...editData.value,
                ...formData,
            };
        }
    }

    /**
     * @description 清除表单的校验
     * @returns {Promise<void>}
     */
    async function clearValidate(): Promise<void> {
        if (props?.createApi) {
            const valid = await createRef.value?.validate();

            if (!valid) {
                return;
            }
        } else if (props?.editApi) {
            const valid = await editRef.value?.validate();

            if (!valid) {
                return;
            }
        }
    }

    return {
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
    };
}
