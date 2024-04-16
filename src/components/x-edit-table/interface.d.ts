export type RequestResult<T> = T[];
export type RequestFunc<T> = (params: Record<string, string | number>) => Promise<T[]>;

export interface FormModelItem {
    isEditing: boolean;
    isNew: boolean;
    data: Record<string | number | symbol, any>;
    formData: Record<string | number | symbol, any>;
}

export interface FormModel {
    model: FormModelItem[];
}

export interface EditActions {
    addRow: (row?: Record<string, any>) => void;
    deleteRow: (index: number) => void;
    startEdit: (index: number) => void;
    cancelEdit: (index: number) => void;
    saveEdit: (index: number) => void;
}

/**
 * 表格列配置
 */
export interface XEditTableColumn {
    label: string;
    prop: string;
    /** 是否可编辑 */
    edit?: boolean;
    /** 编辑时是否校验必填 */
    required?: boolean;
}

/**
 * x-edit-table props
 */
export interface XEditTableProp {
    /** el-card-header */
    header?: string;
    /** el-card-shadow */
    shadow?: 'hover' | 'always' | 'never';
    /** card-body-style */
    bodyStyle?: Record<string, string>;
    /** 标题 */
    title?: string;
    /** 感叹号提示内容 */
    tooltipContent?: string;
    /** 是否展示索引 */
    showIndex?: boolean;
    /** 是否可选 */
    selectable?: boolean;
    /** 行数据 key 值 */
    rowKey?: string;
    /** 表格数据 */
    dataSource?: Record<string, unknown>[];
    /** 请求接口 */
    api?: RequestFunc<any> | null;
    /** 请求接口参数 */
    apiParams?: Record<string, string | number>;
}
