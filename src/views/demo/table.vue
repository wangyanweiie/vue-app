<template>
    <div>
        <x-edit-table
            ref="editTableRef"
            :title="$t('iDpzKzxbRbJEnt1PRgY')"
            header="x-edit-table"
            show-index
            selectable
            :columns="editColumns"
            :data-source="data"
            row-key="id"
            class="component"
        >
            <template #operation>
                <el-button type="success" @click="editTableRef?.editActions.addRow()">
                    {{ $t('kHi2pIo34f3yReZhVayu') }}
                </el-button>
                <el-button type="primary" @click="editTableSubmit"> {{ $t('xrnNbPAatEuKjmd0lSoh') }} </el-button>
            </template>

            <template #default>
                <x-edit-table-item v-for="(item, index) in editColumns" :key="index" v-bind="item">
                    <template #edit="{ row }">
                        <el-input v-model="row[item.prop]" :placeholder="$t('sJiqs2ZbOt5MXdpd1ZvjH')"></el-input>
                    </template>
                </x-edit-table-item>
                <x-edit-table-item :label="$t('bYdjy1muZRKxxYlokF')" :required="false" fixed="right" width="250">
                    <template #default="{ actions, index }">
                        <el-button text type="primary" @click="actions.startEdit(index)">
                            {{ $t('bYdjy1muZRKxxYlokF') }}
                        </el-button>
                        <el-button text type="primary" @click="actions.deleteRow(index)">
                            {{ $t('nepCavywzYMgyyUdPe') }}
                        </el-button>
                    </template>
                    <template #edit="{ actions, index }">
                        <el-button text type="primary" @click="actions.saveEdit(index)">
                            {{ $t('hTugxoOxYljQQvW5Uclz8') }}
                        </el-button>
                        <el-button text type="primary" @click="actions.cancelEdit(index)">
                            {{ $t('bgOh1bYyBiz19ApW3s3Hk') }}
                        </el-button>
                        <el-button text type="primary" @click="actions.deleteRow(index)">
                            {{ $t('nepCavywzYMgyyUdPe') }}
                        </el-button>
                    </template>
                </x-edit-table-item>
            </template>
        </x-edit-table>

        <x-table
            ref="tableRef"
            :title="$t('iDpzKzxbRbJEnt1PRgY')"
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
                <el-button type="success"> {{ $t('kHi2pIo34f3yReZhVayu') }} </el-button>
                <el-button type="warning" @click="handleExport"> {{ $t('cd5B8eWfhOw3Scy2ACcoy') }} </el-button>
            </template>
        </x-table>

        <x-table-v2
            ref="tableV2Ref"
            :title="$t('iDpzKzxbRbJEnt1PRgY')"
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
                <el-button type="success"> {{ $t('kHi2pIo34f3yReZhVayu') }} </el-button>
                <el-button type="warning" @click="handleExport"> {{ $t('cd5B8eWfhOw3Scy2ACcoy') }} </el-button>
            </template>
        </x-table-v2>
    </div>
</template>

<script setup lang="ts">
import type { XEditTableColumn } from '@/components/x-edit-table/interface';
import type { XTableColumn } from '@/components/x-table/interface';
import i18n from '@/locale';
import { getPermissionAction } from '@/utils/permission-action';
import useExcelJs from '@/utils/use-exceljs';

const { t } = i18n.global;

/**
 * 表格列配置
 */
const columns = computed<XTableColumn[]>(() => [
    {
        label: t('xgf4aCzA4SnJzGBak8E'),
        prop: 'name',
    },
    {
        label: t('qDx5COvEeBmUji45JcXs7'),
        prop: 'age',
    },
    {
        label: t('khbpvf3Q1hd798MXvxpV'),
        prop: 'sex',
    },
    {
        label: t('0eq3Zi1FhcpRlTS7hOn'),
        prop: 'hobby',
    },
]);

/**
 * 虚拟表格列配置
 */
const columnsV2 = computed(() => [
    {
        title: t('xgf4aCzA4SnJzGBak8E'),
        key: 'name',
        dataKey: 'name',
    },
    {
        title: t('qDx5COvEeBmUji45JcXs7'),
        key: 'age',
        dataKey: 'age',
    },
    {
        title: t('khbpvf3Q1hd798MXvxpV'),
        key: 'sex',
        dataKey: 'sex',
    },
    {
        title: t('0eq3Zi1FhcpRlTS7hOn'),
        key: 'hobby',
        dataKey: 'hobby',
    },
]);

/**
 * 可编辑表格列配置
 */
const editColumns = computed<XEditTableColumn[]>(() => [
    {
        label: t('xgf4aCzA4SnJzGBak8E'),
        prop: 'name',
        edit: false,
    },
    {
        label: t('qDx5COvEeBmUji45JcXs7'),
        prop: 'age',
        required: true,
    },
    {
        label: t('khbpvf3Q1hd798MXvxpV'),
        prop: 'sex',
        required: true,
    },
    {
        label: t('0eq3Zi1FhcpRlTS7hOn'),
        prop: 'hobby',
    },
]);

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
                label: t('hd0aor8CrBgAFxzHACkz'),
                permission: '',
                onClick: () => {
                    console.log('详情', row);
                },
            },
            {
                label: t('nepCavywzYMgyyUdPe'),
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
const { exportExcelByList } = useExcelJs(columns.value, data);

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
