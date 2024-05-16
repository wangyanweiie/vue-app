/**
 * columnItem type
 * @interface
 */
export interface XDescriptionColumn {
    /** 字段名 */
    prop: string;
    /** 展示文字 */
    label: string;
    /** 渲染文本格式化的数据处理函数 */
    formatter?: (data: Record<string, any>, column: XDescriptionColumn, cellValue: any) => any;
}

/**
 * x-description props
 */
export interface XDescriptionProp {
    /** el-card-header */
    header?: string;
    /** el-card-shadow */
    shadow?: 'hover' | 'always' | 'never';
    /** card-body-style */
    bodyStyle?: Record<string, string>;
    /** 标题 */
    title?: string;
    /** 边框 */
    border?: boolean;
    /** 列 */
    column?: number;
    /** 尺寸 */
    size?: 'small' | 'default' | 'large';
    /** 操作区文本 */
    extra?: string;
    /** 方向 */
    direction?: 'horizontal' | 'vertical';
    /** 描述列列表 */
    columns: XDescriptionColumn[];
    /** 描述列数据 */
    data: Record<string, any>;
}
