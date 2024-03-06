<template>
    <el-breadcrumb class="x-breadcrumb" separator="/">
        <el-breadcrumb-item v-for="(breadcrumb, index) in breadcrumbs" :key="index" :to="breadcrumb">
            {{ breadcrumb.meta?.title }}
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute, type RouteRecordRaw } from 'vue-router';

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

function getLatestBreadcrumbs(currentRoutes: RouteRecordRaw[], allRoutes: RouteRecordRaw[]) {
    let index = 0;

    for (let i = 0; i < currentRoutes.length; i++) {
        const currentRoute = currentRoutes[i];

        if (!allRoutes || !allRoutes.length) {
            continue;
        }

        if (allRoutes.findIndex(item => item.path === currentRoute.path) === -1) {
            continue;
        }

        index = allRoutes.findIndex(item => item.path === currentRoute.path);
        breadcrumbs.value.push(allRoutes[index]);

        getLatestBreadcrumbs(currentRoutes, allRoutes[index].children as RouteRecordRaw[]);
        break;
    }
}

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
