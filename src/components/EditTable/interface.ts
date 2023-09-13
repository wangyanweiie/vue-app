type RequestResult<T> = T[];
type RequestFunc<T> = (params: Record<string, string | number>) => Promise<T[]>;

interface FormModelItem {
    isEditing: boolean;
    isNew: boolean;
    data: Record<string | number | symbol, any>;
    formData: Record<string | number | symbol, any>;
}

interface FormModel {
    model: FormModelItem[];
}

interface EditActions {
    addRow: (row?: Record<string, any>) => void;
    deleteRow: (index: number) => void;
    startEdit: (index: number) => void;
    cancelEdit: (index: number) => void;
    saveEdit: (index: number) => void;
}

interface ColumnScope {
    row?: any;
    column: any;
    $index: number;
    [key: string]: any;
}

/**
 * 表格列配置
 */
interface XEditTableColumn {
    label: string;
    prop: string;
    /** 是否可编辑 */
    edit?: boolean;
    /** 编辑时是否校验必填 */
    required?: boolean;
    /** 编辑组件提示文字 */
    placeholder?: string;
}

/**
 * 表格数据类型
 */
interface XEditTableDataType {
    [key: string]: number | string | undefined | boolean | null | Array<XEditTableDataType>;
}

export type {
    RequestResult,
    RequestFunc,
    FormModelItem,
    FormModel,
    EditActions,
    ColumnScope,
    XEditTableColumn,
    XEditTableDataType,
};
