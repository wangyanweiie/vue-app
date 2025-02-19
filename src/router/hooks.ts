import type { RouteRecordRaw } from 'vue-router';

/**
 * 递归处理 component 字符串
 * @param json 路由字符串
 * @returns 路由列表
 */
export function processComponentStrings(routes: any[]): RouteRecordRaw[] {
    routes.forEach(route => {
        // 处理当前路由的 component
        if (typeof route.component === 'string' && route.component.startsWith('() =>')) {
            // 移除字符串的引号,并将字符串转换为实际的箭头函数
            route.component = new Function(`return ${route.component}`)();
        }

        // 递归处理子路由
        if (route.children && route.children.length) {
            processComponentStrings(route.children);
        }
    });

    return routes;
}
