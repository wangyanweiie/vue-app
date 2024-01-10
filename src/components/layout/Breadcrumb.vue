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

watchEffect(() => {
    console.log('Breadcrumb', props.routes);
});

const route = useRoute();
const breadcrumbs = computed<RouteRecordRaw[]>(() => route.matched?.filter(item => item.name !== '/'));
</script>

<style lang="scss" scoped>
.x-breadcrumb {
    min-width: 400px;
}
</style>
