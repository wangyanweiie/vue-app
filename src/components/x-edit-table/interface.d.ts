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
