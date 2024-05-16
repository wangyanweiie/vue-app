import type { Column } from 'element-plus';

/**
 * table-v2 请求接口出参入参字段
 * Partial<APIKeyMap>
 */
export interface XTableV2APIKeyMap {
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
 * table-v2 分页参数
 */
export interface XTableV2Pagination {
    /** 每页数量 */
    pageSize: number;
    /** 当前页 */
    currentPage: number;
    /** 总数据量 */
    total: number;
}

/**
 * table-v2 props
 */
export interface XTableV2Prop {
    /** 容器宽度 */
    width?: string;
    /** 容器高度 */
    height?: string;
    /** el-card-header */
    header: string;
    /** el-card-shadow */
    shadow?: 'always' | 'never' | 'hover';
    /** card-body-style */
    bodyStyle?: Record<string, string>;
    /** 表格标题 */
    title?: string;
    /** 感叹号提示内容 */
    tooltipContent?: string;
    /** 是否展示索引 */
    showIndex?: boolean;
    /** 是否可选 */
    selectable?: boolean;
    /** 每行的 key 值 */
    rowKey?: string;
    /** 表格行高度 */
    rowHeight?: number;
    /** 表头行高度 */
    headerHeight?: number;
    /** loading */
    loading?: boolean;
    /** 无数据提示 */
    emptyText?: string;
    /** 请求接口 */
    api?: any;
    /** 请求接口参数 */
    apiParams?: Record<string, string | number>;
    /** 接口字段映射 */
    apiKeyMap?: XTableV2APIKeyMap;
    /** 表格列配置 */
    columns: Column<any>[];
    /** 表格数据 */
    data?: Record<string, any>[];
    /** 是否为分页格式 */
    dividePage?: boolean;
    /** 分页设置 */
    paginationProp?: Record<string, number>;
    /** 滚动 */
    scroll?: boolean;
}

/**
 * table-v2 表格列配置
 */
export interface XTableV2Column {
    /** 表头字段名 */
    key: string;
    dataKey: string;
    /** 表头展示文字 */
    title: string;
    /** 表格列宽度 */
    width?: number | string;
    /** 居中方式 */
    align?: 'left' | 'center' | 'right';
    /** 渲染函数 */
    cellRenderer?: any;
}
