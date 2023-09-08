<template>
    <el-breadcrumb class="x-breadcrumb" separator="/">
        <el-breadcrumb-item v-for="(breadcrumb, index) in breadcrumbs" :key="index" :to="breadcrumb">
            {{ breadcrumb.meta?.title }}
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import type { RouteRecordRawTypes } from '@/components/index';

const breadcrumbs = computed<RouteRecordRawTypes[]>(() => useRoute().matched);
</script>

<style lang="scss" scoped>
.x-breadcrumb {
    min-width: 400px;
}
</style>
