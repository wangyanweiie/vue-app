<template>
    <parent-menu-view :matched-index="3" :menus="getPermissionMenus(subRoutes)"></parent-menu-view>
</template>

<script setup lang="ts">
import { subRoutes } from '@/router/menu1/sub';
import { usePermissionStore } from '@/store/permission';

const { getPermissionMenus } = usePermissionStore();
</script>
