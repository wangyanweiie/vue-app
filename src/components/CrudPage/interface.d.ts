import type { Component, Ref } from 'vue';
import type { XTableActionButton } from '@/components/Table/interface';

export type CrudAction = ('编辑' | '删除' | XTableActionButton)[];
export type genericActionType = '编辑' | '删除';
export type genericOperationType = '新增' | '下载模板' | '导入' | '导出' | '批量删除';
export type OperationButton = '新增' | '下载模板' | '导入' | '导出' | '批量删除' | ButtonOption;
export type FormOperationType = '新增' | '编辑';

/**
 * CRUD 实例
 */
export interface CrudInstance {
    /** 获取表格数据 */
    getTableData: () => Record<string, any>[];
    /** 清空表格选中 */
    clearSelection: () => void;
    /** 刷新表格 */
    reload: () => void;
    /** 获取表单数据 */
    getFormData: () => Record<string, any>;
    /** 设置表单数据 */
    setFormData: (formData: Record<string, any>) => void;
    /** 清空表单校验 */
    clearValidate: () => void;
}

/**
 * 按钮选项
 */
export interface ButtonOption {
    /** 按钮名称 */
    label: string;
    /** 按钮状态 */
    loading?: boolean;
    /** 按钮禁用 */
    disabled?: boolean;
    /** 按钮类型 */
    type: '' | 'default' | 'success' | 'warning' | 'info' | 'primary' | 'danger';
    /** 是否是上传按钮 */
    isUpload?: boolean;
    /** 按钮图标 */
    icon: Component;
    /** 点击事件 */
    onClick: (data?: any) => Promise<void> | void;
}

/**
 * CRUD 配置
 */
export interface CrudOption {
    /** 表格行 key */
    rowKey?: string;
    /** 下载模版 URL */
    templateUrl?: string;
    /** 表格 API 入参 */
    params?: Record<string, string | number>;
    /** 表格 API 查询前数据预处理 */
    preQuery?: (data: any) => any;
    /** 导入 API */
    importApi?: (data?: any) => Promise<any>;
    /** 导出 API */
    exportApi?: (data?: any) => Promise<any>;
    /** 删除 API */
    deleteApi?: (data?: any) => Promise<any>;

    /** 新增表单默认值 */
    createDefaultData?: Record<string, any>;
    /** 新增 API */
    createApi?: (data?: any) => Promise<any>;
    /** 新增保存 API */
    createSaveApi?: (data?: any) => Promise<any>;

    /** 编辑表单默认值 */
    editDefaultData?: Record<string, any>;
    /** 编辑 API */
    editApi?: (data?: any) => Promise<any>;
    /** 编辑保存 API */
    editSaveApi?: (data?: any) => Promise<any>;

    /** 表单校验 */
    validate?: () => Promise<boolean>;
    /** 新增/编辑前参数处理 */
    formatFormData?: (data: Record<string, any>, isSave?: boolean) => Record<string, any>;
    /** 新增/编辑提交后处理 */
    afterSubmit?: (data: Record<string, any>, operationType: FormOperationType) => Record<string, any>;

    /** 弹窗打开后处理 */
    afterOpen?: (data?: Record<string, any>) => Record<string, any>;
    /** 重置 */
    reset?: () => void;
}

/**
 * CRUD 返回值
 */
export interface CrudReturn<T = any> {
    /** 查询表单 ref */
    searchFormRef: Ref<XFormInstance | undefined>;
    /** 查询表单数据 */
    searchData: any;
    /** 查询表单加载状态 */
    searchLoading: Ref<boolean>;
    /** 查询 */
    handleSearch: () => Promise<void>;
    /** 重置 */
    handleReset: () => void;

    /** 表格 ref */
    tableRef: Ref<XTableInstance | undefined>;
    /** 文件列表 */
    fileList: Ref<any[]>;
    /** 导入加载状态 */
    importLoading: Ref<boolean>;
    /** 导出加载状态 */
    exportLoading: Ref<boolean>;
    /** 下载模版 */
    handleDownloadTemplate: () => Promise<void>;
    /** 上传 */
    handleUpload: (file?: any) => Promise<void>;
    /** 导出 */
    handleExport: (rows: Record<string, any>[]) => Promise<void>;
    /** 删除 */
    handleDelete: (ids: string[]) => Promise<void>;
    /** 批量删除 */
    handleMultiDelete: (rows: Record<string, any>[], key?: string) => void;

    /** 新增表单 ref */
    createRef: any;
    /** 新增弹窗是否展示 */
    createVisible: Ref<boolean>;
    /** 新增表单数据 */
    createData: Ref<Record<string, any>>;
    /** 新增表单加载状态 */
    createLoading: Ref<boolean>;
    /** 打开新增 */
    openCreate: () => Promise<void>;
    /** 新增 */
    handleCreate: () => Promise<void>;

    /** 编辑表单 ref */
    editRef: Ref<XFormInstance | undefined>;
    /** 编辑弹窗是否展示 */
    editVisible: Ref<boolean>;
    /** 编辑表单数据 */
    editData: Ref<Record<string, any>>;
    /** 编辑表单加载状态 */
    editLoading: Ref<boolean>;
    /** 打开编辑 */
    openEdit: (row?: Record<string, any>) => Promise<void>;
    /** 编辑 */
    handleEdit: () => Promise<void>;
    /** 保存 */
    handleSave: () => Promise<void>;

    /** 设置表单数据 */
    setFormData: (formData: Record<string, any>) => void;
    /** 获取表单数据 */
    getFormData: () => Record<string, any>;
}
