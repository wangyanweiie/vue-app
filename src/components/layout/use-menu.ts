import type { RouteRecordRawTypes } from '@/components/index';

/**
 * menu item 类型
 */
enum MenuType {
    /** 有子菜单 */
    submenu = 'submenu',
    /** 无子菜单 */
    menuItem = 'menuItem',
}

/**
 * 处理路由转换为 el-menu-item 数组
 * @param { RouteRecordRawTypes[] } routes 路由数组
 * @param { string[] | undefined } permissions 权限数组
 * @returns 处理后数组
 */
function routesToMenuItemList(routes: RouteRecordRawTypes[], permissions?: string[]): RouteRecordRawTypes[] {
    const menuRoutes: RouteRecordRawTypes[] = [];

    for (let i = 0; i < routes.length; i += 1) {
        const currentRoute = routes[i];

        if (!currentRoute.meta || currentRoute.meta.hidden) {
            continue;
        }

        // 无权限
        if (permissions && !permissions.includes(currentRoute.meta.title as string)) {
            continue;
        }

        // 区分 menu 类型
        if (currentRoute.children && currentRoute.children.length > 0) {
            currentRoute.meta.type = MenuType.submenu;

            // 递归 children
            currentRoute.children = routesToMenuItemList(currentRoute.children);
        } else {
            currentRoute.meta.type = MenuType.menuItem;
        }

        menuRoutes.push(currentRoute);
    }

    return menuRoutes;
}

export { MenuType, routesToMenuItemList };
