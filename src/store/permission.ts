import { intersection } from 'lodash-es';
import { defineStore } from 'pinia';
import type { RouteRecordRaw } from 'vue-router';

import { generateActiveRoutes, generateCacheList, generateShowMenus } from '@/components/hooks/router-helper';
import appLayout from '@/layout/index.vue';
import router, { menuRoutes } from '@/router/index';
import { getPermission, savePermission } from '@/utils/storage';

/**
 * 权限缓存状态
 * setup store
 */
export const usePermissionStore: any = defineStore('permission', () => {
    // ================= 权限 =================
    /**
     * 是否开启权限设置
     */
    const usable = ref<boolean>(true);

    /**
     * 开启权限
     */
    function enablePermission(): void {
        usable.value = true;
    }

    /**
     * 关闭权限
     */
    function disablePermission(): void {
        usable.value = false;
    }

    /**
     * 权限数组
     */
    const permissions = ref<string[]>(['首页']);

    /**
     * 更新权限数组
     */
    function setPermission(value: string[] = []): void {
        permissions.value = ['首页', ...value];
        savePermission(permissions.value);
    }

    // ================= 路由 =================
    /**
     * 路由数组
     */
    const routes = ref<RouteRecordRaw[]>([]);

    /**
     * 更新路由数组
     */
    function setRoutes(value: RouteRecordRaw[]): void {
        routes.value = value;
    }

    /**
     * 根据路由与权限数据生成可用路由
     */
    const activeRoutes = computed<RouteRecordRaw[]>(() => {
        if (usable.value) {
            return generateActiveRoutes(routes.value, permissions.value);
        }

        return generateActiveRoutes(routes.value);
    });

    // ================= 缓存 =================
    /**
     * 是否使用缓存
     */
    const useCache = ref<boolean>(true);

    /**
     * 使用缓存
     */
    function enableCache(): void {
        useCache.value = true;
    }

    /**
     * 禁用缓存
     */
    function disableCache(): void {
        useCache.value = false;
    }

    /**
     * 根据路由与权限数组生成缓存数组
     */
    const cacheList = computed<string[]>(() => {
        if (!useCache.value) {
            return [];
        }

        if (usable.value) {
            return generateCacheList(routes.value, permissions.value);
        }

        return generateCacheList(routes.value);
    });

    // ================= menu =================
    /**
     * 根据路由与权限数组生成菜单路由
     */
    const showMenus = computed<RouteRecordRaw[]>(() => {
        if (usable.value) {
            return generateShowMenus(routes.value, permissions.value);
        }

        return generateShowMenus(routes.value);
    });

    // ================= 页面 menu =================
    /**
     * 筛选带有权限的 menus ==> 搭配 parentMenuView 使用
     */
    function getPermissionMenus(routes: RouteRecordRaw[]) {
        if (usable.value) {
            return routes.filter(route => {
                // 若存在权限数组优先根据权限数组过滤，否则再根据 title 过滤
                if (Array.isArray(route.meta?.permission)) {
                    return intersection(permissions.value, route.meta?.permission as string[]).length > 0;
                } else if (route.meta?.title) {
                    return permissions.value.includes(route.meta?.title as string);
                }
            });
        }

        return routes;
    }

    /**
     * 动态加载路由
     */
    function setActiveRouteList() {
        router.addRoute({
            path: '/',
            name: '/',
            component: markRaw(appLayout),
            redirect: activeRoutes.value[0].path,
            meta: {
                title: '/',
            },
            children: activeRoutes.value,
        });
    }

    /**
     * 监听
     */
    // watchEffect(() => {
    //     console.log('activeRoutes', activeRoutes.value);
    //     console.log('cacheList', cacheList.value);
    //     console.log('showMenus', showMenus.value);
    // });

    return {
        usable,
        enablePermission,
        disablePermission,
        permissions,
        setPermission,
        routes,
        setRoutes,
        activeRoutes,
        useCache,
        enableCache,
        disableCache,
        cacheList,
        showMenus,
        getPermissionMenus,
        setActiveRouteList,
    };
});

/**
 * 设置权限与路由
 */
export function setPermissionRoute() {
    const permissionStore = usePermissionStore();
    const permissions = getPermission() || [];

    // 设置路由
    permissionStore.setRoutes(menuRoutes.value);
    // 设置权限
    permissionStore.setPermission(permissions);
    // 动态加载路由
    permissionStore.setActiveRouteList();
}

/**
 * 更新路由
 */
export function updateRoute() {
    const permissionStore = usePermissionStore();
    permissionStore.setRoutes(menuRoutes.value);
}
