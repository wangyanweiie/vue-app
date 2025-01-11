<template>
    <div>
        <x-edit-table
            ref="editTableRef"
            header="x-edit-table"
            show-index
            selectable
            :columns="editColumns"
            :data-source="data"
            row-key="id"
            class="component"
        >
            <template #operation>
                <el-button type="success" @click="editTableRef?.editActions.addRow()"> 新增 </el-button>
                <el-button type="primary" @click="editTableSubmit"> 提交 </el-button>
            </template>

            <template #default>
                <x-edit-table-item v-for="(item, index) in editColumns" :key="index" v-bind="item">
                    <template #edit="{ row }">
                        <el-input v-model="row[item.prop]" placeholder="请输入"></el-input>
                    </template>
                </x-edit-table-item>
                <x-edit-table-item label="操作" :required="false" fixed="right" width="250">
                    <template #default="{ actions, index }">
                        <el-button text type="primary" @click="actions.startEdit(index)"> 操作 </el-button>
                        <el-button text type="primary" @click="actions.deleteRow(index)"> 删除 </el-button>
                    </template>
                    <template #edit="{ actions, index }">
                        <el-button text type="primary" @click="actions.saveEdit(index)"> 保存 </el-button>
                        <el-button text type="primary" @click="actions.cancelEdit(index)"> 取消 </el-button>
                        <el-button text type="primary" @click="actions.deleteRow(index)"> 删除 </el-button>
                    </template>
                </x-edit-table-item>
            </template>
        </x-edit-table>

        <x-table
            ref="tableRef"
            header="x-table"
            row-key="id"
            combine-field="age"
            show-index
            selectable
            :columns="columns"
            :data="data"
            :selected-list="selectedList"
            :column-index="[3, 6]"
            :actions="actionsConfig"
            action-text="操作"
            action-width="150"
            class="component"
        >
            <template #operation>
                <el-button type="success"> 新增 </el-button>
                <el-button type="warning" @click="handleExport"> 导出 </el-button>
            </template>
        </x-table>

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
                <el-button type="success"> 新增 </el-button>
                <el-button type="warning" @click="handleExport"> 导出 </el-button>
            </template>
        </x-table-v2>
    </div>
</template>

<script setup lang="ts">
import type { XEditTableColumn } from '@/components/x-edit-table/interface';
import type { XTableColumn } from '@/components/x-table/interface';
import { getPermissionAction } from '@/utils/permission-action';
import useExcelJs from '@/utils/use-exceljs';

/**
 * 表格列配置
 */
const columns: XTableColumn[] = [
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

/**
 * 虚拟表格列配置
 */
const columnsV2 = [
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
 * 可编辑表格列配置
 */
const editColumns: XEditTableColumn[] = [
    {
        label: '姓名',
        prop: 'name',
        edit: false,
    },
    {
        label: '年龄',
        prop: 'age',
        required: true,
    },
    {
        label: '性别',
        prop: 'sex',
        required: true,
    },
    {
        label: '爱好',
        prop: 'hobby',
    },
];

/**
 * 选中列表
 */
const selectedList = ref([{ id: '11' }, { id: '22' }, { id: '33' }]);

/**
 * table ref
 */
const tableRef = ref();
const tableV2Ref = ref();
const editTableRef = ref();

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
        age: '18',
        sex: '男',
        hobby: '骑行',
    },
    {
        id: '33',
        name: '小红',
        age: '20',
        sex: '女',
        hobby: '跳舞',
    },
];

/**
 * x-table-actions
 */
function actionsConfig(row: Record<string, any>) {
    return getPermissionAction(
        [
            {
                label: '详情',
                permission: '',
                onClick: () => {
                    console.log('详情', row);
                },
            },
            {
                label: '删除',
                permission: '',
                onClick: () => {
                    console.log('删除', row);
                },
            },
        ],
        // 权限列表
        [],
    );
}

/**
 * use-exceljs
 */
const { exportExcelByList } = useExcelJs(columns, data);

/**
 * 导出
 */
function handleExport() {
    exportExcelByList();
}

/**
 * 编辑表格提交
 */
function editTableSubmit() {
    console.log('result', editTableRef.value?.resultData);
}
</script>
<style lang="scss" scoped>
.component {
    margin-bottom: 10px;
}
</style>
