import { ElMessage } from 'element-plus';
import { OPERATION_NOTICE } from '@/constant/base';
import { confirmDeleteMessage } from '@/utils/confirm-message';
import { downloadFileFromURL } from '@/utils/common-methods';
import type { XTableInstance } from '@/components/Table/interface';
import type { XFormInstance } from '@/components/Form/interface';
import type { CrudOption, CrudReturn } from './interface';

export const genericAction = ['编辑', '删除'];
export const genericOperationAction = ['新增', '下载模板', '导入', '导出', '批量删除'];

/**
 * @description 通用 crud
 * @param options crud 配置
 * @returns crud 返回值
 */
export function useCrud(options?: CrudOption): CrudReturn {
    /**
     ********************** 查询 **********************
     */
    // 表格实例
    const tableRef = ref<XTableInstance>();
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
        if (options?.preQuery) {
            const res = options.preQuery(searchData.value!);

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

        if (options?.reset) {
            options.reset();
        }
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
            ...options?.createDefaultData,
        };

        await nextTick(async (): Promise<void> => {
            if (!options?.afterOpen) {
                return;
            }

            // 获取处理后数据
            const res = await options.afterOpen(createData.value);

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
    function beforeHandle(data: Record<string, any>, isSave?: boolean): Record<string, any> {
        if (!options?.formatFormData) {
            return data;
        }

        return options.formatFormData(data, isSave);
    }

    /**
     * @description 新增
     * @returns {Promise<void>}
     */
    async function handleCreate(): Promise<void> {
        if (!options?.createApi) {
            throw new Error(`未配置 'create-api'`);
        }

        const valid = await createRef.value?.validate();

        if (!valid) {
            return;
        }

        // 自定义校验
        if (options.validate) {
            const customValid = await options.validate();

            if (!customValid) {
                return;
            }
        }

        createLoading.value = true;
        const data = beforeHandle(createData.value, false);
        const res = await options.createApi(data);

        if (!res) {
            createLoading.value = false;
            ElMessage.error(OPERATION_NOTICE.CREATE_ERROR);
            return;
        }

        createLoading.value = false;
        createVisible.value = false;
        ElMessage.success(OPERATION_NOTICE.CREATE_SUCCESS);
        tableRef.value?.loadData(searchData.value);

        options.afterSubmit?.(data, '新增');
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
            ...options?.editDefaultData,
            ...row,
        };

        await nextTick(async (): Promise<void> => {
            if (!options?.afterOpen) {
                return;
            }

            // 获取处理后数据
            const res = await options.afterOpen(editData.value);

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
        if (!options?.editApi) {
            throw new Error(`未配置 'edit-api'`);
        }

        const valid = await editRef.value?.validate();

        if (!valid) {
            return;
        }

        // 自定义校验
        if (options.validate) {
            const customValid = await options.validate();

            if (!customValid) {
                return;
            }
        }

        editLoading.value = true;
        const data = beforeHandle(editData.value, false);
        const res = await options.editApi(data);

        if (!res) {
            editLoading.value = false;
            ElMessage.error(OPERATION_NOTICE.EDIT_ERROR);
            return;
        }

        editLoading.value = false;
        editVisible.value = false;
        ElMessage.success(OPERATION_NOTICE.EDIT_SUCCESS);
        tableRef.value?.loadData(searchData.value);

        options.afterSubmit?.(data, '编辑');
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
        if (!options?.createSaveApi || !options?.editSaveApi) {
            throw new Error(`未配置保存接口`);
        }

        if (isCreate.value) {
            createLoading.value = true;
        } else {
            editLoading.value = true;
        }

        const params = isCreate.value ? createData.value : editData.value;
        const data = beforeHandle(params, true);
        const res = isCreate.value ? await options.createSaveApi(data) : await options.editSaveApi(data);

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
        if (!options?.deleteApi) {
            throw new Error(`未配置 'delete-api'`);
        }

        const confirm = await confirmDeleteMessage();

        if (!confirm) {
            return;
        }

        const res = await options.deleteApi({ ids });

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
        if (!options?.templateUrl) {
            throw new Error(`未配置 'template-url'`);
        }

        const res = await downloadFileFromURL(options.templateUrl);

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
        if (!options?.importApi) {
            throw new Error(`未配置 'import-api'`);
        }

        if (file.status === 'success') {
            const filePath = file.response?.data;
            const fileInfo = {
                fileName: file.name,
                filePath,
                ...options.params,
            };

            importLoading.value = true;
            const res = await options.importApi(fileInfo);

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
        if (!options?.exportApi) {
            throw new Error(`未配置 'export-api'`);
        }

        if (!options.rowKey) {
            return;
        }

        exportLoading.value = true;
        const res = await options.exportApi({
            ids: rows.map((item: Record<string, any>) => item[options.rowKey as string]),
            ...options.params,
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
     ********************** 获取/设置表单值 **********************
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

    return {
        searchFormRef,
        searchData,
        searchLoading,
        handleSearch,
        handleReset,

        tableRef,
        fileList,
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
    };
}
