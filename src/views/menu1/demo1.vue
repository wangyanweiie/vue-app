<template>
    <div>
        <el-card header="x-description" shadow="hover" class="component">
            <x-description :columns="columns" :data="data"></x-description>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { columns } from './conf1';

/**
 * 描述列数据
 */
const data = {
    id: '1',
    name: '小明',
    age: '18',
    sex: '男',
    hobby: '跑步',
    address: '南京',
    home: '成都',
};
</script>
<style lang="scss" scoped>
.component {
    margin-bottom: 10px;
}
</style>
