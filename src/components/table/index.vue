<template>
    <el-card :header="header" :shadow="shadow" :body-style="bodyStyle" class="table">
        <!-- 顶部区域 -->
        <div class="table__header">
            <div class="table__header__title">
                <slot name="title">
                    <span>{{ title }}</span>

                    <el-tooltip v-if="tooltipContent" :content="tooltipContent" placement="top">
                        <el-icon class="icon">
                            <info-filled />
                        </el-icon>
                    </el-tooltip>
                </slot>
            </div>

            <el-scrollbar>
                <div class="table__header__operation">
                    <slot name="operation" :checked-rows="selectedRows"></slot>
                    <table-setting v-model="tableColumns" @reload="loadData(searchData)" />
                </div>
            </el-scrollbar>
        </div>

        <!-- 表格区域 -->
        <div class="table__main">
            <el-table
                ref="tableRef"
                v-loading="tableLoading"
                border
                size="small"
                table-layout="auto"
                :data="tableData"
                :row-key="rowKey"
                :tree-props="treeProps"
                :span-method="spanMethod"
                :style="{ width: '100%' }"
                v-bind="elTableProps"
                @selection-change="handleSelectChange"
            >
                <!-- 选择列 -->
                <el-table-column
                    v-if="selectable"
                    type="selection"
                    align="center"
                    width="50px"
                    reserve-selection
                    :selectable="selectableValue"
                />

                <!-- 索引列 -->
                <el-table-column
                    v-if="showIndex"
                    type="index"
                    align="center"
                    width="50px"
                    label="#"
                    :index="handleIndex"
                />

                <el-table-column
                    v-for="(col, index) in tableColumns"
                    :key="index"
                    align="center"
                    min-width="150"
                    show-overflow-tooltip
                    v-bind="col"
                >
                    <template v-if="!col[`formatter`]" #default="scope">
                        <slot :name="`${col.prop + 'Slot'}`" :scope="scope">
                            {{ scope.row[`${col.prop}`] }}
                        </slot>
                    </template>
                </el-table-column>

                <!-- 操作栏 -->
                <el-table-column v-if="hasActionBtn" fixed="right" label="操作" align="center" :width="actionsWidth">
                    <template #default="{ row, $index }">
                        <div class="actions">
                            <el-button
                                v-for="(item, index) in actionButtons(row, $index)"
                                :key="index"
                                text
                                type="primary"
                                v-bind="item"
                            >
                                {{ item.label }}
                            </el-button>
                        </div>
                    </template>
                </el-table-column>

                <slot name="table__main__action"></slot>
            </el-table>
        </div>

        <!-- 底部区域 -->
        <div v-if="tableData.length" class="table__bottom">
            <div v-if="dividePage" class="table__bottom__pagination">
                <el-pagination
                    v-model:current-page="pagination.currentPage"
                    v-model:page-size="pagination.pageSize"
                    :page-sizes="[10, 20, 50, 100]"
                    :total="pagination.total"
                    :background="true"
                    layout=" ->, slot,total, sizes, prev, pager, next, jumper"
                    v-bind="elPaginationProps"
                    @current-change="handleCurrentChange"
                    @size-change="handleSizeChange"
                >
                </el-pagination>
            </div>

            <div v-else class="table__bottom__total">共 {{ tableData.length }} 条</div>
        </div>
    </el-card>
</template>

<script lang="ts" setup>
import type { PaginationProps, TableProps } from 'element-plus';
import type { XTableAPIKeyMap, XTableColumn, XTableDataType, XTableActionButton } from './interface';
import { InfoFilled } from '@element-plus/icons-vue';
import useIndex from './useIndex';
import TableSetting from './components/TableSetting.vue';

/**
 * 定义组件选项
 */
defineOptions({
    name: 'XTable',
});

/**
 * Props
 */
