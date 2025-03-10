import type { PaginationProps, TableProps, ButtonProps, TableColumnCtx } from 'element-plus';

/**
 * 请求接口出参入参字段
 * Partial<APIKeyMap>
 */
export interface XTableAPIKeyMap {
    /** 查询时的当前页 key 值 */
    queryCurrentPageKey: string;
    /** 查询时的每页数量 key 值 */
    queryPageSizeKey: string;
    /** 返回时当前页 key 值 */
    returnCurrentPageKey: string;
    /** 返回时当前每页条数 key 值 */
    returnCurrentSizeKey?: string;
    /** 返回时的总数据量 key 值 */
    returnTotalKey: string;
    /** 返回时总页数 key 值 */
    returnPagesKey: string;
    /** 返回时的数据列表 key 值 */
    returnRecordKey: string;
}

/**
 * 分页参数
 */
export interface XTablePagination {
    /** 每页数量 */
    pageSize: number;
    /** 当前页 */
    currentPage: number;
    /** 总数据量 */
    total: number;
}

/**
 * table props
 */
export interface XTableProp {
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
    /** 表格高度 */
    maxHeight?: number | string | undefined;
    /** 表格尺寸 */
    size?: '' | 'large' | 'default' | 'small';
    /** 是否展示索引 */
    showIndex?: boolean;
    /** 是否可选 */
    selectable?: boolean;
    /** el table props */
    elTableProps?: Partial<TableProps<XTableDataType>>;
    /** el pagination props */
    elPaginationProps?: Partial<PaginationProps>;
    /** 是否为分页格式 */
    dividePage?: boolean;
    /** 是否懒加载 */
    lazy?: boolean;
    /** 序号是否连续 */
    continuous?: boolean;
    /** 是否是树形结构的数据 */
    isTree?: boolean;
    /** 行数据 key 值 */
    rowKey?: string;
    /** 需要回显的行数据 */
    selectedList?: any[];
    /** 表格列配置 */
    columns: XTableColumn[];
    /** 表格数据 */
    data?: XTableDataType[];
    /** loading */
    loading?: boolean;
    /** 请求接口 */
    api?: any;
    /** 请求接口参数 */
    apiParams?: Record<string, string | number>;
    /** 接口字段映射 */
    apiKeyMap?: XTableAPIKeyMap;
    /** 操作栏 */
    actions?: (row: any, index: number) => XTableActionButton[];
    /** 操作栏文字 */
    actionText?: string;
    /** 操作栏宽度 */
    actionWidth?: string | number;
    /** 要合并的某一列字段 */
    combineField?: string;
    /** 要根据某一列字段进行合并的列索引 */
    columnIndex?: number[];
    /** 表格行点击事件 */
    cellClick?: (row: T, column: T, cell: any, event: MouseEvent) => void;
    /** 是否懒加载子节点数据 */
    treeLazy?: boolean;
    /** 加载子节点数据的函数 */
    treeLoad?: (row: T, treeNode: TreeNode, resolve: (data: any[]) => void) => void;
}

/**
 * 表格列配置
 */
export type XTableColumn<T = any> = Partial<TableColumnCtx<T>> & {
    label?: string;
    prop: keyof T | '';
    /** 是否选中 */
    checked?: boolean;
};

/**
 * 表格数据类型
 */
export interface XTableDataType {
    [key: string]: number | string | undefined | boolean | null | Array<XTableDataType>;
}

/**
 * 操作按钮
 */
export interface XTableActionButton extends Partial<ButtonProps> {
    label: string;
    permission?: string;
    onClick: () => void;
}

/**
 * 合并单元格
 */
export interface XTableSpanMethodProps {
    row: Record<string, any>;
    column: TableColumnCtx<Record<string, any>>;
    rowIndex: number;
    columnIndex: number;
}

/**
 * table ref
 */
export interface XTableInstance {
    loadData: (data?: Record<string, string | number>) => Promise<void>;
    getSelectedRows: () => Record<string, any>[];
    clearSelection: () => void;
    getTableData: () => Record<string, any>[];
    handleToggleRowSelection: () => void;
}
