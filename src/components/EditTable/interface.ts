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
}

export type { RequestResult, RequestFunc, FormModelItem, FormModel, EditActions, XEditTableColumn };
