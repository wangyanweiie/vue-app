<script setup lang="ts">
import { useCommandComponent } from '@/components/index';
import MyDialog from './dialog.vue';

const myDialog = useCommandComponent(MyDialog);
</script>

<template>
    <el-card shadow="hover" header="命令式弹窗">
        <el-button @click="myDialog({})"> 打开弹窗 </el-button>
    </el-card>
</template>
