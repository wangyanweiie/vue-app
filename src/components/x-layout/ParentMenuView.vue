<template>
    <div>
        <el-menu mode="horizontal" router :default-active="activeRoute" class="x-layout-menu--horizontal">
            <el-menu-item v-for="(menu, index) in menus" :key="index" :index="menu.path">
                {{ menu.meta?.title }}
            </el-menu-item>
        </el-menu>

        <router-view v-slot="{ Component }">
            <transition name="el-fade-in-linear" mode="out-in">
                <!-- include 与 exclude 匹配的是组件名称 -->
                <keep-alive :include="cacheList" :exclude="excludeList">
                    <component :is="Component" :key="componentKey"></component>
                </keep-alive>
            </transition>
        </router-view>
    </div>
</template>

<script setup lang="ts">
import { type RouteRecordRaw, useRoute } from 'vue-router';

import { useRefresh } from './use-refresh';

/**
 * props
 */
const props = withDefaults(
    defineProps<{
        /** menu 列表 */
        menus: RouteRecordRaw[];
        /** 缓存列表 */
        cacheList?: string[];
        matchedIndex?: number;
    }>(),
    {
        menus: () => [],
        cacheList: undefined,
        matchedIndex: -1,
    },
);

const route = useRoute();

/**
 * useRefresh
 */
const { componentKey, excludeList } = useRefresh({
    matchedIndex: props.matchedIndex,
});

/**
 * 当前激活路由
 */
const activeRoute = computed<string>(() => {
    let path = route.fullPath;

    // 查找 matched 中第一个无子路由的路由
    for (let i = route.matched.length - 1; i > 0; i -= 1) {
        if (!route.matched[i].children || route.matched[i].children.length === 0) {
            path = route.matched[i].path;

            break;
        }
    }

    return path;
});
</script>

<style lang="scss" scoped>
.x-layout-menu--horizontal {
    margin-bottom: 10px;
}

/** transition */
.scale-enter-active,
.scale-leave-active {
    transition: all 0.5s ease;
}

.scale-enter-from,
.scale-leave-to {
    opacity: 0;
    transform: scale(0.9);
}
</style>
@/components/Layout/use-refresh
