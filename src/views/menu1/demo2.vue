<template>
    <div>
        <!-- x-table -->
        <x-table
            ref="tableRef"
            header="x-table"
            show-index
            selectable
            :columns="columns"
            :data="data"
            :selected-list="selectedList"
            row-key="id"
            class="component"
        >
            <template #operation>
                <el-button type="success">新增</el-button>
                <el-button type="warning">导出</el-button>
            </template>
        </x-table>

        <!-- x-table-v2 -->
        <x-table-v2
            ref="tableV2Ref"
            header="x-table-v2"
            height="300px"
            show-index
            selectable
            :columns="columnsV2"
            :data="data"
            row-key="id"
            class="component"
        >
            <template #operation>
                <el-button type="success">新增</el-button>
                <el-button type="warning">导出</el-button>
            </template>
        </x-table-v2>
    </div>
</template>

<script setup lang="ts">
/**
 * 选中列表
 */
const selectedList = ref([
    {
        id: '11',
    },
]);

/**
 * table ref
 */
const tableRef = ref();
const tableV2Ref = ref();

/**
 * 表格列配置
 */
const columns: any[] = [
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
];
const columnsV2: any[] = [
    {
        title: '姓名',
        key: 'name',
        dataKey: 'name',
    },
    {
        title: '年龄',
        key: 'age',
        dataKey: 'age',
    },
    {
        title: '性别',
        key: 'sex',
        dataKey: 'sex',
    },
    {
        title: '爱好',
        key: 'hobby',
        dataKey: 'hobby',
    },
];

/**
 * 表格数据
 */
const data = [
    {
        id: '11',
        name: '小明',
        age: '18',
        sex: '男',
        hobby: '跑步',
    },
    {
        id: '22',
        name: '小强',
        age: '20',
        sex: '男',
        hobby: '骑行',
    },
    {
        id: '33',
        name: '小红',
        age: '18',
        sex: '女',
        hobby: '跳舞',
    },
];
</script>
<style lang="scss" scoped>
.component {
    margin-bottom: 10px;
}
</style>
