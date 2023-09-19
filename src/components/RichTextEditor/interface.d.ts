export interface XRichTextEditorProps {
    /** 上传地址 */
    uploadUrl?: string;
    /** 文件名 */
    fileName?: string;
    /** 编辑器模式 */
    mode?: 'default' | 'simple';
    /** 编辑器样式 */
    editorStyle?: Record<string, string | number>;
    /** 请求接口 */
    api?: any;
    /** 请求接口参数 */
    apiParams?: Record<string, string | number>;
    /** 静态数据 */
    data?: string;
}