const props = withDefaults(
    defineProps<{
        /** el-card-header */
        header: string;
        /** el-card-shadow */
        shadow?: 'hover' | 'always' | 'never';
        /** card-body-style */
        bodyStyle?: Record<string, string>;
        /** 标题 */
        title?: string;
        /** 感叹号提示内容 */
        tooltipContent?: string;
        /** 是否展示索引 */
        showIndex?: boolean;
        /** 是否可选 */
        selectable?: boolean;
        /** el table props */
        elTableProps?: Partial<TableProps<XTableDataType>>;
        /** el pagination props */
        elPaginationProps?: Partial<PaginationProps>;
        /** 是否为分页格式 */
        dividePage?: boolean;
        /** 是否懒加载 */
        lazy?: boolean;
        /** 序号是否连续 */
        continuous?: boolean;
        /** 是否是树形结构的数据 */
        isTree?: boolean;
        /** 行数据 key 值 */
        rowKey?: string;
        /** 需要回显的行数据 */
        selectedList?: any[];
        /** 表格列配置 */
        columns: XTableColumn[];
        /** 表格数据 */
        data?: XTableDataType[];
        /** loading */
        loading?: boolean;
        /** 请求接口 */
        api?: any;
        /** 请求接口参数 */
        apiParams?: Record<string, string | number>;
        /** 接口字段映射 */
        apiKeyMap?: XTableAPIKeyMap;
        /** 操作栏 */
        actions?: (row: any, index: number) => XTableActionButton[];
        /** 要合并的某一列字段 */
        combineField?: string;
        /** 要根据某一列字段进行合并的列索引 */
        columnIndex?: number[];
    }>(),
    {
        header: '',
        shadow: 'hover',
        bodyStyle: () => {
            return {
                padding: '15px',
            };
        },
        title: '数据列表',
        tooltipContent: '',
        showIndex: false,
        selectable: false,
        elTableProps: () => ({}),
        elPaginationProps: undefined,
        dividePage: true,
        lazy: false,
        continuous: true,
        isTree: false,
        rowKey: 'id',
        selectedList: () => [],
        columns: () => [],
        data: () => [],
        loading: false,
        api: undefined,
        apiParams: () => ({}),
        apiKeyMap: () => ({
            queryCurrentPageKey: 'page',
            queryPageSizeKey: 'limit',
            returnCurrentPageKey: 'current',
            returnCurrentSizeKey: 'size',
            returnTotalKey: 'total',
            returnPagesKey: 'pages',
            returnRecordKey: 'records',
        }),
        actions: () => [],
        combineField: '',
        columnIndex: () => [],
    },
);

/**
 * useIndex
 */
const {
    tableRef,
    tableLoading,
    tableColumns,
    tableData,
    pagination,
    treeProps,
    selectedRows,
    selectedCount,
    handleSelectChange,
    handleIndex,
    selectableValue,
    searchData,
    loadData,
    handleSizeChange,
    handleCurrentChange,
    handleToggleRowSelection,
    hasActionBtn,
    actionsWidth,
    actionButtons,
    getSelectedRows,
    clearSelection,
    getTableData,
    spanMethod,
} = useIndex(props);

/**
 * 暴露的属性/方法
 */
defineExpose({
    loadData,
    getSelectedRows,
    clearSelection,
    getTableData,
    handleToggleRowSelection,
});
</script>

<style lang="scss" scoped>
.table {
    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        padding: 0 10px 10px 10px;

        &__title {
            justify-content: left;

            span {
                font-size: 17px;
                font-weight: bold;
            }

            .icon {
                margin-left: 10px;
                transform: translateY(0.1em);
            }
        }

        &__operation {
            display: flex;
            align-items: center;
        }
    }

    &__main {
        &__actions {
            display: flex;
            justify-content: center;
            padding: 0 15px;
        }
    }

    &__bottom {
        &__pagination {
            padding-top: 10px;
        }

        &__total {
            padding-top: 10px;
            display: flex;
            justify-content: flex-end;
            text-align: right;
            font-size: 14px;
        }
    }
}
</style>
