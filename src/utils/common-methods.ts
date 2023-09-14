import { ref, type Ref } from 'vue';
import { ElMessage } from 'element-plus';
import { OPERATION_NOTICE } from '@/constant/base';
import { confirmDeleteMessage } from '@/utils/confirm-message';
import FileAPI from '@/api/upload';

/**
 * 通用删除
 * @param rows 批量删除选中项
 * @param deleteApi 删除接口
 * @param row 单条数据删除
 * @param tableRef 表格实例用于刷新数据
 * @param deleteParameter 指定字段为删除唯一标识符
 */
export async function commonDelete(
    rows?: any[],
    deleteApi?: any,
    row?: any,
    tableRef?: any,
    deleteParameter?: string,
): Promise<void> {
    let selectedRows = [];

    if (row !== undefined) {
        selectedRows.push(row);
    } else if (rows !== undefined) {
        selectedRows = rows;
    } else {
        return;
    }

    if (selectedRows.length === 0) {
        ElMessage.warning(OPERATION_NOTICE.SELECT_NONE);
        return;
    }

    const confirm = await confirmDeleteMessage();

    if (!confirm) {
        return;
    }

    const res = await deleteApi({
        ids: selectedRows.map(selectedRow => selectedRow.id || ''),
        [deleteParameter as string]: selectedRows.map(selectedRow => selectedRow[deleteParameter as string] || ''),
    });

    if (!res) {
        ElMessage.error(OPERATION_NOTICE.DELETE_ERROR);
        return;
    }

    ElMessage.success(OPERATION_NOTICE.DELETE_SUCCESS);
    tableRef?.loadData({});
    tableRef?.clearSelection();
}

/**
 * 通用导出
 * @param rows 选中项目
 * @param exportApi 导出接口
 * @param tableRef 表格实例
 * @param searchData 查询数据
 * @param extraParams 成员为字段时指定查询对象，成员为对象时查询中添加该对象,可同时传
 */
export async function commonExport(
    rows?: any,
    exportApi?: any,
    tableRef?: any,
    searchData?: any,
    ...extraParams: any[]
): Promise<void> {
    let res: any;

    const extraData = extraParams.reduce((acc, param) => {
        if (typeof param === 'object') {
            return {
                ...acc,
                ...param,
            };
        } else if (typeof param === 'string') {
            return {
                ...acc,
                [param]: rows.map((row: any) => row[param]),
            };
        } else {
            return acc;
        }
    }, {});

    if (!rows.length) {
        res = await exportApi({
            ...searchData,
            ...extraData,
        });
    } else {
        res = await exportApi({
            ids: rows.map((row: any) => row.id).filter((id: any) => id !== undefined),
            ...searchData,
            ...extraData,
        });
    }

    if (res) {
        window.open(res);
    }

    tableRef?.clearSelection();
}

/**
 * 导入方法
 */
export function importTemplate() {
    /**
     * 上传错误时返回的导入失败表格的路径
     */
    const errorUrl = ref<string>('');

    /**
     * 导入方法
     * @param params 通过 upload 获取到的文件数据
     * @param api 导入接口
     * @param apiParams 导入接口参数
     * @returns
     */
    async function importExcel(
        params: any,
        api: (data: Record<string, unknown>) => Promise<unknown>,
        apiParams?: Record<string, string | number>,
    ): Promise<any> {
        // 导入文件类型判断
        const suffix = params.file.name.split('.').pop() || '';

        if (!['xlsx', 'xls'].includes(suffix)) {
            ElMessage.warning(OPERATION_NOTICE.IMPORT_FILE_TYPE_ERROR);
            return;
        }

        // 获取要导入的文件的数据
        const formData = new FormData();
        formData.append('file', params.file);

        // 上传文件
        const uploadRes = await FileAPI.upload(formData);

        if (!uploadRes) {
            ElMessage.error(OPERATION_NOTICE.UPLOAD_ERROR);
            return;
        }

        // 上传成功 => 调导入接口
        const res = await api({
            urlPath: uploadRes,
            ...apiParams,
        });

        if (!res) {
            errorUrl.value = '';
            ElMessage.error(OPERATION_NOTICE.IMPORT_ERROR);
            return;
        }

        // 当后台返回的 data 为 '' 时，前端会处理成 true
        if (res === true) {
            // 此时代表导入成功
            errorUrl.value = '';
            ElMessage.success(OPERATION_NOTICE.IMPORT_SUCCESS);
        } else {
            // 否则代表导入失败， res 为导入失败的表格路径
            errorUrl.value = res as string;
            ElMessage.error(OPERATION_NOTICE.IMPORT_ERROR);
        }
    }

    return {
        importExcel,
        errorUrl,
    };
}

/**
 * 下载文件
 * @param url 文件路径
 * @param fileName 文件名
 * @returns { boolean }
 */
export async function downloadFileFromURL(url: string, fileName = ''): Promise<boolean> {
    if (!url) {
        return false;
    }

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;

    a.click();
    return true;
}
