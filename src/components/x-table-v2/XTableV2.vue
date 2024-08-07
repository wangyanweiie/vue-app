<template>
    <div :style="{ height: height, width: width }">
        <el-auto-resizer>
            <template #default="{ height: autoHeight, width: autoWidth }">
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
                                <slot name="operation" :checked-rows="selectedRows"> </slot>
                            </div>
                        </el-scrollbar>
                    </div>

                    <!-- 表格区域 -->
                    <div class="table__main">
                        <el-table-v2
                            ref="tableRef"
                            fixed
                            :row-key="rowKey"
                            :width="autoWidth"
                            :height="autoHeight"
                            :row-height="rowHeight"
                            :header-height="headerHeight"
                            :columns="tableColumns"
                            :data="tableData"
                            :onmouseover="handleMouseOver"
                            :onmouseleave="handleMouseLeave"
                        >
                            <!-- loading -->
                            <template v-if="loading" #overlay>
                                <div class="el-loading-mask table__main__loading">
                                    <el-icon class="is-loading" color="var(--el-color-primary)" :size="26">
                                        <loading-icon />
                                    </el-icon>
                                </div>
                            </template>

                            <!-- empty -->
                            <template v-if="!tableData.length" #empty>
                                <el-empty :description="emptyText" />
                            </template>
                        </el-table-v2>
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
                                layout=" ->, slot, total, sizes, prev, pager, next, jumper"
                                @current-change="handleCurrentChange"
                                @size-change="handleSizeChange"
                            >
                            </el-pagination>
                        </div>

                        <div v-else class="table__bottom__total">共 {{ tableData.length }} 条</div>
                    </div>
                </el-card>
            </template>
        </el-auto-resizer>
    </div>
</template>

<script lang="ts" setup>
import { InfoFilled, Loading as LoadingIcon } from '@element-plus/icons-vue';

import type { XTableV2Prop } from './interface';
import useIndex from './useIndex';

/**
 * props
 */
const props = withDefaults(defineProps<XTableV2Prop>(), {
    width: '100%',
    height: '500px',
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
    rowKey: 'id',
    rowHeight: 45,
    headerHeight: 45,
    loading: false,
    emptyText: '暂无数据',
    api: undefined,
    apiParams: () => ({}),
    apiKeyMap: () => ({
        queryCurrentPageKey: 'page',
        queryPageSizeKey: 'limit',
        returnCurrentPageKey: 'current',
        returnTotalKey: 'total',
        returnPagesKey: 'pages',
        returnRecordKey: 'records',
    }),
    columns: () => [],
    data: () => [],
    dividePage: true,
    paginationProp: () => ({
        pageSize: 10,
    }),
    scroll: false,
});

/**
 * useIndex
 */
const {
    tableRef,
    selectedRows,
    tableColumns,
    tableData,
    pagination,
    handleMouseOver,
    handleMouseLeave,
    loadData,
    handleCurrentChange,
    handleSizeChange,
} = useIndex(props);

/**
 * 暴露的属性与方法
 */
defineExpose({
    selectedRows,
    loadData,
});
</script>

<style lang="scss" scoped>
.table {
    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        padding-bottom: 10px;

        &__title {
            justify-content: left;

            span {
                font-size: 17px;
                font-weight: bold;
            }
        }

        &__operation {
            display: flex;
            align-items: center;
        }
    }

    &__main {
        &__loading {
            display: flex;
            align-items: center;
            justify-content: center;
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

:deep(.example-showcase) :deep(.el-table-v2__overlay) {
    z-index: 9;
}
</style>
