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
