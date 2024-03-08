<template>
    <el-breadcrumb class="x-breadcrumb" separator="/">
        <el-breadcrumb-item v-for="(breadcrumb, index) in breadcrumbs" :key="index" :to="breadcrumb">
            {{ breadcrumb.meta?.title }}
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts">
import { type RouteRecordRaw, useRoute } from 'vue-router';

/**
 * props
 */
const props = withDefaults(
    defineProps<{
        /** 路由数组 */
        routes?: RouteRecordRaw[];
    }>(),
    {
        routes: () => [],
    },
);

const route = useRoute();
const breadcrumbs = ref<RouteRecordRaw[]>([]);
// const breadcrumbs = computed<RouteRecordRaw[]>(() => route.matched?.filter(item => item.name !== '/'));

/**
 * 根据最新路由获取最新语言的面包屑
 */
function getLatestBreadcrumbs(currentRoutes: RouteRecordRaw[], allRoutes: RouteRecordRaw[]) {
    if (!allRoutes || !allRoutes.length) {
        return;
    }

    for (let i = 0; i < currentRoutes.length; i++) {
        const currentRoute = currentRoutes[i];
        const index = allRoutes.findIndex(item => item.path === currentRoute.path);

        if (index === -1) {
            continue;
        }

        breadcrumbs.value.push(allRoutes[index]);
        getLatestBreadcrumbs(currentRoutes, allRoutes[index].children as RouteRecordRaw[]);
    }
}

/**
 * 监听路由变化
 * 语言切换时会导致路由变化，所以需要监听路由变化
 */
watchEffect(() => {
    breadcrumbs.value = [];
    getLatestBreadcrumbs(route.matched, props.routes);
});
</script>

<style lang="scss" scoped>
.x-breadcrumb {
    min-width: 400px;
}
</style>
