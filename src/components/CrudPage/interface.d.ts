import type { Component, Ref } from 'vue';
import type { FormProps, TableProps } from 'element-plus';
import type { XTableActionButton, XTableColumn } from '@/components/Table/interface';
import type { XFormItemSchema } from '@/components/Form/interface';

export type CrudAction = ('编辑' | '删除' | XTableActionButton)[];
export type FormOperationType = '新增' | '编辑';
export type genericActionType = '编辑' | '删除';
export type genericOperationType = '新增' | '下载模板' | '导入' | '导出' | '批量删除';
export type XTableOperationButton = '新增' | '下载模板' | '导入' | '导出' | '批量删除' | XTableOperationButtonOption;

/**
 * 按钮选项
 */
export interface XTableOperationButtonOption {
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
 * props
 */
export interface XCrudPageProp {
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
}

/**
 * useIndex 返回值
 */
export interface UseIndexReturn {
    /** 查询表单 ref */
    searchFormRef: XFormInstance | undefined;
    /** 查询表单数据 */
    searchData: any;
    /** 查询表单加载状态 */
    searchLoading: Ref<boolean>;
    /** 查询 */
    handleSearch: () => Promise<void>;
    /** 重置 */
    handleReset: () => void;

    /** 表格 ref */
    tableRef: XTableInstance | undefined;
    /** 上传按钮样式 */
    uploadClass: (isUpload: boolean) => 'upload-button' | '';
    /** 操作区域按钮配置 */
    operationConfig: (rows: Record<string, any>[]) => XTableOperationButtonOption[];
    /** 操作列按钮配置 */
    actionConfig: (row: Record<string, any>, index: number) => XTableActionButton[];
    /** 获取权限 */
    getPermission: (label: string) => string[] | undefined;
    /** 获取表格数据 */
    getTableData: () => Record<string, any>[];
    /** 清空表格选中 */
    clearSelection: () => void;
    /** 刷新表格 */
    reload: () => void;

    /** 文件列表 */
    fileList: Ref<any[]>;
    /** 上传 */
    handleUpload: (file?: any) => Promise<void>;

    /** 新增表单 ref */
    createRef: any;
    /** 新增弹窗是否展示 */
    createVisible: Ref<boolean>;
    /** 新增表单数据 */
    createData: Record<string, any>;
    /** 新增表单加载状态 */
    createLoading: Ref<boolean>;
    /** 新增 */
    handleCreate: () => Promise<void>;

    /** 编辑表单 ref */
    editRef: XFormInstance | undefined;
    /** 编辑弹窗是否展示 */
    editVisible: Ref<boolean>;
    /** 编辑表单数据 */
    editData: Record<string, any>;
    /** 编辑表单加载状态 */
    editLoading: Ref<boolean>;
    /** 编辑 */
    handleEdit: () => Promise<void>;
    /** 保存 */
    handleSave: () => Promise<void>;

    /** 设置表单数据 */
    setFormData: (formData: Record<string, any>) => void;
    /** 获取表单数据 */
    getFormData: () => Record<string, any>;
    /** 设置表单数据 */
    clearValidate: () => Promise<void>;
}

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
