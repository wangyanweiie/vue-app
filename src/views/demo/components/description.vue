<template>
    <div>
        <x-description :columns="columns" :data="data" header="x-description" class="component">
            <template #addressSlot>江苏省-南京市-江宁区</template>
        </x-description>
    </div>
</template>

<script setup lang="ts">
import type { XDescriptionColumn } from '@/components/x-description/interface';

/**
 * 描述列配置
 */
const columns: XDescriptionColumn[] = [
    {
        label: '姓名',
        prop: 'name',
    },
    {
        label: '年龄',
        prop: 'age',
    },
    {
        label: '性别',
        prop: 'sex',
    },
    {
        label: '爱好',
        prop: 'hobby',
    },
    {
        label: '地址',
        prop: 'address',
    },
    {
        label: '家乡',
        prop: 'home',
        formatter: (data: Record<string, any>, column: XDescriptionColumn, cellValue: any) => {
            return cellValue || '/';
        },
    },
];

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
    home: '',
};
</script>
<style lang="scss" scoped>
.component {
    margin-bottom: 10px;
}
</style>
