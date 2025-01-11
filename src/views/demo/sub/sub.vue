<template>
    <parent-menu-view
        :matched-index="3"
        :cache-list="cacheList"
        :menus="getPermissionMenus(subRoutes)"
    ></parent-menu-view>
</template>

<script setup lang="ts">
import { subRoutes } from '@/router/demo/sub';
import { usePermissionStore } from '@/store/permission';

const { cacheList, getPermissionMenus } = usePermissionStore();
</script>
