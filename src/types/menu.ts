/**
 * 页面类型
 */
export type PageType = 'Folder' | 'Wireframe';

/**
 * 菜单项接口
 */
export interface MenuItem {
    /** 菜单项ID */
    id: string;
    /** 页面名称 */
    pageName: string;
    /** 页面类型 */
    type: PageType;
    /** 页面URL */
    url: string;
    /** 子菜单项 */
    children?: MenuItem[];
}

/**
 * 菜单树类型
 */
export type MenuTree = MenuItem[];
